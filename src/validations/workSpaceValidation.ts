import { z } from "zod";

import { messageValidation } from "@/constants/message";

const workSpaceValidation = z.object({
  name: z
    .string({
      message: messageValidation({ field: "name" }).isRequired,
    })
    .min(6, { message: messageValidation({ min: 6 }).minCharacters })
    .max(30, { message: messageValidation({ max: 30 }).maxCharacters }),
  industry: z
    .string({
      message: messageValidation({ field: "industry" }).isRequired,
    })
    .trim()
    .min(1, {
      message: messageValidation({ min: 1, field: "industry" }).isRequired,
    }),

  size: z
    .string({
      message: messageValidation({ field: "size" }).isRequired,
    })
    .trim()
    .min(1, {
      message: messageValidation({ min: 1, field: "size" }).isRequired,
    }),

  region: z
    .string({
      message: messageValidation({ field: "region" }).isRequired,
    })
    .trim()
    .min(1, {
      message: messageValidation({ min: 1, field: "region" }).isRequired,
    }),
  terms: z
    .boolean({
      message: messageValidation({ field: "terms" }).isRequired,
    })
    .refine((val) => val === true, {
      message: messageValidation({ field: "terms" }).isRequired,
    }),
});

export default workSpaceValidation;

export type WorkSpaceValidation = z.infer<typeof workSpaceValidation>;
