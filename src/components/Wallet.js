import React, { useState } from "react";
import { Box, Button, Icon } from "@chakra-ui/react";
import { FaKey } from "react-icons/fa";
import PrivateKeyModal from "./PrivateKeyModal";

const Wallet = () => {
  const [isPrivateKeyModalOpen, setIsPrivateKeyModalOpen] = useState(false);
  const [privateKey, setPrivateKey] = useState(""); // Assuming you have a state for the private key

  // Add this function to handle opening the private key modal
  const handleViewPrivateKey = () => {
    setIsPrivateKeyModalOpen(true);
  };

  return (
    <Box>
      {/* ...existing code... */}

      {/* Add this button near your other wallet controls */}
      <Button
        onClick={handleViewPrivateKey}
        colorScheme="purple"
        mt={4}
        size="sm"
        leftIcon={<Icon as={FaKey} />}
      >
        See Private Key
      </Button>

      {/* Add the modal component at the end of your return statement */}
      <PrivateKeyModal
        isOpen={isPrivateKeyModalOpen}
        onClose={() => setIsPrivateKeyModalOpen(false)}
        privateKey={privateKey} // Pass the actual private key from your state
      />

      {/* ...existing code... */}
    </Box>
  );
};

export default Wallet;
