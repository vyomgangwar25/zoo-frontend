import { jwtDecode } from "jwt-decode";

export default defineEventHandler(async (event) => {
  const session = await useSession(event, {
    password: "80d42cfb-1cd2-462c-8f17-e3237d9027e9",
  }); 
  if(session.data.jwtToken)
  {
    const jwtToken = session.data.jwtToken;

    const decodeToken = jwtDecode(jwtToken);
    return decodeToken;
  }


})
