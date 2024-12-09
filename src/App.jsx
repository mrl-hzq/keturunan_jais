import React, { useRef, useState } from 'react';
import { GoogleMap, useLoadScript } from '@react-google-maps/api';

function App() {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: import.meta.env.VITE_PUBLIC_GOOGLE_MAPS_API_KEY,
    libraries: ['places'], 
  });

  const [map, setMap] = useState(null); // Reference to the map instance
  const [center, setCenter] = useState({ lat: 3.139, lng: 101.686 }); // Default center (Kuala Lumpur)
  const [zoom, setZoom] = useState(10); // Default zoom level
  const searchInputRef = useRef(null); // Reference for the search input

  const handleLoad = (mapInstance) => {
    setMap(mapInstance); // Save the map instance for later use
  };

  const handleSearch = () => {
    if (!map || !searchInputRef.current) return;

    const input = searchInputRef.current;
    const autocomplete = new window.google.maps.places.Autocomplete(input);
    autocomplete.bindTo('bounds', map);

    autocomplete.addListener('place_changed', () => {
      const place = autocomplete.getPlace();

      if (!place.geometry || !place.geometry.location) {
        console.error('No details available for the selected place.');
        return;
      }

      // Center the map and set zoom
      const location = place.geometry.location;
      setCenter({ lat: location.lat(), lng: location.lng() });
      setZoom(15); // Adjust zoom level for closer view
      map.panTo(location);
      map.setZoom(15); // Explicitly set zoom on the map instance
    });
  };

  if (!isLoaded) return <div>Loading...</div>;

  return (
    <div style={{ position: 'relative', width: '100%', height: '100%' }}>
      {/* Search Bar */}
      <div
        style={{
          position: 'fixed', // Change to fixed to keep it in the viewport
          top: 10,
          left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 10,
        }}
      >
        <input
          ref={searchInputRef}
          type="text"
          placeholder="Search places..."
          style={{
            width: '300px',
            padding: '10px',
            borderRadius: '4px',
            border: '1px solid #ccc',
          }}
          onFocus={handleSearch} // Initialize autocomplete when the input is focused
        />
      </div>

      {/* Map */}
      <GoogleMap
        mapContainerStyle={{ width: '100%', height: '100%' }}
        center={center}
        zoom={zoom} // Use the dynamic zoom state
        onLoad={handleLoad}
      />
    </div>
  );
}

export default App;
