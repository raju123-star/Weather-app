const express = require("express");
const bodyparser = require("body-parser");
const app = express();
app.use(bodyparser.urlencoded({
  extended: true
}));

const https = require("https");

const http = require("http").createServer(app);
const PORT = process.env.PORT || 3000;
http.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});

app.get("/", function(req, res) {
  res.sendFile(__dirname + "/index.html");

});

app.post("/", function(req, res) {

  const query = req.body.cityName;
  const firstLetter = query.slice(0, 1);
  const query10 = firstLetter.toUpperCase();
  const remLetters = query.slice(1, query.length);
  const query20 = remLetters.toLowerCase();
  const query30 = query10 + query20;
  const url = "https://api.openweathermap.org/data/2.5/weather?q= " + query30 + "&appid=a6c35988ba79c4593ca7647afc07f59c&units=metric";
  console.log(url)
  https.get(url, function(response) {

    console.log(response.statusCode);
    response.on("data", function(data) {

      const weatherData = JSON.parse(data);
      console.log(weatherData)
      const temp = weatherData.main.temp;
      const des = weatherData.weather[0].description;
      const vis = weatherData.visibility;
      const vis1 = vis / 1000;
      const firstLetter = des.slice(0, 1);
      const des10 = firstLetter.toUpperCase();
      const remLetters = des.slice(1, des.length);
      const des20 = remLetters.toLowerCase();
      const des30 = des10 + des20;
      const hum = weatherData.main.humidity;
      const icon = weatherData.weather[0].icon;
      const pres = weatherData.main.pressure;
      const image = "https://openweathermap.org/img/wn/" + icon + "@2x.png";

      res.write("<h1>The Temperature in " + query30 + " " + "is" + " " + "  " + temp + "  " + "degrees celsius</h1> ");
      res.write("<img src=" + image + ">");
      res.write("<h1>" + " " + des30 + "</h1>");
      res.write("<h2>Weather Report........ </h2>");
      res.write("<h4> Air Pressure :" + " " + pres + " hpa  </h4>")
      res.write("<h4>  Humidity :" + " " + hum + " % </h4>")
      res.write("<h4>  Visibility :" + " " + vis1 + " " + "km </h4>")
      res.send();
    })
  })

});
