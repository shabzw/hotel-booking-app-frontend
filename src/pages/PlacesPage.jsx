import React, { useEffect, useState, useContext } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import AccountNav from "./AccountNav";

// import { UserContext } from "../UserContext";
import PlaceImg from "./PlaceImg";

const PlacesPage = () => {
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
  const navigate = useNavigate()
  // const { user } = useContext(UserContext);

  const [places, setPlaces] = useState([]);
  // if (!user) {
  //   return <Navigate to={"/login"} />;
  // }

  useEffect(() => {
    if(localStorage.getItem("token")){
    fetch(`${API_BASE_URL}/api/account/user-places`, {
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
        setPlaces(data);
      })
      .catch((error) => {
        console.error("There was a problem with the fetch operation:", error);
      });
    }else{
      navigate("/login")
    }
  }, []);

  return (
    <div>
      <AccountNav />
      <div className="text-center">
        <Link
          className="bg-primary gap-1 text-white py-2 px-6 rounded-full inline-flex"
          to={"/account/places/new"}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 4.5v15m7.5-7.5h-15"
            />
          </svg>
          Add new place
        </Link>
      </div>
      <div className="mt-4">
        {places.length > 0 &&
          places.map((place) => (
            // _id value is taken from place value of api and then the placesformpage component will retrieve id from params
            <Link
              to={"/account/places/" + place._id}
              className="sm:text-left sm:flex cursor-pointer sm:bg-gray-200 m-3 p-4 rounded-2xl gap-2"
              key={place._id}
            >
              <div className="w-40 bg-gray-300 shrink-0">
                <PlaceImg place={place} />
              </div>
              <div className="grow-0 shrink overflow-hidden">
                <h2 className="text-xl bg-gray-300 my-2 rounded-lg">
                  {place.title}
                </h2>
                <p className="text-sm mt-2 border-b">{place.description}</p>
              </div>
            </Link>
          ))}
      </div>
    </div>
  );
};

export default PlacesPage;
