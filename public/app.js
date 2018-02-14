$(docuemnt).on("click", function() {

	$("#notes").empty();
	var articleId = $(this).attr("data-id");
	console.log("ID", articleId);

	$.ajax({
	  method: "GET",
	  url: "/articles/" + articleId
	})
	  .then(function(data) {

		$("#notes").append("<h5>" + data.title + "</h5>");
		$("#notes").append("<input id='titleinput' name='title' >");
		$("#notes").append("<textarea id='bodyinput' name='body'></textarea>");
		$("#notes").append("<button data-id='" + data._id + "' id='savenote'>Save Note</button>");

		if (data.note) {
			$('#bodyinput').val(data.note.body);
			$('#titleinput').val(data.note.title);
		}
	  });
  });
  


$(document).on("click", "#savenote, function() {
	e.preventDefault();
	var articleId = $(this).attr("id");
	console.log("ID", articleId);
	$.ajax({
	  method: "POST",
	  url: "/articles/" + articleId
	  data: {
		  body: $('#bodyinput').val(),
		  title: $('#titleinput').val()
	  }
	})
	   .done(function(data) {
		   $('#notes').empty();
	   });

	   $('#bodyinput').val('');
	   $('#titleinput').val('');
  });


  $.getJSON("/articles", function(data){
	for (var n = 0; n < data.length; n++){
		$(".modal-title").append(`<h2 id="${data._id}"> Article ID: ${data._id} </h2>`);
        $('.addnote').attr('id', `${data._id}`);
	}
})