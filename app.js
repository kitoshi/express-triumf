import express from 'express';
import fetch from 'node-fetch';
import xmlparser from 'express-xml-bodyparser';

const app = express();
const port = 8081;

app.use(xmlparser());

app.get(`/`, async function (req, res) {
  const url =
    'https://beta.hla.triumf.ca/jaya-isac/IOS:XCB1AW:RDVOL+IOS:XCB1AE:RDVOL+IOS:PSWXCB1A:STATON';
  const options = {
    method: 'GET'
  };
  try {
    let response = await fetch(url, options);
    console.log(response.body);
    res.status(200);
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: `Internal Server Error.` });
  }
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
