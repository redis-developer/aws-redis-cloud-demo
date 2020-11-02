import { APIGatewayProxyHandler } from "aws-lambda";
import "source-map-support/register";
import * as client from "./utils/redis";
import * as responseHandler from "./utils/responseHandler";

export const moviesListHandler: APIGatewayProxyHandler = async (
  _event,
  _context
) => {
  try {
    let movies = await client.keys("user:*");
    movies = await Promise.all(
      movies.map(async (movieName) => {
        const movieDetails = await client.hgetall(movieName);
        return movieDetails;
      })
    );
    return responseHandler.successMessage({
      data: movies,
    });
  } catch (e) {
    return responseHandler.errorMessage({
      errorCode: 500,
      errorMessage: e.message,
    });
  }
};
