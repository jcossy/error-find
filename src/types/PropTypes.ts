import { AnswerType } from "./AppTypes";
import { IQuestion } from "./Dto";
import { ResultsController } from "../components/Results";

export type QuestionsProp = {
  questions: IQuestion[];
  resultsController: ResultsController;
  nextRound: () => void;
};

export type RoundOfQuestions = {
  round_title: string;
  order: number;
  questions: IQuestion[];
};

export type AllRoundOfQuestions = {
  allRounds: RoundOfQuestions[];
};

export type RoundHeadingType = {
  index: number;
  isDisplayed: boolean;
};

export type ResultItem = {
  questionId: number;
  result: AnswerType;
};

export type RoundOfResults = {
  heading: RoundHeadingType;
  results: ResultItem[];
};

export type RoundsOfResults = {
  activity_title: string;
  rounds: RoundOfResults[];
};
