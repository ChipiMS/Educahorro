var Educahorro=angular.module('Educahorro',[]);

function eduController($scope,$http){
	$scope.formData={};
	$scope.view="Inicio";
	$scope.user=null;
	$scope.Math = window.Math;
	$http.get('/api/users')
		.success(function(data) {
			console.log(data);
		})
		.error(function(data) {
			console.log('Error: ' + data);
		});
	$scope.chat=function(){
		$("#Chat").css("display","block");
	};
	$scope.closeChat=function(){
		$("#Chat").css("display","none");
	};
	$scope.goToChild=function(aux){
		$scope.view="Save";
		for(var i=0;i<$scope.user.children.length;i++){
			if($scope.user.children[i].name==aux)
				$scope.son=$scope.user.children[i];
		}
	};
	$scope.goToView=function(aux){
		$scope.view=aux;
		$scope.formData={};
	};
	$scope.login=function(){
		var password=$scope.formData.password;
		$http.get('/api/user/'+$scope.formData.email)
			.success(function(data) {
				if(data.email===null||data.email===undefined){
					$("#LoginContainer h6").css("display","block");
				}
				else{
					if(data.password==password){
						$scope.user=data;
						$scope.view="Profile";
					}
					else
						$("#LoginContainer h6").css("display","block");
				}
				console.log(data);
			})
			.error(function(data) {
				console.log('Error: ' + data);
				$("#LoginContainer h6").css("display","block");
			});
		$scope.formData={};
	};
	$scope.childForm=function(){
		$scope.formData.newChild=true;	
	};
	$scope.newSon=function(){
		if($scope.formData.name==undefined||($scope.formData.age==undefined)||($scope.formData.month==undefined)){
			$("#NewUser h6").css("display","block");
			$scope.formData={};
			return;
		}
		var children=$scope.user.children;
		children.push({
			name: $scope.formData.name+" "+$scope.formData.second,
			age: $scope.formData.age,
			month: $scope.formData.month,
			save: 0
		});
		var request={
			children: children,
			email: $scope.user.email
		}
		$http.post('/api/user',request)
			.success(function(data) {
				$scope.user=data;
				console.log(data);
				$scope.view="Save";
				$scope.son=data.children[data.children.length-1];
				console.log($scope.son)
			})
			.error(function(data) {
				console.log('Error: ' + data);
				$("#NewUser h6").css("display","block");
			});
	};
	$scope.newUser=function(){
		if($scope.formData.password!=$scope.formData.password2||($scope.formData.name==undefined||($scope.formData.password==undefined)||($scope.formData.email==undefined))){
			$("#NewUser h6").css("display","block");
			$scope.formData={};
			return;
		}
		$http.post('/api/users',$scope.formData)
			.success(function(data) {
				$scope.user=data;
				console.log(data);
			})
			.error(function(data) {
				console.log('Error: ' + data);
				$("#NewUser h6").css("display","block");
			});
		$scope.formData={};
	};
	$scope.toggleSidebar=function(){
		$("main").toggleClass("FullScreen");
		$(".Sidebar").toggleClass("SidebarHidden");
	};
}