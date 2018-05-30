$(function(){
	var vm = new Vue({
		el:".homepage",
		data:{
			json:""
		},
		mounted:function(){
			var username = localStorage.getItem("username")
			var that = this
			$.ajax({
				url:"http://localhost:8083/mi/user/noPerPaper",
				dataType:"json",
				type:"GET",
				data:{
					"username":username
				},
				success:function(data){
					console.log(data)
					if (data.status==200) {
						that.json = data.data
					}
				}
			})
		}
	})
})