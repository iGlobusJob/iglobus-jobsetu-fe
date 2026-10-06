export interface DistrictData {
  id: string;
  name: string;
  code: string;
  lat: number;
  lng: number;
  zone: string;
  headquarters: string;
  jobCount?: number;
  companiesCount?: number;
}

export interface TelanganaMapProps {
  /** Height of the map container (default: '580px') */
  height?: string | number;
  /** Width of the map container (default: '100%') */
  width?: string | number;
  /** Currently selected district name */
  selectedDistrict?: string | null;
  /** Callback triggered when a district is selected (map click or search) - in-app only, no redirects */
  onSelectDistrict?: (district: DistrictData) => void;
  /** Optional custom district metrics / job counts mapping */
  districtStats?: Record<
    string,
    { jobCount?: number; companiesCount?: number }
  >;
  /** Show district search & reset controls bar */
  showControls?: boolean;
  /** Show side/bottom district info card */
  showInfoCard?: boolean;
  /** Custom wrapper class */
  className?: string;
}
