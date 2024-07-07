import {
  Box,
  Button,
  FormControl,
  FormLabel,
  HStack,
  Heading,
  Input,
  Stack,
  Textarea,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import AnalyzeResult from "./result";
import { useState } from "react";
import { analyze, AnalyzedEssayType } from "../api";

const EssayAnalyzer = () => {
  const formMethods = useForm<{
    essay: string;
    topic: string;
  }>({
    values: {
      essay: "",
      topic: "",
    },
  });

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [analyzedData, setAnalyzedData] = useState<
    AnalyzedEssayType | null | undefined
  >(null);

  const analyzeEssay = formMethods.handleSubmit(async (values) => {
    setIsLoading(true);
    const { essay } = values;
    const result = await analyze(essay);
    console.log(result);
    setAnalyzedData(result);
    setIsLoading(false);
  });

  return (
    <Box height="100vh" width="100vw" backgroundColor="gray" p={7}>
      <Stack backgroundColor="white" borderRadius="lg" p={5} height="100%">
        <Heading>Essay Analyzer</Heading>
        <Stack justifyContent="center" height="100%" gap={3}>
          <FormControl>
            <FormLabel>Topic of essay (optional)</FormLabel>
            <Input
              width={"100%"}
              placeholder="Input topic"
              {...formMethods.register("topic")}
            />
          </FormControl>
          <Textarea
            width="100%"
            height="100%"
            placeholder="Enter your essay"
            {...formMethods.register("essay")}
          />
          <HStack justifyContent="flex-end">
            <AnalyzeResult
              isLoading={isLoading}
              result={analyzedData}
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
