$(document).ready(function() {
	$.validator.setDefaults({
		ignore: ""
	});

	var form = $("#commentForm");

	$("#menu").menu();
	$("#dialog").dialog({
		autoOpen: false,
		height: 600,
		width: 800,
		modal: true,
		buttons: [
		{
			text: "Submit",
			click: function() {
				form.submit();
			},
			type: "submit",
			form: "commentForm"
		},
		{
			text: "Cancel",
			click: function() {
				$(this).dialog("close");
			}
		}
		],
		close: function() {
			form[0].reset();
			form.validate().resetForm();
		}
	});

	$("#tabs").tabs();

	$("#opener").on("click", function() {
		$("#dialog").dialog("open");
	});

	$("#salutation").selectmenu();
	$("#birthday").datepicker({
		changeMonth: true,
		changeYear: true
	});

	$("input[type=submit], button").button();

	form.validate({
		rules: {
			photo: {
				required: true,
				accept: "image/*"
			},
			salutation: "required",
			name: {
				required: true,
				minlength: 2
			},
			email: {
				required: true,
				email: true
			},
			birthday: "date",
			comment: "required",
			agree: "required"
		},
		messages: {
			salutation: "Please pick a title",
			name: {
				required: "Please enter your name",
				minlength: $.validator.format(
					"Please, at least {0} characters are necessary"
					)
			},
			email: "Please enter a valid email address",
			agree: "Please accept our policy"
		}
	});

	form.on('sumbit', function(){
		var form = $(this);
		var formdata = false;
		if (window.FormData){
			formdata = new FormData(form[0]);
		}

		var formAction = form.attr('action');
		$.ajax({
			url         : '/upload',
			data        : formdata ? formdata : form.serialize(),
			cache       : false,
			contentType : false,
			processData : false,
			type        : 'POST',
			success     : function(data, textStatus, jqXHR){
            	alert("OK");
        }
    });
	});
});
