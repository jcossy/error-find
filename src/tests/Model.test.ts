import React from "react";
import { makeBoldStimulus } from "../Model";

test("Should return object containing stimulus, sectioned as start, bold and end strings", () => {
  const stimulus = `You *should teach* English`;
  const expected = {
    start: "You ",
    bold: "*should teach*",
    end: " English",
  };
  expect(makeBoldStimulus(stimulus)).toStrictEqual(expected);
});
