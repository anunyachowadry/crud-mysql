const express = require('express')
const app =express();
const con = require('./dbconnection')


//var express = require('express');
var mysql = require('mysql');
var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({ extended: false });

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static('public'));

const router=require('./router')


app.use('/router',router);

module.exports=app