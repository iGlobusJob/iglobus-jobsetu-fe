// utils/getCityFromLocation.ts

/**
 * Attempts to get the user's city name from their current location.
 * Returns a Promise that resolves to a string (city name) or null if unavailable.
 */
export async function getCityFromLocation(): Promise<string | null> {
  // Check if geolocation is available
  if (!('geolocation' in navigator)) {
    console.warn('Geolocation not supported in this browser.');
    return null;
  }

  // Helper: reverse geocode latitude/longitude → city
  const reverseGeocode = async (
    lat: number,
    lon: number
  ): Promise<string | null> => {
    try {
      const url = `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${lat}&lon=${lon}&addressdetails=1`;
      const response = await fetch(url);
      if (!response.ok) throw new Error(`HTTP error: ${response.status}`);
      const data: {
        address?: Record<string, string>;
      } = await response.json();

      const addr = data.address ?? {};
      const city =
        addr.city ||
        addr.town ||
        addr.village ||
        addr.hamlet ||
        addr.county ||
        addr.state ||
        null;

      return city;
    } catch (error) {
      console.error('Reverse geocoding failed:', error);
      return null;
    }
  };

  // Request the user's current position
  return new Promise((resolve) => {
    navigator.geolocation.getCurrentPosition(
      async (pos: GeolocationPosition) => {
        const { latitude, longitude } = pos.coords;
        const city = await reverseGeocode(latitude, longitude);
        resolve(city);
      },
      (err: GeolocationPositionError) => {
        if (err.code === err.PERMISSION_DENIED) {
          console.warn('Location permission denied.');
        } else {
          console.error('Geolocation error:', err.message);
        }
        resolve(null); // Always resolve with null on failure
      },
      { enableHighAccuracy: false, timeout: 10000, maximumAge: 60000 }
    );
  });
}
