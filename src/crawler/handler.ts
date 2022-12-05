import { LoginAndPassword } from "../types/login_and_password";
import { getLoginAndPassword } from "../utils/jwt.utils";
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

  getClient: async function (userId:string, token:string, ): Promise<Crawler> {
    try {
      this.list.forEach((client: Crawler) => {
        if(client.userUuid = userId) return client;
      })
  
      const tempClient = new Crawler();
  
      const loginAndPass: LoginAndPassword = getLoginAndPassword(token)

      await tempClient.auth(loginAndPass.login, loginAndPass.password);
      this.addClient(tempClient);

      return tempClient;
    } catch (e) {
      throw e;
    }
   
  }

}
export default clientHandler;