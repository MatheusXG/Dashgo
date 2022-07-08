import {
    Input as ChakraInput,
    FormControl,
    FormLabel,
    InputProps as ChakraInputProps,
  } from "@chakra-ui/react";
  import { forwardRef, ForwardRefRenderFunction } from "react";
  
  interface InputProps extends ChakraInputProps {
    name: string;
    label?: string;
  }
  
  const InputBase: ForwardRefRenderFunction<
    HTMLInputElement,
    InputProps
  > = ({ name, label, ...rest }, register) => {
    return (
      <FormControl>
        {!!label && <FormLabel htmlFor={name}>{label}</FormLabel>}
        <ChakraInput
          name={name}
          id={name}
          bg="gray.900"
          variant="filled"
          _hover={{
            bgColor: "gray.700",
          }}
          register={register}
          {...rest}
        />
      </FormControl>
    );
  };
  
//   export const Input = forwardRef(InputBase);
  