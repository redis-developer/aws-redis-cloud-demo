import axios from "axios";

const restApiServer = (process.env.VUE_APP_SEARCH_API || "http://localhost:3000/dev");



export const SearchClient = {

    async status() {
        return "OK";
    },

    async search(queryString, page, perPage, sortBy, server) {

        let restServer = restApiServer;  
        
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
        let restServer = restApiServer;  

        let url = `${restServer}/movies/group_by/${field}`;
        console.log(`Calling (${server}) : ${url}`);
        return axios.get(url);
    }
 

}