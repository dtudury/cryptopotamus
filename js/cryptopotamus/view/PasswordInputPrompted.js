
CLASS( "cryptopotamus.view.PasswordInputPrompted")
.EXTENDS( "cryptopotamus.view.TextInputPrompted")
.DEFINITION( function() {
	
	var configure = IMPORT( "utils.configure");

/*
	this.constructor = function( in_parent, in_prompt_text) {
	};
	*/


});


/*
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
*/
