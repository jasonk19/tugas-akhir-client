import {
  Box,
  Button,
  HStack,
  Heading,
  Stack,
  Textarea,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import AnalyzeResult from "./result";

const EssayAnalyzer = () => {
  const formMethods = useForm<{
    essay: string;
  }>({
    values: {
      essay: "",
    },
  });

  const analyzeEssay = formMethods.handleSubmit(async (values) => {
    console.log(values);
  });

  return (
    <Box height="100vh" width="100vw" backgroundColor="#121212" p={7}>
      <Stack backgroundColor="white" borderRadius="lg" p={5} height="100%">
        <Heading>Essay Analyzer</Heading>
        <Stack justifyContent="center" height="100%" gap={3}>
          <Textarea
            width="100%"
            height="100%"
            placeholder="Enter your essay"
            {...formMethods.register("essay")}
          />
          <HStack justifyContent="flex-end">
            <AnalyzeResult
              renderClick={({ onOpen }) => (
                <Button
                  type="submit"
                  onClick={() => {
                    analyzeEssay();
                    onOpen();
                  }}
                >
                  Analyze
                </Button>
              )}
            />
          </HStack>
        </Stack>
      </Stack>
    </Box>
  );
};

export default EssayAnalyzer;
