export type ValidationStatus =
  | "VALID"
  | "INVALID OBJECT"
  | "INVALID NAME"
  | "INVALID ACTIVITY"
  | "INVALID ACTIVITY ARRAY"
  | "UNABLE TO LOAD DATA"
  | "UNDEFINED";

export default class Validation {
  #validationStatus: ValidationStatus;

  constructor() {
    this.#validationStatus = "UNABLE TO LOAD DATA";
  }

  public get validationStatus(): ValidationStatus {
    return this.#validationStatus;
  }

  public set validationStatus(v: ValidationStatus) {
    this.#validationStatus = v;
  }

  public isErrorFindData(data: unknown): ValidationStatus {
    const obj = data as Record<string, unknown>;
    if (
      this.#isValidObject(data) &&
      this.#isValidName(data) &&
      this.#isValidActivityArray(obj.activities)
    ) {
      this.#validationStatus = "VALID";
    }
    return this.#validationStatus;
  }

  #isValidObject(data: unknown): boolean {
    this.#validationStatus = "INVALID OBJECT";
    return data !== undefined && data !== null && typeof data === "object";
  }

  #isValidName(data: unknown): boolean {
    this.#validationStatus = "INVALID NAME";
    const obj = data as Record<string, unknown>;
    return typeof obj.name === "string" && obj.name.length > 0;
  }

  #isValidActivityArray(array: unknown) {
    this.#validationStatus = "INVALID ACTIVITY ARRAY";
    return Array.isArray(array) && array.every(this.#isValidActivity);
  }

  #isValidActivity = (activity: unknown): boolean => {
    this.#validationStatus = "INVALID ACTIVITY";
    const obj = activity as Record<string, unknown>;
    return (
      typeof obj.activity_name === "string" &&
      typeof obj.order === "number" &&
      Array.isArray(obj.questions)
    );
  };
}
