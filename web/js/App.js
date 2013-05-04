/**
 * Created with JetBrains WebStorm.
 * User: dtudury
 * Date: 4/30/13
 * Time: 11:15 PM
 * To change this template use File | Settings | File Templates.
 */

define(["Backbone", "Configurations", "FileSaver"], function(Backbone, Configurations) {
	var initialize = function() {
		console.log(JSON.stringify(Configurations));
		Configurations.at(0).on("change:site", function(model, site) {
			console.log("site", site, arguments);
		});
		Configurations.at(0).on("change:user", function(model, user) {
			console.log("user", user, arguments);
		});
		Configurations.at(0).on("all", function() {
			console.log("all", arguments);
		});
		Configurations.at(0).set("site", "hotmail.com");
		console.log(JSON.stringify(Configurations));

		if(window.File && window.FileReader && window.FileList && window.Blob) {
			var body = document.getElementsByTagName("body")[0];

			var data;

			var fileLoaderButton = document.createElement("input");
			fileLoaderButton.setAttribute("type", "file");
			fileLoaderButton.addEventListener("change", function(event) {
				if(fileLoaderButton.readyState = FileReader.DONE) {
					var file = fileLoaderButton.files[0];
					var fileReader = new FileReader();
					fileReader.onload = function(event) {
						data = fileReader.result;
						console.log(data);
					};
					fileReader.readAsText(file);
				}
			}, false);
			body.appendChild(fileLoaderButton);

			var fileSaverButton = document.createElement("button");
			fileSaverButton.appendChild(document.createTextNode("Save"));
			fileSaverButton.addEventListener("click", function(event) {
				console.log("saving");
				var blob = new Blob([data], {type: "text/plain;charset=utf-8"})
				saveAs(blob, "cryptopotamus.txt");
			});
			body.appendChild(fileSaverButton);
		} else {
			alert('The File APIs are not fully supported in this browser.');
		}
	}
	return {
		initialize: initialize
	};
});