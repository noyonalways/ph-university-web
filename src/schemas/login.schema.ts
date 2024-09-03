import { z } from "zod";

export const userLoginSchema = z.object({
  userId: z.string({ required_error: "Please enter a User ID" }),
  password: z.string({ required_error: "Please enter a Password" }),
});
