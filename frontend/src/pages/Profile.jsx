import React, { useContext, useEffect, useRef, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import { toast } from "react-toastify";

const Profile = () => {
  const { userDetails, updateUserDetails, resetUserPassword } =
    useContext(ShopContext);
  const [updateOption, setUpdateOption] = useState("");
  const nameRef = useRef();
  const emailRef = useRef();
  const contactRef = useRef();
  const homeRef = useRef();
  const areaRef = useRef();
  const landmarkRef = useRef();
  const pincodeRef = useRef();
  const cityRef = useRef();
  const countryRef = useRef();
  const currPassRef = useRef();
  const newPassRef = useRef();
  const confirmNewPassRef = useRef();

  const handleUpdateForm = async (event) => {
    event.preventDefault();
    try {
      const updatedAddress = {
        home: homeRef.current.value,
        area: areaRef.current.value,
        landmark: landmarkRef.current.value,
        city: cityRef.current.value,
        country: countryRef.current.value,
        pincode: pincodeRef.current.value,
      };
      updateUserDetails(
        nameRef.current.value,
        updatedAddress,
        contactRef.current.value,
        emailRef.current.value
      );
    } catch (error) {
      console.log(error);
    }
  };

  const handleResetPassword = async (event) => {
    event.preventDefault();
    try {
      if (newPassRef.current.value !== confirmNewPassRef.current.value) {
        throw new Error(
          "New Password and Confirm New Password are not Matching"
        );
      }
      if (currPassRef.current.value === newPassRef.current.value) {
        throw new Error("Current and New password can't be same");
      }
      if (
        !currPassRef.current.value ||
        !newPassRef.current.value ||
        !confirmNewPassRef.current.value
      ) {
        throw new Error("All Fields Required");
      }

      resetUserPassword(currPassRef.current.value, newPassRef.current.value);
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  useEffect(() => {}, [userDetails]);

  return (
    <div className="w-full mx-auto rounded-lg p-6 mt-10">
      <div className="flex flex-row w-full justify-between">
        <div className="w-[30%] flex flex-col items-center">
          <img
            className="h-[400px] w-[400px] rounded-lg shadow-lg object-cover"
            src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="User Profile"
          />
        </div>

        <div className="w-[65%] flex flex-col  px-6">
          <h2 className="text-2xl text-gray-800 mb-2">{userDetails.name}</h2>
          <p className="text-gray-600 text-lg">📧 : {userDetails.email}</p>
          {userDetails.contact && (
            <p className="text-gray-600 text-lg">📞 : {userDetails.contact}</p>
          )}
          {userDetails.address && (
            <p className="text-gray-600 text-lg">📍 Address</p>
          )}
          {userDetails?.address?.home && (
            <p className="text-gray-600 text-lg">
              Home : {userDetails.address.home}
            </p>
          )}
          {userDetails?.address?.area ? (
            <p className="text-gray-600 text-lg">
              Area : {userDetails.address.area}
            </p>
          ) : (
            <></> || ""
          )}
          {userDetails?.address?.landmark ? (
            <p className="text-gray-600 text-lg">
              Landmark : {userDetails.address.landmark}
            </p>
          ) : (
            <></> || ""
          )}
          {userDetails?.address?.city ? (
            <p className="text-gray-600 text-lg">
              City : {userDetails.address.city}
            </p>
          ) : (
            <></> || ""
          )}
          {userDetails?.address?.pincode ? (
            <p className="text-gray-600 text-lg">
              Pincode : {userDetails.address.pincode}
            </p>
          ) : (
            <></> || ""
          )}
          {userDetails?.address?.country ? (
            <p className="text-gray-600 text-lg">
              Country : {userDetails.address.country}
            </p>
          ) : (
            <></> || ""
          )}
        </div>
      </div>

      {/* Buttons Section */}
      <div className="flex flex-row w-full justify-center mt-6 space-x-4">
        <button
          onClick={() => setUpdateOption("password")}
          className="px-5 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 shadow-md"
        >
          Reset Password
        </button>
        <button
          onClick={() => setUpdateOption("profile")}
          className="px-5 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 shadow-md"
        >
          Update Profile
        </button>
      </div>

      <div>
        {/* update profile */}

        {updateOption === "profile" ? (
          <>
            <form className="w-full max-w-3xl mx-auto mt-6 p-8 bg-white shadow-lg rounded-lg border border-gray-200">
              <h2 className="text-3xl font-bold text-gray-700 mb-6 text-center">
                Update Profile
              </h2>

              {/* Name */}
              <div className="mb-4">
                <label className="block text-gray-600 text-sm font-semibold mb-1">
                  Name
                </label>
                <input
                  ref={nameRef}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                  defaultValue={userDetails.name}
                  type="text"
                  required
                />
              </div>

              {/* Email */}
              <div className="mb-4">
                <label className="block text-gray-600 text-sm font-semibold mb-1">
                  Email
                </label>
                <input
                  ref={emailRef}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                  defaultValue={userDetails.email}
                  type="email"
                  required
                />
              </div>

              {/* Contact */}
              <div className="mb-4">
                <label className="block text-gray-600 text-sm font-semibold mb-1">
                  Contact
                </label>
                <input
                  ref={contactRef}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                  defaultValue={userDetails.contact ? userDetails.contact : ""}
                  type="tel"
                  required
                />
              </div>

              {/* Address Section */}
              <h3 className="text-lg font-semibold text-gray-700 mb-2">
                Address
              </h3>

              <div className="mb-4 grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-600 text-sm font-semibold mb-1">
                    Home / Building
                  </label>
                  <input
                    ref={homeRef}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                    type="text"
                    required
                    defaultValue={
                      userDetails?.address?.home
                        ? userDetails?.address?.home
                        : ""
                    }
                  />
                </div>
                <div>
                  <label className="block text-gray-600 text-sm font-semibold mb-1">
                    Area
                  </label>
                  <input
                    ref={areaRef}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                    type="text"
                    required
                    defaultValue={
                      userDetails?.address?.area
                        ? userDetails?.address?.area
                        : ""
                    }
                  />
                </div>
              </div>

              <div className="mb-4 grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-600 text-sm font-semibold mb-1">
                    Landmark
                  </label>
                  <input
                    ref={landmarkRef}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                    type="text"
                    required
                    defaultValue={
                      userDetails?.address?.landmark
                        ? userDetails?.address?.landmark
                        : ""
                    }
                  />
                </div>
                <div>
                  <label className="block text-gray-600 text-sm font-semibold mb-1">
                    City
                  </label>
                  <input
                    ref={cityRef}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                    type="text"
                    required
                    defaultValue={
                      userDetails?.address?.city
                        ? userDetails?.address?.city
                        : ""
                    }
                  />
                </div>
              </div>

              <div className="mb-4 grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-600 text-sm font-semibold mb-1">
                    Pincode
                  </label>
                  <input
                    ref={pincodeRef}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                    type="text"
                    required
                    defaultValue={
                      userDetails?.address?.pincode
                        ? userDetails?.address?.pincode
                        : ""
                    }
                  />
                </div>
                <div>
                  <label className="block text-gray-600 text-sm font-semibold mb-1">
                    Country
                  </label>
                  <input
                    ref={countryRef}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                    type="text"
                    required
                    defaultValue={
                      userDetails?.address?.country
                        ? userDetails?.address?.country
                        : ""
                    }
                  />
                </div>
              </div>

              {/* Update Button */}
              <div className="text-center mt-6">
                <button
                  onClick={(event) => handleUpdateForm(event)}
                  className="px-6 py-2 bg-blue-600 text-white font-semibold rounded-md shadow-md hover:bg-blue-700 focus:ring-2 focus:ring-blue-400 transition-all"
                >
                  Update Profile
                </button>
              </div>
            </form>
          </>
        ) : (
          <></>
        )}

        {/* reset password */}
        {updateOption === "password" ? (
          <>
            <form className="w-full max-w-3xl mx-auto mt-6 p-8 bg-white shadow-lg rounded-lg border border-gray-200">
              <h2 className="text-3xl font-bold text-gray-700 mb-6 text-center">
                Reset Password
              </h2>

              {/* Name */}
              <div className="mb-4">
                <label className="block text-gray-600 text-sm font-semibold mb-1">
                  Current Password
                </label>
                <input
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                  placeholder="Enter Current Password"
                  type="password"
                  required
                  ref={currPassRef}
                />
              </div>

              {/* Email */}
              <div className="mb-4">
                <label className="block text-gray-600 text-sm font-semibold mb-1">
                  New password
                </label>
                <input
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                  type="email"
                  required
                  ref={newPassRef}
                  placeholder="Enter New Password"
                />
              </div>
              {/* Email */}
              <div className="mb-4">
                <label className="block text-gray-600 text-sm font-semibold mb-1">
                  Confirm New password
                </label>
                <input
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                  type="email"
                  required
                  placeholder="Confirm New Password"
                  ref={confirmNewPassRef}
                />
              </div>

              {/* Update Button */}
              <div className="text-center mt-6">
                <button
                  onClick={(event) => handleResetPassword(event)}
                  className="px-6 py-2 bg-blue-600 text-white font-semibold rounded-md shadow-md hover:bg-blue-700 focus:ring-2 focus:ring-blue-400 transition-all"
                >
                  Update Password
                </button>
              </div>
            </form>
          </>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};

export default Profile;
