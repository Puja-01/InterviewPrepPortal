import React, { useState, useContext } from 'react';
import Input from "../../components/Inputs/Input";
import ProfilePhotoSelector from "../../components/Inputs/ProfilePhotoSelector";
import { useNavigate } from "react-router-dom";
import {validateEmail} from "../../utils/helper";
import { UserContext } from "../../context/userContext";
import { API_PATHS } from '../../utils/apiPaths';
import axiosInstance from '../../utils/axiosinstance';
import uploadImage from '../../utils/uploadImage';
const SignUp = ({ setCurrentPage }) => {
  const [profilePic, setProfilePic] = useState(null);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  
  const {updateUser} =useContext(UserContext);

  const navigate=useNavigate();

  // Handle SignUp Form Submit
const handleSignUp = async (e) => {
  e.preventDefault();

  let profileImageUrl = "";

  // Validation checks
  if (!fullName) {
    setError("Please enter full name.");
    return;
  }

  if (!validateEmail(email)) {
    setError("Please enter a valid email address.");
    return;
  }

  if (!password) {
    setError("Please enter the password.");
    return;
  }

  // Clear any existing error
  setError("");

  // SignUp API Call
  try {
    // Upload image if present
    if(profilePic){
      const imgUploadRes = await uploadImage(profilePic);
      profileImageUrl = imgUploadRes.imageUrl || "";
    }
    const response = await axiosInstance.post(API_PATHS.AUTH.REGISTER,{
      name: fullName,
      email,
      password,
      profileImageUrl,
    });
    const { token } = response.data;

    if(token) {
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
  }
};


  return (
    <div className="w-[90vw] md:w-[33vw] p-7 flex flex-col justify-center">
      <h3 className="text-xl font-semibold text-black">Create an Account</h3>
      <p className="text-sm text-slate-700 mt-[5px] mb-6">
        Join us today by entering your details below.
      </p>

      <form onSubmit={handleSignUp}>
        <ProfilePhotoSelector image={profilePic} setImage={setProfilePic} />
        <div className="grid grid-cols-1 gap-2">
          <Input
            value={fullName}
            onChange={({ target }) => setFullName(target.value)}
            label="Full Name"
            placeholder="John"
            type="text"
          />
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
        </div>

        {error && <p className="text-red-500 text-sm pb-2.5">{error}</p>}

        <button type="submit" className="btn-primary">
          SIGN UP
        </button>

        <p className="text-sm text-slate-800 mt-3">
          Already have an account?{" "}
          <button
            type="button"
            className="font-medium text-primary underline cursor-pointer"
            onClick={() => setCurrentPage("login")}
          >
            Login
          </button>
        </p>
      </form>
    </div>
  );
};

export default SignUp;
