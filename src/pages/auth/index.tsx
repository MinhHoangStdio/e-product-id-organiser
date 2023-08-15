import { Box, Paper, Typography } from "@mui/material";
import { useState } from "react";
import Login from "./login";
import Register from "./register";
import { useAppDispatch, useAppSelector } from "../../hooks/store";
import { layoutActions } from "../../store/layout/layoutSlice";

const AuthPage = () => {
  const dispatch = useAppDispatch();
  const authState = useAppSelector((state) => state.layout.authState);
  return (
    <Paper
      sx={{
        position: "relative",
        top: "50%",
        left: "50%",
        transform: "translate(-50%,-50%)",
        width: "500px",
        borderRadius: "8px",
        padding: "12px",
      }}
    >
      {authState == "login" ? <Login /> : <Register />}
      <div
        className="
      text-neutral-500 mt-4 font-light"
      >
        <p>
          {authState == "login"
            ? "First time using this app?"
            : "Already have an account?"}
          <span
            onClick={() => {
              dispatch(layoutActions.changeAuthState());
            }}
            className="
              text-neutral-800
              cursor-pointer 
              hover:underline
            "
          >
            {" "}
            {authState == "login" ? "Create an account" : "Login"}
          </span>
        </p>
      </div>
    </Paper>
  );
};

export default AuthPage;
