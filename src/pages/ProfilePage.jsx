import React, { useContext, useState } from "react";
import { UserContext } from "../UserContext";
import PlacesPage from "./PlacesPage";
import { Navigate, useParams } from "react-router-dom";
import AccountNav from "./AccountNav";
const ProfilePage = () => {
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

  const [redirect, setRedirect] = useState(false);
  const { user, ready, setUser } = useContext(UserContext);

  let { subpage } = useParams();
  if (subpage === undefined) {
    subpage = "profile";
  }

  if (ready && !user && !redirect) {
    return <Navigate to={"/login"} />;
  }
  async function logOut() {
    await fetch(`${API_BASE_URL}/api/auth/logout`, {
      method: "POST",
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
        alert("You are now logged out from this website");
        setUser(null);
        localStorage.removeItem("token");
        localStorage.removeItem("userData");
        setRedirect("/login");
      })
      .catch((error) => {
        console.error("There was a problem with the Logout operation:", error);
      });
  }

  if (redirect) {
    return <Navigate to={redirect} />;
  }

  return (
    <div>
      <AccountNav />
      {subpage === "profile" && (
        <div className="text-center max-w-lg mx-auto">
          Logged in as {user?.name} ({user?.email})<br />
          <button onClick={logOut} className="primary max-w-sm mt-2">
            Logout
          </button>
        </div>
      )}
      {subpage == "places" && <PlacesPage />}
    </div>
  );
};

export default ProfilePage;
