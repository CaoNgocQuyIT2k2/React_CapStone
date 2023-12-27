import React from "react";
import FormLogin from "./FormLogin";
import animateSrc from "./bgAnimatee.json";
import Lottie from "lottie-react";

export default function LoginPage() {
  return (
    <div className="items-center login_container">
      <div className="container w-96">
        <Lottie animationData={animateSrc} loop={true} />
      </div>
      <br />
      <div>
        <FormLogin />
      </div>
    </div>
  );
}
