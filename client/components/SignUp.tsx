import React from "react";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
  const navigate = useNavigate();

  const signUpHandler = (event: any) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    fetch("/signup", {
      method: "POST",
      body: formData,
    })
      .then((response) => {
        response.json().then((user) => {
          console.log(user);
          navigate("/userpage")
        });
      })
      .catch((error) => {
        console.log(error.detail);
      });
  };
  return (
    <div>
      <h2>Create Account</h2>
      <form onSubmit={signUpHandler} id="signup__form">
        <label
          htmlFor="signup__name__input"
          className="block text-sm font-light"
        >
          Name:
        </label>
        <input
          name="name"
          type="text"
          id="signup__name__input"
          className="block p-4 text-gray-900 border border-gray-300 rounded-lg sm:text-md focus:ring-blue-500 focus:border-blue-500"
          placeholder="Your Name"
          autoComplete="on"
        />
        <label
          htmlFor="signup__email__input"
          className="block text-sm font-light"
        >
          Email:
        </label>
        <input
          name="email"
          type="text"
          id="signup__email__input"
          className="block p-4 text-gray-900 border border-gray-300 rounded-lg sm:text-md focus:ring-blue-500 focus:border-blue-500"
          placeholder="email@email.com"
          autoComplete="on"
        />
        <label
          htmlFor="signup__password__input"
          className="block text-sm font-light"
        >
          Password:
        </label>
        <input
          placeholder="********"
          name="password"
          type="password"
          id="signup__password__input"
          className="block p-4 text-gray-900 border-2 rounded-lg sm:text-md"
          autoComplete="on"
        />
        <label
          htmlFor="signup__confirm__password__input"
          className="block text-sm font-light"
        >
          Confirm Password:
        </label>
        <input
          placeholder="********"
          name="confirm_password"
          type="password"
          id="signup__confirm__password__input"
          className="block p-4 text-gray-900 border-2 rounded-lg sm:text-md"
          autoComplete="on"
        />
        <button
          type="submit"
          className="px-3 py-2 text-xs font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800"
        >
          SignUp
        </button>
      </form>
    </div>
  );
};

export default SignUp;
