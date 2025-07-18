import { z, ZodRawShape } from "zod";

export const paidInputSchema = {
  payment_hash: z
    .string()
    .nullish()
    .describe("the payment hash of the paid invoice, optional"),
};

export const paidOutputSchema = {
  payment_instructions: z
    .string()
    .nullish()
    .describe("whether the requested tool requires payment"),
  payment_request: z
    .string()
    .nullish()
    .describe("invoice to be paid to use the requested tool"),
  payment_hash: z
    .string()
    .nullish()
    .describe(
      "payment hash of the invoice to be paid to use the requested tool"
    ),
};

export function paidConfig<
  T extends {
    inputSchema?: ZodRawShape;
    outputSchema?: ZodRawShape;
  }
>(config: T) {
  const optionalOutputSchema: ZodRawShape = {};
  if (config.outputSchema) {
    for (const entry of Object.entries(config.outputSchema)) {
      optionalOutputSchema[entry[0]] = entry[1].optional();
    }
  }

  return {
    ...config,
    inputSchema: {
      ...(config.inputSchema || {}),
      ...paidInputSchema,
    },
    outputSchema: {
      ...optionalOutputSchema,
      ...paidOutputSchema,
    },
  };
}
