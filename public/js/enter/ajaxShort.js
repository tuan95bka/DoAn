// Button Go
$(function() {
	// slide detail
	
	$("#mybtn").click(function(){
		$("#detail").slideToggle("slow");
		if($("#fa").attr('class') == 'fa fa-angle-double-down') {
			$("#fa").removeClass("fa fa-angle-double-down").addClass('fa fa-angle-double-up');
		} else {
			$("#fa").removeClass("fa fa-angle-double-up").addClass('fa fa-angle-double-down');
		}
	});
	

	//slide reveal
	$('#slider').slideReveal({
        trigger: $("#btnShort"),
        position: "right",
        push: false,
        // width: 300,
        overlay: true,
        autoEscape: false,
      });
	// Button Go
	$("#btnGo").click(() => {
		let oldUrl1 = $("#oldUrlShortLink").val(); oldUrl1 = oldUrl1.trim();
		if(oldUrl1.length != 0){
			$.post("/enterprise/getShortLink", oldUrl1)
			.done(function(newUrl1){
			   $('#newUrlShortLink').val(newUrl1);
			})
		}
	})
// Button save
	$("#btnSave").click(() => {
		let oldUrl = $("#oldUrlShortLink").val(); oldUrl = oldUrl.trim();// console.log("oldUrl:", oldUrl);
		let newUrl = $("#newUrlShortLink").val(); newUrl = newUrl.trim(); //console.log("newUrl:", newUrl);
		if(oldUrl.length == 0) {
			alert("Url Original not be empty !!!");
		} else if (newUrl.length == 0) {
			alert("Url Shorten not be empty !!!");
		}
		else {
			//alert("ok");
			let data = {oldUrl: oldUrl, newUrl: newUrl}
			$.post("/enterprise/shortLink",data )
			.done(function(customer){
			   	if(customer.state == "ok"){
					alert("Create success!");
					$("#oldUrlShortLink").val(""); $("#newUrlShortLink").val('');
					$("#slider").slideReveal("hide");
				} 
			   	else if(customer.state =="fail") {
					//alert("that bai");
				   if(customer.err_format) alert("Invalid UrlShorten format!!!");
				   if(customer.err_exist) alert("UrlShorten already exists !!!");
			   	}
			})
		}
	})
	
})