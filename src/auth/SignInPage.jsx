import React from "react";
import { SignIn } from "@clerk/clerk-react";
const SignInPage = () => {
  return (
    <div className="flex justify-center items-center min-h-screen container">
      <SignIn signUpUrl="/auth/sign-up" forceRedirectUrl="/" />
    </div>
  );
};

export default SignInPage;
