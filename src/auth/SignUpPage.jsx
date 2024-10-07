import React from "react";
import { SignUp } from "@clerk/clerk-react";
const SignUpPage = () => {
  return (
    <div className="flex justify-center items-center min-h-screen container">
      <SignUp signInUrl="/auth/sign-in" forceRedirectUrl="/" />
    </div>
  );
};

export default SignUpPage;
