import React from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

export default function LoginForm() {

  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  const navigate = useNavigate();

  const handleLogin = async () => {
    try{
      const response = await axios.post('http://3.110.156.153:5000/api/v1/login', {
        email,
        password
      });
      if(response.status === 200){
        toast.success("Successfully logged in!!")
        navigate('/Dashboard'); 
      }
    }
    catch(error){
      toast.error( error.response.data.error.details[0].message);
    }
  }
  return (
    <div className="w-full h-full text-primary-light dark:text-primary-dark px-6 xs:px-3 py-6 ">
      <h1 className="text-4xl font-semibold text-center">Welcome Back</h1>
      <p className="font-medium text-lg md:text-md mt-4 text-center">
        Welcome back! Please enter your details
      </p>
      <div className="mt-8 md:mt-6">
        <div>
          <input
            className="w-full border-2 rounded-lg p-2 mt-1  placeholder-black bg-white text-black"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="mt-3">
          
          <input
            className="w-full border-2 rounded-lg p-2 mt-1  placeholder-black bg-white text-black"
            placeholder="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="mt-5 flex justify-between items-center">
          <div>
            <input type="checkbox" id="remember" className="bg-white"/>
            <label className="ml-2 font-medium text-base md:text-sm" htmlFor="remember">
              Remember for now
            </label>
          </div>
          <button
            className="font-medium text-base md:text-sm text-violet-500"
            onClick={() => { navigate('/forget-password'); }}
          >
            Forget Password?
          </button>
        </div>
        <div className="mt-4  flex flex-col gap-y-4">
          <button
            onClick={handleLogin}
            className="active:scale-[.98] active:duration-75 hover:scale-[1.01] ease-in-out transition-all py-2 rounded-xl bg-main-gradient  text-md font-bold text-primary-dark"
          >
            Sign In
          </button>
        </div>
        <div className="mt-4 flex justify-center items-center">
          <p className="font-medium text-base md:text-sm">Don't have an account?</p>
          <button
            className="text-violet-500 text-base md:text-sm font-medium ml-2"
            onClick={() => { navigate('/register'); }}
          >
            Sign up
          </button>
        </div>
      </div>
    </div>
  );
}