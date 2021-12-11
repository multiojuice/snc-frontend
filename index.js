
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
		fetch("http://styx.cs.rit.edu:3000/upload", options)
		.then((response) => {
		return response.json();
		})
		.then((data) => {
			if(data.url) {
				$("#img-init").prop("src", data.url);
				setTimeout(() => {
					console.warn("HEY")
					$("#img-edge").prop("src", "http://res.cloudinary.com/multiojuice/image/upload/v1638762103/xvbxanr0dowfmikpik4r.jpg");
					$("#img-bledge").prop("src", "http://res.cloudinary.com/multiojuice/image/upload/v1638762145/hzegmajbrzecvwhphec0.jpg");
					$("#img-voro").prop("src", "http://res.cloudinary.com/multiojuice/image/upload/v1638762164/ebnsq0fi3lfviyiqpggw.jpg");
					$("#img-final").prop("src", "http://res.cloudinary.com/multiojuice/image/upload/v1638762218/coqv8irla0bc5qt3ufbc.jpg");
				}, 15500)
			}

			// fetch("http://127.0.0.1:3000/transform", {
			// 	method: 'POST',
			// 	body: JSON.stringify({
			// 		url: data.url
			// 	}),
			// 	headers: {
			// 		"Content-Type": "application/json"
			// 	}
			// })
			// .then(resp => resp.json)
			// .then((resp) => {
			// 	console.warn(resp)
			// }).catch(console.error)
			
		})
		.catch((error) => {
		console.log(error);
		alert("There was an error uploading the file")
		});

	});
});
