
import axios from 'axios';
import { API } from 'components/api';

export default API = axios.create({
  baseURL: 'https://cy6sl6kln2.execute-api.us-west-1.amazonaws.com/dev',
});
