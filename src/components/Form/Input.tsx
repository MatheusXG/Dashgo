import {
  Input as ChakraInput,
  FormControl,
  FormLabel,
  InputProps as ChakraInputProps,
  FormErrorMessage,
} from "@chakra-ui/react";
import { FieldError, FieldValues } from "react-hook-form/dist/types";

interface InputProps extends ChakraInputProps {
  name: string;
  label?: string;
  register: FieldValues;
  error?: FieldError;
}

export function Input({name, label, register, error = null, ...rest }: InputProps) {
  return (
    <FormControl isInvalid={!!error}>
      {!!label && <FormLabel htmlFor={name}>{label}</FormLabel>}
      <ChakraInput
        name={name}
        id={name}
        bg="gray.900"
        variant="filled"
        _hover={{
          bgColor: "gray.700",
        }}
        {...register}
        {...rest}
      />
      
        { !!error && (
          <FormErrorMessage>
            {error.message}
         </FormErrorMessage>
        )}
    </FormControl>
  );
};

