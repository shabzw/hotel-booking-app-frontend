import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../UserContext";

const IndexPage = () => {
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
  // const { user } = useContext(UserContext);
  const navigate = useNavigate()
  const [places, setPlaces] = useState([]);
  useEffect(() => {
    if(localStorage.getItem("token")){
      fetch(`${API_BASE_URL}/api/account/places`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem("token")
        },
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          return response.json(); // Parse the JSON from the response
        })
        .then((data) => {
          setPlaces(data); // Assuming `setBookings` is a state setter function
        })
        .catch((error) => {
          console.error("There was a problem with the fetch operation:", error);
          // navigate("/login")
        });
    }else{
      navigate("/login")
    }
    
  }, []);
  return (
    // Home page that displays all accomodations
    <div className="mt-8 gap-6 gap-y-8 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {places.length > 0 &&
        places.map((place) => (
          <Link to={"/place/" + place._id} key={place._id}>
            <div className="rounded-2xl bg-gray-500 flex">
              {place.photos?.[0] && (
                <img
                  className="rounded-2xl object-cover aspect-square"
                  src={place.photos?.[0]}
                  alt=""
                />
              )}
            </div>
            <h3 className="font-bold mt-2">{place.address}</h3>
            <h2 className="text-sm">{place.title}</h2>
            <div className="mt-1">
              <span className="font-bold">${place.price}</span> per night
            </div>
          </Link>
        ))}
    </div>
  );
};

export default IndexPage;
