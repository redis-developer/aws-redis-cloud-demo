import axios from "axios";


export const SearchClient = {

    async status() {
        return "OK";
    },

    async search(server, queryString, page, perPage, sortBy) {
        let restServer = server;  
        let offset = perPage * page;
        let limit = perPage;
        let url = `${restServer}/movies/search?q=${encodeURIComponent(queryString)}&offset=${offset}&limit=${limit}`;
        // add sort by if present
        if (sortBy) {
            let sortOptions = sortBy.split(":");
            url=url+`&sortby=${sortOptions[0]}&ascending=${sortOptions[1] === "asc"}`

        }           
        console.log(`Calling (${server}) : ${url}`);
        return axios.get(url);
    },

    async getMovieGroupBy(server, field) {
        let restServer = server;  
        let url = `${restServer}/movies/group_by/${field}`;
        console.log(`Calling (${server}) : ${url}`);
        return axios.get(url);
    },
 

    async getMovie(server, id) {
        let restServer = server;  
        let url = `${restServer}/movies/${id}`;
        console.log(`Calling ${url}`);
        return axios.get(url);
    },

    async updateMovie(server, id, movie) {
        let restServer = server;  
        let url = `${restServer}/movies/${id}`;
        console.log(`Calling POST ${url}`);
        return axios.post(url, movie);
    },

}