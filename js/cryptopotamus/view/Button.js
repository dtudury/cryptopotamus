
CLASS( "cryptopotamus.view.Button")
.EXTENDS( "cryptopotamus.view.Base")
.DEFINITION( function() {
	
	var SUPER = this.SUPER;
	var wrap = IMPORT( "utils.Closure.wrap");	


	function onclick() { 
		this.sendMessage( "click");
	}
	var _cta = null;
	this.constructor = function( in_parent, in_cta) {
		_cta = in_cta;
		SUPER.constructor.call( this, in_parent, "input", this.get_configuration());
	};

	//override
	this.get_configuration = function() {
		return {
			size: 20, 
			type: "button", 
			value: _cta,
			onclick: wrap( this, onclick)
		};
	};
});
