import React, { useState, useCallback } from "react";
import { GoogleMap, useJsApiLoader, Marker } from "@react-google-maps/api";
import * as Yup from "yup";
import { FaLocationDot } from "react-icons/fa6";
import Modal from "./components/Modal";
import LocationForm from "./components/LocationForm";
import ListOfPlaces from "./components/ListOfPlaces";

function App() {
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    libraries: ["maps", "places"],
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_API_KEY,
  });

  const [map, setMap] = useState(null);
  const [addPlace, setAddPlace] = useState(false);
  const [showPlaces, setShowPlaces] = useState(false);
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
  //Get location name
  const service = useCallback(
    function callback(req, location) {
      const service = new window.google.maps.places.PlacesService(map);
      service.getDetails(req, (place, _) => {
        setInitialState({ name: place.name, ...location });
        setAddPlace(true);
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
        onClick={() => setShowPlaces(true)}
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
            setAddPlace(true);
          }
        }}
        center={center}
        zoom={20}
        onLoad={onLoad}
        onUnmount={onUnmount}
      >
        <Marker position={center} />
      </GoogleMap>
      <Modal
        visible={addPlace}
        initialState={initialState}
        classNames="h-[50vh] md:h-[55vh]"
        yupValidator={yupValidator}
        onClose={(state, successful) => {
          setAddPlace(false);
          if (successful) {
            const placesExist = localStorage.getItem("places");
            if (placesExist) {
              const parsePlaces = JSON.parse(placesExist);
              if (!parsePlaces.find((place) => place.name === state.name)) {
                parsePlaces.push(state);
                const stringifyPlaces = JSON.stringify(parsePlaces);
                localStorage.setItem("places", stringifyPlaces);
              }
            } else {
              const places = [state];
              const stringifyPlaces = JSON.stringify(places);
              localStorage.setItem("places", stringifyPlaces);
            }
          }
        }}
      >
        <LocationForm />
      </Modal>
      <Modal
        visible={showPlaces}
        initialState={{}}
        onClose={() => setShowPlaces(false)}
      >
        <ListOfPlaces setCenter={(center) => setCenter(center)} />
      </Modal>
    </>
  ) : (
    <></>
  );
}

export default React.memo(App);
