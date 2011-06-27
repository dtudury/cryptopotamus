
if( !cryptopotamus) var cryptopotamus = { model:{}, view:{}, controller:{}};

(function() {
	var m = cryptopotamus.model;
	var v = this;
	var c = cryptopotamus.controller;

	v.new_top_nav = function() {
		var div = v.new_div();
		div.appendChild( v.new_text( "salt: "));
		div.appendChild( v.new_password_input( c.update_salt));
		div.appendChild( v.new_button_input( c.generate_all, "generate all"));
		return div;
	};
	v.new_text_input = function( value, size) {
		var input = document.createElement( "input");
		var _defaults = { value: "text here", size: 20};
		var _no_prompt = { onfocus: null, onblur: null};
		var _prompt = { value: value, style: {color:"grey"}};
		var _clean_prompt = { value: "", style: {color:"black"}};
		var configuration = { type: "text",
			onfocus : function() { utils.configure( input, _clean_prompt);},
			onblur : function() { 
				if( input.value === "") utils.configure( input, _prompt);
				else utils.configure( input, _no_prompt);
			}
		};
		utils.configure( configuration, _prompt);
		return utils.configure( input, configuration, _defaults);
	};
	v.new_button_input = function( onclick, value) {
		var input = document.createElement( "input");
		var configuration = { type: "button", value: value, onclick: onclick};
		return utils.configure( input, configuration);
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
		return utils.configure( input, configuration);
	};
	var _new_password_input_used = function() {
		var input = document.createElement( "input");
		var configuration = { type: "password", style: {color:"black"},
			onblur: function() {
				if( input.value === "") {
					var new_input = _new_password_input_prompt();
					input.parentNode.replaceChild( new_input, input);
				} else {
					utils.configure( input, { onfocus: null, onblur: null});
				}
			},
			onkeyup: c.update_salt
		};
		return utils.configure( input, configuration);
	};
	v.new_password_input = function( onchange, size) {
		return _new_password_input_prompt();
	};
	v.new_div = function() {
		return document.createElement( "div");
	};
	v.new_text = function( text) {
		return document.createTextNode( text);
	};
}).call( cryptopotamus.view);