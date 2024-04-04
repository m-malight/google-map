import React from "react";

export default function LocationForm() {
  return (
    <div className="flex flex-col h-full justify-center items-center">
      <input type="text" name="name" className="border-2 border-red-300 my-8" />
      <p id="name@error" className="hidden form-error text-red-600"></p>
      <input type="text" name="lat" className="border-2 border-red-300 my-8" />
      <p id="lat@error" className="hidden form-error text-red-600"></p>
      <input type="text" name="lng" className="border-2 border-red-300 my-8" />
      <p id="lng@error" className="hidden form-error text-red-600"></p>
      <button type="submit">Save</button>
    </div>
  );
}
