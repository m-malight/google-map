import React, { useEffect, useState } from "react";
import { MdDelete } from "react-icons/md";

export default function ListOfPlaces({ setCenter, close }) {
  const [places, setPlaces] = useState([]);
  const getPlaces = localStorage.getItem("places");

  useEffect(() => {
    if (getPlaces) {
      const parsePlaces = JSON.parse(getPlaces);
      setPlaces(parsePlaces);
    }
  }, [setCenter, getPlaces]);

  function deletePlace(name) {
    const newPlace = places.filter((place) => place.name !== name);
    setPlaces(newPlace);
    const stringifyPlace = JSON.stringify(newPlace);
    localStorage.setItem("places", stringifyPlace);
  }
  return (
    <div className="flex justify-center w-full h-[95%] overflow-y-scroll">
      <div className="flex flex-col w-[80%] items-center">
        <h2 className="font-bold text-3xl">PLACES</h2>
        {places.map((place, key) => (
          <div
            className="flex p-4 items-center justify-between w-full border-2 border-gray-400 my-2 rounded-lg"
            key={key}
          >
            <p
              onClick={() => {
                setCenter({ lat: place.lat, lng: place.lng });
                close();
              }}
              className="cursor-default w-full font-semibold text-xl"
            >
              {place.name}
            </p>
            <MdDelete
              className="w-[4vh] h-[4vh]"
              onClick={() => {
                deletePlace(place.name);
              }}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
