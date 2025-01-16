import { jwtDecode } from "jwt-decode";
import userSession from "../util/user-session";

export default defineEventHandler(async (event) => {
const session=await userSession(event)
  try{
    if (session.data.jwtToken) {
      const jwtToken = session.data.jwtToken;
      const decodeToken = jwtDecode(jwtToken);
      return decodeToken;
    }
  }
  catch(err){
    console.log("error in jwtToken",err)
  }
 
});
