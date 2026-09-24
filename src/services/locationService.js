/**
 * Get officer's current GPS location with automatic fallback to mock data.
 * Does NOT require location permission for the whole application to function.
 */
export async function getCurrentLocation() {
  return new Promise((resolve) => {
    if (!navigator.geolocation) {
      resolve(getMockLocation("Geolocation not supported by device"));
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const lat = position.coords.latitude.toFixed(4);
        const lng = position.coords.longitude.toFixed(4);
        resolve({
          locationName: `Lat ${lat}°, Lng ${lng}° (GPS Verified)`,
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          accuracy: Math.round(position.coords.accuracy) + 'm',
          isMock: false
        });
      },
      (error) => {
        console.warn("Geolocation permission or lock unavailable, using fallback location", error);
        resolve(getMockLocation("GPS lock unverified - Mock Location Used"));
      },
      { timeout: 5000, maximumAge: 60000, enableHighAccuracy: true }
    );
  });
}

function getMockLocation(reason = "Mock Location") {
  return {
    locationName: "Bhopal, Madhya Pradesh (23.2599° N, 77.4126° E)",
    latitude: 23.2599,
    longitude: 77.4126,
    accuracy: "Mock GPS (Prototype Mode)",
    isMock: true,
    reason: reason
  };
}
