import { ChakraProvider } from "@chakra-ui/react";
import EssayAnalyzer from "./components/EssayAnalyzer";

function App() {
  return (
    <ChakraProvider>
      <EssayAnalyzer />
    </ChakraProvider>
  );
}

export default App;
