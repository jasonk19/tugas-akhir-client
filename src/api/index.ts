import axios from "axios";

type SentenceCorrectionsType = {
  original: string;
  revised: string;
};

export type AnalyzedEssayType = {
  essay: string;
  features: {
    num_characters: number;
    num_words: number;
    num_punctuation: number;
    num_nouns: number;
    num_verbs: number;
    num_adverbs: number;
    num_adjectives: number;
    num_conjunctions: number;
    num_distinct_words: number;
    num_misspellings: number;
    mean_word_length: number;
    num_sentences: number;
    avg_clause_length: number;
    avg_sentence_length: number;
    var_sentence_length: number;
    avg_syntax_tree_depth: number;
    avg_leaf_node_depth: number;
    num_prompt_words: number;
  };
  prediction: string;
  corrections: SentenceCorrectionsType[];
};

const baseUrl = import.meta.env.VITE_API_URL;

export const analyze = async (essay: string) => {
  const response = await axios.post<AnalyzedEssayType>(`${baseUrl}/analyze`, {
    essay,
  });

  return response.data;
};
