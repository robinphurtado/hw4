const express = require('express');
const fetch = require("node-fetch");
const Quote = require('inspirational-quotes');



const app = express();
app.set("view engine", "ejs");
app.use(express.static("public"));


//routes
app.get('/', (req, res) => {
  res.render('index');
});

app.get('/how', async (req, res) => {
  let url = `https://api.ipify.org/?format=json`;
  let response = await fetch(url);
  let data = await response.json();
  let ipAdd = data.ip;
  console.log(ipAdd);
  let url2 = `https://ipinfo.io/${ipAdd}/geo`;
  let locResponse = await fetch(url2);
  let data2 = await locResponse.json();
  console.log(data2);
  let locData = data2.city + " " + data2.region;
  console.log(locData);
  res.render('how', { "visitorsIP": ipAdd, "visitorsLocation": locData })
});

app.get('/breaches', (req, res) => {
  res.render('breaches');
});

app.get('/protect-yourself', (req, res) => {
  res.render('protect-yourself');
});

app.get('/go-in-peace', async (req, res) => {
  let newQuote = Quote.getRandomQuote({ author: false });
  console.log(newQuote);
  res.render('go-in-peace', { "inspQuote": newQuote });
});

app.listen(3000, () => {
  console.log('server started');
});