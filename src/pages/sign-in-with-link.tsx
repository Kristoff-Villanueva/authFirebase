import { useSignInWithEmailLink } from "react-firebase-hooks/auth";
import { auth } from "@/firebase/app";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Button, Flex, Heading, Input, Text } from "@chakra-ui/react";

const SignInWithLinkPage: React.FC = () => {
  const [signInWithEmailLink, user, loading, error] = useSignInWithEmailLink(auth);
  const [email, setEmail] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await signInWithEmailLink(email);
  };

  const signInAndRedirect = async (email: string) => {
    try {
      const currentUrl = `${window.location.origin}${router.asPath}`;
      await signInWithEmailLink(email, currentUrl);

      window.localStorage.removeItem("emailForSignIn");

      await router.push("/");
    } catch (error) {
      console.log("Error in signInAndRedirect", error);
    }
  };

  useEffect(() => {
    const emailFromStorage = window.localStorage.getItem("emailForSignIn");
    if (emailFromStorage) {
      signInAndRedirect(emailFromStorage);
    }
  }, []);

  return (
    <Flex>
      <Heading>Signing In With Magic Link</Heading>
      {loading ? (
        <Text>Wait while we're authenticating you...</Text>
      ) : (
        <form onSubmit={handleSubmit}>
          <Input
            required
            name="email"
            type="email"
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
          />

          {error && <Text>{error.message}</Text>}
          <Button type="submit" isLoading={loading}>
            Send Link
          </Button>
        </form>
      )}
    </Flex>
  );
};

export default SignInWithLinkPage;
