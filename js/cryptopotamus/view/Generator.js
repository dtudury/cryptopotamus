
CLASS( "cryptopotamus.view.Generator")
.EXTENDS( "cryptopotamus.view.Base")
.DEFINITION( function() {
	
	var SUPER = this.SUPER;
	var remove_generator = IMPORT( "cryptopotamus.Controller.remove_generator");
	var Text = IMPORT( "cryptopotamus.view.Text");
	var TextInputPrompted = IMPORT( "cryptopotamus.view.TextInputPrompted");
	var Button = IMPORT( "cryptopotamus.view.Button");
	var Model = IMPORT( "cryptopotamus.Model");

	function onremove() { 
		for( var index = 0; index < this.parent.childNodes.length; index++) {
			if( this.parent.childNodes[ index] == this.get_node()) {
				remove_generator( index);
				return;
			}
		}
	}
	this.constructor = function( in_parent) {
		SUPER.constructor.call( this, in_parent, "div", this.get_configuration());
		this.close_button = new Button( this.get_node(), "x");
		this.close_button.append();
		this.close_button.subscribe( this, onremove, "click");
		( new TextInputPrompted( this.get_node(), "site")).append();
		( new TextInputPrompted( this.get_node(), "name")).append();
		( new Button( this.get_node(), "Generate")).append();
		Model.publisher.subscribe( this, update, Model.DELETION);
		Model.publisher.subscribe( this, update, Model.INSERTION);
	};

	function update() {
		this.close_button.unsubscribe( this, onremove, "click");
		Model.publisher.unsubscribe( this, update, Model.DELETION);
		Model.publisher.unsubscribe( this, update, Model.INSERTION);
		this.remove();
	}

	//override
	this.get_configuration = function() {
		return {
			style: { display: "block"}
		};
	};
});
