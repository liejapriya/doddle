var http = require('http');
const express = require('express')
const app = express();
const bodyParser = require('body-parser')
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
const server = http.createServer(app);
const cors = require('cors');
const jwt = require('jsonwebtoken');
const expressJwt = require('express-jwt');
const conn = require('./connection');
const sendtoken = require('./Token').sendToken;
const insertProductDetail = require('./routes/product')
const showProductDetail = require('./routes/product')
const placeOrderDetail = require('./routes/product')
const checkToken = require('./routes/middleware').checkToken;
const updateOrderDetail = require('./routes/product');
const deleteOrder = require('./routes/product')
app.use(cors({
  "origin": "*",
  "methods": "GET,HEAD,PUT,PATCH,POST,DELETE",
  "preflightContinue": false,
  "optionsSuccessStatus": 204

}));

app.post('/home', (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*")
  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.setHeader("Access-Control-Max-Age", "1800");
  res.setHeader("Access-Control-Allow-Headers", "content-type");
  res.setHeader("Access-Control-Allow-Methods", "PUT, POST, GET, DELETE, PATCH, OPTIONS");

  res.json("sucess")
})
app.post('/insertProductDetail', checkToken, insertProductDetail.insertProductDetail)
app.get('/showProductDetail', showProductDetail.showProductDetail)
app.post('/placeOrderDetail', checkToken,placeOrderDetail.placeOrderDetail)
app.post('/updateOrderDetail', updateOrderDetail.updateOrderDetail)
app.delete('/deleteOrder', deleteOrder.deleteOrder)
app.post('/register', (req, res) => {

  var users = {
    "firstName": req.body.firstName,
    "lastName": req.body.lastName,
    "username": req.body.username,
    "password": req.body.password
  }
  var selectQuery = "select username from register where username=" + JSON.stringify(req.body.username) + "";
  conn.query(selectQuery, function (err, result) {

    if (result.length == 0) {
      conn.query('INSERT INTO register SET ?', users, function (error, results, fields) {
      });
      res.send({ data: "null" })
    }
    else {
      res.send({ data: "you have already registered" })
    }

  })

})

app.post('/users', (req, res) => {
  function callback(result) {
    res.send(JSON.stringify({ "status": 200, "errors": null, "response": result }));
  }
  var users = {
    "username": req.body.username,
    "password": req.body.password
  }
  var username = req.body.username;
  var password = req.body.password;
  var selectQuery = "select Id from register where firstName=" + JSON.stringify(username);
  conn.query(selectQuery, function (err, queryResponse) {
    // let response = JSON.stringify(queryResponse)
    console.log(queryResponse, "res");
    console.log(queryResponse.length, "length");

    if (queryResponse.length <= 0) {
      // console.log("null");
      callback({ token: null })

      // res.send("null")     
    }
    else {
      sendtoken(queryResponse, callback, queryResponse.Id);

    }

    // else if (queryResponse[0].token != null) {
    //   res.send(JSON.stringify(queryResponse[0].token));
    // }

  })

})

server.listen(3000, function () {
  console.log('Express server listening on ', 3000);
});
