import { AnswerType } from "../types/AppTypes";
import { ResultItem, RoundHeadingType, RoundOfResults } from "../types/PropTypes";

export class ResultsController {
  #results: ResultItem[] = [];
  #index = 1;

  addResult(attempt: AnswerType) {
    this.#results.push({ questionId: this.#index, result: attempt });
    this.#index++;
  }
  getResult(): ResultItem[] {
    return this.#results;
  }
}

const RoundHeading = (heading: RoundHeadingType): JSX.Element => {
  return <h2>Round {heading.index}</h2>;
};

export default function Results(roundOfResults: RoundOfResults) {
  return (
    <>
      {roundOfResults.heading.isDisplayed ? <RoundHeading {...roundOfResults.heading} /> : null}
      {roundOfResults.results.map((resultItem) => (
        <div key={resultItem.questionId} className="results-questions-container">
          <h4>Q{resultItem.questionId}</h4>
          <h3> {resultItem.result}</h3>
        </div>
      ))}
    </>
  );
}
