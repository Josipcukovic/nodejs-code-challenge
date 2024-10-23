import dotenv from "dotenv";
dotenv.config();

function getEnvironmentVariable(environmentVariable: string): string {
  const requestedEnvironmentVariable = process.env[environmentVariable];
  if (!requestedEnvironmentVariable)
    throw new Error(
      `${environmentVariable} environment variable couldn't be found!`
    );

  return requestedEnvironmentVariable;
}

export const config = {
  IM_SECRET: getEnvironmentVariable("IM_SECRET"),
};
