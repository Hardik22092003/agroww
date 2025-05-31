import React, { useState } from "react";
import axios from "axios";
export default function FarmerLogin() {
  let [details, setDetails] = useState({
    username: "",
    password: ""
  })
  let clicker=(e)=>{
    e.preventDefault();
    if(details.username === "" || details.password === "") {
      alert("Please fill in all fields");
      return;
    }
    axios.post("https://agroww.onrender.com/farmer/login", details)
      .then((res) => {
        console.log(res.data);

        if (res.status === 200) {
          window.location.href = "/farmer";
          localStorage.setItem("username", res.data.name);
          localStorage.setItem("role", "farmer");
          localStorage.setItem("email", res.data.email);
          localStorage.setItem("id", res.data.id);
        } else {
          alert("Invalid credentials");
        }
      })
      .catch((err) => {
        console.error(err);
        alert("An error occurred while logging in.");
      });
  }
  let onChangeHandler = (e) => {
    setDetails({
      ...details,
      [e.target.name]: e.target.value
    });
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-green-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4 text-green-700">Farmer Login</h2>
        <form>
          <input
            type="email"
            placeholder="Email"
            className="w-full p-2 border rounded mb-4"
            name="username"
            onChange={onChangeHandler}
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full p-2 border rounded mb-4"
            name="password"
            onChange={onChangeHandler}
          />
           <p className="text-end my-2 text-blue-700 underline">Reset Password ?</p>
         
          <button onClick={clicker} className="bg-green-600 hover:bg-green-700 text-white w-full py-2 rounded">
            Login
          </button>
          <p className="text-sm hover:underline cursor-pointer text-center" onClick={()=>{
            window.location.href = "/signup/investor";
          }}>Signup</p>
        </form>
      </div>
    </div>
  );
}
