const express = require("express");
const axios = require('axios');

const app = express();

app.set("port", process.env.PORT || 3001);

const headers = {
  'Authorization': 'Bearer 134b4867-2750-4181-a431-ee7cb84690e3',
  'Content-Type': 'application/json',
  'X-Sqsp-Website-Id': '5d11429247ab1f0001b96d2f',
  'X-Sqsp-Auth-Scope': 'PRODUCT',
  'X-Sqsp-Api-Key-Name': 'Products',
};

const baseURL = 'https://api.squarespace.com';

app.get("/products", (req, res) => {
    const instance = axios.create({
        baseURL,
        headers
      });

    instance.get('/0.1/commerce/products')
      .then(resp => {
          res.json(resp.data);
      }).catch(error => {
          res.json(error);
      })
});

app.get("/product/:productId", (req, res) => {
  const instance = axios.create({
      baseURL,
      headers
    });

  instance.get(`/0.1/commerce/products/${req.params.productId}`)
    .then(resp => {
        res.json(resp.data.products);
    }).catch(error => {
        res.json(error);
    })
});

app.listen(app.get("port"), () => {
  console.log(`Find the server at: http://localhost:${app.get("port")}/`); // eslint-disable-line no-console
});
