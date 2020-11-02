import { APIGatewayProxyResult } from "aws-lambda";

export function successMessage({
  data,
}: SucccessResponsePayload): APIGatewayProxyResult {
  return {
    statusCode: 200,
    body: JSON.stringify(data),
  };
}

export function errorMessage({
  errorCode,
  errorMessage,
}: ErrorResponsePayload): APIGatewayProxyResult {
  return {
    statusCode: errorCode,
    body: JSON.stringify(errorMessage),
  };
}

type SucccessResponsePayload = {
  data: Object;
};
type ErrorResponsePayload = {
  errorCode: number;
  errorMessage: string;
};
