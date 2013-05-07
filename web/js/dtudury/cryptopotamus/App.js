/**
 * Created with JetBrains WebStorm.
 * User: dtudury
 * Date: 4/30/13
 * Time: 11:15 PM
 * To change this template use File | Settings | File Templates.
 */

define(
	[
		"Backbone",
		"dtudury/cryptopotamus/view/FileLoaderButton",
		"dtudury/cryptopotamus/view/FileSaverButton",
		"dtudury/cryptopotamus/view/ConfigurationList"
	], function(Backbone, FileLoaderButton, FileSaverButton, ConfigurationList) {
		function initialize() {
			var body = document.getElementsByTagName("body")[0];
			if(window.File && window.FileReader && window.FileList && window.Blob) {
				var fileLoaderButton = new FileLoaderButton();
				body.appendChild(fileLoaderButton.render().el);
				var fileSaverButton = new FileSaverButton();
				body.appendChild(fileSaverButton.render().el);
				var configurationList = new ConfigurationList();
				body.appendChild(configurationList.render().el);

			} else {
				alert("The File APIs are not fully supported in this browser.");
			}
		}

		return {
			initialize: initialize
		};
	}
);