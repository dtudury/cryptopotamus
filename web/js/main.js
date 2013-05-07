/**
 * Created with JetBrains WebStorm.
 * User: dtudury
 * Date: 4/30/13
 * Time: 5:25 PM
 * To change this template use File | Settings | File Templates.
 */
require.config({
	baseUrl: "/js",
	shim: {
		underscore: {
			exports: '_'
		},
		Backbone: {
			deps: ["underscore", "jquery"],
			exports: "Backbone"
		}
	},
	paths: {
		"jquery": "//cdnjs.cloudflare.com/ajax/libs/jquery/2.0.0/jquery.min",
		"underscore": "//cdnjs.cloudflare.com/ajax/libs/underscore.js/1.4.4/underscore-min",
		"Backbone": "//cdnjs.cloudflare.com/ajax/libs/backbone.js/1.0.0/backbone-min",
		"LocalStorage": "//cdnjs.cloudflare.com/ajax/libs/backbone-localstorage.js/1.1.0/backbone.localStorage-min",
		"FileSaver": "eligray/FileSaver"
	}
})

require(["dtudury/cryptopotamus/App"], function(App) {
	App.initialize();
});