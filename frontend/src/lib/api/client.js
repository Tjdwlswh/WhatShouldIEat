import axios from 'axios';

const client = axios.create();
client.defaults.withCredentials = true;

export default client;
