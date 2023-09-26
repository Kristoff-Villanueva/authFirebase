import { useSendPasswordResetEmail } from "react-firebase-hooks/auth";
import { auth } from "@/firebase/app";
import { useState } from "react";
import { Button, Flex, Input, Text } from "@chakra-ui/react";

const ResetPassword: React.FC = () => {
  const [email, setEmail] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
  const [sendPasswordResetEmail, sending, fbError] =
    useSendPasswordResetEmail(auth);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await sendPasswordResetEmail(email);
    setIsSuccess(true);
  };

  return (
    <Flex>
      <Text>Reset Your Password</Text>

      {isSuccess ? (
        <Text>Check your email: {email}</Text>
      ) : (
        <>
          <Text>
            {`Enter the email associated with your account and we'll send you a reset link.`}
          </Text>
          <form onSubmit={handleSubmit}>
            <Input
              required
              type="email"
              name="email"
              placeholder="Email"
              onChange={(e) => setEmail(e.target.value)}
            />
            {fbError && <Text>{fbError.message}</Text>}
            <Button type="submit" isLoading={sending}>
              Reset Password
            </Button>
          </form>
        </>
      )}
    </Flex>
  );
};

export default ResetPassword;
