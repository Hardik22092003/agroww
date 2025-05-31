import { useState } from 'react';
import axios from 'axios';
function InvestorSignup() {
     let [details, setDetails] = useState({
        nameInvestor: "",
        email:"",
        phoneNumber: "",
        password: ""
      })
      let clicker=(e)=>{
        e.preventDefault();
        if(details.nameInvestor === "" || details.email === "" || details.phoneNumber === "" || details.password === "") {
          alert("Please fill in all fields");
          return;
        }
        axios.post("https://agroww.onrender.com/investor/adduser", details)
          .then((res) => {
            console.log(res.data);
    
            console.log("Signup successful");
            window.location.href = "/login/investor";
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
    
    return ( <div className="min-h-screen flex items-center justify-center bg-blue-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4 text-blue-700">Investor Signup</h2>
        <form>
          <input
            type="text"
            placeholder="Username"
            className="w-full p-2 border rounded mb-4"
            name="nameInvestor"
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
            name="phoneNumber"
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
          <button onClick={clicker} className="bg-blue-600 hover:bg-blue-700 text-white w-full py-2 rounded">
            Signup
          </button>
        </form>
      </div>
    </div> );
}

export default InvestorSignup;