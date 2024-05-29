import { Button, TextField } from "@mui/material";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  login,
  register,
  selectLoginError,
  selectLoginStatus,
  selectRegisterError,
  selectRegisterStatus,
} from "../../store/slices/User";
import { useAppDispatch } from "../../store/store";
import Page from "../../Components/Page";
import { useSelector } from "react-redux";
import StatusInfo from "../../Components/StatusInfo";

function LoginPage() {
  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const loginStatus = useSelector(selectLoginStatus);
  const loginError = useSelector(selectLoginError);
  const registerStatus = useSelector(selectRegisterStatus);
  const registerError = useSelector(selectRegisterError);

  useEffect(() => {
    if (loginStatus === "succeeded" || registerStatus === "succeeded") {
      navigate("/");
    }
  }, [loginStatus, registerStatus, navigate]);
  const handleSubmitLogin = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    if (!email || !password) {
      alert("Please enter both email and password");
      return;
    }

    dispatch(login({ email, password }));
  };

  const handleSubmitRegister = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    const repeatPassword = formData.get("repeatPassword") as string;

    if (!email || !password) {
      alert("Please enter both email and password");
      return;
    }

    if (password !== repeatPassword) {
      alert("Passwords do not match");
      return;
    }

    dispatch(register({ name, email, password }));
  };

  return (
    <Page>
      <StatusInfo status={loginStatus} error={loginError} />
      <StatusInfo status={registerStatus} error={registerError} />

      <div className="flex items-center justify-center divide-x-2">
        <div className="w-full flex flex-col items-center text-center justify-center p-10">
          <h2 className="text-3xl font-bold text-gray-700 my-10">Login</h2>
          <form
            onSubmit={handleSubmitLogin}
            className="flex flex-col items-center justify-center space-y-2 w-full"
          >
            <TextField
              label="Email"
              variant="outlined"
              name="email"
              fullWidth={true}
              required={true}
            />
            <TextField
              label="Password"
              variant="outlined"
              type="password"
              name="password"
              fullWidth={true}
              required={true}
            />
            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth={true}
            >
              Login
            </Button>
          </form>
        </div>
        <div className="w-full flex flex-col items-center text-center justify-center p-10">
          <h2 className="text-3xl font-bold text-gray-700 my-10">
            Create Account
          </h2>
          <form
            onSubmit={handleSubmitRegister}
            className="flex flex-col items-center justify-center space-y-2 w-full"
          >
            <TextField
              label="Name"
              variant="outlined"
              name="name"
              fullWidth={true}
              required={true}
            />
            <TextField
              label="Email"
              variant="outlined"
              name="email"
              fullWidth={true}
              required={true}
            />
            <TextField
              label="Password"
              variant="outlined"
              type="password"
              name="password"
              fullWidth={true}
              required={true}
            />
            <TextField
              label="Repeat Password"
              variant="outlined"
              type="password"
              name="repeatPassword"
              fullWidth={true}
              required={true}
            />
            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth={true}
            >
              Register
            </Button>
          </form>
        </div>
      </div>
    </Page>
  );
}

export default LoginPage;
