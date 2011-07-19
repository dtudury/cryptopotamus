

CLASS( "cryptopotamus.view.NewGeneratorButton")
.EXTENDS( "cryptopotamus.view.Button")
.DEFINITION( function() {
	
	var SUPER = this.SUPER;
	var add_generator = IMPORT( "cryptopotamus.Controller.add_generator");

	function onclick() { 
		add_generator();
	}
	this.constructor = function( in_parent, in_cta) {
		SUPER.constructor.call( this, in_parent, "+");
		this.subscribe( this, onclick, "click");
	};
});
