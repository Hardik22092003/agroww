import { useState } from 'react';
import axios from 'axios';
function FarmerSignup() {
     let [details, setDetails] = useState({
    nameFarmer: "",
    email:"",
    farmerPhone: "",
    password: ""
  })
  let clicker=(e)=>{
    if(details.nameFarmer === "" || details.email === "" || details.farmerPhone === "" || details.password === "") {
      alert("Please fill in all fields");
      return;
    }
    e.preventDefault();

    axios.post("https://agroww.onrender.com/farmer/adduser", details)
      .then((res) => {
        console.log(res.data);

        console.log("Signup successful");
        window.location.href = "/login/farmer";
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
        <h2 className="text-2xl font-bold mb-4 text-green-700">Farmer Signup</h2>
        <form>
          <input
            type="text"
            placeholder="Username"
            className="w-full p-2 border rounded mb-4"
            name="nameFarmer"
            onChange={onChangeHandler}
          />
          <input
            type="email"
            placeholder="Email"
            className="w-full p-2 border rounded mb-4"
            name="email"
            onChange={onChangeHandler}
          />
          <input
            type="text"
            placeholder="Phone Number"
            className="w-full p-2 border rounded mb-4"
            name="farmerPhone"
            onChange={onChangeHandler}
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full p-2 border rounded mb-4"
            name="password"
            onChange={onChangeHandler}
          />
          <div className="flex items-center mb-4 justify-center">

          <input type="checkbox" className="mb-4" />
          <label className="text-gray-700 mb-4">I agree to the terms and conditions</label>
          </div>
          <button onClick={clicker} className="bg-green-600 hover:bg-green-700 text-white w-full py-2 rounded">
            Signup
          </button>
        </form>
      </div>
    </div>
      );
}

export default FarmerSignup;