import express from 'express';
import fetch from 'node-fetch';
const app = express();
const port = 8081;

app.get(`/`, async function (req, res) {
  const url =
    'https://beta.hla.triumf.ca/jaya-isac/IOS:XCB1AW:RDVOL+IOS:XCB1AE:RDVOL+IOS:PSWXCB1A:STATON';
  const options = {
    method: 'GET'
  };
  try {
    let response = await fetch(url, options);
    response = await JSON.parse(response.body);
    console.log(response);
    res.status(200);
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: `Internal Server Error.` });
  }
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
