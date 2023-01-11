export type ErrorFindData = {
  name: string;
  heading: string;
  activities: IActivity[];
};

/**
 * * name, order and array of questions. Array may contain rounds or just a single series of questions
 */
export type IActivity = {
  activity_name: string;
  order: number;
  questions: IActivityTwo[] | IQuestion[];
};

export type IActivityTwo = {
  round_title: string;
  order: number;
  questions: IQuestion[];
};

export type IQuestion = {
  is_correct: boolean;
  stimulus: string;
  order: number;
  user_answers: any[];
  feedback: string;
};

export type ActivityNum = "ONE" | "TWO" | "THREE" | "FOUR" | "FIVE";
