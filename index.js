
let options = {}

$(document).ready(function() {
	$( "#uploader" ).change(function(event) {
		console.warn("CHANGE", event.target.files[0]);
		const formData = new FormData();
		formData.append("file", event.target.files[0]);
		options = {
		method: "POST",
		body: formData,
		};
	  });

	$( "#transform-button" ).click(function() {
		console.warn("upload", options);
		fetch("http://127.0.0.1:3000/upload", options)
		.then((response) => {
		return response.json();
		})
		.then((data) => {
			if(data.url) {
				$("#img-init").prop("src", data.url);
			}
		})
		.catch((error) => {
		console.log(error);
		alert("There was an error uploading the file")
		});

	});
});
