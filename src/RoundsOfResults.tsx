import { useEffect, useRef, useState } from "react";
import App from "./App";
import { RoundOfResults, RoundsOfResults } from "./PropTypes";

import Results, { ResultsController } from "./Results";

const resultControllers: ResultsController[] = [];

const roundsOfResults: RoundOfResults[] = [];

/**
 * Object that can contain multiple result controllers. Provides functionality to add
 * a controller and to generate the data for a round of results.
 */
export const roundsOfResultsController = {
  addController: (controller: ResultsController) => {
    resultControllers.push(controller);
  },
  getRounds: (activityTitle: string): RoundsOfResults => {
    const len = resultControllers.length;
    for (let i = 0; i < len; i++) {
      const c = resultControllers[i];
      let isDisplayed = len <= 1 ? false : true;
      let round = { heading: { index: i + 1, isDisplayed: isDisplayed }, results: c.getResult() };
      roundsOfResults.push(round);
    }
    return { activity_title: activityTitle, rounds: roundsOfResults };
  },
  clearAll: () => {
    resultControllers.length = 0;
    roundsOfResultsController.getRounds("").rounds.length = 0;
  },
};

const ResultsView = (rounds: RoundsOfResults): JSX.Element => {
  const roundsScroll = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (roundsScroll.current && rounds.activity_title === "ACTIVITY TWO") {
      roundsScroll.current.className = "with-scroll";
    }
  });
  return (
    <>
      <h3>{rounds.activity_title}</h3>
      <div className="results-title">
        <h1>Results</h1>
      </div>
      <div className="no-scroll" ref={roundsScroll}>
        {rounds.rounds.map((round) => (
          <div key={round.heading.index}>
            <Results {...round} />
          </div>
        ))}
      </div>
    </>
  );
};

export function RoundsOfResultsView({ ...rounds }: RoundsOfResults): JSX.Element {
  const [displayed, isDisplayed] = useState(true);

  function handleBack() {
    console.log("in handleback");
    roundsOfResultsController.clearAll();
    isDisplayed(false);
  }

  return (
    <>
      <div className="results-container">
        {displayed ? <ResultsView {...rounds} /> : null}
        {displayed ? <button onClick={handleBack}>HOME</button> : null}
      </div>
      {!displayed ? <App /> : null}
    </>
  );
}
