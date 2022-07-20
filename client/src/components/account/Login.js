import React, { useState } from "react";
import { Box, Button, TextField, Typography, styled } from "@mui/material";
import { API } from "../../service/api";
const Component = styled(Box)`
  width: 400px;
  margin: auto;
  box-shadow: 5px 2px 5px 2px rgb(0 0 0/ 0.6);
`;
const Image = styled("img")({
  width: 100,
  display: "flex",
  margin: "auto",
  padding: "50px 0 0",
});
const Wrapper = styled(Box)`
  display: flex;
  flex: 1;
  flex-direction: column;
  padding: 25px 35px;
  overflow: auto;
  & > div,
  & > button,
  & > p {
    margin-top: 20px;
  }
`;
const LoginButton = styled(Button)`
  text-transform: none;
  background: #fb641b;
  color: #fff;
  height: 48px;
  border-radius: 2px;
`;

const SignupButton = styled(Button)`
  text-transform: none;
  background: #fff;
  color: #2874f0;
  height: 48px;
  border-radius: 2px;
  box-shadow: 0 2px 4px 0 rgb(0 0 0 / 20%);
`;

const Text = styled(Typography)`
  color: #878787;
  font-size: 12px;
`;
const Error = styled(Typography)`
  font-size: 10px;
  color: #ff6161;
  line-height: 0;
  margin-top: 10px;
  font-weight: 600;
`;

const Login = () => {
  const signupInitialvalue = {
    name: "",
    username: "",
    password: "",
  };
  const loginInitialValue = {
    username: "",
    password: "",
  };
  const [account, toggleaccount] = useState("login");
  const [signup, setSignup] = useState(signupInitialvalue);
  const [error, setError] = useState("");
  const [login, setLogin] = useState(loginInitialValue);

  const toggleSignup = () => {
    account === "signup" ? toggleaccount("login") : toggleaccount("signup");
  };
  const imageURL =
    "https://www.sesta.it/wp-content/uploads/2021/03/logo-blog-sesta-trasparente.png";
  const onInputChange = (e) => {
    setSignup({ ...signup, [e.target.name]: e.target.value });
  };
  const signupUser = async () => {
    let response = await API.userSignup(signup);
    if (response.isSuccess) {
      console.log(response.status);
      setError("");
      setSignup(signupInitialvalue);
      toggleaccount("login");
    } else {
      setError("Something Went Wrong!!!.. Please Try again");
    }
  };
  const onValueChange = (e) => {
    setLogin({ ...login, [e.target.name]: e.target.value });
  };
  const loginuser = async () => {
    let response = await API.userlogin(login);
    if (response.isSuccess) {
      setError("");
    } else {
      setError("Something Went Wrong!!!.. Please Try again");
    }
  };
  /// main
  return (
    <Component>
      <Box>
        <Image src={imageURL} alt="Logo" />
        {account === "login" ? (
          <Wrapper>
            <TextField
              variant="standard"
              label="Enter UserName"
              value={login.username}
              name="username"
              onChange={(e) => onValueChange(e)}
            />
            <TextField
              variant="standard"
              label="Enter Password"
              value={login.password}
              name="password"
              onChange={(e) => onValueChange(e)}
            />
            {error && <Error>{error}</Error>}
            <LoginButton variant="contained" onClick={() => loginuser()}>
              Login
            </LoginButton>
            <Text style={{ textAlign: "center" }}>Or</Text>
            <SignupButton onClick={() => toggleSignup()}>
              Create an Acoount
            </SignupButton>
          </Wrapper>
        ) : (
          <Wrapper>
            <TextField
              variant="standard"
              label="Enter Name"
              onChange={(e) => onInputChange(e)}
              name="name"
            />
            <TextField
              variant="standard"
              label="Enter Username"
              onChange={(e) => onInputChange(e)}
              name="username"
            />
            <TextField
              variant="standard"
              label="Enter Password"
              onChange={(e) => onInputChange(e)}
              name="password"
            />
            {error && <Error>{error}</Error>}
            <SignupButton onClick={() => signupUser()}>Signup</SignupButton>
            <Text style={{ textAlign: "center" }}>Or</Text>
            <LoginButton variant="contained" onClick={() => toggleSignup()}>
              Already have an account
            </LoginButton>
          </Wrapper>
        )}
      </Box>
    </Component>
  );
};

export default Login;
