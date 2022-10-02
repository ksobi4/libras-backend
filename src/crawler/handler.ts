import { jwtData } from "../types/jwtData";
import { getPassword } from "../utils/jwt.utils";
import Crawler from "./crawler";

var clientHandler : {
  list: Crawler[];
  addClient: Function,
  getClient: Function,
} = {
  list: [],
  
  addClient : function(client: Crawler) {
    this.list.push(client);  
  },

  getClient: async function (user:jwtData, token:string): Promise<Crawler> {
    try {
      this.list.forEach((client: Crawler) => {
        if(client.userUuid = user.uuid) return client;
      })
  
      const tempClient = new Crawler();
  
      const password: string = getPassword(token)

      await tempClient.auth(user.login, password);
      this.addClient(tempClient);

      return tempClient;
    } catch (e) {
      throw e;
    }
   
  }

}
export default clientHandler;