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
         setIsLoading(true);
        axios.post("https://agroww.onrender.com/investor/adduser", details)
          .then((res) => {
            console.log(res.data);
    
            console.log("Signup successful");
            window.location.href = "/login/investor";
            setIsLoading(false);
          })
          .catch((err) => {
            console.error(err);
            alert("An error occurred while logging in.");
            setIsLoading(false);
          });
      }
      let onChangeHandler = (e) => {
        setDetails({
          ...details,
          [e.target.name]: e.target.value
        });
      }
       let [isLoading, setIsLoading] = useState(false); // Initialize as false
 
    
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
          <button 
            onClick={clicker} 
            disabled={isLoading}
            className="bg-green-600 hover:bg-green-700 text-white w-full py-2 rounded flex items-center justify-center"
          >
            {isLoading ? (
              <>
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Signing up...
              </>
            ) : (
              'Signup'
            )}
          </button> 
        </form>
      </div>
    </div> );
}

export default InvestorSignup;