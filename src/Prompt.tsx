import { RoundOfQuestions } from "./PropTypes";

const ACTIVITY_TWO = "ACTIVITY TWO";

export const Prompt = ({ round_title }: RoundOfQuestions): JSX.Element => {
  return (
    <>
      <div className="activity-two-prompt-container">
        <div className="activity-two-prompt-name">{ACTIVITY_TWO}</div>
        <div className="activity-two-prompt-round">{round_title.toUpperCase()}</div>
      </div>
    </>
  );
};
