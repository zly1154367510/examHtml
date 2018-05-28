$(function(){
	var username = localStorage.getItem("username")
	var token = localStorage.getItem("token")
	if (username==undefined||token==undefined) {
		alert("请登陆后访问")
		window.location.href = "http://localhost/exam/login/login.html"
	}else{
		$.ajax({
			url:"http://localhost:8083/mi/user/isLogin",
			data:{
				"username":username,
				"token":token
			},
			dataType:"json",
			type:"GET",
			success:function(data){
				if (data.status==401) {
					window.location.href = "http://localhost/exam/login/login.html"
				}
			}
		})
	}
})