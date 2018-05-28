$(function(){
	  $("#loginForm").ajaxForm(function(data){    
       	if (data.status==200) {
       		var username = $("input[name=username]").val()
       		localStorage.setItem("username",username)
       		localStorage.setItem("token",data.data.token)
                  window.location.href="http://localhost/exam/index/index.html?name="+data.data.name
       	}else if(data.status==401){
       		console.log(data)
       		alert(data.msg)
       	}
    });  
})