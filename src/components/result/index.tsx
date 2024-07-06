import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Stack,
  Text,
  useDisclosure,
  Button,
} from "@chakra-ui/react";

type AnalyzeResultModalProps = {
  renderClick: ({ onOpen }: { onOpen: VoidFunction }) => JSX.Element;
};

const AnalyzeResult = ({ renderClick }: AnalyzeResultModalProps) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      {renderClick({ onOpen })}

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Analyzed Report</ModalHeader>
          <ModalCloseButton />
          <ModalBody width="100%">
            <Stack>
              <Text>Hello</Text>
            </Stack>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Reset
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default AnalyzeResult;
