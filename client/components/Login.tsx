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
            navigate("/userpage");
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
      <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <div className="px-6 sm:px-0 max-w-sm">
            <button className="text-white w-full  bg-[#4285F4] hover:bg-[#4285F4]/90 focus:ring-4 focus:outline-none focus:ring-[#4285F4]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center justify-between dark:focus:ring-[#4285F4]/55 mr-2 mb-2">
              <svg
                className="mr-2 -ml-1 w-4 h-4"
                aria-hidden="true"
                focusable="false"
                data-prefix="fab"
                data-icon="google"
                role="img"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 488 512"
              >
                <path
                  fill="currentColor"
                  d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z"
                ></path>
              </svg>
              <a className="no-underline hover:underline" href={GoogleOAuth()}>
                Login With Google Account
              </a>
            </button>
          </div>
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Already have a Circles account? Login!
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-6" onSubmit={loginHandler} id="login__form">
            <label
              htmlFor="email__input"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Email:
            </label>
            <input
              name="email"
              type="text"
              id="email__input"
              className="block p-4 w-full text-gray-900 border border-gray-300 rounded-lg sm:text-md focus:ring-blue-500 focus:border-blue-500"
              placeholder="email@email.com"
              autoComplete="on"
            />
            <label
              htmlFor="password__input"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Password:
            </label>
            <input
              placeholder="********"
              name="password"
              type="password"
              id="password__input"
              className="block p-4 w-full text-gray-900 border-2 rounded-lg sm:text-md"
              autoComplete="on"
            />
            <button
              type="submit"
              className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Sign In
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
