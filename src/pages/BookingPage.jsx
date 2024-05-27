import React, { useEffect, useState, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import PlacesGallery from "./PlacesGallery";
import AddressLink from "./AddressLink";
import BookingDates from "./BookingDates";
import BookingPrice from "./BookingPrice";

const BookingPage = () => {

  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
  const navigate = useNavigate()
  const { id } = useParams();
  const [booking, setBooking] = useState(null);

  useEffect(() => {
    if (localStorage.getItem("token")) {
      // API call for fetching booking details
      fetch(`${API_BASE_URL}/api/account/bookings`, {
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
          const foundBooking = data.find(({ _id }) => _id === id);
          if (foundBooking) {
            setBooking(foundBooking);
          }
        })
        .catch((error) => {
          console.error("There was a problem with the fetch operation:", error);
        });
    }else{
      navigate("/login")
    }
  }, [id]);

  if (!booking) {
    return "";
  }

  return (
    <div className="my-8">
      <div className="text-3xl bg-white rounded-xl mt-5 mb-3">
        <h1 className="">{booking.place.title}</h1>
        <AddressLink className="my-2 flex text-sm items-center">
          {booking.place.address}
        </AddressLink>
      </div>

      <div className="bg-gray-200 my-2 p-6 rounded-xl">
        <div className="sm:flex justify-between items-center">
          <div>
            <h2 className="text-xl mb-2 rounded-md">
              Your Booking Information :
            </h2>
            <BookingDates booking={booking} />
          </div>
          <div className="bg-primary text-white rounded-md p-2 mt-2">
            <BookingPrice booking={booking} />
          </div>
        </div>
      </div>
      <PlacesGallery place={booking.place} />
    </div>
  );
};

export default BookingPage;
