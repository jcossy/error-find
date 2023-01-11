export function makeBoldStimulus(stimulus: string) {
  const start = stimulus.indexOf("*");
  const end = stimulus.lastIndexOf("*") + 1;

  return {
    start: stimulus.slice(0, start),
    bold: stimulus.slice(start, end),
    end: stimulus.slice(end),
  };
}
