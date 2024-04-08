import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const RegisterPage = () => {
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const registerUser = async (ev) => {
    ev.preventDefault();
    try {
      const response = await fetch(`${API_BASE_URL}/api/auth/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name: name, email: email, password: password }),
      });
      const json = await response.json();
      if (json.success) {
        localStorage.setItem("token", json.authtoken);
        localStorage.setItem("userData", json.user);
        navigate("/login");
        alert("Registration Successfull. You can now proceed with login");
      } else {
        alert("Registration failed. Please try again");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="grow flex items-center justify-center h-screen">
      <div className="mb-32">
        <h1 className="text-3xl text-center mb-4">Register</h1>
        <form className="mt-2 max-w-md mx-auto" onSubmit={registerUser}>
          <input
            type="text"
            placeholder={"Johnny D"}
            value={name}
            name="name"
            onChange={(ev) => setName(ev.target.value)}
          />
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
          <button className="primary">Register</button>
          <div className="text-center mt-2 text-gray-500">
            Already a member?
            <Link className="underline text font-bold" to={"/login"}>
              {" "}
              Login
            </Link>
          </div>
          {/* <button className='primary'>SignUp</button> */}
        </form>
      </div>
    </div>
  );
};

export default RegisterPage;
