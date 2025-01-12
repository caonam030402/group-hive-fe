import { z } from "zod";

import { messageValidation } from "@/constants/message";

// eslint-disable-next-line prefer-regex-literals
const passwordValidation = new RegExp(
  /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/,
);

const authValidation = z.object({
  email: z
    .string({ message: messageValidation({ field: "email" }).isRequired })
    .min(6, { message: messageValidation({ min: 6 }).minCharacters })
    .email({ message: messageValidation({ field: "email" }).isValid }),
  password: z
    .string({ message: messageValidation({ field: "password" }).isRequired })
    .max(20)
    .regex(passwordValidation, {
      message: messageValidation({ field: "password" }).passwordRule,
    }),
  firstName: z
    .string({ message: messageValidation({ field: "firstName" }).isRequired })
    .min(1, { message: messageValidation({ min: 3 }).minCharacters })
    .max(10, {
      message: messageValidation({ max: 10 }).maxCharacters,
    }),
  lastName: z
    .string({ message: messageValidation({ field: "lastName" }).isRequired })
    .min(1, { message: messageValidation({ min: 3 }).minCharacters })
    .max(10, {
      message: messageValidation({ max: 10 }).maxCharacters,
    }),
  confirmPassword: z.string({
    message: messageValidation({ field: "confirmPassword" }).isRequired,
  }),
});

export default authValidation;

export type AuthValidation = z.infer<typeof authValidation>;
