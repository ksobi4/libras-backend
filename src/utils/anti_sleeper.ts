import logger from "./logger";
import axios from 'axios';


export function antiSleeper() {
  setInterval( () => {
    let PORT = process.env.PORT || 3001;
    axios.get(`http://10.0.2.2:${PORT}/`);
    logger.info('## anti sleeper ##');
  }, 0.2*1000*60);
}