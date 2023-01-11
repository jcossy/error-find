import { useEffect, useState } from "react";
import { Prompt } from "./components/Prompt";
import { AllRoundOfQuestions, QuestionsProp, RoundsOfResults } from "./types/PropTypes";
import Questions from "./components/Questions";

import { ResultsController } from "./components/Results";
import { roundsOfResultsController, RoundsOfResultsView } from "./RoundsOfResults";

let resultsController: ResultsController = new ResultsController();
let results: RoundsOfResults = { activity_title: "", rounds: [] };
let roundCount = 0;

const PROMPT_TIMEOUT = 1000;

let roundTitle: string;

/**
 * RoundsOfQuestions - controls rounds of questions and coordinates prompt, activity and results views.
 * This component uses a resultsController to evaluate the response to the questions. Each time a round
 * of questions is completed the results are stored in a rounds of results controller.
 *
 * @param - RoundsofQuestions array i.e. AllRoundOfQuestions
 * @returns - one of prompt, activity or results views.
 */
export function RoundsOfQuestions({ allRounds }: AllRoundOfQuestions) {
  const [activityOneShown, isActivityOneShown] = useState<boolean>(
    allRounds[roundCount].round_title === ""
  );
  const [promptShown, isPromptShown] = useState<boolean>(true);
  const [activityShown, isActivityShown] = useState<boolean>(false);
  const [resultsShown, isResultsShown] = useState<boolean>(false);
  const [questionsAndResults, setQuestionsAndResults] = useState<QuestionsProp>({
    questions: allRounds[0].questions,
    resultsController: resultsController,
    nextRound: nextRound,
  });

  const ALL_ROUNDS_END = allRounds.length - 1;
  console.log("AllRoundsEnd: ", ALL_ROUNDS_END);
  console.log("QuestionsResults", questionsAndResults);

  // Briefly display round prompt before starting round
  useEffect(() => {
    if (promptShown && !activityOneShown) {
      setTimeout(() => showActivity(), PROMPT_TIMEOUT);
    }
    if (activityOneShown) {
      showActivity();
    }
  });

  function nextRound() {
    console.log("In nextRound");
    const moreRounds = roundCount < ALL_ROUNDS_END;
    if (moreRounds) {
      storeResultsAndGetNextQuestions();
      showPrompt();
    } else {
      console.log("In Else");
      finaliseState();
      isActivityOneShown(false);
      showResults();
    }
  }

  function finaliseState() {
    roundsOfResultsController.addController(resultsController); // add last controller
    results = roundsOfResultsController.getRounds(getActivityTitle());

    resultsController = new ResultsController();
    roundCount = 0;
  }

  function storeResultsAndGetNextQuestions() {
    addResultsToRounds();
    setQuestionsAndResults(() => {
      return {
        questions: allRounds[roundCount].questions,
        resultsController: resultsController,
        nextRound: nextRound,
      };
    });
  }

  function addResultsToRounds() {
    roundCount++;
    roundsOfResultsController.addController(resultsController); //roundsOfResultsData.add(resultsData)
    resultsController = new ResultsController();
  }

  function showActivity() {
    roundTitle = getRoundTitle();
    isPromptShown(false);
    isActivityShown(true);
  }
  function showPrompt() {
    isPromptShown(true);
    isActivityShown(false);
  }
  function showResults() {
    isPromptShown(false);
    isActivityShown(false);
    isResultsShown(true);
  }

  function getRoundTitle(): string {
    return allRounds[roundCount].round_title === ""
      ? "ACTIVITY ONE"
      : `ACTIVITY TWO / ${allRounds[roundCount].round_title.toUpperCase()}`;
  }

  function getActivityTitle(): string {
    return allRounds[roundCount].round_title === "" ? "ACTIVITY ONE" : "ACTIVITY TWO";
  }

  return (
    <>
      {promptShown ? <Prompt {...allRounds[roundCount]} /> : null}
      {activityShown ? <div className="activity-container activity-title">{roundTitle}</div> : null}
      {activityShown ? <Questions {...questionsAndResults} /> : null}
      {resultsShown ? <RoundsOfResultsView {...results} /> : null}
    </>
  );
}
