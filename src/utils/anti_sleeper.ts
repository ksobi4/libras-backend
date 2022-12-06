import logger from "./logger";
import axios from 'axios';


export function antiSleeper() {
  setInterval( () => {
    axios.get(`https://libras.onrender.com`);
    //logger.info('## anti sleeper ##');
  }, 14*1000*60);
}