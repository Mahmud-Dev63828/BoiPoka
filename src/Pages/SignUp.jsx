import React, { useState } from "react";
import { FaEye, FaEyeSlash, FaGoogle } from "react-icons/fa";
import libery from "../Libery/Libery";
import { HashLoader } from "react-spinners";
import { NavLink } from "react-router-dom";
import {
  getAuth,
  createUserWithEmailAndPassword,
  sendEmailVerification,
  GoogleAuthProvider,
  signInWithPopup,
  updateProfile,
} from "firebase/auth";
import { getDatabase, push, ref, set } from "firebase/database";

import { auth } from "../../Database/firebase.config";
import { db } from "../../Database/firebase.config";
import { FcGoogle } from "react-icons/fc";
const SignUp = () => {
  // const auth = getAuth();
  const data = libery.signupData();
  const { InfoToast, SuccesToast, ErrorToast } = libery;
  const [loading, setLoading] = useState(false);
  const [logInInfo, setLogInInfo] = useState({
    email: "",
    fullName: "",
    password: "",
  });

  const [logInInfoError, setLogInInfoError] = useState({
    emailError: "",
    fullNameError: "",
    passwordError: "",
  });

  const [focusedFields, setFocusedFields] = useState({
    email: false,
    fullName: false,
    password: false,
  });

  const handleLogInInfo = (e) => {
    const { name, value } = e.target;
    setLogInInfo({
      ...logInInfo,
      [name]: value,
    });
  };

  //* hANDLE fOCUS
  const handleFocus = (name) => {
    setFocusedFields({
      ...focusedFields,
      [name]: true,
    });
  };

  // HANDLE BLUR
  const handleBlur = (name) => {
    setFocusedFields({
      ...focusedFields,
      [name]: false,
    });
  };
  // ✅ Validation Check
  const handleSignUp = () => {
    const { email, fullName, password } = logInInfo;

    // Initialize error tracking object
    let errors = {
      emailError: "",
      fullNameError: "",
      passwordError: "",
    };

    // Validate inputs
    if (!email.trim()) errors.emailError = "Email is required!";
    if (!fullName.trim()) errors.fullNameError = "Full Name is required!";
    if (!password.trim()) errors.passwordError = "Password is required!";

    // Set validation error messages to state
    setLogInInfoError(errors);

    // If no validation errors, proceed with sign-up
    if (!errors.emailError && !errors.fullNameError && !errors.passwordError) {
      setLoading(true); // Show loading spinner

      let createdUser = null; // Store reference to newly created user

      // Step 1: Create user account in Firebase Authentication
      createUserWithEmailAndPassword(auth, email, password)
        .then((userinfo) => {
          SuccesToast("registarion sucessfull ");
          updateProfile(auth.currentUser, {
            displayName: fullName,
            photoURL:
              "https://images.pexels.com/photos/6940512/pexels-photo-6940512.jpeg?auto=compress&cs=tinysrgb&w=600",
          });
        })
        .then(() => {
          const userRef = ref(db, `users/${auth.currentUser.uid}`);
          set(userRef, {
            userid: auth.currentUser.uid,
            username: auth.currentUser.displayName || fullName,
            email: auth.currentUser.email || email,
            profile_picture:
              auth.currentUser.photoURL ||
              `https://images.pexels.com/photos/6940512/pexels-photo-6940512.jpeg?auto=compress&cs=tinysrgb&w=600`,
          });
          // send email for autheicate user;
          return sendEmailVerification(auth.currentUser);
        })
        .then((mailData) => {
          InfoToast("🦄mail send sucessfulll Check your email");
        })
        .then(() => {
          InfoToast(`${fullName}, please check your email for verification`);
          console.log("Verification email sent successfully");
        })
        .catch((err) => {
          // Handle any error that occurred in the promise chain
          ErrorToast(err.code);
        })
        .finally(() => {
          // Reset form and loading state
          setLoading(false);
          setLogInInfo({
            email: "",
            fullName: "",
            password: "",
          });
        });
    }
  };

  //   ! Handle Google
  const handleGoogle = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
      .then((userInfo) => {
        set(ref(database, "users/"), {
          username: "Mahmud",
          email: "mahmud@1234",
          profile_picture: "imageUrl",
        });
        console.log(userInfo);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  // ! Loader Css
  const override = {
    display: "block",
    margin: "0 auto",
    borderColor: "red",
  };
  console.log(libery);

  const [showPassword, setShowPassword] = useState(false);
  return (
    <div className="relative min-h-screen bg-[#f4f6fc] flex items-center justify-center overflow-hidden">
      {/* --- BOTTOM GRADIENT IMAGE --- */}
      <div className="fixed bottom-0 bg-blue-600 left-0 h-[20dvh] w-full z-0"></div>

      {/* --- SIGNUP CARD --- */}
      <div className="relative z-10 bg-white rounded-3xl shadow-xl h-[90%] flex w-[90%] max-w-6xl overflow-hidden">
        {/* LEFT */}
        <div className="w-1/2 p-10 flex flex-col justify-center">
          <h1 className="text-4xl font-bold text-[#3c4bd8] mb-3">Sign Up</h1>
          <p className="text-gray-600 mb-6">
            Let's start your wonderful journey with BoiPoka.
          </p>
          <form
            action="#"
            onSubmit={(e) => {
              e.preventDefault();
            }}
            className="space-y-4"
          >
            <div>
              {data?.map(({ id, name, requierd }) => (
                <div
                  className="relative items-start content-start mt-3"
                  key={id}
                >
                  {/* Label */}
                  <label
                    htmlFor={name}
                    className={`absolute transition-all text-gray-500 px-2 bg-white inline-block z-10
          ${
            focusedFields[name] || logInInfo[name]
              ? "-top-2 left-2 text-[#3c4bd8] text-sm px-1"
              : "top-3 left-3"
          }`}
                  >
                    {name}
                    {requierd && <span className="text-red-400">*</span>}
                  </label>

                  {/* Input */}
                  <div className="relative">
                    <input
                      id={name}
                      name={name}
                      value={logInInfo[name]}
                      onFocus={() => handleFocus(name)}
                      onBlur={() => handleBlur(name)}
                      className={`w-full p-3 border rounded-md focus:outline-none transition-all pr-10
              ${
                focusedFields[name] || logInInfo[name]
                  ? "border-[#3c4bd8] focus:ring-2 focus:ring-[#3c4bd8]"
                  : "border-gray-300"
              }`}
                      onChange={handleLogInInfo}
                      type={
                        name === "email"
                          ? "email"
                          : name === "password"
                          ? showPassword
                            ? "text"
                            : "password"
                          : "text"
                      }
                    />

                    {/* 👁️ Eye Icon for Password */}
                    {name === "password" && (
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute cursor-pointer right-3 top-1/2 transform -translate-y-1/2 text-[#3c4bd8]"
                      >
                        {showPassword ? (
                          <FaEyeSlash size={20} />
                        ) : (
                          <FaEye size={20} />
                        )}
                      </button>
                    )}
                  </div>

                  {/* 🔥 Error Message */}
                  {logInInfoError[name + "Error"] && (
                    <p className="text-red-500 text-sm mt-1">
                      *{logInInfoError[name + "Error"]}
                    </p>
                  )}
                </div>
              ))}
            </div>

            {/* Sign Up Button */}
            <div className="flex items-center gap-4 mt-4">
              <button
                type="submit"
                onClick={handleSignUp}
                className="bg-[#3c4bd8] text-white cursor-pointer px-6 py-2 rounded-md font-medium hover:bg-[#2f3bb8]"
              >
                {loading ? (
                  <HashLoader
                    color={"#ffffff"}
                    loading={loading}
                    size={20}
                    data-testid="loader"
                  />
                ) : (
                  "Sign Up"
                )}
              </button>

              <button
                onClick={handleGoogle}
                className="border cursor-pointer border-gray-300 p-2 rounded-md"
              >
                <span className="text-xl">
                  {" "}
                  <FcGoogle />{" "}
                </span>
              </button>
            </div>
          </form>

          <p className="text-sm mt-4 text-gray-700">
            Already have an account?{" "}
            <NavLink to="/signin" end>
              <span className="font-bold text-black cursor-pointer">
                Log in
              </span>
            </NavLink>
          </p>
        </div>

        {/* RIGHT */}
        <div className="w-1/2 relative bg-[#f4f6fc] p-6 overflow-hidden h-[500px]">
          {/* Background Shape */}
          <img
            src="https://i.pinimg.com/736x/82/df/2b/82df2bc17df6e38d106dd368061daa78.jpg"
            alt="background shape"
            className="absolute top-0 left-0 w-full h-full object-cover z-0 scale-125"
          />

          {/* BLUR SHAPE Over Background */}
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[300px] h-[300px] bg-white/30 rounded-full blur-[100px] z-10 pointer-events-none"></div>

          {/* Model Image from bottom and center */}
          <img
            src="https://pngimg.com/d/student_PNG62529.png"
            alt="student"
            className="absolute bottom-0 left-1/2 -translate-x-1/2 z-20 max-h-[450px] object-contain"
          />
        </div>
      </div>
    </div>
  );
};

export default SignUp;
