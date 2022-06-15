import axios from "axios";

const clientID = process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID;
const clientSecret = process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_SECRET;
const webURI = process.env.NEXT_PUBLIC_WEB_URI;


// TODO Find time to make this work currently not necessary


// export default async function handler(req: any, res: any) {
//   const authCode = req.query["authCode"];

//   const response = axios.get("https://accounts.spotify.com/api/token?code="+encodeURI(authCode)+"&redirect_uri="+encodeURI(webURI? webURI : "")+ "/callback/", {
//     headers: {
//       Accept: "application/json",
//       "Content-Type": "application/json",
//       Authorization:
//         "Basic " + new Buffer(clientID + ":" + clientSecret).toString("base64"),
//     },
//   });

//   console.log(response);
// }
