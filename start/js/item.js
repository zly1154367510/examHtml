$(function(){
	var vm = new Vue({
		el:".homepage",
		data:{
			paperjson:""
		},
		mounted:function(){
			var that = this
			$.ajax({
				url:"http://localhost:8083/mi/user/paper",
				dataType:"json",
				type:"GET",
				success:function(data){
					console.log(data)
					if (data.status==200) {
						that.paperjson = data.data
					}
				}
			})
		}
	})
})