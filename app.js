import express from "express";
import fetch from "node-fetch";
import bodyParser from "body-parser";
import convert from "xml-js";
import cors from "cors";
import { parse_xml } from "./test.js";

const app = express();
const port = 8081;

app.use(cors());

app.get(`/`, async function (req, res) {
  const url =
    "https://beta.hla.triumf.ca/jaya-isac/IOS:XCB1AW:RDVOL+IOS:XCB1AE:RDVOL+IOS:PSWXCB1A:STATON";
  const options = {
    method: "GET",
  };
  try {
    let response = await fetch(url, options);
    const text = await response.text();
    const xmlObject = JSON.parse(convert.xml2json(text));
    // res.status(200).json(xmlObject);
    let data = parse_xml(xmlObject);
    res.status(200).json(data[0]);
    // console.log(JSON.parse(convert.xml2json(text)));
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: `Internal Server Error.` });
  }
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
