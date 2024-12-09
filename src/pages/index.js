import { useLoadSript } from "@react-google-map/api";

// Set the backend server URL globally
if (window.location.hostname !== "localhost") {
    global.ipServer = `${window.location.protocol}//${window.location.hostname}/be/`;
  } else {
    global.ipServer = `http://${window.location.hostname}:8080/`;
  }

export default function Home (){
    const {isLoaded} = useLoadSript({
        googleMapsApiKey: import.meta.env.VITE_PUBLIC_GOOGLE_MAPS_API_KEY,
    });

    return <div>Map</div>;
}