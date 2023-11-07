import React, { useEffect, useState } from "react";
import AdminHome from "./adminHome";
import UserHome from "./userHome";

export default function UserDetails() {
  const [userData, setUserData] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const token = window.localStorage.getItem("token");
    if (!token) {
      alert("Token not found. Please login.");
      window.location.href = "./sign-in";
      return;
    }

    fetch("http://localhost:5000/userData", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        token: token,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status === "ok") {
          if (data.data.userType === "Admin") {
            setIsAdmin(true);
          }
          setUserData(data.data);
        } else {
          alert("Error fetching user data.");
        }
      })
      .catch((error) => {
        console.error("Error fetching user data:", error);
        alert("Something went wrong.");
      });
  }, []);

  const logOut = () => {
    // Clear the authentication token from localStorage
    localStorage.removeItem("token");
    
    // Redirect to the login page
    window.location.href = "./sign-in";
  };

  return (
    <div className="auth-wrapper">
      <div className="auth-inner">
        {isAdmin ? (
          <AdminHome userData={userData} logOut={logOut} />
        ) : (
          <UserHome userData={userData} logOut={logOut} />
        )}
      </div>
    </div>
  );
}











