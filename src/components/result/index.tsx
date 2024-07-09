import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Stack,
  Text,
  useDisclosure,
  Button,
  Spinner,
  HStack,
  Table,
  Thead,
  TableContainer,
  Tr,
  Tbody,
  Td,
  Th,
  SlideFade,
  Box,
} from "@chakra-ui/react";
import { AnalyzedEssayType } from "../../api";
import { useEffect, useState } from "react";
import { map } from "lodash";

type AnalyzeResultModalProps = {
  renderClick: ({ onOpen }: { onOpen: VoidFunction }) => JSX.Element;
  isLoading: boolean;
  result: AnalyzedEssayType | null | undefined;
};

const AnalyzeResult = ({
  renderClick,
  isLoading,
  result,
}: AnalyzeResultModalProps) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [originalEssay, setOriginalEssay] = useState<string[]>([]);
  const [revisedEssay, setRevisedEssay] = useState<string[]>([]);

  useEffect(() => {
    setOriginalEssay(
      map(result?.corrections, (c) => {
        const original = c.original.trim();
        const revised = c.revised.trim();

        if (original !== revised) {
          return "#" + original + " ";
        }

        return original + " ";
      })
    );

    setRevisedEssay(
      map(result?.corrections, (c) => {
        const original = c.original.trim();
        const revised = c.revised.trim();

        if (original !== revised) {
          return "#" + revised + " ";
        }

        return revised + " ";
      })
    );
  }, [result]);

  return (
    <>
      {renderClick({ onOpen })}

      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent minWidth="100vh">
          <ModalHeader>Analyzed Report</ModalHeader>
          <ModalCloseButton />
          {isLoading || !result ? (
            <ModalBody width="100%" height="100%">
              <HStack justifyContent="center" padding={10}>
                <Text>Analyzing</Text>
                <Spinner />
              </HStack>
            </ModalBody>
          ) : (
            <>
              <ModalBody width="100%" height="100%">
                <Stack gap={7}>
                  <SlideFade in={!!result}>
                    <Text
                      fontSize="small"
                      fontWeight={600}
                      borderBottom="1px solid"
                      borderColor="gray.300"
                      paddingBottom={2}
                      marginBottom={3}
                    >
                      Essay Features
                    </Text>
                    <TableContainer>
                      <Table variant="simple" size="sm">
                        <Thead>
                          <Tr>
                            <Th>Feature</Th>
                            <Th>Value</Th>
                          </Tr>
                        </Thead>
                        <Tbody>
                          <Tr>
                            <Td>Number Of Characters</Td>
                            <Td>{result.features.num_characters}</Td>
                          </Tr>
                          <Tr>
                            <Td>Number Of Words</Td>
                            <Td>{result.features.num_words}</Td>
                          </Tr>
                          <Tr>
                            <Td>Number Of Punctuations</Td>
                            <Td>{result.features.num_punctuation}</Td>
                          </Tr>
                          <Tr>
                            <Td>Number Of Nouns</Td>
                            <Td>{result.features.num_nouns}</Td>
                          </Tr>
                          <Tr>
                            <Td>Number Of Verbs</Td>
                            <Td>{result.features.num_verbs}</Td>
                          </Tr>
                          <Tr>
                            <Td>Number Of Adverbs</Td>
                            <Td>{result.features.num_adverbs}</Td>
                          </Tr>
                          <Tr>
                            <Td>Number Of Adjectives</Td>
                            <Td>{result.features.num_adjectives}</Td>
                          </Tr>
                          <Tr>
                            <Td>Number Of Conjunctions</Td>
                            <Td>{result.features.num_conjunctions}</Td>
                          </Tr>
                          <Tr>
                            <Td>Number Of Distinct Words</Td>
                            <Td>{result.features.num_distinct_words}</Td>
                          </Tr>
                          <Tr>
                            <Td>Number Of Misspellings</Td>
                            <Td>{result.features.num_misspellings}</Td>
                          </Tr>
                          <Tr>
                            <Td>Number Of Sentences</Td>
                            <Td>{result.features.num_sentences}</Td>
                          </Tr>
                          <Tr>
                            <Td>Average Word Length</Td>
                            <Td>{result.features.mean_word_length}</Td>
                          </Tr>
                          <Tr>
                            <Td>Average Clause Length</Td>
                            <Td>{result.features.avg_clause_length}</Td>
                          </Tr>
                          <Tr>
                            <Td>Average Sentence Length</Td>
                            <Td>{result.features.avg_sentence_length}</Td>
                          </Tr>
                          <Tr>
                            <Td>Variance of Sentence Length</Td>
                            <Td>{result.features.var_sentence_length}</Td>
                          </Tr>
                          <Tr>
                            <Td>
                              Average depth of the Syntax Tree of each Sentence
                            </Td>
                            <Td>{result.features.avg_syntax_tree_depth}</Td>
                          </Tr>
                          <Tr>
                            <Td>
                              Average depth of each leaf node of the Syntax Tree
                            </Td>
                            <Td>{result.features.avg_leaf_node_depth}</Td>
                          </Tr>
                          <Tr>
                            <Td>Number of words match with topic</Td>
                            <Td>{result.features.num_prompt_words}</Td>
                          </Tr>
                        </Tbody>
                      </Table>
                    </TableContainer>
                  </SlideFade>

                  <Stack gap={5}>
                    <SlideFade in={!!result} delay={1}>
                      <Text
                        fontSize="small"
                        fontWeight={600}
                        borderBottom="1px solid"
                        borderColor="gray.300"
                        paddingBottom={2}
                        marginBottom={3}
                      >
                        Sentence Corrections
                      </Text>
                      <TableContainer>
                        <Table variant="simple" size="sm" whiteSpace="wrap">
                          <Thead>
                            <Tr>
                              <Th>Original Sentence</Th>
                              <Th>Corrected Sentence</Th>
                            </Tr>
                          </Thead>
                          <Tbody>
                            {result.corrections.map((c) => (
                              <Tr>
                                <Td>{c.original}</Td>
                                <Td>{c.revised}</Td>
                              </Tr>
                            ))}
                          </Tbody>
                        </Table>
                      </TableContainer>
                    </SlideFade>

                    <SlideFade in={!!result} delay={2}>
                      <Stack
                        border="1px solid"
                        borderColor="gray.100"
                        padding={3}
                      >
                        <Text
                          fontSize="small"
                          fontWeight={600}
                          borderBottom="1px solid"
                          borderColor="gray.300"
                          paddingBottom={2}
                          marginBottom={3}
                        >
                          Essay Revisions
                        </Text>
                        <HStack gap={5}>
                          <Box textAlign="justify">
                            {originalEssay.map((s) => (
                              <Text
                                as="span"
                                backgroundColor={
                                  s.includes("#") ? "red.100" : undefined
                                }
                                fontSize="small"
                              >
                                {s.includes("#") ? s.split("#")[1] : s}
                              </Text>
                            ))}
                          </Box>
                          <Box textAlign="justify">
                            {revisedEssay.map((s) => (
                              <Text
                                as="span"
                                backgroundColor={
                                  s.includes("#") ? "green.100" : undefined
                                }
                                fontSize="small"
                              >
                                {s.includes("#") ? s.split("#")[1] : s}
                              </Text>
                            ))}
                          </Box>
                        </HStack>
                      </Stack>
                    </SlideFade>

                    <SlideFade in={!!result} delay={3}>
                      <Text
                        fontSize="small"
                        fontWeight={600}
                        borderBottom="1px solid"
                        borderColor="gray.300"
                        paddingBottom={2}
                        marginBottom={3}
                      >
                        Essay CEFR Level
                      </Text>
                      <HStack
                        alignItems="center"
                        justifyContent="flex-end"
                        gap={7}
                      >
                        <Text fontSize="3rem" fontWeight="bold">
                          {result.prediction}
                        </Text>
                      </HStack>
                    </SlideFade>
                  </Stack>
                </Stack>
              </ModalBody>

              <ModalFooter>
                <Button colorScheme="blue" mr={3} onClick={onClose}>
                  Reset
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};

export default AnalyzeResult;
