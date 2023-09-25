import { useSignInWithGoogle } from "react-firebase-hooks/auth";
import { auth } from "@/firebase/app";
import { Text, Button, Flex } from "@chakra-ui/react";
import exp from "constants";

const SignInWithProvider: React.FC = () => {
  const [signInWithGoogle, user, loading, fbError] = useSignInWithGoogle(auth);

  return (
    <Flex>
      <Button isLoading={loading} onClick={() => signInWithGoogle}>
        Sign In With Google
      </Button>
      {fbError && <Text>{fbError.message}</Text>}
    </Flex>
  );
};

export default SignInWithProvider;
