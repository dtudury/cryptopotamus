/**
 * Created with JetBrains WebStorm.
 * User: dtudury
 * Date: 5/7/13
 * Time: 12:08 PM
 * To change this template use File | Settings | File Templates.
 */

define(
	[
		"Backbone"
	], function(Backbone) {
		return Backbone.View.extend({
			tagName: "li",
			render: function() {
				this.el.appendChild(document.createTextNode(this.model.get("user")));
				this.el.appendChild(document.createTextNode("@"));
				this.el.appendChild(document.createTextNode(this.model.get("site")));
				return this;
			}
		});
	}
);