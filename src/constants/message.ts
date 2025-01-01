export const messageValidation = ({
  min,
  max,
  field,
}: {
  min?: number;
  max?: number;
  field?: string;
}) => {
  return {
    minCharacters: `Must be at least ${min} characters`,
    maxCharacters: `Must be at most ${max} characters`,
    isRequired: `${field} is required`,
    isValid: ` ${field} is invalid`,
    passwordRule: `Minimum 8 characters, 1 uppercase, 1 lowercase, 1 number and 1 special character`,
  };
};
