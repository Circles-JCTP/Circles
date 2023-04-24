import React from "react";

const Login = () => {
  const loginHandler = (event: any) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    fetch("/login", {
      method: "POST",
      body: formData,
    });
  };
  return (
    <div>
      <form onSubmit={loginHandler} id="login__form">
        <label htmlFor="email__input" className="block text-sm font-light">
          email
        </label>
        <input
          name="email"
          type="text"
          id="email__input"
          className="block p-4 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        />
        <label htmlFor="password__input" className="block text-sm font-light">
          password
        </label>
        <input
          name="password"
          type="password"
          id="password__input"
          className="block p-4 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        />
        <button
          type="submit"
          className="px-3 py-2 text-xs font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
