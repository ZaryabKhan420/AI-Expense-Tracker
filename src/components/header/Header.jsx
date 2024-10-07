import { useUser } from "@clerk/clerk-react";
import React from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { UserButton } from "@clerk/clerk-react";
const Header = () => {
  const { user, isSignedIn } = useUser();
  return (
    <div className="flex justify-between items-center my-5 flex-wrap">
      <Link to={"/"} className="flex gap-2 items-center justify-center">
        <img src={"/logo.svg"} alt="Logo" loading="lazy" className="h-8 w-8" />
        <h2 className="text-2xl font-bold">Finan Smart</h2>
      </Link>
      <div>
        <div className="flex justify-center items-center gap-3">
          <Link to={`${isSignedIn ? "/dashboard" : "/auth/sign-in"}`}>
            <Button variant="outline">Dashboard</Button>
          </Link>
          {isSignedIn ? (
            <UserButton />
          ) : (
            <Link to={"/auth/sign-in"}>
              <Button>Get Started</Button>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;
