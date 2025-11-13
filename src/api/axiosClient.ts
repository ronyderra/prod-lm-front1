import axios from 'axios';

export const axiosClient = axios.create({
  baseURL: 'https://lm-back-f1ed4b6fed3f.herokuapp.com', // your API base URL
});
