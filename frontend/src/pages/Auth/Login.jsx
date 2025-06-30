import React, { useContext, useState } from "react";
import Input from "../../components/Inputs/Input";
import { useNavigate } from "react-router-dom";
import { validateEmail } from "../../utils/helper";
import axiosInstance from "../../utils/axiosinstance";
import { API_PATHS } from "../../utils/apiPaths";
import { UserContext } from "../../context/userContext";
import SpinnerLoader from "../../components/Loader/SpinnerLoader";

const Login = ({ onClose, setCurrentPage }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const { updateUser } = useContext(UserContext);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!validateEmail(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    if (!password) {
      setError("Please enter the password");
      return;
    }

    setError("");
    setIsLoading(true);

    try {
      const response = await axiosInstance.post(API_PATHS.AUTH.LOGIN, {
        email,
        password,
      });

      const { token } = response.data;

      if (token) {
        localStorage.setItem("token", token);
        updateUser(response.data);
        navigate("/dashboard");
      }
    } catch (error) {
      if (error.response && error.response.data.message) {
        setError(error.response.data.message);
      } else {
        setError("Something went wrong. Please try again.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-[90vw] md:w-[33vw] p-7 flex flex-col justify-center bg-white rounded-lg shadow-md">
      <h3 className="text-xl font-semibold text-gray-800">Welcome Back</h3>
      <p className="text-sm text-gray-600 mt-[5px] mb-6">
        Please enter your details to log in
      </p>

      <form onSubmit={handleLogin} className="space-y-4">
        <Input
          value={email}
          onChange={({ target }) => setEmail(target.value)}
          label="Email Address"
          placeholder="john@example.com"
          type="email"
        />
        
        <Input
          value={password}
          onChange={({ target }) => setPassword(target.value)}
          label="Password"
          placeholder="Min 8 Characters"
          type="password"
        />

        <div className="flex items-center justify-between pt-1">
          <div className="flex items-center">
            <input
              id="remember-me"
              name="remember-me"
              type="checkbox"
              className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
            />
            <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700">
              Remember me
            </label>
          </div>
        </div>

        {error && <p className="text-red-500 text-sm pb-2.5">{error}</p>}

        <button
          type="submit"
          className="btn-primary w-full mt-2 uppercase"
          disabled={isLoading}
        >
          {isLoading ? (
            <>
              <SpinnerLoader />
              <span className="ml-2">LOGGING IN...</span>
            </>
          ) : (
            "LOG IN"
          )}
        </button>

        <p className="text-sm text-gray-600 mt-3 text-center">
          Don't have an account?{" "}
          <button
            type="button"
            className="font-medium text-primary hover:text-primary-dark underline cursor-pointer"
            onClick={() => setCurrentPage("signup")}
          >
            Sign Up
          </button>
        </p>
      </form>
    </div>
  );
};

export default Login;