import { useSendSignInLinkToEmail } from "react-firebase-hooks/auth";
import { auth } from "@/firebase/app";
import { useState } from "react";
import { Flex, Text, Input, Button } from "@chakra-ui/react";
import { useAtom } from "jotai";

const SignInWithMagicLink: React.FC = () => {
  const [sendSignInLinkToEmail, sending, fbError] =
    useSendSignInLinkToEmail(auth);
  const [email, setEmail] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
  const setAuthModalState = useAtom(authModalState);

  const actionCodeSettings = {
    url: process.env.NEXT_PUBLIC_FIREBASE_MAGIC_LINK_CONTINUE_URL as string,
    handleCodeInApp: true,
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await sendSignInLinkToEmail(email, actionCodeSettings);
    setIsSuccess(true);
  };

  return (
    <Flex>
      <Text>Sign In With Magic Link</Text>
      {isSuccess ? (
        <Text>Check your email</Text>
      ) : (
        <>
          <Text>Enter your email and we will send you a link to sign in</Text>
          <form onSubmit={handleSubmit}>
            <Input
              required
              name="email"
              type="email"
              placeholder="Email"
              onChange={(e) => setEmail(e.target.value)}
            />
            {fbError && <Text>{fbError.message}</Text>}
            <Button type="submit" isLoading={sending}>
              Send Link
            </Button>
          </form>
        </>
      )}
    </Flex>
  );
};
