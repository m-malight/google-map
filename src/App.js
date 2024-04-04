import React, { useState, useCallback } from "react";
import { GoogleMap, useJsApiLoader } from "@react-google-maps/api";
import * as Yup from "yup";
import { FaLocationDot } from "react-icons/fa6";

const center = {
  lat: -3.745,
  lng: -38.523,
};

function App() {
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    libraries: ["maps", "places"],
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_API_KEY,
  });

  const [map, setMap] = React.useState(null);

  const onLoad = useCallback(function callback(map) {
    const bounds = new window.google.maps.LatLngBounds(center);
    map.fitBounds(bounds);
    setMap(map);
  }, []);

  const onUnmount = React.useCallback(function callback(map) {
    setMap(null);
  }, []);

  return isLoaded ? (
    <>
      <div className="absolute z-[99] shadow-md shadow-black right-[1.5vh] top-[9vh] bg-white">
        <FaLocationDot className="w-[3.5vh] h-[3.5vh] m-2" />
      </div>
      <GoogleMap
        mapContainerClassName="h-screen w-screen"
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
