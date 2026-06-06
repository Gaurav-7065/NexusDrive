import React from "react";
import { Login } from "./pages/Login";
import { useState } from "react";
import { SignUp } from "./pages/Signup";

export default function App() {
  const [vara,SetVara]=useState('/login')
  return (
    <div>
      {vara==='/login'?<Login/>:<SignUp/>}
    </div>
  );
}