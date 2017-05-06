var fs = require("fs");
var http = require("http");
var path = require('path');
var express = require('express');
var bodyParser = require('body-parser');

var app = express();

var logins = [{"name" : "Pista", "pass" : "pisti", "position" : "adm"},
			  {"name" : "Joska", "pass" : "joska", "position" : "stud"},
			  {"name" : "Karcsi", "pass" : "karcsi", "position" : "stud"},
			  {"name" : "Ádám", "pass" : "adam", "position" : "teach"},
			  {"name" : "Peti", "pass" : "peter", "position" : "teach"}];
var reqtemplates = ["Tűzgyújtási kérelem", "Tárgyfelvétel"];
var requests = [{"ID" : 0, "type" : 0, "from" : "Joska", "teacher" : "Ádám", "comment" : "van", "state" : "Declined", "administrator" : "Pista"},
				{"ID" : 1, "type" : 1, "from" : "Karcsi", "teacher" : "Peti", "comment" : "nincs", "state" : "Pending", "administrator" : undefined}];

app.use(express.static('public'));
app.use(express.static('public/js'));
app.use(express.static('public/css'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.post("/login", function(req, res) {
	var response = "err";
	
	logins.forEach(function(item, index) {
		if (item.name === req.body.name && item.pass === req.body.pass) {
			response = item.position;
		}
	});
	res.send(response);
});

app.post("/edit", function(req, res) {
	var response = "err";
	
	logins.forEach(function(item, index) {
		if (item.name === req.body.name) {
			if (item.pass === req.body.pass && req.body.newpass === req.body.newpassagain) {
				item.pass = req.body.newpass;
				response = "ok";
			}
		}
	});
	res.send(response);
});

app.post("/listreq", function(req, res) {
	var response = [];
	
	if (req.body.pos === "stud") {
		requests.forEach(function(item, index) {
			if (req.body.name === item.from) {
				response.push(item);
			}
		});
	}
	else if (req.body.pos === "teach") {
		requests.forEach(function(item, index) {
			if (req.body.name === item.teacher) {
				response.push(item);
			}
		});
	}
	else if (req.body.pos === "adm") {
		requests.forEach(function(item, index) {
			if (req.body.name === item.administrator) {
				response.push(item);
			}
		});
	}
	res.send(response);
});

app.post("/listtemplates", function(req, res) {
	res.send(reqtemplates);
});

app.post("/verdict", function(req, res)  {
	var response = "err";
	var id = req.body.id;
	
	if (req.body.pos === "adm"  && requests[id].state === "Pending") {
		requests[id].state = req.body.newstate;
		response = "ok";
	}
	
	res.send(response);
});

app.post("/createtemplate", function(req, res) {
	var response = "err";
	
	if (req.body.pos === "adm") {
		reqtemplates.push(req.body.templatename);
		response = "ok";
	}
	
	res.send(response);
});

app.post("/comment", function(req, res) {
	var response = "err";
	var id = req.body.id;
	
	if(req.body.pos === "teach") {
		requests[id].comment = req.body.comment;
		response = "ok";
	}
	
	res.send(response);
});

app.post("/forward", function(req, res) {
	var response = "err";
	var id = req.body.id;
	
	if (req.body.pos === "teach" && requests[id].administrator === undefined) {
		requests[id].administrator = req.body.forwardto;
		response = "ok";
	}
	
	res.send(response);
});

app.post("/submit", function(req, res) {
	var response = "err";
	var body = req.body;
	var type = undefined;
	
	reqtemplates.forEach(function(item, index) {
		if (item === body.type) {
			type = index;
		}
	});
	
	if (type != undefined && body.from != undefined && body.teacher != undefined) {
		requests.push({"ID" : requests.length, "type" : type, "from" : body.from, "teacher" : body.teacher, "comment" : undefined, "state" : "Pending", "administrator" : undefined});
		response = "ok";
	}
	
	res.send(response);
});

var server = app.listen(8081, function () {
   var host = server.address().address
   var port = server.address().port
   console.log("Listening at http://%s:%s", host, port)
});