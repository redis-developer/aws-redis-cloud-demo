import { APIGatewayProxyHandler } from "aws-lambda";
import "source-map-support/register";
import * as client from "./utils/redis";
import * as responseHandler from "./utils/responseHandler";
import { timer } from "./utils/timeUtils";

export const moviesListHandler: APIGatewayProxyHandler = async (
  _event,
  _context
) => {
  try {
    const benchmark = timer("listmovies");
    let [, movies] = await client.scan([
      "0",
      "MATCH",
      "movie:*",
      "COUNT",
      "10000",
    ]); 
    movies = await Promise.all(
      movies.map(async (movieName) => {
        const movieDetails = await client.hgetall(movieName);
        return movieDetails;
      })
    );
    benchmark.stop();
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

export const moviesGetHandler: APIGatewayProxyHandler = async (
  event,
  _context
) => {
  try {
    const benchmark = timer("getmovie");
    const movieId: string = event.pathParameters.id;
    const movie = await client.hgetall(movieId);
    benchmark.stop();
    return responseHandler.successMessage({
      data: movie,
    });
  } catch (e) {
    return responseHandler.errorMessage({
      errorCode: 500,
      errorMessage: e.message,
    });
  }
};
