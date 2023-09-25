import { useState } from "react";
import { useCreateUserWithEmailAndPassword } from "react-firebase-hooks/auth";
import { Button, Input, Text } from "@chakra-ui/react";
import { auth } from "../firebase/app";

const SignUp: React.FC = () => {
  const [signUpForm, setSignUpForm] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");
  const [createUserWithEmailAndPassword, user, loading, fbError] =
    useCreateUserWithEmailAndPassword(auth);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSignUpForm((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (error) setError("");

    if (signUpForm.password !== signUpForm.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    const passwordRegex =
      /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,256}$/gm;

    if (!passwordRegex.test(signUpForm.password)) {
      setError(
        "Password must contain at least 8 characters, 1 uppercase letter, 1 lowercase letter, and 1 number"
      );
      return;
    }

    createUserWithEmailAndPassword(signUpForm.email, signUpForm.password);
  };

  return (
    <form onSubmit={handleSubmit}>
      <Input
        required
        name="email"
        type="email"
        placeholder="Email"
        onChange={handleChange}
      />
      <Input
        required
        name="password"
        type="password"
        placeholder="Password"
        onChange={handleChange}
      />
      <Input
        required
        name="confirmPassword"
        type="password"
        placeholder="Confirm Password"
        onChange={handleChange}
      />
      {(error || fbError) && <Text> {error || fbError?.message}</Text>}
      <Button type="submit" isLoading={loading}>
        Sign Up
      </Button>
    </form>
  );
};
