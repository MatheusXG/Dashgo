import { Flex, Button, Stack } from "@chakra-ui/react";
import { Input } from "../components/Form/Input";
import InputPassoword from "../components/Form/InputPassword";
import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { parseCookies } from "nookies";

import { GetServerSideProps } from "next";
import { withSSRGuest } from "../Utils/withSSRGuest";

type SignInFormData = {
  email: string;
  password: string;
};

const signInFormSchema = yup.object().shape({
  email: yup.string().email("E-mail inválido").required("E-mail obrigatório"),
  password: yup.string().required("Senha obrigatória"),
});

export default function SignIn() {
  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = useForm<SignInFormData>({
    resolver: yupResolver(signInFormSchema),
  });

  const { signIn } = useContext(AuthContext);

  const handleSignIn: SubmitHandler<SignInFormData> = async (data) => {
    await new Promise((resolve) => setTimeout(resolve, 2000));
    await signIn(data);
  };

  return (
    <Flex w="100vw" h="100vh" align="center" justify="center">
      <Flex
        as="form"
        w="100%"
        maxWidth={360}
        bg="gray.800"
        p="8"
        borderRadius={8}
        direction="column"
        onSubmit={handleSubmit(handleSignIn)}
      >
        <Stack spacing={2}>
          <Input
            name="email"
            label="Email"
            type="email"
            error={errors.email}
            register={{ ...register("email") }}
          />
          <InputPassoword
            name="senha"
            label="Senha"
            error={errors.password}
            register={{ ...register("password") }}
          />
        </Stack>

        <Button
          colorScheme="blue"
          type="submit"
          mt={6}
          size="md"
          isLoading={isSubmitting}
        >
          Entrar
        </Button>
      </Flex>
    </Flex>
  );
}

export const getServerSideProps: GetServerSideProps = withSSRGuest(async (ctx) => {
  return {
    props: {},
  };
});
