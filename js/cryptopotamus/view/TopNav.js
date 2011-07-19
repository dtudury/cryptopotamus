
CLASS( "cryptopotamus.view.TopNav")
.EXTENDS( "cryptopotamus.view.Base")
.DEFINITION( function() {
	
	var SUPER = this.SUPER;
	var Text = IMPORT( "cryptopotamus.view.Text");
	var TextInputPrompted = IMPORT( "cryptopotamus.view.TextInputPrompted");
	var GlobalPassword = IMPORT( "cryptopotamus.view.GlobalPassword");
	var GenerateAllButton = IMPORT( "cryptopotamus.view.GenerateAllButton");

	this.constructor = function( in_parent) {
		SUPER.constructor.call( this, in_parent, "div", this.get_configuration());
		( new Text( this.get_node(), "hey there")).append();
		( new TextInputPrompted( this.get_node(), "type your text")).append();
		( new GlobalPassword( this.get_node())).append();
		( new GenerateAllButton( this.get_node())).append();
	};

	//override
	this.get_configuration = function() {
		return {
			style: { display: "block"}
		};
	};
});
