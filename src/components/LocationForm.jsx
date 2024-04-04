import React from "react";

export default function LocationForm({ submitting, state }) {
  return (
    <div className="flex flex-col h-full w-full justify-center items-center">
      <div className="flex flex-col my-5 w-[inherit] items-center">
        <div
          name="name"
          className="w-[80%] flex items-center px-1 rounded-lg border-2 border-gray-300"
        >
          <p className="font-semibold text-xm">Location:</p>
          <input
            type="text"
            defaultValue={state.name}
            name="name"
            className="w-full p-2 outline-none"
          />
        </div>
        <p id="name@error" className="hidden form-error text-red-600"></p>
      </div>
      <div className="flex flex-col my-5 w-[inherit] items-center">
        <div
          name="lat"
          className="w-[80%] flex items-center px-1 rounded-lg border-2 border-gray-300"
        >
          <p className="font-semibold text-xm">Lattitude:</p>
          <input
            type="text"
            defaultValue={state.lat}
            name="lat"
            className="w-full p-2 outline-none"
          />
        </div>
        <p id="lat@error" className="hidden form-error text-red-600"></p>
      </div>
      <div className="flex flex-col my-5 w-[inherit] items-center">
        <div
          name="lng"
          className="w-[80%] flex items-center px-1 rounded-lg border-2 border-gray-300"
        >
          <p className="font-semibold text-xm">Longitude:</p>
          <input
            type="text"
            defaultValue={state.lng}
            name="lng"
            className="w-full p-2 outline-none"
          />
        </div>
        <p id="lng@error" className="hidden form-error text-red-600"></p>
      </div>
      <button
        type="submit"
        className={`${
          !submitting ? "bg-blue-700" : "bg-blue-300"
        } w-[30%] p-2 text-white font-semibold rounded-lg`}
        disabled={submitting}
      >
        {submitting ? "Saving..." : "Save"}
      </button>
    </div>
  );
}
