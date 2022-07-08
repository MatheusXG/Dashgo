import { AppProps } from "next/app";
import { ChakraProvider } from "@chakra-ui/react";

import { theme } from "../styles/theme";
import { dark } from "../styles/dark";
import { SidebarDrawerProvider } from "../contexts/SidebarDrawerContext";
import { MakeServer } from "../services/mirage";
import { QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import { queryClient } from "../services/queryClient";
import { AuthProvider } from "../contexts/AuthContext";

// if (process.env.NODE_ENV === "development") {
//   MakeServer();
// }


function MyApp({ Component, pageProps }: AppProps) {
  const verification = false;

  if (verification) {
    return (
      <AuthProvider>
        <QueryClientProvider client={queryClient}>
          <ChakraProvider theme={dark}>
            <SidebarDrawerProvider>
              <Component {...pageProps} />
            </SidebarDrawerProvider>
          </ChakraProvider>
        </QueryClientProvider>
      </AuthProvider>
    );
  }
  return (
    <QueryClientProvider client={queryClient}>
      <ChakraProvider theme={theme}>
        <AuthProvider>
          <SidebarDrawerProvider>
            <Component {...pageProps} />
          </SidebarDrawerProvider>
        </AuthProvider>
      </ChakraProvider>
      <ReactQueryDevtools />
    </QueryClientProvider>
  );
}

export default MyApp;
