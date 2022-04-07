import { GenerateSqlReturn } from "../types";

export const generateSetSql = (args: Array<string[]>): GenerateSqlReturn => {
  const keyEqualsValueStatements = args.map(
    ([key], idx) => `${key} = $${idx + 1}`
  );
  return {
    setSqlStatement: `SET ${keyEqualsValueStatements}`,
    values: args.map(([, val]) => val),
  };
};
