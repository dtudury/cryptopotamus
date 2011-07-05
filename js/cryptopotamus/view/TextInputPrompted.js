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
		configure( this.get_node(), _focused_mode);
	}
	function onblur() { 
		if( this.get_node().value === "") configure( this.get_node(), _blurred_mode);
		else configure( this.get_node(), _disabled_mode);
	}


	this.constructor = function( in_parent, in_prompt_text) {
		_blurred_mode.value = in_prompt_text;
		var local_configuration = this.get_configuration();
		SUPER.constructor.call( this, in_parent);
	};
	
	//override
	this.create_node = function() {
		this.node = document.createElement( "input");
	};
	
	//override
	this.get_configuration = function() {
		var default_config = {
			size: 20, 
			type: "text", 
			onfocus: wrap( this, onfocus), 
			onblur: wrap( this, onblur)
		};
		configure( default_config, _blurred_mode);
		return this.extend_configuration( default_config);
	};


});