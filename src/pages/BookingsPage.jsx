import React, { useState, useContext } from "react";
import AccountNav from "./AccountNav";
import { useEffect } from "react";
import { UserContext } from "../UserContext";
import PlaceImg from "./PlaceImg";
import { Link } from "react-router-dom";
import BookingDates from "./BookingDates";
import BookingPrice from "./BookingPrice";
import { Navigate } from "react-router-dom";
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const BookingsPage = () => {
  const { user } = useContext(UserContext);
  const [bookings, setBookings] = useState([]);
  if (!user) {
    return <Navigate to={"/login"} />;
  }
  useEffect(() => {
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
        setBookings(data); // Assuming `setBookings` is a state setter function
      })
      .catch((error) => {
        console.error("There was a problem with the fetch operation:", error);
      });
  }, []);

  return (
    <div>
      <AccountNav />
      <div className="mt-6">
        {bookings?.length > 0 &&
          bookings.map((booking) => (
            <Link
              to={`/account/bookings/${booking._id}`}
              className="flex items-center gap-4 bg-gray-200 my-4 rounded-xl overflow-hidden"
              key={booking._id}
            >
              <div className="w-56 p-2">
                <PlaceImg place={booking.place} />
              </div>
              <div className="py-3 grow pr-3">
                <h2 className="text-md sm:text-xl font-semibold border-b mb-2 border-gray-300">
                  {booking.place.title}
                </h2>
                <BookingDates booking={booking} />
                <BookingPrice booking={booking} />
              </div>
            </Link>
          ))}
      </div>
    </div>
  );
};

export default BookingsPage;
