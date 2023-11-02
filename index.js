//imports
import express from "express";
import bodyParser from "body-parser";
import axios from "axios";

let app = express();
let port = 3000;
const categories = [
  "Any",
  "Miscellaneous",
  "Programming",
  "Dark",
  "Pun",
  "Spooky",
  "Christmas",
];
const lang = ["en", "es", "fr", "cs", "pt"];
const blackList = [
  "nsfw",
  "religious",
  "political",
  "racist",
  "sexist",
  "explicit",
];
const URL_API = "https://v2.jokeapi.dev/joke/";

//Allow the server to get the request
app.use(bodyParser.urlencoded({ extended: true }));

//allow the use of static files such as .css, .js, .png or other image type...
app.use(express.static("public"));

// get a random joke when the website loads for the 1st time or if typed the url localhpst:3000
app.get("/", async (req, res) => {
  let url_suffix = "Any?format=txt&lang=en&amount=1";
  try {
    const result = await axios.get(URL_API + url_suffix);
    res.render("index.ejs", { joke: result.data, type: "random" });
  } catch (error) {
    res.render("index.ejs", { joke: error.response, type: "random" });
  }
});

// if user selects random radio button, still get a random joke through post METHOD
app.post("/", async (req, res) => {
  console.log(req.body)
  let url_suffix = "Any?format=txt&lang=en&amount=1";
  try {
    const result = await axios.get(URL_API + url_suffix);
    res.render("index.ejs", { joke: result.data, type: "random" });
  } catch (error) {
    res.render("index.ejs", { joke: error.response, type: "random" });
  }
});

app.post("/random", async (req, res) => {
  let url_suffix = "Any?format=txt&lang=en&amount=1";
  try {
    const result = await axios.get(URL_API + url_suffix);
    res.render("index.ejs", { joke: result.data, type: "random" });
  } catch (error) {
    res.render("index.ejs", { joke: error.response, type: "random" });
  }
});

// get(s) joke(s) based on the selected criteria
app.post("/search", async (req, res) => {
  console.log(req.body);
  let categ = [];
  let exclusions = [];
  let selectedLang = "";
  try {
    for (let [key, value] of Object.entries(req.body)) {
      // checks if any categories where selected: Any, Miscellaneous, Programming, Dark, Pun, Spooky, Christmas
      if (categories.includes(value)) {
        categ.push(value);
      } else if (lang.includes(value)) { // Checks if any Languages where selected: en , es, pt, cs, fr        
        selectedLang = value;
      } else if (blackList.includes(key)) { // Checks if user selected any blackList: nsfw, religious, political, racist,sexist, explicit;        
        exclusions.push(key);
      }
    }
    // console.log("categ", categ, "lang", selectedLang, "blackList", exclusions); //log the selected options
    const result = await axios.get(URL_API + (categ.length > 0 ? categ.join(",") : categories[0]), {
      params: {
        lang: selectedLang === "" ? "en" : selectedLang, // if no language was selected then sets english lang as default
        blacklistFlags: exclusions.join(","),
        amount: 10, // will limit the result to ten records
      },
    });
    if (result.data.error) { // if no records where found sends a text from the message field
      res.render("index.ejs", {
        joke: result.data.message,
        type: "search",
        error: "eyes"
      });
    } else {
      res.render("index.ejs", { joke: result.data.jokes, type: "search", error: "no" }); // if records were found, send the records to the page      
    }
    // console.log("Results found", result.data.jokes, result.data);
  } catch (error) {
    res.render("index.ejs", { joke: result.data, type: "search", error: "yes" }); // something went wrong with the response    
  }
});

app.listen(port, (req, res) => {
  console.log(`Server is running on port ${port}`);
});
