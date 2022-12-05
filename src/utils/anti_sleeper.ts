import logger from "./logger";
import axios from 'axios';


export function antiSleeper() {
  setInterval( () => {
    let PORT = process.env.PORT || 3001;
    axios.get(`https://libras.onrender.com`);
    logger.info('## anti sleeper ##');
  }, 10*1000*60);
}