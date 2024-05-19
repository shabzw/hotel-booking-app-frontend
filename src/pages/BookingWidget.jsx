import React, { useContext, useEffect } from "react";
import { useState } from "react";
import { differenceInCalendarDays } from "date-fns";
import { Navigate, useNavigate } from "react-router-dom";
import { UserContext } from "../UserContext";
const BookingWidget = ({ place }) => {
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [numberOfGuests, setNumberOfGuests] = useState(1);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [redirect, setRedirect] = useState("");
  const { user } = useContext(UserContext);
  const navigate = useNavigate()
  let dateDifference = differenceInCalendarDays(
    new Date(checkOut),
    new Date(checkIn)
  );

  // Display name of the user by retrieving from DB and adding in the widget
  useEffect(() => {
    if (user) {
      setName(JSON.parse(user).name);
    }
  }, [user]);

  const bookThisPlace = async (ev) => {
    if(localStorage.getItem("token")){

    
    fetch(`${API_BASE_URL}/api/account/bookings`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },
      body: JSON.stringify({
        place: place._id,
        checkIn,
        checkOut,
        numberOfGuests,
        name,
        phone,
        price: place.price * dateDifference * numberOfGuests,
      }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json(); // Parse the JSON from the response
      })
      .then((data) => {
        alert("Booking Successfull");
        const bookingId = data._id;
        setRedirect(true);
        setRedirect(`/account/bookings/${bookingId}`);
      })
      .catch((error) => {
        console.error("There was a problem with the Post operation:", error);
      });
    }else{
      navigate("/login")
    }
  };

  if (redirect) {
    return <Navigate to={redirect} />;
  }

  return (
    <div>
      <div className="bg-white p-4 shadow rounded-2xl">
        <div className="text-xl text-center">
          Price: ${place.price} / per night
        </div>
        <div className="border rounded-2xl m-3">
          <div className="sm:flex">
            <div className=" py-3 px-4">
              <label>Check in:</label>
              <input
                type="date"
                value={checkIn}
                onChange={(ev) => setCheckIn(ev.target.value)}
              />
            </div>
            <div className=" py-3 px-4 sm:border-l border-t">
              <label>Check Out:</label>
              <input
                type="date"
                value={checkOut}
                onChange={(ev) => setCheckOut(ev.target.value)}
              />
            </div>
          </div>
          <div className="py-3 px-4 border-t">
            <label>No of Guests:</label>
            <input
              type="number"
              value={numberOfGuests}
              onChange={(ev) => setNumberOfGuests(ev.target.value)}
            />
          </div>
          {dateDifference > 0 && (
            <div className="py-3 px-4 border-t">
              <label>Fullname:</label>
              <input
                type="text"
                value={name}
                onChange={(ev) => setName(ev.target.value)}
              />
              <div className="m-2">
                <label className="">Phone:</label>
                <br />
                <input
                  className="border my-2"
                  type="tel"
                  value={phone}
                  onChange={(ev) => setPhone(ev.target.value)}
                />
              </div>
            </div>
          )}
        </div>

        <button
          onClick={bookThisPlace}
          disabled={numberOfGuests <= 0}
          className="primary"
        >
          Book this place{" "}
          {checkIn && checkOut && dateDifference > 0 && numberOfGuests > 0 && (
            <span>
              {"at just " +
                place.price * dateDifference * numberOfGuests +
                "$ for " +
                dateDifference +
                " day/s"}
            </span>
          )}
        </button>
      </div>
    </div>
  );
};

export default BookingWidget;
