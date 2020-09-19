const mysqlConnection = require('../connection');
const express = require('express')
const app = express();
const cors = require('cors');
app.use(cors());
const checkToken = require('../routes/middleware').checkToken;

module.exports = {

    insertProductDetail: function (request, res) {

        var sql = "select * from product where productName=" + JSON.stringify(request.body.productName);
        mysqlConnection.query(sql, function (err, result) {
            if (err) throw err;
            console.log(result.length, "length");
            if (result.length == 0) {
                var insertQuery = "INSERT INTO product (productName, quantity, pricing, brandName, description) VALUES (" + JSON.stringify(request.body.productName) + "," + JSON.stringify(request.body.quantity) + "," + JSON.stringify(request.body.pricing) + "," + JSON.stringify(request.body.brandName) + "," + JSON.stringify(request.body.description) + ")";
                insertQueryDetail(insertQuery);
                res.json({ response: "created product" });
            }
            else {
                console.log("else");
                res.json({ response: "Already product exist" })
            }

        })
    },

    showProductDetail: function (req, res) {
        const sql = "select * from product ORDER BY productName ASC";
        mysqlConnection.query(sql, function (err, result) {
            if (err) throw err;
            res.send({ success: "true", result: result })

        })
    },

    placeOrderDetail: function (request, response) {
        let orderDetail = request;
        const sql = "select * from Orders where productId=" + request.body.productId;
        mysqlConnection.query(sql, function (err, res) {
            if (err) throw err;
            console.log(res, "res11");
            if (res.length == 0) {
                insertOrderDetail(orderDetail)
                response.send({ response: "placed your order" })
            }
        })
        response.send({ response: "Already order available" })

    },
    updateOrderDetail: function (request, response) {
        console.log("update", request.body);
        let updateQuery = "UPDATE product SET productName='" + request.body.productName + "',quantity='" + request.body.quantity + "',pricing='" + request.body.pricing + "' WHERE productId = '" + request.body.productId + "'"

        mysqlConnection.query(updateQuery, function (err, result) {
            if (err) throw err;
            console.log(result.affectedRows + " record(s) updated");
        });
        response.send({ Message: "success" })
    },

    deleteOrder: function (request, response) {
        console.log(request.body.productId, "deleet");
        const deleteQuery ="delete from product where productId="+request.body.productId;
        console.log(deleteQuery,"deleteQuery");
        mysqlConnection.query(deleteQuery,function(err,result){
            console.log(result,"result");
            response.send({response:"deleted sucessfuly"})
        })
    }
    }

function insertOrderDetail(request) {
    console.log(request.body, "func");
    const insertQuery = "INSERT IGNORE INTO orders ( productId, quantity, userId, pricing) VALUES (" + JSON.stringify(request.body.productId) + "," + JSON.stringify(request.body.quantity) + "," + request.body.userId + "," + JSON.stringify(request.body.pricing) + ")";
    mysqlConnection.query(insertQuery, function (err, res) {
        if (err) throw err;
        console.log(res, "inserted succesfully");
    })
}
function insertQueryDetail(insertQuery) {
    mysqlConnection.query(insertQuery, function (err, result) {
        if (err) throw err;
        return { success: "true" }

    })

}
