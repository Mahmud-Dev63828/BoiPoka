import React, { useState } from "react";
import { FaEye, FaEyeSlash, FaGoogle } from "react-icons/fa";
import libery from "../Libery/Libery";
import { HashLoader } from "react-spinners";
import { NavLink } from "react-router-dom";
import {
  getAuth,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { getDatabase, ref, set } from "firebase/database";
import { auth } from "../../Database/firebase.config";
import { FcGoogle } from "react-icons/fc";

const SignIn = () => {
  const { InfoToast, SuccesToast, ErrorToast } = libery;
  const [loading, setLoading] = useState(false);
  const [logInInfo, setLogInInfo] = useState({
    email: "",
    password: "",
  });

  const [logInInfoError, setLogInInfoError] = useState({
    emailError: "",
    passwordError: "",
  });

  const [focusedFields, setFocusedFields] = useState({
    email: false,
    password: false,
  });

  const handleLogInInfo = (e) => {
    const { name, value } = e.target;
    setLogInInfo({
      ...logInInfo,
      [name]: value,
    });
  };

  const handleFocus = (name) => {
    setFocusedFields({
      ...focusedFields,
      [name]: true,
    });
  };

  const handleBlur = (name) => {
    setFocusedFields({
      ...focusedFields,
      [name]: false,
    });
  };

  const handleSignIn = () => {
    const { email, password } = logInInfo;
    let errors = {
      emailError: "",
      passwordError: "",
    };

    if (!email.trim()) errors.emailError = "Email is required!";
    if (!password.trim()) errors.passwordError = "Password is required!";

    setLogInInfoError(errors);

    if (!errors.emailError && !errors.passwordError) {
      setLoading(true);
      signInWithEmailAndPassword(auth, email, password)
        .then((userInfo) => {
          SuccesToast("Login successful");
          console.log(userInfo);
        })
        .catch((err) => {
          ErrorToast(err.code);
        })
        .finally(() => {
          setLoading(false);
          setLogInInfo({
            email: "",
            password: "",
          });
        });
    }
  };

  const handleGoogleSignIn = () => {
    const provider = new GoogleAuthProvider();
    const database = getDatabase();
    signInWithPopup(auth, provider)
      .then((result) => {
        const user = result.user;
        set(ref(database, "users/" + user.uid), {
          username: user.displayName,
          email: user.email,
          profile_picture: user.photoURL,
        });
        SuccesToast("Google sign-in successful");
      })
      .catch((error) => {
        ErrorToast(error.code);
      });
  };

  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="relative min-h-screen bg-[#f4f6fc] flex items-center justify-center overflow-hidden">
      <div className="fixed bottom-0 bg-blue-600 left-0 h-[20dvh] w-full z-0"></div>
      <div className="relative z-10 bg-white rounded-3xl shadow-xl flex w-[90%] max-w-6xl overflow-hidden">
        {/* LEFT */}
        <div className="w-1/2 p-10 flex flex-col justify-center">
          <h1 className="text-4xl font-bold text-[#3c4bd8] mb-3">Sign In</h1>
          <p className="text-gray-600 mb-6">
            Welcome back! Please log in to your account.
          </p>
          <form
            action="#"
            onSubmit={(e) => e.preventDefault()}
            className="space-y-4"
          >
            {["email", "password"].map((name) => (
              <div
                className="relative items-start content-start mt-3"
                key={name}
              >
                <label
                  htmlFor={name}
                  className={`absolute transition-all text-gray-500 px-2 bg-white inline-block z-10
              ${
                focusedFields[name] || logInInfo[name]
                  ? "-top-2 left-2 text-[#3c4bd8] text-sm px-1"
                  : "top-3 left-3"
              }`}
                >
                  {name.charAt(0).toUpperCase() + name.slice(1)}
                  <span className="text-red-400">*</span>
                </label>

                <div className="relative">
                  <input
                    id={name}
                    name={name}
                    value={logInInfo[name]}
                    onFocus={() => handleFocus(name)}
                    onBlur={() => handleBlur(name)}
                    onChange={handleLogInInfo}
                    type={
                      name === "password"
                        ? showPassword
                          ? "text"
                          : "password"
                        : "email"
                    }
                    className={`w-full p-3 border rounded-md focus:outline-none transition-all pr-10
                ${
                  focusedFields[name] || logInInfo[name]
                    ? "border-[#3c4bd8] focus:ring-2 focus:ring-[#3c4bd8]"
                    : "border-gray-300"
                }`}
                  />
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

                {logInInfoError[name + "Error"] && (
                  <p className="text-red-500 text-sm mt-1">
                    *{logInInfoError[name + "Error"]}
                  </p>
                )}
              </div>
            ))}

            <div className="flex items-center gap-4 mt-4">
              <button
                type="submit"
                onClick={handleSignIn}
                className="bg-[#3c4bd8] text-white cursor-pointer px-6 py-2 rounded-md font-medium hover:bg-[#2f3bb8]"
              >
                {loading ? (
                  <HashLoader color={"#ffffff"} loading={loading} size={20} />
                ) : (
                  "Sign In"
                )}
              </button>

              <button
                type="button"
                onClick={handleGoogleSignIn}
                className="border border-gray-300 p-2 rounded-md"
              >
                <span className="text-xl">
                  {" "}
                  <FcGoogle />{" "}
                </span>
              </button>
            </div>
          </form>

          <p className="text-sm mt-4 text-gray-700">
            Don’t have an account?{" "}
            <NavLink to="/signup" end>
              <span className="font-bold text-black cursor-pointer">
                Sign up
              </span>
            </NavLink>
          </p>
        </div>

        {/* RIGHT */}
        <div className="w-1/2 relative bg-[#f4f6fc] p-6 overflow-hidden h-[500px]">
          <img
            src="https://i.pinimg.com/736x/82/df/2b/82df2bc17df6e38d106dd368061daa78.jpg"
            alt="background"
            className="absolute top-0 left-0 w-full h-full object-cover z-0 scale-125"
          />
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[300px] h-[300px] bg-white/30 rounded-full blur-[100px] z-10 pointer-events-none"></div>
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

export default SignIn;
