import {
    Input,
    InputGroup,
    InputRightElement,
    IconButton,
    Flex,
  } from "@chakra-ui/react";
  
  import { SearchIcon } from "@chakra-ui/icons";
  
  export default function SearchBox() {
    return (
      <Flex
        as="label"
        flex="1"
        py="1"
        px="8"
        ml="6"
        maxWidth={400}
        alignSelf="center"
        color="gray.200"
        position="relative"
        bg="gray.800"
        borderRadius="full"
      >
        <InputGroup>
          <Input
            py="2"
            px="4"
            mr="2"
            borderRadius="full"
            variant="unstyled"
            placeholder="Buscar na plataforma"
            _placeholder={{ color: "gray.500" }}
          />
          <InputRightElement w="2rem">
            <IconButton
              borderRadius="full"
              colorScheme="gray.800"
              aria-label="Search database"
              icon={<SearchIcon />}
              size="lg"
            />
          </InputRightElement>
        </InputGroup>
      </Flex>
    );
  }
  