import { useState } from "react";
import { makeBoldStimulus } from "../Model";
import { QuestionsProp } from "../types/PropTypes";

/**
 * Successively loads question views. For each question the resultsController is called to process results and sets up
 * next question view.
 *
 * @param questions - questions
 * @param resultsController - processes whether answer correct or false
 * @param nextRound - behaviour for next round.
 * @returns question view.
 */
export default function Questions({ questions, resultsController, nextRound }: QuestionsProp) {
  const [currentQuestion, setCurrentQuestion] = useState<number>(0);
  const [stimulus, setStimulus] = useState(() => makeBoldStimulus(questions[0].stimulus));
  const END_QUESTION = questions.length - 1;

  /**
   * positives and false postives
   */
  function handleCorrect() {
    resultsController.addResult(questions[currentQuestion].is_correct ? "CORRECT" : "FALSE");
    nextQuestion();
  }

  /**
   * negatives and false negatives
   */
  function handleIncorrect() {
    resultsController.addResult(questions[currentQuestion].is_correct ? "FALSE" : "CORRECT");
    nextQuestion();
  }

  function nextQuestion() {
    if (currentQuestion < END_QUESTION) {
      setCurrentQuestion(currentQuestion + 1);
      setStimulus(makeBoldStimulus(questions[currentQuestion + 1].stimulus));
    } else {
      setCurrentQuestion(0);
      nextRound(); // Change to nextRound
    }
  }

  return (
    <div className="question-container">
      <div className="question-id">Q{currentQuestion + 1}.</div>
      <div className="question-content">
        {stimulus.start}
        <strong>{stimulus.bold}</strong>
        {stimulus.end}
      </div>
      <div className="question-button-container">
        <button answer-attribute="CORRECT" className="question-button" onClick={handleCorrect}>
          CORRECT
        </button>
        <button answer-attribute="INCORRECT" className="question-button" onClick={handleIncorrect}>
          INCORRECT
        </button>
      </div>
    </div>
  );
}
