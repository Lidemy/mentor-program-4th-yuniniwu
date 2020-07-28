const request = require("request");
const process = require("process");
const baseURL = "https://restcountries.eu/rest/v2/name";

request(`${baseURL}/${process.argv[2]}`, function (error, response, body) {
  if (error !== null) {
    console.error("error:", error);
  } else if (response.statusCode === 404) {
    console.log("找不到國家資訊");
  }
  const data = JSON.parse(body);
  for (let i = 0; i < data.length; i++) {
    console.log(`============
國家：${data[i].name}
首都：${data[i].capital}
貨幣：${data[i].currencies[0].code}
國碼：${data[i].callingCodes}`);
  }
});
