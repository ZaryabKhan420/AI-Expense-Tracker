import React from "react";
import { Header, Footer } from "./components/index";
import "./App.css";
import { Outlet } from "react-router-dom";
import { useUser } from "@clerk/clerk-react";
import { useNavigate } from "react-router-dom";
import { Toaster } from "@/components/ui/sonner";

function App() {
  const { user, isSignedIn, isLoaded } = useUser();
  const navigate = useNavigate();
  if (!isSignedIn && isLoaded) {
    return navigate("/auth/sign-in");
  }

  return (
    <div className="container">
      <Header />
      <Outlet />
      <Footer />
      <Toaster />
    </div>
  );
}

export default App;
