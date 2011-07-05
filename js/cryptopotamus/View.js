
CLASS( "cryptopotamus.View")
.STATIC( function() {
	
	var controller = IMPORT( "cryptopotamus.Controller");
	var configure = IMPORT( "utils.configure");

	this.new_top_nav = function() {
		var div = this.new_div();
		div.appendChild( this.new_text( "salt: "));
		div.appendChild( this.new_password_input( controller.update_salt));
		div.appendChild( this.new_button_input( controller.generate_all, "generate all"));
		return div;
	};
	this.new_text_input = function( value, size) {
		var input = document.createElement( "input");
		var _defaults = { value: "text here", size: 20};
		var _no_prompt = { onfocus: null, onblur: null};
		var _prompt = { value: value, style: {color:"grey"}};
		var _clean_prompt = { value: "", style: {color:"black"}};
		var configuration = { type: "text",
			onfocus : function() { configure( input, _clean_prompt);},
			onblur : function() { 
				if( input.value === "") configure( input, _prompt);
				else configure( input, _no_prompt);
			}
		};
		configure( configuration, _prompt);
		return configure( input, configuration, _defaults);
	};
	this.new_button_input = function( onclick, value) {
		var input = document.createElement( "input");
		var configuration = { type: "button", value: value, onclick: onclick};
		return configure( input, configuration);
	};
	var _new_password_input_prompt = function() {
		var input = document.createElement( "input");
		var configuration = { type: "text", value: "password", 
			style: {color:"grey"},
			onfocus: function() {
				var new_input = _new_password_input_used();
				input.parentNode.replaceChild( new_input, input);
				setTimeout( function() { new_input.focus();}, 0);
			}
		};
		return configure( input, configuration);
	};
	var _new_password_input_used = function() {
		var input = document.createElement( "input");
		var configuration = { type: "password", style: {color:"black"},
			onblur: function() {
				if( input.value === "") {
					var new_input = _new_password_input_prompt();
					input.parentNode.replaceChild( new_input, input);
				} else {
					configure( input, { onfocus: null, onblur: null});
				}
			},
			onkeyup: controller.update_salt
		};
		return configure( input, configuration);
	};
	this.new_password_input = function( onchange, size) {
		return _new_password_input_prompt();
	};
	this.new_div = function() {
		return document.createElement( "div");
	};
	this.new_text = function( text) {
		return document.createTextNode( text);
	};
});