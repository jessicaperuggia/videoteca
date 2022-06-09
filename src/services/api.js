import axios from 'axios';

// BASE DA URL: https://api.themoviedb.org/3
// URL DA API: /movie/now_playing?api_key=a22253fd590ca44724031ea6bf4912aa&language=pt-BR

const api = axios.create({
  baseURL: 'https://api.themoviedb.org/3'
});

export default api;