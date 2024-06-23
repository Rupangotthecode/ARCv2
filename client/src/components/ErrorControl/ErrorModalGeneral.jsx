import React from "react";
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  Button,
  useDisclosure,
} from "@chakra-ui/react";

const ErrorModal = (props) => {
  const cancelRef = React.useRef();
  const { isOpen, onClose } = useDisclosure();

  return (
    <AlertDialog
      isOpen={true}
      leastDestructiveRef={cancelRef}
      onClose={onClose}
    >
      <AlertDialogOverlay>
        <AlertDialogContent>
          <AlertDialogHeader fontSize="lg" fontWeight="bold">
            {props.errorHeader || "Error!"}
          </AlertDialogHeader>

          <AlertDialogBody>
            {props.errorBody || "Something went wrong."}
          </AlertDialogBody>

          <AlertDialogFooter>
            {props.closable && (
              <Button ref={cancelRef} onClick={onClose}>
                Close
              </Button>
            )}
            {props.errorFunc && (
              <Button onClick={props.errorFunc}>{props.errorFuncButton}</Button>
            )}
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialogOverlay>
    </AlertDialog>
  );
};

export default ErrorModal;
