import { APIGatewayProxyHandler } from "aws-lambda";
import "source-map-support/register";
import * as client from "./utils/redis";
import * as responseHandler from "./utils/responseHandler";
import { benchmarker } from "./utils/timeUtils";
import { SearchService } from "./services/SearchService";
import { Options } from "./models/handler";
const searchService = new SearchService();

export const moviesListHandler: APIGatewayProxyHandler = async (
  event,
  _context
) => {
  try {
    const {
      q: queryString,
      sortby: sortBy,
      ascending,
      limit,
      offset,
    } = event.queryStringParameters;

    let options: Options = {
      offset: offset ? Number(offset) : 0,
      limit: limit ? Number(limit) : 10,
      sortBy,
      ascending: sortBy ? true : !!ascending,
    };

    const data = await new Promise((resolve, reject) => {
      searchService.search(
        queryString, // query string
        options, // options
        function (err, result) {
          if (err) reject(err);
          resolve(result);
        }
      );
    });
    return responseHandler.successMessage({
      data,
    });
  } catch (e) {
    console.log(e);
    return responseHandler.errorMessage({
      errorCode: 500,
      errorMessage: e.message,
    });
  }
};

export const moviesGroupByHandler: APIGatewayProxyHandler = async (
  event,
  _context
) => {
  try {
    const { field } = event.pathParameters;
    const data = await new Promise((resolve, reject) => {
      searchService.getMovieGroupBy(field, function (err, result) {
        if (err) reject(err);
        resolve(result);
      });
    });
    return responseHandler.successMessage({
      data,
    });
  } catch (e) {
    console.log(e);
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
    const benchmark = benchmarker("getmovie");
    let movieId: string = event.pathParameters.id;
    // if the id does not start by "movie:" add it
    if (!movieId.startsWith("movie:")){
      movieId = "movie:"+ movieId;
    }
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

export const moviesSaveHandler: APIGatewayProxyHandler = async (
  event,
  _context
) => {
  try {
    const movie: any  = JSON.parse(event.body);
    let movieId: string = event.pathParameters.id;

    const data = await new Promise((resolve, reject) => {
      searchService.saveMovie(movieId, movie , function (err, result) {
        if (err) reject(err);
        resolve(result);
      });
    });
    return responseHandler.successMessage({
      data,
    });
  } catch (e) {
    console.log(e);
    return responseHandler.errorMessage({
      errorCode: 500,
      errorMessage: e.message,
    });
  }
};