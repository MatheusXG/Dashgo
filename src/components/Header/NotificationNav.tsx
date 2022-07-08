import { BellIcon } from "@chakra-ui/icons";
import { Flex, HStack, IconButton, useBreakpointValue } from "@chakra-ui/react";
import { RiUserAddLine } from "react-icons/ri";

export default function NotificationNav() {
    const iconButtonSize = useBreakpointValue({
      base: 'sm',
      md: 'md',
      lg: 'lg'
    })

  return (
    <HStack
      spacing={["4","6", "8"]}
      mx={["4","6", "8"]}
      pr="2"
      py="2"
      color="gray.300"
      borderRightWidth={1}
      borderColor="gray.700"
    >
      <IconButton
        aria-label="Search database"
        icon={<BellIcon />}
        borderRadius="full"
        colorScheme="gray.300"
        size={iconButtonSize}
      />
      <IconButton
        aria-label="Search database"
        icon={<RiUserAddLine />}
        borderRadius="full"
        colorScheme="gray.300"
        size={iconButtonSize}
      />
    </HStack>
  );
}
