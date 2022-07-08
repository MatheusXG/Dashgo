import { useState } from "react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import {
  Input,
  InputProps as ChakraInputProps,
  InputGroup,
  InputRightElement,
  FormControl,
  FormLabel,
  IconButton,
  FormErrorMessage,
} from "@chakra-ui/react";
import { FieldValues, FieldError } from "react-hook-form/dist/types";

interface InputProps extends ChakraInputProps {
  name: string;
  label?: string;
  register: FieldValues;
  error?: FieldError;
  id?:  string;
}

export default function InputPassoword({
  name,
  label,
  error = null,
  id,
  register,
  ...rest
}: InputProps) {
  const [show, setShow] = useState(false);
  const handleClick = () => setShow(!show);
  return (
    <FormControl isInvalid={!!error}>
      {!!label && <FormLabel htmlFor={name}>{label}</FormLabel>}
      <InputGroup>
        <Input
          name="password"
          id={id}
          type={show ? "text" : "password"}
          bg="gray.900"
          variant="filled"
          _hover={{
            bgColor: "gray.700",
          }}
          {...register}
          {...rest}
        />
        <InputRightElement w="4rem">
          <IconButton
            h="1.5rem"
            aria-label="Password"
            icon={show ? <ViewIcon /> : <ViewOffIcon />}
            onClick={handleClick}
            size="sm"
            colorScheme="blue"
            variant="filled"
            _hover={{
              bgColor: "blue.500",
            }}
          ></IconButton>
        </InputRightElement>
      </InputGroup>
      {!!error && <FormErrorMessage>{error.message}</FormErrorMessage>}

    </FormControl>
  );
}
