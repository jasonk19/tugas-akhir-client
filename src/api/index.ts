import axios from "axios";

type SentenceCorrectionsType = {
  original: string;
  revised: string;
};

type AnalyzedEssayType = {
  essay: string;
  prediction: string;
  corrections: SentenceCorrectionsType[];
};

export const analyze = async (essay: string) => {
  const response = await axios.post<AnalyzedEssayType>(
    import.meta.env.VITE_API_URL,
    { essay }
  );

  return response.data;
};
