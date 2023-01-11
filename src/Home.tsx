import { useState, MouseEvent } from "react";
import { Buttons, initEnabledButtons } from "./Buttons";
import { prepareRoundData } from "./Data";
import { ActivityNum, ErrorFindData } from "./Dto";
import { AllRoundOfQuestions } from "./PropTypes";
import { RoundsOfQuestions } from "./RoundsOfQuestions";

/**
 * General data format for a round of questions. The data format has a direct correspondance
 * with activity two. Activity one is adapted into an activity two.
 */
let allRounds: AllRoundOfQuestions;

/**
 * Sets up the Home view including setting up the activity buttons based on info in errorfind data.
 * On selecting an activity the relevant activities data is extracted and adapted into a general
 * AllRoundOfQuestions object.
 * Home component also coordinates Home view and Rounds view.
 *
 * @param data - errorfind data
 * @returns - either Home or RoundsOfQuestions view.
 */
export default function Home(data: ErrorFindData): JSX.Element {
  const [homeShown, isHomeShown] = useState<boolean>(true);

  initEnabledButtons(data);

  function showActivity(event: MouseEvent<HTMLButtonElement>) {
    event.preventDefault();
    const activityNum = event.currentTarget.getAttribute(
      "attribute-activity-number"
    ) as ActivityNum;
    allRounds = prepareRoundData(activityNum, data);
    isHomeShown(false);
  }

  return (
    <>
      {homeShown ? (
        <>
          <div className="home-container">
            <h3>CAE</h3>
            <div className="home-name">
              <h1>ERROR FIND</h1>
            </div>
          </div>
          <div className="home-button-container">
            <Buttons click={showActivity} />
          </div>
          <div className="home-button-container">
            <button disabled={true}>RESULTS</button>
          </div>
        </>
      ) : (
        <RoundsOfQuestions {...allRounds} />
      )}
    </>
  );
}
