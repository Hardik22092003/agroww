import React, { useState } from "react";
import axios from "axios";
import { toast,ToastContainer } from "react-toastify";
export default function FarmerLogin() {
  let [isLoading, setIsLoading] = useState(false);
  let [details, setDetails] = useState({
    username: "",
    password: ""
  })
  // setIsLoading(true);

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
          toast.error("Invalid credentials", {
            position: "top-right"});
            setIsLoading(false);
        }
      })
      .catch((err) => {
        console.error(err);
        // alert("An error occurred while logging in.");
        toast.error("Invalid credentials", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
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
      <ToastContainer />
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4 text-green-700 flex gap-2"><span>Farmer Login</span>
          

        <p className="text-white text-md bg-purple-500 hover:bg-purple-600 p-1 w-fit text-center" onClick={()=>{
          localStorage.setItem("username", "xyz");
          localStorage.setItem("role", "farmer");
          localStorage.setItem("email", "xyz@gmail.com");
          window.location.href = "/farmer";
        }}>Bypass &rarr;</p>
        
        </h2>
        
        <form>
          <input
            type="email"
            placeholder="Username"
            className="w-full p-2 border rounded mb-4"
            name="username"
            onChange={onChangeHandler}
            disabled={isLoading}
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full p-2 border rounded mb-4"
            name="password"
            onChange={onChangeHandler}
            disabled={isLoading}
          />
           <p className="text-end my-2 text-blue-700 underline">Reset Password ?</p>
         
          <button onClick={clicker}  disabled={isLoading} className="bg-green-600 hover:bg-green-700 text-white w-full py-2 rounded">
            Login
          </button>
          {isLoading ? (
    <>
      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
      </svg>
      Logging in...
    </>
  ) : (
    ''
  )}
          <p className="text-sm hover:underline cursor-pointer text-center" onClick={()=>{
            window.location.href = "/signup/farmer";
          }}>Signup</p>
        </form>
      </div>
    </div>
  );
}
