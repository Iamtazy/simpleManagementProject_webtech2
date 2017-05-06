window.onload = function() {
	setVisibility("login");
}

function setVisibility(name) {
	if (name === "login") {
		document.getElementById("editUser").style.visibility = "hidden";
		document.getElementById("stud_list").style.visibility = "hidden";
		document.getElementById("teach_list").style.visibility = "hidden";
		document.getElementById("adm_list").style.visibility = "hidden";
		document.getElementById("login").style.visibility = "visible";

		document.getElementById("editUser").style.height = "0";
		document.getElementById("stud_list").style.height = "0";
		document.getElementById("teach_list").style.height = "0";
		document.getElementById("adm_list").style.height = "0";
	}
	else if (name === "editUser") {
		document.getElementById("login").style.visibility = "hidden";
		document.getElementById("stud_list").style.visibility = "hidden";
		document.getElementById("teach_list").style.visibility = "hidden";
		document.getElementById("adm_list").style.visibility = "hidden";
		document.getElementById("editUser").style.visibility = "visible";

		document.getElementById("login").style.height = "0";
		document.getElementById("stud_list").style.height = "0";
		document.getElementById("teach_list").style.height = "0";
		document.getElementById("adm_list").style.height = "0";	
	}
	else if (name === "stud_list") {
		document.getElementById("editUser").style.visibility = "hidden";
		document.getElementById("login").style.visibility = "hidden";
		document.getElementById("stud_list").style.visibility = "visible";
		document.getElementById("teach_list").style.visibility = "hidden";
		document.getElementById("adm_list").style.visibility = "hidden";

		document.getElementById("login").style.height = "0";
		document.getElementById("editUser").style.height = "0";
		document.getElementById("teach_list").style.height = "0";
		document.getElementById("adm_list").style.height = "0";
	}
	else if (name === "adm_list") {
		document.getElementById("editUser").style.visibility = "hidden";
		document.getElementById("login").style.visibility = "hidden";
		document.getElementById("stud_list").style.visibility = "hidden";
		document.getElementById("teach_list").style.visibility = "hidden";
		document.getElementById("adm_list").style.visibility = "visible";		

		document.getElementById("login").style.height = "0";
		document.getElementById("stud_list").style.height = "0";
		document.getElementById("teach_list").style.height = "0";
		document.getElementById("editUser").style.height = "0";
	}
	else if (name === "teach_list") {
		document.getElementById("editUser").style.visibility = "hidden";
		document.getElementById("login").style.visibility = "hidden";
		document.getElementById("stud_list").style.visibility = "hidden";
		document.getElementById("teach_list").style.visibility = "visible";
		document.getElementById("adm_list").style.visibility = "hidden";

		document.getElementById("login").style.height = "0";
		document.getElementById("stud_list").style.height = "0";
		document.getElementById("editUser").style.height = "0";
		document.getElementById("adm_list").style.height = "0";
	}
}

var quiverModule = angular.module("quiver",[]);
var userLevel = undefined;
var loggedInUser = undefined;

quiverModule.controller ("menuCtrl",function($scope,$http) {
	$scope.show_login = function() {
		setVisibility("login");
	};

	$scope.show_edit = function() {
		setVisibility("editUser");
	};

	$scope.show_stud_list = function() {
		setVisibility("stud_list");
	};
	
	$scope.show_teach_list = function() {
		setVisibility("teach_list");
	};
	
	$scope.show_adm_list = function() {
		setVisibility("adm_list");
	};
	
	$scope.login = function() {
		var username = document.getElementById("username").value;
		var password = document.getElementById("password").value;
		
		$http.post("/login", {"name" : username, "pass" : password}).then(function(data) {
			loggedInUser = username;
			userLevel = data.data;
			console.log(userLevel);
		});
	};
	
	$scope.edit_user_details = function() {
		var oldpassword = document.getElementById("oldpassword").value;
		var newpassword = document.getElementById("newpassword").value;
		var repeatpassword = document.getElementById("repeatpassword").value;
		
		$http.post("/edit", {"name" : loggedInUser, "pass" : oldpassword, "newpass" : newpassword, "newpassagain" : repeatpassword}).then(function(data) {
			console.log(data.data);
		});
		
	};
	
	$scope.new_request = function() {
		var type = prompt("type");
		var fromUser = prompt("from");
		var teacher = prompt("teacher");
		
		$http.post("/submit", {"type" : type, "from" : fromUser, "teacher" : teacher}).then(function(data) {
			console.log(data.data);
		});
	};
	
	$scope.teach_forward = function() {
		var reqID = prompt("ID");
		var pos = prompt("pos");
		var forwardto = prompt("forwardto");
		
		$http.post("/forward", {"id" : reqID, "pos" : pos, "forwardto" : forwardto}).then(function(data) {
			console.log(data.data);
		});
	};
	
	$scope.req_accept = function() {
		var reqID = prompt("ID");
		var pos = prompt("pos");
		
		$http.post("/verdict", {"id" : reqID, "pos" : pos, "newstate" : "Accepted"}).then(function(data) {
			console.log(data.data);
		});
	};
	
	$scope.req_decline = function() {
		var reqID = prompt("ID");
		var pos = prompt("pos");
		
		$http.post("/verdict", {"id" : reqID, "pos" : pos, "newstate" : "Declined"}).then(function(data) {
			console.log(data.data);
		});
	};
});