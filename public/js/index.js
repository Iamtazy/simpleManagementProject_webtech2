		function setVisibility(name) {
			if (name === "nothing") {
				document.getElementById("editUser").style.visibility = "hidden";
				document.getElementById("student_list").style.visibility = "hidden";
				document.getElementById("teacher_list").style.visibility = "hidden";
				document.getElementById("admin_list").style.visibility = "hidden";
				document.getElementById("login").style.visibility = "hidden";
				document.getElementById("logoutButton").style.visibility = "hidden";
				document.getElementById("loginButton").style.visibility = "visible";

				document.getElementById("editUser").style.height = "0";
				document.getElementById("student_list").style.height = "0";
				document.getElementById("teacher_list").style.height = "0";
				document.getElementById("admin_list").style.height = "0";
				document.getElementById("login").style.height = "0";
			}
		
			if (name === "login") {
				document.getElementById("editUser").style.visibility = "hidden";
				document.getElementById("student_list").style.visibility = "hidden";
				document.getElementById("teacher_list").style.visibility = "hidden";
				document.getElementById("admin_list").style.visibility = "hidden";
				document.getElementById("login").style.visibility = "visible";
				document.getElementById("logoutButton").style.visibility = "hidden";
				document.getElementById("loginButton").style.visibility = "visible";

				document.getElementById("editUser").style.height = "0";
				document.getElementById("student_list").style.height = "0";
				document.getElementById("teacher_list").style.height = "0";
				document.getElementById("admin_list").style.height = "0";
			}
			else if (name === "editUser") {
				document.getElementById("login").style.visibility = "hidden";
				document.getElementById("student_list").style.visibility = "hidden";
				document.getElementById("teacher_list").style.visibility = "hidden";
				document.getElementById("admin_list").style.visibility = "hidden";
				document.getElementById("editUser").style.visibility = "visible";
				document.getElementById("logoutButton").style.visibility = "visible";
				document.getElementById("loginButton").style.visibility = "hidden";

				document.getElementById("login").style.height = "0";
				document.getElementById("student_list").style.height = "0";
				document.getElementById("teacher_list").style.height = "0";
				document.getElementById("admin_list").style.height = "0";	
			}
			else if (name === "student_list") {
				document.getElementById("editUser").style.visibility = "hidden";
				document.getElementById("login").style.visibility = "hidden";
				document.getElementById("student_list").style.visibility = "visible";
				document.getElementById("teacher_list").style.visibility = "hidden";
				document.getElementById("admin_list").style.visibility = "hidden";
				document.getElementById("logoutButton").style.visibility = "visible";
				document.getElementById("loginButton").style.visibility = "hidden";

				document.getElementById("login").style.height = "0";
				document.getElementById("editUser").style.height = "0";
				document.getElementById("teacher_list").style.height = "0";
				document.getElementById("admin_list").style.height = "0";
			}
			else if (name === "admin_list") {
				document.getElementById("editUser").style.visibility = "hidden";
				document.getElementById("login").style.visibility = "hidden";
				document.getElementById("student_list").style.visibility = "hidden";
				document.getElementById("teacher_list").style.visibility = "hidden";
				document.getElementById("admin_list").style.visibility = "visible";
				document.getElementById("logoutButton").style.visibility = "visible";
				document.getElementById("loginButton").style.visibility = "hidden";				

				document.getElementById("login").style.height = "0";
				document.getElementById("student_list").style.height = "0";
				document.getElementById("teacher_list").style.height = "0";
				document.getElementById("editUser").style.height = "0";
			}
			else if (name === "teacher_list") {
				document.getElementById("editUser").style.visibility = "hidden";
				document.getElementById("login").style.visibility = "hidden";
				document.getElementById("student_list").style.visibility = "hidden";
				document.getElementById("teacher_list").style.visibility = "visible";
				document.getElementById("admin_list").style.visibility = "hidden";
				document.getElementById("logoutButton").style.visibility = "visible";
				document.getElementById("loginButton").style.visibility = "hidden";

				document.getElementById("login").style.height = "0";
				document.getElementById("student_list").style.height = "0";
				document.getElementById("editUser").style.height = "0";
				document.getElementById("admin_list").style.height = "0";
			}
		}

		var requestManagementModule = angular.module("requestManagement",[]);
		var userLevel = "notLoggedIn";
		var loggedInUser = "notLoggedInUser";
		
		window.onload = function() {
			setVisibility("login");
		};

		requestManagementModule.controller ("menuCtrl",function($scope,$http) {
			
			$scope.show_loggedUser = function () {
				if (userLevel === "notLoggedIn") {
					$scope.userLevel = "jelentkezzen be!";
					$scope.loggedInUser = "Nincs bejelentkezve senki";
				} else {
					$scope.userLevel = userLevel;
					$scope.loggedInUser = loggedInUser;
				}};
			
			$scope.show_login = function() {
				if (userLevel === "notLoggedIn")
					setVisibility("login");
				else
					alert("Elõször jelentkezz ki!");
			};

			$scope.show_edit = function() {
				if (userLevel !== "notLoggedIn") {
					setVisibility("editUser");
				} else {
					alert("Bejelentkezés szükséges!");
			}};

			$scope.show_student_list = function() {
				if (userLevel === "student") {
					$scope.listRequests("student");
					setVisibility("student_list");
				} else {
					alert("Nincs hozzá jogosultságod! Lépj be tanulóként!");
			}};
			
			$scope.show_teacher_list = function() {
				if (userLevel === "teacher") {
					$scope.listRequests("teacher");
					setVisibility("teacher_list");
				} else {
					alert("Nincs hozzá jogosultságod! Lépj be tanárként!");
			}};
			
			$scope.show_admin_list = function() {
				if (userLevel === "admin") {
					$scope.listRequests("admin");
					setVisibility("admin_list");
				} else {
					alert("Nincs hozzá jogosultságod! Lépj be adminként!");
			}};
			
			$scope.login = function() {
				var username = document.getElementById("username").value;
				var password = document.getElementById("password").value;
				
				$http.post("/login", {"name" : username, "pass" : password}).then(function(data) {
					loggedInUser = username;
					userLevel = data.data;
					$scope.show_loggedUser();
					switch(userLevel) {
						case "teacher":
							alert("Sikeres bejelentkezés tanárként!");
							$scope.show_teacher_list();
							break;
						case "admin":
							alert("Sikeres bejelentkezés adminisztrátorként!");
							$scope.show_admin_list();
							break;
						case "student":
							alert("Sikeres bejelentkezés tanulóként!");
							$scope.show_student_list();
							break;
						default:
							alert("Hiba a bejelentkezéskor!");
}
					console.log(userLevel);
				});
			};
			
			$scope.logout = function () {
				loggedInUser = "notLoggedInUser";
				userLevel = "notLoggedIn";
				$scope.show_loggedUser();
				alert("Kijelentkezve!");
				$scope.show_login();
			};
			
			$scope.listRequests = function(pos) {
				var loggedInUserTemp = $scope.loggedInUser;
				var pos = $scope.userLevel;
				$http.post('/listrequests', {"name" : loggedInUserTemp, "pos" : pos}).then(function(resp){
				$scope.requests = resp.data;
				});
			};
			
			$scope.edit_user_details = function() {
				var oldpassword = document.getElementById("oldpassword").value;
				var newpassword = document.getElementById("newpassword").value;
				var repeatpassword = document.getElementById("repeatpassword").value;
				
				$http.post("/edit", {"name" : loggedInUser, "pass" : oldpassword, "newpass" : newpassword, "newpassagain" : repeatpassword}).then(function(data) {
					if (data.data === "ok")
						alert("Jelszó megváltoztatva!");
					else if (data.data === "err")
						alert("Hiba a jelszó megváltoztatásakor!");
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
			
			$scope.teacher_forward = function() {
				var reqID = prompt("ID");
				var pos = prompt("pos");
				var forwardto = prompt("forwardto");
				
				$http.post("/forward", {"id" : reqID, "pos" : pos, "forwardto" : forwardto}).then(function(data) {
					console.log(data.data);
				});
			};
			
			$scope.req_accept = function() {
				var reqID = prompt("Hányas ID-jût szeretné elfogadni?");
				
				$http.post("/verdict", {"id" : reqID, "newstate" : "Accepted"}).then(function(data) {
					console.log(data.data);
				});
			};
			
			$scope.req_decline = function() {
				var reqID = prompt("Hányas ID-jût szeretné elutasítani?");
				
				$http.post("/verdict", {"id" : reqID, "newstate" : "Declined"}).then(function(data) {
					console.log(data.data);
				});
			};
			$scope.show_loggedUser();
		});