import axios from 'axios';

// creating an instance of axios with a base url as :-
const instance = axios.create(
    {
        baseURL: "https://api.themoviedb.org/3",
    }
);

export default instance;