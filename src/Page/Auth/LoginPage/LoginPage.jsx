import React from "react";
import FormLogin from "./FormLogin";
import animateSrc from "./bgAnimatee.json";
import Lottie from "lottie-react";

export default function LoginPage() {
  return (
   
    <div className="login_container"> 
      <div className="container w-48">
        <Lottie animationData={animateSrc} loop={true} style={{ width: '50%', fontSize:'20px', marginLeft:'400px' }} />
      </div>
      <div>
        <FormLogin />
      </div>
    </div>
  
    
  );
}
