import React, { useState, useCallback } from "react";
import { GoogleMap, useJsApiLoader } from "@react-google-maps/api";
import * as Yup from "yup";
import { FaLocationDot } from "react-icons/fa6";

function App() {
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    libraries: ["maps", "places"],
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_API_KEY,
  });

  const [map, setMap] = useState(null);
  const [center, setCenter] = useState({
    lat: -3.745,
    lng: -38.523,
  });

  const onLoad = useCallback(
    function callback(map) {
      const bounds = new window.google.maps.LatLngBounds(center);
      map.fitBounds(bounds);
      setMap(map);
    },
    [center]
  );

  const service = useCallback(
    function callback(req) {
      const service = new window.google.maps.places.PlacesService(map);
      service.getDetails(req, (place, _) => console.log(place));
    },
    [map]
  );

  const onUnmount = React.useCallback(function callback(map) {
    setMap(null);
  }, []);

  return isLoaded ? (
    <>
      <div
        className="absolute z-[99] shadow-md shadow-black right-[1.5vh] top-[9vh] bg-white"
        onClick={() => console.log("Someone clicked")}
      >
        <FaLocationDot className="w-[3.5vh] h-[3.5vh] m-2" />
      </div>
      <GoogleMap
        mapContainerClassName="h-screen w-screen"
        onClick={(e) => {
          setCenter(e.latLng.toJSON());
          if (e?.placeId) {
            const req = {
              placeId: e.placeId,
              fields: ["name"],
            };
            service(req);
          }
        }}
        center={center}
        zoom={10}
        onLoad={onLoad}
        onUnmount={onUnmount}
      >
        {/* Child components, such as markers, info windows, etc. */}
        <></>
      </GoogleMap>
    </>
  ) : (
    <></>
  );
}

export default React.memo(App);
