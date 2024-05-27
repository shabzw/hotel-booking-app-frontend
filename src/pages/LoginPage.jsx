import React, { useContext, useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { UserContext } from "../UserContext";
import loadingGIF from "../assets/loading.gif";

const LoginPage = () => {
  const navigate = useNavigate();
  const { setUser } = useContext(UserContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [redirect, setRedirect] = useState(false);
  const [loading, setLoading] = useState(false);

  const LoginUser = async (ev) => {
    const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
    setLoading(true);
    ev.preventDefault();
    try {
      const response = await fetch(`${API_BASE_URL}/api/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: email, password: password }),
      });
      const json = await response.json();
      if (json.success) {
        localStorage.setItem("token", json.authtoken);
        localStorage.setItem("userData", json.user);
        alert("Login Successfull");
        setLoading(false);
        setRedirect(true);
        setUser(json.user);
      } else {
        setLoading(false);

        navigate("/login");
        alert("Invalid Credentials");
      }
    } catch (error) {
      console.log(error);
    }
  };

  if (redirect) {
    return <Navigate to={"/"} />;
  }

  return (
    <>
    {/* Display loading GIF until a valid response is received */}
      {loading ? (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
          }}
        >
          <img
            className=""
            style={{ width: "30%" }}
            src={loadingGIF}
            alt="Loading..."
          />
          <div>Please Wait</div>
        </div>
      ) : (
        <div className="grow flex items-center justify-center h-screen">
          <div className="mb-32">
            <h1 className="sm:text-3xl text-xl text-center mb-4">
              Please <span className="text-red-600 font-semibold">login</span>{" "}
              to access the best booking services from{" "}
              <span className="text-red-600 font-semibold">airbnc</span>
            </h1>
            <form onSubmit={LoginUser} className="mt-2 max-w-md mx-auto">
              <input
                type="email"
                placeholder={"your@email.com"}
                value={email}
                name="email"
                onChange={(ev) => setEmail(ev.target.value)}
              />
              <input
                type="password"
                placeholder={"password"}
                value={password}
                name="password"
                onChange={(ev) => setPassword(ev.target.value)}
              />
              <button className="primary">Login</button>
              <div className="text-center mt-2 text-gray-500">
                Don't have an account yet?
                <Link className="underline text font-bold" to={"/register"}>
                  {" "}
                  Register now
                </Link>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default LoginPage;
