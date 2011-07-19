
CLASS( "cryptopotamus.view.GlobalPassword")
.EXTENDS( "cryptopotamus.view.PasswordInputPrompted")
.DEFINITION( function() {
	
	var SUPER = this.SUPER;
	var update_salt = IMPORT( "cryptopotamus.Controller.update_salt");

	this.constructor = function( in_parent, in_prompt_text) {
		SUPER.constructor.call( this, in_parent, "type your salt");
		this.subscribe( this, this.handle_change, "change");
	};

	this.handle_change = function() {
		update_salt( this.get_value());
	}
});
