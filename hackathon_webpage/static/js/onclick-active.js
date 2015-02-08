function change_activeness(id) {
	$(".active").removeClass('active');
	$('#'+id).addClass("active");
}