/**
 * Created with JetBrains WebStorm.
 * User: dtudury
 * Date: 5/7/13
 * Time: 12:08 PM
 * To change this template use File | Settings | File Templates.
 */

define(
	[
		"Backbone",
		"dtudury/cryptopotamus/view/UserField",
		"dtudury/cryptopotamus/view/SiteField",
		"dtudury/cryptopotamus/view/RemoveItemButton"
	], function(Backbone, UserField, SiteField, RemoveItemButton) {
		return Backbone.View.extend({
			tagName: "li",
			initialize: function() {
				var userField = new UserField({model:this.model})
				this.el.appendChild(userField.render().el);
				this.el.appendChild(document.createTextNode("@"));
				var siteField = new SiteField({model:this.model})
				this.el.appendChild(siteField.render().el);
				var removeItemButton = new RemoveItemButton({model:this.model})
				this.el.appendChild(removeItemButton.render().el);
				return this;
			}
		});
	}
);