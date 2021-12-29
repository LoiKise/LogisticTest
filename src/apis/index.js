import axios from "axios";
import { ACCESS_TOKEN } from "./../utils/constant";

// Syntax
// requestAPI('/search', 'POST', {code}, { Authorization: `Bearer ${localStorage.getItem('TOKEN')}` })
export default async function requestAPI(url, method, body) {
  let urlOrigin = "https://serverlogistics.herokuapp.com"; //http://localhost:3000
  const headers = {
    "Content-Type": "application/json",
    // 'Content-Type': 'multipart/form-data',
    "Access-Control-Allow-Origin": "*",
    Authorization: `Bearer ${ACCESS_TOKEN()}`,
    // ...injectHeader
  };

  let objMeta = {
    method,
    url: `${urlOrigin}${url}`,
    headers,
    data: body,
  };
  return await axios(objMeta);
}
