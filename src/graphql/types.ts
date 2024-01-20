// src/graphql/types.ts or the file defined as baseTypesPath in your codegen configuration

// Define the Exact utility type
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K];
};
