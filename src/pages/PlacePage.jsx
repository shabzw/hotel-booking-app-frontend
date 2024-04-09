import React, { useContext } from "react";
import { Navigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import BookingWidget from "./BookingWidget";
import PlacesGallery from "./PlacesGallery";
import AddressLink from "./AddressLink";
import { UserContext } from "../UserContext";

export default function PlacePage() {
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

  const { id } = useParams();
  const { user } = useContext(UserContext);
  const [place, setPlace] = useState(null);
  if (!user) {
    return <Navigate to={"/login"} />;
  }
  useEffect(() => {
    if (!id) {
      return;
    }

    fetch(`${API_BASE_URL}/api/account/places/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json(); // Parse the JSON from the response
      })
      .then((data) => {
        setPlace(data);
      })
      .catch((error) => {
        console.error("There was a problem with the fetch operation:", error);
      });
  }, [id]);

  if (!place) return "";

  return (
    <div className="mt-5 bg-gray-100 -mx-8 px-6 py-6">
      <h1 className="text-2xl">{place.title}</h1>

      <AddressLink>{place.address}</AddressLink>

      <PlacesGallery place={place} />

      <div className="mt-8 grid grid-cols-1 md:grid-cols-[2fr_1fr] m-4 gap-9">
        <div>
          <div className="my-4">
            <h2 className="font-semibold text-2xl mb-2">Description</h2>
            {place.description}
          </div>
          Check-in: {place.checkIn}
          <br />
          Check-out: {place.checkOut}
          <br />
          Max number of guests: {place.maxGuests}
          <div className="text-sm text-gray-500 mt-4 border-t">
            <h2 className="font-semibold text-black my-2 text-2xl">
              Extra Info:
            </h2>
            {place.extraInfo}
          </div>
        </div>
        <BookingWidget place={place} />
      </div>
    </div>
  );
}
