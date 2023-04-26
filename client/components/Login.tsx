import React from "react";
import GoogleOAuth from "../utils/GoogleOAuth";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();

  const loginHandler = (event: any) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    fetch("/login", {
      method: "POST",
      body: formData,
    })
      .then((response) => {
        response
          .json()
          .then((user) => {
            const { name, email, password } = user.userInDB.rows[0];
            navigate("/userpage")
          })
          .catch((error) => {
            console.log(error);
          });
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <div>
      <h2>Already a user? Login!</h2>
      <form onSubmit={loginHandler} id="login__form">
        <label htmlFor="email__input" className="block text-sm font-light">
          Email:
        </label>
        <input
          name="email"
          type="text"
          id="email__input"
          className="block p-4 text-gray-900 border border-gray-300 rounded-lg sm:text-md focus:ring-blue-500 focus:border-blue-500"
          placeholder="email@email.com"
          autoComplete="on"
        />
        <label htmlFor="password__input" className="block text-sm font-light">
          Password:
        </label>
        <input
          placeholder="********"
          name="password"
          type="password"
          id="password__input"
          className="block p-4 text-gray-900 border-2 rounded-lg sm:text-md"
          autoComplete="on"
        />
        <button
          type="submit"
          className="px-3 py-2 text-xs font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800"
        >
          Login
        </button>
      </form>
      <a href={GoogleOAuth()}>Login With Google</a>
    </div>
  );
};

export default Login;
