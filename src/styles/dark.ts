// 1. Import the extendTheme function
import { extendTheme } from '@chakra-ui/react'

export const dark = extendTheme({
  colors: {
    gray: {
      50:  "#F7FAFC",
      100: "#EDF2F7",
      200: "#E2E8F0",
      300: "#CBD5E0",
      400: "#A0AEC0",
      500: "#718096",
      600: "#4A5568",
      700: "#2D3748",
      800: "#1A202C",
      900: "#171923",
    },
  },
  fonts: {
    body: "Roboto",
    heading: "Roboto ",
  },
  styles: {
    global: {
      body: {
        bg: 'blue.900',
        color: 'gray.50'
      }
    }  
  } 
})

