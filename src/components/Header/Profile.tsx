import { Avatar, Box, Flex, Text, useBreakpointValue } from "@chakra-ui/react";

interface ProfileProps {
  showProfileData?: boolean;
}

export default function Profile({ showProfileData = true }: ProfileProps) {
  const avatarSize = useBreakpointValue({
    base: 'sm',
    md: 'md',
    lg: 'lg'
    
  });

  return (
    <Flex align="center">
      {showProfileData && (
        <Box mr="4" textAlign="right">
          <Text>Matheus Xavier</Text>
          <Text color="gray.300" fontSize="small">
            matheusgodois0@gmail.com
          </Text>
        </Box>
      )}
      <Avatar
        size={avatarSize}
        name="Matheus Xavier"
        src="https://github.com/matheusxg.png"
      />
    </Flex>
  );
}
