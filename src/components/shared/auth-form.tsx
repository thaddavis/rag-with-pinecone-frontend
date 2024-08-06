"use client";

import { useContext, useState } from "react";
import AuthContext from "@/context/auth-context";
import axios from "axios";

export const AuthForm = () => {
  const { login } = useContext(AuthContext);
  const [isLogin, setIsLogin] = useState(true);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [registerUsername, setRegisterUsername] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");

  const handleLogin = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    login(username, password);
  };

  const handleRegister = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/auth`,
        {
          username: registerUsername,
          password: registerPassword,
        }
      );
      login(registerUsername, registerPassword);
    } catch (error) {
      console.error("Failed to register user:", error);
    }
  };

  const toggleForm = () => {
    setIsLogin(!isLogin);
  };

  return (
    <>
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="w-full max-w-md p-8 space-y-6 bg-white rounded shadow-md">
          <div className="mb-6 text-center">
            <h1 className="text-3xl font-bold text-gray-900">
              Fullstack R.A.G.
            </h1>
          </div>
          <h2 className="text-2xl font-bold text-center">
            {isLogin ? "Login" : "Register"}
          </h2>
          <form
            className="space-y-6"
            onSubmit={isLogin ? handleLogin : handleRegister}
          >
            <div>
              <label
                htmlFor="username"
                className="block text-sm font-medium text-gray-700"
              >
                Username
              </label>
              <input
                type="email"
                id="username"
                name="username"
                value={isLogin ? username : registerUsername}
                onChange={
                  isLogin
                    ? (e) => setUsername(e.target.value)
                    : (e) => setRegisterUsername(e.target.value)
                }
                required
                className="w-full px-3 py-2 mt-1 border border-slate-500 rounded shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
            </div>
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                value={isLogin ? password : registerPassword}
                onChange={
                  isLogin
                    ? (e) => setPassword(e.target.value)
                    : (e) => setRegisterPassword(e.target.value)
                }
                required
                className="w-full px-3 py-2 mt-1 border border-slate-500 rounded shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
            </div>
            <button
              type="submit"
              className="w-full px-4 py-2 text-white bg-blue-600 rounded shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              {isLogin ? "Login" : "Register"}
            </button>
          </form>
          <p className="text-sm text-center text-gray-600">
            {isLogin ? "Don't have an account?" : "Already have an account?"}
            <button
              onClick={toggleForm}
              className="ml-1 font-medium text-blue-600 hover:text-blue-500 focus:outline-none"
            >
              {isLogin ? "Register" : "Login"}
            </button>
          </p>
        </div>
      </div>
    </>
  );
};
