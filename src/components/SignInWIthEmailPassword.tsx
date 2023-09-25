import { useState } from "react";
import { useSignInWithEmailAndPassword } from "react-firebase-hooks/auth";
import { auth } from "@/firebase/app";
import { Button, Input, Text } from "@chakra-ui/react";

const SignInWithEmailPassword: React.FC = () => {
  const [signInForm, setSignInForm] = useState({
    email: "",
    password: " ",
  });

  const [signInWithEmailAndPassword, user, loading, fbError] =
    useSignInWithEmailAndPassword(auth);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    signInWithEmailAndPassword(signInForm.email, signInForm.password);
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSignInForm((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
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
      {fbError && <Text>{fbError.message}</Text>}
      <Button type="submit" isLoading={loading}>
        Sign In
      </Button>
    </form>
  );
};
