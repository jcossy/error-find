import { MouseEvent } from "react";
import { ActivityNum, ErrorFindData } from "../types/Dto";

/**
 * Object for Active buttons. Buttons are disabled by default. disabled = true
 */
const isDisabledActivity: { [key: string]: boolean } = {
  "Activity One": true,
  "Activity Two": true,
  "Activity Three": true,
  "Activity Four": true,
  "Activity Five": true,
};

/**
 * Activates buttons based on information in errorFind data.
 * @param data - input data (e.g. from api)
 */
export function initEnabledButtons(data: ErrorFindData) {
  console.log("initialiseEnabledButtons");
  data.activities.forEach((activity) => {
    isDisabledActivity[activity.activity_name] = false;
  });
}

const activityToNum: { [key: string]: ActivityNum } = {
  "Activity One": "ONE",
  "Activity Two": "TWO",
  "Activity Three": "THREE",
  "Activity Four": "FOUR",
  "Activity Five": "FIVE",
};

type ActivityClick = {
  click: (event: MouseEvent<HTMLButtonElement>) => void;
};

type ButtonProp = {
  click: ActivityClick;
  isDisabled: boolean;
  num: ActivityNum;
};

/**
 * Sets up activity buttons. If activity is in errorfind data the button is enabled.
 *
 * @param click - handler for activity button
 * @returns - view of buttons
 */
export function Buttons(click: ActivityClick) {
  console.log("In Buttons");
  return (
    <>
      <div className="home-button-container">
        {Object.keys(isDisabledActivity).map((activity) => (
          <Button
            key={activityToNum[activity]}
            click={click}
            isDisabled={isDisabledActivity[activity]}
            num={activityToNum[activity]}
          />
        ))}
      </div>
    </>
  );
}

/**
 * Sets up view for single button.
 *
 * @param - click: activity handler, isDisabled: is the button clickable, num: attribute id for button
 * @returns -button view
 */
function Button({ click, isDisabled, num }: ButtonProp) {
  return (
    <button
      className="home-activity-button"
      attribute-activity-number={num}
      disabled={isDisabled}
      onClick={click.click}
    >
      ACTIVITY {num}
    </button>
  );
}
