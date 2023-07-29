import styled from "styled-components";
import {
  GoogleAuthProvider,
  getAuth,
  signInWithPopup,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { query, getDocs, collection, where, addDoc } from "firebase/firestore";
import { app, db } from "../firebase/firebase";
import { useState } from "react";
import { useNavigate } from "react-router";
import { ToastContainer, toast } from "react-toastify";

const Title = styled.h1`
  text-align: center;
  font-size: 1.7em;
`;

const Button = styled.button`
  height: 4em;
  width: 9em;
  background-color: #c6bdb1;
  position: absolute;
  left: 60%;
  top: 46%;
  -webkit-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);
  border: none;
  border-radius: 10px;
  &:hover {
    cursor: pointer;
    background-color: #dcd7d0;
    transition: all 0.5s ease-in;
  }
`;

const EmailInput = styled.input`
  height: 3em;
  width: 20em;
  background-color: #c6bdb1;
  position: absolute;
  left: 45%;
  top: 25%;
  -webkit-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);
  border: none;
  border-radius: 10px;
  text-indent: 10px;
`;

const PasswordInput = styled.input`
  height: 3em;
  width: 20em;
  background-color: #c6bdb1;
  position: absolute;
  left: 45%;
  top: 35%;
  -webkit-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);
  border: none;
  border-radius: 10px;
  text-indent: 10px;
`;

const LogInWithEmailButton = styled.button`
  height: 4em;
  width: 9em;
  background-color: #c6bdb1;
  position: absolute;
  left: 39%;
  top: 46%;
  -webkit-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);
  border: none;
  border-radius: 10px;
  &:hover {
    cursor: pointer;
    background-color: #dcd7d0;
    transition: all 0.5s ease-in;
  }
`;

const DontHaveanAccount = styled.p`
  font-size: 1;
  color: darkred;

  position: absolute;
  left: 50%;
  top: 50%;
  -webkit-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);
  &:hover {
    cursor: pointer;
  }
`;

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const auth = getAuth(app);
  const googleProvider = new GoogleAuthProvider();
  const navigate = useNavigate();

  const signInWithGoogle = async () => {
    try {
      const res = await signInWithPopup(auth, googleProvider);
      const user = res.user;
      const q = query(collection(db, "users"), where("uid", "==", user.uid));
      const docs = await getDocs(q);
      if (docs.docs.length === 0) {
        await addDoc(collection(db, "users"), {
          uid: user.uid,
          name: user.displayName,
          authProvider: "google",
          email: user.email,
        });
      }
      toast("user logged in");
      localStorage.setItem("logIn", user.uid);
      navigate("/");
    } catch (err) {
      console.error(err);
      toast(err);
    }
  };

  const logInWithEmailAndPassword = async (email, password) => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      toast("user logged in");
      localStorage.setItem("logIn", "email");
      navigate("/");
    } catch (err) {
      console.error(err);
      toast(err);
    }
  };

  return (
    <>
      <Title>Login</Title>
      <EmailInput
        placeholder="Type your email here"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        type="email"
        className="email"
      ></EmailInput>
      <PasswordInput
        placeholder="Type your password here"
        type="password"
        value={password}
        onChange={(e) => {
          setPassword(e.target.value);
        }}
        className="password"
      ></PasswordInput>
      <LogInWithEmailButton
        onClick={() => {
          logInWithEmailAndPassword(email, password);
        }}
        className="logInWithEmail"
      >
        Log in with email
      </LogInWithEmailButton>
      <Button
        onClick={() => {
          signInWithGoogle();
        }}
      >
        Log in with google
      </Button>
      <DontHaveanAccount
        onClick={() => {
          navigate("/register");
        }}
      >
        Don't have an Account? Register now!
      </DontHaveanAccount>
      <ToastContainer />
    </>
  );
}

export default Login;
