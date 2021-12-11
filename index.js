
let options = {}
let panes = 5000;

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

	  $( "#panes" ).change(function(event) {
		panes = parseInt(event.target.value)
		console.warn("print", panes)
	  });

	$( "#transform-button" ).click(function() {
		console.warn("upload", options);
		$("#transform-button").prop('disabled', true);
		fetch("http://styx.cs.rit.edu:3000/upload", options)
		.then((response) => {
		return response.json();
		})
		.then((data) => {
			if(data.url) {
				$("#loader").removeClass("hidden");
				$("#img-init").prop("src", data.url);
				fetch("http://styx.cs.rit.edu:3000/transform", {
					method: 'POST',
					body: JSON.stringify({
						url: data.url,
						panes: panes
					}),
					headers: {
						"Content-Type": "application/json"
					}
				})
				.then(resp => resp.json())
				.then((resp) => {
					console.warn(resp)
					$("#loader").addClass("hidden");
					$("#img-edge").prop("src", resp.edges);
					$("#img-bledge").prop("src", resp.bledges);
					$("#img-voro").prop("src", resp.voro);
					$("#img-final").prop("src", resp.final);
				}).catch(console.error)
			}
		})
		.catch((error) => {
		console.log(error);
		alert("There was an error uploading the file")
		});

	});
});
