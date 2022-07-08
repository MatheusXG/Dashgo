import { EditIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Checkbox,
  Flex,
  Heading,
  Icon,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  Text,
  useBreakpointValue,
  IconButton,
  Spinner,
  Link,
} from "@chakra-ui/react";
import { RiAddLine } from "react-icons/ri";
import Pagination from "../../components/Pagination";

import Header from "../../components/Header";
import Sidebar from "../../components/Sidebar";
import { useUsers, getUsers } from "../../services/hooks/useUsers";

import { useState } from "react";
import NextLink from 'next/link'
import { queryClient } from "../../services/queryClient";
import { api } from "../../services/api";
import { GetServerSideProps } from "next";




export default function UserList() {
  const [ page, setPage ] = useState(1) 

  
  const { data, isLoading, error, isFetching } = useUsers(page)

  const isWideVersion = useBreakpointValue({
    base: false,
    md: true,
    lg: true,
  });


  async function handlePrefetchUser(userId: string) {
    await queryClient.prefetchQuery(['user', userId], async () => {
      const response = await api.get(`user/${userId}`);

      return response.data;
    },
      {
        staleTime: 1000 * 60 * 10, // 10 minutos
      }
    );
  }

  return (
    <Box>
      <Header />

      <Flex w="100%" maxWidth={1480} my="6" mx="auto" px="6">
        <Sidebar />

        <Box
          w="100%"
          flex="1"
          borderRadius={8}
          bg="gray.800"
          p={["4", "6", "8"]}
        >
          <Flex mb="8" justify="space-between" align="center">
            <Heading size="lg" fontWeight="normal">
              Usuários
              {!isLoading && isFetching && <Spinner size="sm" color="blue.500" ml="4"/>}
            </Heading>
            <NextLink href="/users/create" passHref>
              <Button
                as="a"
                size="sm"
                fontSize="sm"
                colorScheme="blue"
                leftIcon={<Icon as={RiAddLine} />}
                cursor="pointer"
              >
                Criar novo
              </Button>
            </NextLink>
          </Flex>
          {isLoading ? (
            <Flex justify="center">
              <Spinner />
            </Flex>
          ) : error ? (
            <Flex justify="center">
              <Text>Falha ao obter dados dos usuários.</Text>
            </Flex>
          ) : (
            <>
              <Table colorScheme="whiteAlpha">
                <Thead>
                  <Tr>
                    <Th px={["1", "4", "6"]} color="gray.300" w="8">
                      <Checkbox colorScheme="blue" />
                    </Th>
                    <Th>Usuário</Th>
                    {isWideVersion && <Th>Data de cadastro</Th>}
                    {/* <Th w="8">Editar</Th> */}
                  </Tr>
                </Thead>
                <Tbody>
                  {data.users.map((user) => (
                    <Tr key={user.id}>
                      <Td px={["1", "4", "6"]} color="gray.300">
                        <Checkbox colorScheme="blue" />
                      </Td>
                      <Td>
                        <Box w="100%">
                          <Link color="green.400" onMouseEnter={() => handlePrefetchUser(user.id)}>            
                            <Text fontWeight="bold">{user.name}</Text>
                          </Link>
                          <Text fontSize="sm" color="gray.300">
                            {user.email}
                          </Text>
                        </Box>
                      </Td>
                      {isWideVersion && <Td>{user.created_at}</Td>}
                      <Td>
                  {/* {isWideVersion ? (
                    <Button
                      as="a"
                      size="sm"
                      fontSize="sm"
                      colorScheme="red"
                      leftIcon={<Icon as={EditIcon} fontSize="16" />}
                      cursor="pointer"
                    >
                      Editar
                    </Button>
                  ) : (
                    <IconButton
                      borderRadius="full"
                      colorScheme="red"
                      aria-label="Search database"
                      icon={<EditIcon />}
                      size="md"
                    />
                  )} */}
                </Td>
                    </Tr>
                  ))}
                </Tbody>
              </Table>
              <Pagination totalCountOfRegisters={data.totalCount}
                currentPage={page}
                onPageChange={setPage}
              />
            </>
          )}
        </Box>
      </Flex>
    </Box>
  );
}


// export const getServerSideProps: GetServerSideProps = async () => {

//   const { users, totalCount } = await getUsers(1)

//   return {
//     props: { users, totalCount },
//   }

// }