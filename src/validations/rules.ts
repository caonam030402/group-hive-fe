import { messageValidation } from "@/constants";

export const emailRules = {
  required: {
    value: true,
    message: messageValidation({ field: "email" }).isRequired,
  },
  pattern: {
    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
    message: messageValidation({ field: "email" }).isValid,
  },
  minLength: {
    value: 5,
    message: messageValidation({ min: 5 }).minCharacters,
  },
  maxLength: {
    value: 100,
    message: messageValidation({ max: 100 }).maxCharacters,
  },
};
