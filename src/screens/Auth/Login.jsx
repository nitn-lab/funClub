import React, { useEffect, useState } from "react";
import LoginForm from "../../components/LoginForm";
import ForgetPasswordForm from "../../components/ForgetPasswordForm";
import logo from "../../assets/images/FUNCLUB logo.png";
import Theme from "../../Theme";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const [showLoginForm, setShowLoginForm] = useState(true); // Toggle between login and forgot password form
  const [animationClass, setAnimationClass] = useState(""); // Handle CSS animations

  useEffect(() => {
    const jwtToken = localStorage.getItem("jwtToken");
    if (jwtToken) {
      navigate("/Dashboard");
    }
  }, [navigate]);

  // Transition to Forgot Password form
  const handleForgotPasswordClick = () => {
    setAnimationClass("slide-out-left"); // Slide out the login form
    setTimeout(() => {
      navigate('/forget-password')
      setShowLoginForm(false);
      setAnimationClass("slide-in-right"); // Slide in the forgot password form
    }, 300); // Wait for the slide-out animation to complete
  };

  // Transition back to the Login form
  const handleBackToLoginClick = () => {
    setAnimationClass("slide-out-right"); // Slide out the forgot password form
    setTimeout(() => {
      setShowLoginForm(true);
      setAnimationClass("slide-in-left"); // Slide in the login form
    }, 300); // Wait for the slide-out animation to complete
  };

  return (
    <div className="relative h-screen w-screen xs:h-[93vh] font-gotham overflow-hidden">
      <img
        src="https://images.pond5.com/pink-neon-heart-sign-reflection-footage-167595258_iconl.jpeg"
        className="w-full h-full object-cover bg-no-repeat"
        alt="Background"
      />
      <div className="absolute top-0 xs:p-3 p-20 w-full h-full">
        <div className="flex backdrop-blur-lg rounded-lg bg-black/10 dark:bg-white/10 h-full xs:h-[70%] xs:mt-20">
          <div
            className={`flex items-center justify-center w-1/2 md:w-full h-full ${animationClass}`}
            style={{ animationDuration: "0.3s" }} // Duration of the animation
          >
            {showLoginForm ? (
              <LoginForm onForgotPassword={handleForgotPasswordClick} />
            ) : (
              <ForgetPasswordForm backToLogin={handleBackToLoginClick} />
            )}
          </div>
          <div className="md:hidden relative flex w-1/2 items-center h-full">
            <div className="flex w-full justify-center text-primary-light dark:text-primary-dark">
              <img src={logo} className="w-24 animate-pulse mt-10 -mr-5" alt="FUN CLUB Logo" />
              <div>
                <h1 className="text-4xl font-bold">FUN CLUB</h1>
                <h3 className="text-xl font-semibold mt-2.5 text-center italic">
                  Make Friends, Have Fun
                </h3>
              </div>
            </div>
          </div>
        </div>
        <Theme />
      </div>
    </div>
  );
};

export default Login;