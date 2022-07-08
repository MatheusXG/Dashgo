import {
  Box,
  Button,
  Flex,
  Heading,
  Divider,
  VStack,
  SimpleGrid,
  HStack,
} from "@chakra-ui/react";
import Link from "next/link";
import { Input } from "../../components/Form/Input";
import InputPassoword from "../../components/Form/InputPassword";

import Header from "../../components/Header";
import Sidebar from "../../components/Sidebar";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup"
import { useForm, SubmitHandler } from "react-hook-form";
import { useMutation } from 'react-query';
import { api } from "../../services/api";
import { queryClient } from "../../services/queryClient";
import { useRouter } from "next/router";


type CreateUserFormSchema = {
  name: string;
  email: string;
  password: string;
  password_confirmation: string;
}

const createUserFormSchema = yup.object().shape({
  name: yup.string().required("Nome obrigatório"),
  email: yup.string().email("E-mail inválido").required("E-mail obrigatório"),
  password: yup.string().required("Senha obrigatória").min(6, 'No mínimo 6 caracteres'),
  password_confirmation: yup.string().oneOf([
    null, yup.ref('password'),
  ], 'As senhas precisam ser iguais')
});

export default function CreateUser() {
  const router = useRouter()

  const createUser = useMutation(async (user: CreateUserFormSchema ) => {
    const response = await api.post('users', {
      user:{
        ...user,
        created_at: new Date(),
      }
    })

    return response.data.user;
  },
    {
      onSuccess: () => {
        queryClient.invalidateQueries('users');
      }
    }
  ) 

  const { register, handleSubmit, formState: {isSubmitting, errors} } = useForm({
    resolver: yupResolver(createUserFormSchema)
  })

  const handleCreateUser: SubmitHandler<CreateUserFormSchema> = async (values) => {
   await createUser.mutateAsync(values);

   router.push('/users')
  }



  return (
    <Box>
      <Header />

      <Flex
        w="100%"
        maxWidth={1480}
        minWidth={320}
        my="6"
        mx="auto"
        px="6"
      >
        <Sidebar />

        <Box flex="1" borderRadius={8} bg="gray.800" p={["4","6", "8"]} 
          as="form" onSubmit={handleSubmit(handleCreateUser)}
        >
          <Heading size="lg" fontWeight="normal">
            Criar usuário
          </Heading>

          <Divider my="6" borderColor="gray.700" />

          <VStack spacing="8">
            <SimpleGrid minChildWidth="240px" spacing={["4","6", "8"]} w="100%">
              <Input name="name" label="Nome completo" error={errors.name} register={{...register("name")}} />
              <Input name="email" type="email" label="E-mail" error={errors.email} register={{...register("email")}} />
            </SimpleGrid>

          <SimpleGrid minChildWidth="240px" spacing={["4","6", "8"]} w="100%">
              <InputPassoword name="password" id="password" label="Senha" error={errors.password} register={{...register("password")}} />
              <InputPassoword
                name="password_confirmation"
                label="Confirmação da senha" id="password_confirmation" register={{...register("password_confirmation")}}
                error={errors.password_confirmation}
                />
            </SimpleGrid>
          </VStack>

          <Divider my="6" borderColor="gray.700" />

          <Flex mt="2" justify="flex-end">
            <HStack spacing="4">
              <Link href="/users"><Button as="a" colorScheme="whiteAlpha" cursor="pointer">Cancelar</Button></Link>
              <Button type="submit" colorScheme="blue" isLoading={isSubmitting}>Salvar</Button>
            </HStack>
          </Flex>
        </Box>
      </Flex>
    </Box>
  );
}
