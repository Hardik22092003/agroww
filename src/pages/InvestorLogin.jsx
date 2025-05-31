import React from "react";
import { useState } from "react";
import axios from "axios";
export default function InvestorLogin() {
  let [details, setDetails] = useState({
      username: "",
      password: ""
    })
      let clicker=(e)=>{
        e.preventDefault();
    
        axios.post("http://localhost:8080/investor/login", details)
          .then((res) => {
            console.log(res.data);
    
            if (res.status === 200) {
              window.location.href = "/investor";
              localStorage.setItem("username", res.data.name);
              localStorage.setItem("role", "investor");
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
    <div className="min-h-screen flex items-center justify-center bg-blue-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4 text-blue-700">Investor Login</h2>
        <form>
          <input
            type="text"
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
          <button onClick={clicker} className="bg-blue-600 hover:bg-blue-700 text-white w-full py-2 rounded">
            Login
          </button>

        </form>
      </div>
    </div>
  );
}
