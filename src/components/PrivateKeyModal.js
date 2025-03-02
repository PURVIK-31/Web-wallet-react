import React, { useState } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  Input,
  FormControl,
  FormLabel,
  Text,
  Box,
  useToast,
  InputGroup,
  InputRightElement,
  Alert,
  AlertIcon,
} from "@chakra-ui/react";

const PrivateKeyModal = ({ isOpen, onClose, privateKey }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [password, setPassword] = useState("");
  const [showPrivateKey, setShowPrivateKey] = useState(false);
  const [isPasswordIncorrect, setIsPasswordIncorrect] = useState(false);
  const toast = useToast();

  const handleVerifyPassword = () => {
    // In a real application, you should verify against the stored password
    // For demo purposes, we're using a simple check
    if (password === "password") {
      // Replace with actual password verification
      setShowPrivateKey(true);
      setIsPasswordIncorrect(false);
    } else {
      setIsPasswordIncorrect(true);
    }
  };

  const toggleVisibility = () => {
    setIsVisible(!isVisible);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(privateKey);
    toast({
      title: "Copied to clipboard",
      status: "success",
      duration: 2000,
      isClosable: true,
    });
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>View Private Key</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          {!showPrivateKey ? (
            <FormControl>
              <FormLabel>
                Enter your password to view your private key
              </FormLabel>
              <Input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              {isPasswordIncorrect && (
                <Alert status="error" mt={2}>
                  <AlertIcon />
                  Incorrect password
                </Alert>
              )}
              <Button onClick={handleVerifyPassword} colorScheme="blue" mt={4}>
                Verify
              </Button>
            </FormControl>
          ) : (
            <Box>
              <Text fontWeight="bold" mb={2}>
                Your Private Key:
              </Text>
              <InputGroup size="md">
                <Input
                  pr="4.5rem"
                  type={isVisible ? "text" : "password"}
                  value={privateKey}
                  readOnly
                />
                <InputRightElement width="4.5rem">
                  <Button h="1.75rem" size="sm" onClick={toggleVisibility}>
                    {isVisible ? "Hide" : "Show"}
                  </Button>
                </InputRightElement>
              </InputGroup>
              <Text color="red.500" fontSize="sm" mt={2}>
                Warning: Never share your private key with anyone. Anyone with
                your private key has complete control over your funds.
              </Text>
              <Button
                onClick={copyToClipboard}
                colorScheme="blue"
                size="sm"
                mt={4}
              >
                Copy to clipboard
              </Button>
            </Box>
          )}
        </ModalBody>
        <ModalFooter>
          <Button variant="ghost" onClick={onClose}>
            Close
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default PrivateKeyModal;
