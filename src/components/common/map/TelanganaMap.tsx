import {
  ActionIcon,
  Badge,
  Box,
  Card,
  Flex,
  Group,
  Paper,
  Select,
  Text,
  ThemeIcon,
  Tooltip,
} from '@mantine/core';
import {
  IconBriefcase,
  IconBuilding,
  IconMapPin,
  IconRefresh,
  IconSearch,
} from '@tabler/icons-react';
import type { GeoJsonObject } from 'geojson';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';

import {
  TELANGANA_BOUNDS,
  TELANGANA_CENTER,
  TELANGANA_DISTRICTS,
} from './telanganaData';
import { TELANGANA_GEOJSON } from './telanganaGeoJson';
import type { DistrictData, TelanganaMapProps } from './types';

export const TelanganaMap: React.FC<TelanganaMapProps> = ({
  height = '580px',
  width = '100%',
  selectedDistrict: controlledSelectedDistrict,
  onSelectDistrict,
  districtStats,
  showControls = true,
  showInfoCard = true,
  className = '',
}) => {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const geojsonLayerRef = useRef<L.GeoJSON | null>(null);
  const districtLayersMapRef = useRef<Map<string, L.Path>>(new Map());
  const labelMarkersRef = useRef<L.Marker[]>([]);
  const onSelectDistrictRef = useRef(onSelectDistrict);
  onSelectDistrictRef.current = onSelectDistrict;

  const [activeDistrict, setActiveDistrict] = useState<DistrictData | null>(
    null
  );
  const [hoveredDistrict, setHoveredDistrict] = useState<DistrictData | null>(
    null
  );

  const containerHeight = typeof height === 'number' ? `${height}px` : height;

  // Merge districts data with optional external stats
  const enrichedDistricts = useMemo(() => {
    return TELANGANA_DISTRICTS.map((d) => {
      const stats =
        districtStats?.[d.name] || districtStats?.[d.name.toLowerCase()];
      return {
        ...d,
        jobCount: stats?.jobCount ?? d.jobCount ?? 0,
        companiesCount: stats?.companiesCount ?? d.companiesCount ?? 0,
      };
    });
  }, [districtStats]);

  // District lookup map by name (normalized lowercase)
  const districtLookup = useMemo(() => {
    const map = new Map<string, DistrictData>();
    enrichedDistricts.forEach((d) => {
      map.set(d.name.toLowerCase().trim(), d);
      map.set(d.id.toLowerCase().trim(), d);
    });
    return map;
  }, [enrichedDistricts]);

  // Default district polygon styling
  const getFeatureStyle = useCallback(
    (isHovered = false, isSelected = false): L.PathOptions => {
      if (isSelected) {
        return {
          fillColor: '#0052cc',
          fillOpacity: 0.7,
          color: '#002b80',
          weight: 3,
          opacity: 1,
        };
      }
      if (isHovered) {
        return {
          fillColor: '#3385ff',
          fillOpacity: 0.55,
          color: '#0052cc',
          weight: 2.5,
          opacity: 1,
        };
      }
      return {
        fillColor: '#d6e8ff',
        fillOpacity: 0.45,
        color: '#1a75ff',
        weight: 1.5,
        opacity: 0.9,
      };
    },
    []
  );

  const resetAllLayerStyles = useCallback(() => {
    districtLayersMapRef.current.forEach((layer) => {
      layer.setStyle(getFeatureStyle(false, false));
    });
  }, [getFeatureStyle]);

  const highlightDistrictLayer = useCallback(
    (districtName: string) => {
      resetAllLayerStyles();
      const layer = districtLayersMapRef.current.get(
        districtName.toLowerCase().trim()
      );
      if (layer) {
        layer.setStyle(getFeatureStyle(false, true));
        layer.bringToFront();
      }
    },
    [getFeatureStyle, resetAllLayerStyles]
  );

  // Handle district selection & zoom inside the map (no redirection!)
  const handleDistrictSelection = useCallback(
    (district: DistrictData, triggerCallback = true) => {
      setActiveDistrict(district);
      if (triggerCallback && onSelectDistrictRef.current) {
        onSelectDistrictRef.current(district);
      }

      const map = mapInstanceRef.current;
      if (!map) return;

      highlightDistrictLayer(district.name);

      const layer = districtLayersMapRef.current.get(
        district.name.toLowerCase().trim()
      );
      if (layer && 'getBounds' in layer) {
        const polygonLayer = layer as L.Polygon;
        map.fitBounds(polygonLayer.getBounds(), {
          maxZoom: 10,
          padding: [50, 50],
          animate: true,
        });
        polygonLayer.openPopup();
      } else {
        map.flyTo([district.lat, district.lng], 9.5, { animate: true });
      }
    },
    [highlightDistrictLayer]
  );

  // Sync controlled selectedDistrict prop if provided
  useEffect(() => {
    if (controlledSelectedDistrict) {
      const matched = districtLookup.get(
        controlledSelectedDistrict.toLowerCase().trim()
      );
      if (matched && matched.name !== activeDistrict?.name) {
        handleDistrictSelection(matched, false);
      }
    }
  }, [
    controlledSelectedDistrict,
    districtLookup,
    activeDistrict?.name,
    handleDistrictSelection,
  ]);

  // Reset map view to the entire Telangana state
  const handleResetView = () => {
    const map = mapInstanceRef.current;
    if (!map) return;

    setActiveDistrict(null);
    setHoveredDistrict(null);
    resetAllLayerStyles();

    if (geojsonLayerRef.current) {
      map.fitBounds(geojsonLayerRef.current.getBounds(), {
        padding: [25, 25],
        animate: true,
      });
    } else {
      map.flyTo(TELANGANA_CENTER, 7.5, { animate: true });
    }
  };

  // Initialize Leaflet Map
  useEffect(() => {
    if (!mapContainerRef.current) return;

    // Destroy existing instance if any
    if (mapInstanceRef.current) {
      mapInstanceRef.current.remove();
      mapInstanceRef.current = null;
    }

    const southWest = L.latLng(TELANGANA_BOUNDS[0][0], TELANGANA_BOUNDS[0][1]);
    const northEast = L.latLng(TELANGANA_BOUNDS[1][0], TELANGANA_BOUNDS[1][1]);
    const bounds = L.latLngBounds(southWest, northEast);

    const map = L.map(mapContainerRef.current, {
      center: TELANGANA_CENTER,
      zoom: 7.5,
      minZoom: 7,
      maxZoom: 12,
      maxBounds: bounds,
      maxBoundsViscosity: 1.0,
      zoomControl: true,
      attributionControl: false,
    });

    // Base OSM tiles
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
    }).addTo(map);

    mapInstanceRef.current = map;

    // Load GeoJSON synchronously from bundled data
    try {
      const geojson = L.geoJSON(TELANGANA_GEOJSON as unknown as GeoJsonObject, {
        style: () => getFeatureStyle(false, false),
        onEachFeature: (feature, layer) => {
          const rawName: string =
            feature.properties?.district ||
            feature.properties?.Name ||
            feature.properties?.DISTRICT ||
            '';
          const normalizedName = rawName.toLowerCase().trim();
          const districtInfo = districtLookup.get(normalizedName) || {
            id: normalizedName,
            name: rawName,
            code: feature.properties?.dt_code || '',
            lat: 0,
            lng: 0,
            zone: 'Telangana',
            headquarters: rawName,
            jobCount: 0,
            companiesCount: 0,
          };

          districtLayersMapRef.current.set(normalizedName, layer as L.Path);

          // Tell district name on hover tooltip
          layer.bindTooltip(
            `<div class="district-badge-tooltip">
              <span class="district-title">${districtInfo.name}</span>
              <span class="district-jobs">${districtInfo.jobCount} Active Jobs</span>
            </div>`,
            {
              sticky: true,
              className: 'telangana-district-tooltip',
              direction: 'top',
              offset: [0, -10],
            }
          );

          // In-map Popup on Click with full district info (NO external redirection!)
          const popupContent = `
            <div class="telangana-popup-card">
              <div class="telangana-popup-header">
                <h4 class="telangana-popup-title">${districtInfo.name}</h4>
                <span class="telangana-popup-zone">${districtInfo.zone}</span>
              </div>
              <div class="telangana-popup-body">
                <div class="telangana-stat-item">
                  <span class="telangana-stat-label">HQ:</span>
                  <span class="telangana-stat-value">${districtInfo.headquarters}</span>
                </div>
                <div class="telangana-stat-item">
                  <span class="telangana-stat-label">Active Jobs:</span>
                  <span class="telangana-stat-value highlight">${districtInfo.jobCount}</span>
                </div>
                <div class="telangana-stat-item">
                  <span class="telangana-stat-label">Companies:</span>
                  <span class="telangana-stat-value">${districtInfo.companiesCount}</span>
                </div>
              </div>
              <div class="telangana-popup-footer">
                <button type="button" class="telangana-select-btn" id="btn-select-${districtInfo.id}">
                  Select ${districtInfo.name}
                </button>
              </div>
            </div>
          `;

          layer.bindPopup(popupContent, {
            className: 'telangana-custom-popup',
            maxWidth: 280,
          });

          layer.on('popupopen', () => {
            const btn = document.getElementById(
              `btn-select-${districtInfo.id}`
            );
            if (btn) {
              btn.onclick = (e) => {
                e.stopPropagation();
                handleDistrictSelection(districtInfo);
              };
            }
          });

          // Hover and click events
          layer.on({
            mouseover: (e) => {
              const target = e.target as L.Path;
              setHoveredDistrict(districtInfo);
              const isCurrentActive =
                activeDistrict?.name.toLowerCase() ===
                districtInfo.name.toLowerCase();
              if (!isCurrentActive) {
                target.setStyle(getFeatureStyle(true, false));
              }
            },
            mouseout: (e) => {
              const target = e.target as L.Path;
              setHoveredDistrict(null);
              const isCurrentActive =
                activeDistrict?.name.toLowerCase() ===
                districtInfo.name.toLowerCase();
              target.setStyle(getFeatureStyle(false, isCurrentActive));
            },
            click: () => {
              handleDistrictSelection(districtInfo);
            },
          });
        },
      }).addTo(map);

      geojsonLayerRef.current = geojson;
      map.fitBounds(geojson.getBounds(), { padding: [15, 15] });
    } catch (e) {
      console.error('Error attaching GeoJSON:', e);
    }

    // Centroid Markers with District Names directly visible on map
    enrichedDistricts.forEach((dist) => {
      const labelIcon = L.divIcon({
        className: 'telangana-district-label-marker',
        html: `<div class="district-map-label" title="${dist.name}">
                <span class="district-point"></span>
                <span class="district-name-text">${dist.name}</span>
               </div>`,
        iconSize: [80, 24],
        iconAnchor: [40, 12],
      });

      const marker = L.marker([dist.lat, dist.lng], {
        icon: labelIcon,
        interactive: true,
      })
        .addTo(map)
        .on('click', () => {
          handleDistrictSelection(dist);
        });

      labelMarkersRef.current.push(marker);
    });

    // Invalidate size to ensure Leaflet renders full dimensions
    const resizeTimer1 = setTimeout(() => {
      map.invalidateSize();
    }, 150);
    const resizeTimer2 = setTimeout(() => {
      map.invalidateSize();
    }, 450);

    const handleWindowResize = () => {
      map.invalidateSize();
    };
    window.addEventListener('resize', handleWindowResize);

    return () => {
      clearTimeout(resizeTimer1);
      clearTimeout(resizeTimer2);
      window.removeEventListener('resize', handleWindowResize);
      map.remove();
      mapInstanceRef.current = null;
    };
  }, [
    districtLookup,
    enrichedDistricts,
    getFeatureStyle,
    handleDistrictSelection,
    activeDistrict?.name,
  ]);

  const selectOptions = useMemo(() => {
    return enrichedDistricts.map((d) => ({
      value: d.name,
      label: `${d.name} (${d.jobCount} Jobs)`,
    }));
  }, [enrichedDistricts]);

  return (
    <Card
      withBorder
      shadow="sm"
      radius="md"
      p="md"
      className={className}
      style={{ width, backgroundColor: '#ffffff' }}
    >
      <style>{`
        .leaflet-container {
          width: 100% !important;
          height: 100% !important;
          background: #f8fafc !important;
          z-index: 1 !important;
        }
        .telangana-district-tooltip {
          background: rgba(15, 23, 42, 0.95) !important;
          color: #ffffff !important;
          border: 1px solid rgba(255, 255, 255, 0.25) !important;
          border-radius: 8px !important;
          padding: 6px 12px !important;
          box-shadow: 0 8px 24px rgba(0,0,0,0.25) !important;
          font-family: inherit !important;
        }
        .telangana-district-tooltip .district-title {
          font-weight: 700;
          font-size: 13px;
          display: block;
        }
        .telangana-district-tooltip .district-jobs {
          font-size: 11px;
          color: #60a5fa;
          display: block;
        }
        .district-map-label {
          display: flex;
          align-items: center;
          gap: 4px;
          cursor: pointer;
          white-space: nowrap;
          pointer-events: auto;
        }
        .district-point {
          width: 7px;
          height: 7px;
          background: #0052cc;
          border: 1.5px solid #ffffff;
          border-radius: 50%;
          display: inline-block;
          box-shadow: 0 0 5px rgba(0, 82, 204, 0.6);
        }
        .district-name-text {
          font-size: 10.5px;
          font-weight: 700;
          color: #0f172a;
          text-shadow: 0 0 3px #ffffff, 0 0 5px #ffffff;
        }
        .telangana-custom-popup .leaflet-popup-content-wrapper {
          border-radius: 12px !important;
          padding: 4px !important;
          box-shadow: 0 10px 30px rgba(0,0,0,0.2) !important;
          background: #ffffff !important;
        }
        .telangana-popup-card {
          padding: 10px 8px;
          font-family: inherit;
        }
        .telangana-popup-title {
          margin: 0 0 2px 0;
          font-size: 15px;
          font-weight: 700;
          color: #0f172a;
        }
        .telangana-popup-zone {
          font-size: 11px;
          color: #64748b;
          display: block;
          margin-bottom: 8px;
        }
        .telangana-popup-body {
          display: flex;
          flex-direction: column;
          gap: 4px;
          margin-bottom: 10px;
          padding-top: 6px;
          border-top: 1px solid #f1f5f9;
        }
        .telangana-stat-item {
          display: flex;
          justify-content: space-between;
          font-size: 12px;
        }
        .telangana-stat-label {
          color: #64748b;
        }
        .telangana-stat-value {
          font-weight: 600;
          color: #1e293b;
        }
        .telangana-stat-value.highlight {
          color: #0052cc;
        }
        .telangana-select-btn {
          width: 100%;
          background: #0052cc;
          color: #ffffff;
          border: none;
          padding: 7px 12px;
          border-radius: 6px;
          font-size: 12px;
          font-weight: 600;
          cursor: pointer;
          transition: background 0.15s ease;
        }
        .telangana-select-btn:hover {
          background: #004099;
        }
      `}</style>

      {/* Top Filter and Navigation Header */}
      {showControls && (
        <Flex
          justify="space-between"
          align="center"
          wrap="wrap"
          gap="sm"
          mb="sm"
        >
          <Group gap="xs">
            <ThemeIcon color="blue" variant="light" size="lg" radius="md">
              <IconMapPin size={20} />
            </ThemeIcon>
            <Box>
              <Group gap="xs">
                <Text fw={700} size="sm">
                  Telangana State Map
                </Text>
                <Badge color="blue" variant="filled" size="sm">
                  33 Districts
                </Badge>
              </Group>
              <Text size="xs" c="dimmed">
                Explore job opportunities by clicking any district
              </Text>
            </Box>
          </Group>

          <Group gap="xs">
            <Select
              placeholder="Find District..."
              data={selectOptions}
              value={activeDistrict?.name || null}
              searchable
              clearable
              leftSection={<IconSearch size={14} />}
              size="xs"
              style={{ width: 220 }}
              onChange={(val) => {
                if (!val) {
                  handleResetView();
                } else {
                  const dist = districtLookup.get(val.toLowerCase().trim());
                  if (dist) handleDistrictSelection(dist);
                }
              }}
            />

            <Tooltip label="Reset to full Telangana view">
              <ActionIcon
                variant="light"
                color="gray"
                size="input-xs"
                onClick={handleResetView}
              >
                <IconRefresh size={16} />
              </ActionIcon>
            </Tooltip>
          </Group>
        </Flex>
      )}

      {/* Main Map Box with guaranteed pixel height */}
      <Box
        pos="relative"
        style={{
          width: '100%',
          height: containerHeight,
          minHeight: '480px',
          borderRadius: 8,
          overflow: 'hidden',
          border: '1px solid #cbd5e1',
          position: 'relative',
        }}
      >
        <div
          ref={mapContainerRef}
          style={{
            width: '100%',
            height: '100%',
            minHeight: '480px',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
          }}
        />

        {/* Hover / Current District Floating Indicator */}
        {(hoveredDistrict || activeDistrict) && (
          <Paper
            shadow="md"
            radius="md"
            p="xs"
            pos="absolute"
            top={12}
            right={12}
            style={{
              zIndex: 1000,
              background: 'rgba(255, 255, 255, 0.95)',
              backdropFilter: 'blur(4px)',
              border: '1px solid #cbd5e1',
              maxWidth: 240,
            }}
          >
            <Group gap="xs" wrap="nowrap">
              <ThemeIcon
                size="sm"
                color={activeDistrict ? 'blue' : 'gray'}
                variant="light"
              >
                <IconMapPin size={14} />
              </ThemeIcon>
              <Box style={{ flex: 1 }}>
                <Text size="xs" fw={700} c="dark" truncate>
                  {(hoveredDistrict || activeDistrict)?.name}
                </Text>
                <Text size="10px" c="dimmed">
                  {(hoveredDistrict || activeDistrict)?.zone}
                </Text>
              </Box>
              <Badge size="xs" color="blue" variant="light">
                {(hoveredDistrict || activeDistrict)?.jobCount} Jobs
              </Badge>
            </Group>
          </Paper>
        )}
      </Box>

      {/* Bottom Selected District Info Card */}
      {showInfoCard && activeDistrict && (
        <Card withBorder radius="md" p="sm" mt="sm" bg="blue.0">
          <Flex justify="space-between" align="center" wrap="wrap" gap="sm">
            <Group gap="sm">
              <ThemeIcon color="blue" size="lg" radius="md">
                <IconBuilding size={18} />
              </ThemeIcon>
              <Box>
                <Group gap="xs">
                  <Text fw={700} size="sm">
                    {activeDistrict.name} District
                  </Text>
                  <Badge size="xs" color="blue">
                    HQ: {activeDistrict.headquarters}
                  </Badge>
                </Group>
                <Text size="xs" c="dimmed">
                  Region: {activeDistrict.zone} | District Code:{' '}
                  {activeDistrict.code}
                </Text>
              </Box>
            </Group>

            <Group gap="lg">
              <Group gap="xs">
                <IconBriefcase size={16} color="#0052cc" />
                <Box>
                  <Text size="xs" c="dimmed">
                    Openings
                  </Text>
                  <Text size="sm" fw={700} c="blue">
                    {activeDistrict.jobCount} Jobs
                  </Text>
                </Box>
              </Group>

              <Group gap="xs">
                <IconBuilding size={16} color="#495057" />
                <Box>
                  <Text size="xs" c="dimmed">
                    Employers
                  </Text>
                  <Text size="sm" fw={700}>
                    {activeDistrict.companiesCount} Companies
                  </Text>
                </Box>
              </Group>

              <ActionIcon
                variant="subtle"
                color="gray"
                size="sm"
                onClick={handleResetView}
              >
                <IconRefresh size={14} />
              </ActionIcon>
            </Group>
          </Flex>
        </Card>
      )}
    </Card>
  );
};
