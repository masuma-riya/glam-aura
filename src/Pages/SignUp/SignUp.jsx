import { Link, useNavigate } from "react-router-dom";
import useAuth from "../../Hooks/useAuth";
import { useState } from "react";
import toast from "react-hot-toast";
import { IoEye, IoEyeOff } from "react-icons/io5";

const SignUp = () => {
  // Using context with AuthContext
  const { createUser, signInWithGoogle, signInWithGithub, updateUserProfile } =
    useAuth();

  const [registerError, setRegisterError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // navigate after login
  const navigate = useNavigate();

  const handleRegister = (e) => {
    e.preventDefault();

    const form = new FormData(e.currentTarget);
    const name = form.get("name");
    const email = form.get("email");
    const password = form.get("password");
    const confirmPassword = form.get("confirmPassword");
    const photoURL = form.get("photoURL");
    const termsChecked = form.get("terms");

    setRegisterError("");

    if (password.length < 6) {
      setRegisterError(
        "! Password should be at least 6 characters or longer !"
      );
      return;
    } else if (!/(?=.*[a-z])(?=.*[A-Z]).+/.test(password)) {
      setRegisterError(
        "! Password needs at least One Upper and Lowercase letters !"
      );
      return;
    } else if (password !== confirmPassword) {
      setRegisterError("! Password and Confirm password did not matched !");
      return;
    } else if (!termsChecked) {
      setRegisterError("! Please accept our Terms and Conditions !");
      return;
    }

    // create a new user
    createUser(email, password)
      .then((result) => {
        console.log("User created successfully:", result.user);
        updateUserProfile(name, photoURL).then(() => {
          e.target.reset();
          navigate("/");
        });
      })

      .catch((error) => {
        console.error(error);
        if (error.code === "auth/email-already-in-use") {
          setRegisterError(
            "The Email is already Used! Please provide a new Email!"
          );
        } else {
          setRegisterError(error.message);
        }
      });
  };

  // Google Registration event handler
  const handleGoogleLogin = () => {
    signInWithGoogle()
      .then((result) => {
        console.log(result.user);
        toast.success("Google Registration Success!");
        // Go to home page after google Registration
        navigate("/");
      })
      .catch((error) => {
        console.error(error);
      });
  };

  // Github Registration event handler
  const handleGithubLogin = () => {
    signInWithGithub()
      .then((result) => {
        console.log(result.user);
        toast.success("Github Registration Success!");
        // Go to home page after github Registration
        navigate("/");
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Create an Account
        </h2>
        <h1 className="mt-2 text-center text-[17px] text-gray-600 max-w">
          <p className="font-medium text-blue-600">
            Already have?{" "}
            <Link to="/login">
              <span className="italic hover:text-blue-400">Login Now</span>
            </Link>
          </p>
        </h1>
      </div>
      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <form onSubmit={handleRegister} className="space-y-6">
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700"
              >
                Your Name
              </label>
              <div className="mt-1">
                <input
                  name="name"
                  type="text"
                  required
                  className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Enter your Full Name"
                />
              </div>
            </div>
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email address
              </label>
              <div className="mt-1">
                <input
                  name="email"
                  type="email"
                  required
                  className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Enter your Email address"
                />
              </div>
            </div>
            <div>
              <label
                htmlFor="photoURL"
                className="block text-sm font-medium text-gray-700"
              >
                Your Photo URL
              </label>
              <div className="mt-1">
                <input
                  name="photoURL"
                  type="text"
                  className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Enter your Photo URL"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                Password
              </label>
              <div className="relative mt-1">
                <input
                  className="rounded-md  w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="Password"
                  required
                />

                <span
                  className="absolute top-2 md:right-10 right-4"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <IoEye className="text-xl"></IoEye>
                  ) : (
                    <IoEyeOff className="text-xl"></IoEyeOff>
                  )}
                </span>
              </div>
            </div>

            <div>
              <label
                htmlFor="confirmPassword"
                className="block text-sm font-medium text-gray-700"
              >
                Confirm Password
              </label>
              <div className="relative mt-1">
                <input
                  className="rounded-md  w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  type={showConfirmPassword ? "text" : "password"}
                  name="confirmPassword"
                  placeholder="Enter Confirm Password"
                  required
                />

                <span
                  className="absolute top-2 md:right-10 right-4"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  {showConfirmPassword ? (
                    <IoEye className="text-xl"></IoEye>
                  ) : (
                    <IoEyeOff className="text-xl"></IoEyeOff>
                  )}
                </span>
              </div>
            </div>
            <div className="flex items-center">
              <input
                id="terms"
                name="terms"
                type="checkbox"
                className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500 dark:text-white dark:border-gray-600 dark:focus:ring-indigo-400 disabled:cursor-wait disabled:opacity-50"
              />
              <label
                htmlFor="terms"
                className="ml-2 block text-lg italic text-blue-500 font-semibold"
              >
                Please accept our terms & conditions
              </label>
            </div>
            {registerError && (
              <i>
                <p className="lg:text-base text-lg pt-4 pb-1 font-bold text-center text-red-600">
                  {registerError}
                </p>
              </i>
            )}
            <div>
              <button
                type="submit"
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Sign Up
              </button>
            </div>
          </form>
          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-gray-100 text-gray-500">
                  Or continue with
                </span>
              </div>
            </div>
            <div className="mt-8 flex gap-3 items-center">
              <button
                onClick={handleGoogleLogin}
                className="group w-6/12 m-auto h-12 border border-gray-300 rounded-lg transition duration-300 hover:border-blue-400 focus:bg-blue-50 active:bg-blue-100"
              >
                <div className="flex items-center justify-center">
                  <img
                    src="https://www.svgrepo.com/show/475656/google-color.svg"
                    className="w-7"
                    alt="google logo"
                  />
                </div>
              </button>
              <button
                onClick={handleGithubLogin}
                className="group w-6/12 m-auto  h-12 border border-gray-300 rounded-lg transition duration-300 hover:border-blue-400"
              >
                <div className="relative w-7 m-auto flex items-center space-x-4 justify-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    className="absolute left-0 text-gray-700"
                    viewBox="0 0 16 16"
                  >
                    <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.012 8.012 0 0 0 16 8c0-4.42-3.58-8-8-8z"></path>
                  </svg>
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
