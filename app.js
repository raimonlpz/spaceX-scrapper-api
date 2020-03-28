const request = require("request");
const fs = require("fs");

let url = "https://api.spacexdata.com/v3/launches/";

const dataScrapper = cb => {
  request({ url, json: true }, (error, response) => {
    if (error) {
      return console.log("No internet connection. Try again later..");
    }
    let data = response.body;
    for (mission of data) {
      cb(mission);
    }
  });
};

const dataFetcher = data => {
  if (!fs.existsSync("./spaceX")) {
    fs.mkdirSync("./spaceX");
  }
  let missionName = data.mission_name;
  let parseData = JSON.stringify(data);
  fs.writeFileSync(`./spaceX/${missionName}.json`, parseData);
};

const dataSearch = (data, search, filter) => {
  if (search == "all") {
    dataFetcher(data);
    console.log(data.mission_name);
  } else if (filter) {
    if (data[search] == filter) {
      dataFetcher(data);
      console.log(data.mission_name);
    } else if (filter == "true" || filter == "false") {
      filter = filter == "true";
      if (data[search] == filter) {
        dataFetcher(data);
        console.log(data.mission_name);
      }
    } else if (search == "rocket") {
      if (data[search].rocket_name == filter) {
        dataFetcher(data);
        console.log(data.mission_name);
      }
    } else if (search == "launch_site") {
      if (data[search].rocket_name == filter) {
        dataFetcher(data);
        console.log(data.mission_name);
      }
    }
  }
};

if (process.argv.length > 2) {
  dataScrapper(data => {
    dataSearch(data, process.argv[2], process.argv[3]);
  });
} else {
  console.log("No commands...");
}
