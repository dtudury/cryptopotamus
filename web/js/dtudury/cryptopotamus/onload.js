/**
 * Created with JetBrains WebStorm.
 * User: dtudury
 * Date: 4/30/13
 * Time: 1:27 PM
 * To change this template use File | Settings | File Templates.
 */
window.onload = function() {
	require(["backbone"], function(Backbone) {
		(function() {
			var App = {
				Model: {
					Groups: ["a", "b"]
				},
				View: {},
				Controller: {}
			};
			_.extend(App.Model, Backbone.Model);
		})();
		console.log(App.Model.Groups);
	});
}