import { Button, TextField } from "@mui/material";
import { motion } from "framer-motion";
import React from "react";
import { useNavigate } from "react-router-dom";

function LoginPage() {
  const navigate = useNavigate();

  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [error, setError] = React.useState("");
  const [repeatPassword, setRepeatPassword] = React.useState("");

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const handleRepeatPasswordChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRepeatPassword(event.target.value);
  };

  const handleSubmitLogin = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!email || !password) {
      setError("Please enter both email and password");
      return;
    }

    setEmail("");
    setPassword("");
    setError("");

    navigate("/");
  };

  const handleSubmitRegister = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!email || !password) {
      setError("Please enter both email and password");
      return;
    }

    if (password !== repeatPassword) {
      setError("Passwords do not match");
      return;
    }

    setName("");
    setEmail("");
    setPassword("");
    setRepeatPassword("");
    setError("");

    navigate("/");
  };

  return (
    <motion.div
      className="w-full flex items-center justify-center divide-x-2 py-20 h-[90vh]"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className="w-full flex flex-col items-center text-center justify-center p-10">
        <h2 className="text-3xl font-bold text-gray-700 my-10">Login</h2>
        <form
          onSubmit={handleSubmitLogin}
          className="flex flex-col items-center justify-center space-y-2 w-full"
        >
          <TextField
            label="Email"
            variant="outlined"
            value={email}
            onChange={handleEmailChange}
            error={!!error}
            helperText={error}
            fullWidth={true}
            required={true}
          />
          <TextField
            label="Password"
            variant="outlined"
            type="password"
            value={password}
            onChange={handlePasswordChange}
            error={!!error}
            helperText={error}
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
            value={name}
            onChange={handleNameChange}
            error={!!error}
            helperText={error}
            fullWidth={true}
            required={true}
          />
          <TextField
            label="Email"
            variant="outlined"
            value={email}
            onChange={handleEmailChange}
            error={!!error}
            helperText={error}
            fullWidth={true}
            required={true}
          />
          <TextField
            label="Password"
            variant="outlined"
            type="password"
            value={password}
            onChange={handlePasswordChange}
            error={!!error}
            helperText={error}
            fullWidth={true}
            required={true}
          />
          <TextField
            label="Repeat Password"
            variant="outlined"
            type="password"
            value={repeatPassword}
            onChange={handleRepeatPasswordChange}
            error={!!error}
            helperText={error}
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
    </motion.div>
  );
}

export default LoginPage;
