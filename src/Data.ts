import { ActivityNum, ErrorFindData, IActivityTwo, IQuestion } from "./types/Dto";
import { AllRoundOfQuestions } from "./types/PropTypes";

/**
 * Converts both activity one and activity two data into an AllRoundOfQuestions format.
 * Activity two converts directly. Activity one requires a default empty round title.
 * @param activity
 * @param data
 * @returns
 */
export function prepareRoundData(activity: ActivityNum, data: ErrorFindData): AllRoundOfQuestions {
  let allRounds: AllRoundOfQuestions = {
    allRounds: [
      {
        round_title: "",
        order: -1,
        questions: [] as IQuestion[],
      },
    ],
  };
  if (activity === "ONE") {
    allRounds = {
      allRounds: [
        {
          round_title: "",
          order: data.activities[0].order,
          questions: data.activities[0].questions as IQuestion[],
        },
      ],
    };
  }

  if (activity === "TWO") {
    allRounds = { allRounds: data.activities[1].questions as IActivityTwo[] };
  }

  return allRounds;
}
