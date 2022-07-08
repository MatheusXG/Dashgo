import { Text } from "@chakra-ui/react";

export default function Logo() {
  return (
    <Text
      ml="2"
      fontSize={["1xl", "2xl", "3xl"]}
      fontWeight="bold"
      letterSpacing="tight"
      w="64"
    >
      dashgo
      <Text as="span" color="blue.500" >
        .
      </Text>
    </Text>
  );
}
