CLASS( "cryptopotamus.view.TextInputPrompted")
.EXTENDS( "cryptopotamus.view.Base")
.DEFINITION( function() {
	
	var SUPER = this.SUPER;
	var configure = IMPORT( "utils.configure");
	var wrap = IMPORT( "utils.Closure.wrap");	

	var _disabled_mode = { onfocus: null, onblur: null};
	var _blurred_mode = { value: "", style: {color:"grey"}};
	var _focused_mode = { value: "", style: {color:"black"}};
		
	function onfocus() {
		this.configure( _focused_mode);
	}
	function onblur() { 
		if( this.get_node().value === "") configure( this.get_node(), _blurred_mode);
		else this.configure( _disabled_mode);
	}
	this.onchange = function() {
		this.sendMessage( "change");
	};


	this.constructor = function( in_parent, in_prompt_text) {
		_blurred_mode.value = in_prompt_text;
		SUPER.constructor.call( this, in_parent, "input", this.get_configuration());
	};

	this.get_value = function() {
		return this.get_node().value;
	}
	
	//override
	this.get_configuration = function() {
		var default_config = {
			size: 20, 
			type: "text", 
			onfocus: wrap( this, onfocus), 
			onblur: wrap( this, onblur),
			onchange: wrap( this, this.onchange),
			onkeyup: wrap( this, this.onchange)
		};
		return configure( default_config, _blurred_mode);
	};

});
