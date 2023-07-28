import React, { useState, useRef } from "react"; 
import {
  Button,
  FormControl,
  FormLabel,
  Input,
  SimpleGrid,
  Text,
  GridItem,
  Flex,
  Box,
  Alert,
  AlertIcon,
} from "@chakra-ui/react";
import { useResetPassword } from "../hooks/useResetPassword";

interface Email {
  email: string;
}

const ResetPasswordPage = () => {
  const emailRef = useRef<HTMLInputElement>(null);
  const resetPassword = useResetPassword();
  const [resetForm, setResetForm] = useState(false); // New state variable for resetting form

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (emailRef.current) {
      resetPassword.mutate({ email: emailRef.current.value } as Email);
      setResetForm(true);
    }
  };

  return (
    <Flex height="50vh" justifyContent="center" alignItems="center">
      <Box
        width="500px"
        padding={4}
        borderColor="BlackAlpha.50"
        borderWidth="1px"
        borderRadius={10}
      >
        <SimpleGrid>
          <GridItem marginBottom={2}>
            <Text fontSize="sm">Forgot your account’s password? </Text>
            <Text fontSize="sm">
              Enter your email address and we’ll send you a recovery link.
            </Text>
          </GridItem>
          <GridItem>
            {resetPassword.isError && (
              <Alert status="error" marginBottom={5}>
                <AlertIcon />
                {resetPassword.error.message}
              </Alert>
            )}
            {resetPassword.isSuccess && (
              <Alert status="success" marginBottom={5}>
                <AlertIcon />
                Password reset link has been sent to your email.
              </Alert>
            )}
            <form onSubmit={handleSubmit}>
              <FormControl>
                <FormLabel>Email</FormLabel>
                <Input name="email" type="email" ref={emailRef} key={resetForm ? 'hidden' : ''} />
              </FormControl>
              <Button type="submit" marginTop={5}>
                Recover Password
              </Button>
            </form>
          </GridItem>
        </SimpleGrid>
      </Box>
    </Flex>
  );
};

export default ResetPasswordPage;
