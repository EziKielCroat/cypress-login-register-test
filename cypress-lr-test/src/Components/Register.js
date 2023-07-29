import styled from "styled-components";
import {
  GoogleAuthProvider,
  getAuth,
  signInWithPopup,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import { query, getDocs, collection, where, addDoc } from "firebase/firestore";
import { app, db } from "../firebase/firebase";
import { useState } from "react";
import { useNavigate } from "react-router";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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

function Register() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const auth = getAuth(app);
  const googleProvider = new GoogleAuthProvider();

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
      toast("user created & logging in");
      localStorage.setItem("logIn", user.uid);
      navigate("/");
    } catch (err) {
      console.error(err);
    }
  };

  const registerWithEmailAndPassword = async (name, email, password) => {
    try {
      const res = await createUserWithEmailAndPassword(auth, email, password);
      const user = res.user;
      await addDoc(collection(db, "users"), {
        uid: user.uid,
        name,
        authProvider: "local",
        email,
        password,
      });
      toast("user created");
      localStorage.setItem("logIn", user.uid);
      navigate("/");
    } catch (err) {
      console.error(err);
      alert(err.message);
    }
  };

  return (
    <>
      <Title>Register</Title>
      <EmailInput
        style={{ top: "15%" }}
        placeholder="Type your name here"
        value={name}
        onChange={(e) => setName(e.target.value)}
        type="email "
      ></EmailInput>
      <EmailInput
        placeholder="Type your email here"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        type="email "
      ></EmailInput>
      <PasswordInput
        placeholder="Type your password here"
        type="password"
        value={password}
        onChange={(e) => {
          setPassword(e.target.value);
        }}
      ></PasswordInput>
      <LogInWithEmailButton
        onClick={() => {
          registerWithEmailAndPassword(name, email, password);
        }}
      >
        Register with email
      </LogInWithEmailButton>
      <Button
        onClick={() => {
          signInWithGoogle();
        }}
      >
        Register with google
      </Button>
      <DontHaveanAccount
        onClick={() => {
          navigate("/login");
        }}
      >
        Already have an account? Log in!
      </DontHaveanAccount>
      <ToastContainer />
    </>
  );
}

export default Register;
