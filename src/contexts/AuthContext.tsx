import { createContext, ReactNode, useEffect, useState } from "react";
import Router from "next/router";
import { useToast } from '@chakra-ui/react'
import { setCookie, parseCookies, destroyCookie } from 'nookies'

import { api } from '../services/apiClient';


type User = {
  email: string;
  permissions: string[];
  roles: string[];
};

type SignInCredentials = {
  email: string;
  password: string;
};

type AuthContextData = {
  signIn(credentials: SignInCredentials): Promise<void>;
  isAuthenticated: boolean;
  user: User;

};

type AuthProviderProps = {
  children: ReactNode;
};

export const AuthContext = createContext({} as AuthContextData);

export function signOut() {
  destroyCookie(undefined, 'nextauth.token')
  destroyCookie(undefined, 'nextauth.refreshToken')

  Router.push('/')
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User>();
  const toast = useToast();
  const isAuthenticated = !!user;

  //Pegar os cookies salvos
  useEffect(() => {

    const { 'nextauth.token': token} = parseCookies();

    if (token) {
      api.get('/me').then(response => {
        const { email, permissions, roles } = response.data
        setUser({ email, permissions, roles })
      })
      .catch(() => {
        signOut();
      })
    }

  }, [])


  async function signIn({ email, password }: SignInCredentials) {
    console.log({ email, password });

    try {
      const response = await api.post("sessions", {
        email,
        password,
      });  
      
      const { token, refreshToken, permissions, roles, } = response.data;

      setCookie(undefined, 'nextauth.token', token, {
        maxAge: 60 * 60 * 24 * 30, // 30 days
        path: "/" // Qualquer endereço vai ter acesso
      });
      setCookie(undefined, 'nextauth.refreshToken', refreshToken, {
        maxAge: 60 * 60 * 24 * 30, // 30 days
        path: "/" // Qualquer endereço vai ter acesso
      });


      setUser({
        email, 
        permissions,
        roles,
      });

      toast({
        duration: 2000,
        position: 'top-right',
        description: 'Usuário autenticado',
        status: 'success',
        isClosable: true,
      })

      api.defaults.headers['Authorization'] = `Bearer ${token}`

      Router.push("/dashboard");

    } 
    
    catch (error) {
      console.log(error)
      const { message } = error.response.data;


      toast({
        duration: 2000,
        position: 'top-right',
        description: message,
        status: 'error',
        isClosable: true,
      })

    }
  }


  return (
    <AuthContext.Provider value={{ signIn, isAuthenticated, user }}>
      {children}
    </AuthContext.Provider>
  );
}
