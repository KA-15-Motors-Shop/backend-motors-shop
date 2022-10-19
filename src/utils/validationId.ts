import { version, validate } from "uuid";

export const validationId = (id: string) => {
  return validate(id) && version(id) === 4;
};
