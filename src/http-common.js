import axios from 'axios';
// import * as https from "https";
// import * as fs from "fs";

// require(`dotenv`).load('.env');
// const cert = fs.readFileSync("./ssl/server.crt");
/* const agent = new https.Agent({
  requestCert: true,
  rejectUnauthorized: false,
}); */
export default axios.create({
  // url: 'https://localhost:8443/api',
  baseURL: 'http://106.109.40.63:8081/api',
  // httpsAgent: agent,
  headers: {
    'Content-type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Credentials': 'true',
    'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
  },
});
