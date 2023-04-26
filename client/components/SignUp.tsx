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
        response.json().then(() => {
          navigate("/userpage");
        });
      })
      .catch((error) => {
        console.log(error.detail);
      });
  };
  return (
    <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
          Create Account
        </h2>
      </div>
      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form className="space-y-6" onSubmit={signUpHandler} id="signup__form">
          <label
            htmlFor="signup__name__input"
            className="block text-sm font-medium leading-6 text-gray-900"
          >
            Name:
          </label>
          <input
            name="name"
            type="text"
            id="signup__name__input"
            className="block p-4 w-full text-gray-900 border border-gray-300 rounded-lg sm:text-md focus:ring-blue-500 focus:border-blue-500"
            placeholder="Your Name"
            autoComplete="on"
          />
          <label
            htmlFor="signup__email__input"
            className="block text-sm font-medium leading-6 text-gray-900"
          >
            Email:
          </label>
          <input
            name="email"
            type="text"
            id="signup__email__input"
            className="block p-4 w-full text-gray-900 border border-gray-300 rounded-lg sm:text-md focus:ring-blue-500 focus:border-blue-500"
            placeholder="email@email.com"
            autoComplete="on"
          />
          <label
            htmlFor="signup__password__input"
            className="block text-sm font-medium leading-6 text-gray-900"
          >
            Password:
          </label>
          <input
            placeholder="********"
            name="password"
            type="password"
            id="signup__password__input"
            className="block p-4 w-full text-gray-900 border-2 rounded-lg sm:text-md"
            autoComplete="on"
          />
          <label
            htmlFor="signup__confirm__password__input"
            className="block text-sm font-medium leading-6 text-gray-900"
          >
            Confirm Password:
          </label>
          <input
            placeholder="********"
            name="confirm_password"
            type="password"
            id="signup__confirm__password__input"
            className="block p-4 w-full text-gray-900 border-2 rounded-lg sm:text-md"
            autoComplete="on"
          />
          <button
            type="submit"
            className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
