import { z } from "zod";

import { messageValidation } from "@/constants/message";

const workSpaceValidation = z.object({
  name: z
    .string({
      message: messageValidation({ field: "name" }).isRequired,
    })
    .min(6, { message: messageValidation({ min: 6 }).minCharacters })
    .max(30, { message: messageValidation({ max: 30 }).maxCharacters }),
});

export default workSpaceValidation;

export type AuthValidation = z.infer<typeof workSpaceValidation>;
