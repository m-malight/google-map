import React, { useState, useCallback } from "react";
import { GoogleMap, useJsApiLoader } from "@react-google-maps/api";
import * as Yup from "yup";
import { FaLocationDot } from "react-icons/fa6";
import Modal from "./components/Modal";
import LocationForm from "./components/LocationForm";

function App() {
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    libraries: ["maps", "places"],
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_API_KEY,
  });

  const [map, setMap] = useState(null);
  const [add, setAdd] = useState(false);
  const [center, setCenter] = useState({
    lat: -3.745,
    lng: -38.523,
  });
  const [initialState, setInitialState] = useState({
    name: "",
    lat: "",
    lng: "",
  });
  const yupValidator = Yup.object({
    name: Yup.string().required("This field is required"),
    lat: Yup.string()
      .required("This field is required")
      .matches(/^[0-9-]+\.[0-9]+$/g, "This field must be a number"),
    lng: Yup.string()
      .required("This field is required")
      .matches(/^[0-9-]+\.[0-9]+$/g, "This field must be a number"),
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
    function callback(req, location) {
      const service = new window.google.maps.places.PlacesService(map);
      service.getDetails(req, (place, _) => {
        setInitialState({ name: place.name, ...location });
        setAdd(true);
      });
    },
    [map]
  );

  const onUnmount = useCallback(function callback() {
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
            service(req, e.latLng.toJSON());
          } else {
            setInitialState({ name: "", ...e.latLng.toJSON() });
            setAdd(true);
          }
        }}
        center={center}
        zoom={10}
        onLoad={onLoad}
        onUnmount={onUnmount}
      />
      <Modal
        visible={add}
        initialState={initialState}
        classNames="h-[50vh] md:h-[55vh]"
        yupValidator={yupValidator}
        onClose={(state) => {
          setAdd(false);
          console.log(state);
        }}
      >
        <LocationForm />
      </Modal>
    </>
  ) : (
    <></>
  );
}

export default React.memo(App);
