import axios from "axios";


export const CommentsClient = {

    async status() {
        return "OK";
    },

    getCommentById(server, id) {
        let restServer = server;
        let url = `${restServer}/${id}`;
        console.log(`Calling (${server}) : ${url}`);
        return axios.get(url);
    },

    deleteCommentById(server, id) {
        let restServer = server;
        let url = `${restServer}/${id}`;
        console.log(`Calling (${server}) : ${url}`);
        return axios.delete(url);
    },

    getMovieComment(server, movieId) {
        let restServer = server;
        let url = `${restServer}/movies/${movieId}/comments`;
        console.log(`Calling ${url}`);
        return axios.get(url);
    },

    saveNewComment(server, comment) {
        let restServer = server;
        let url = `${restServer}/`;
        console.log(`Calling POST ${url}`);
        return axios.post(url, comment, {headers: {'Content-Type': 'application/json'}});
    },

}