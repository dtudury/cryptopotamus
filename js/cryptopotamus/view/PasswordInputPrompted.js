
CLASS( "cryptopotamus.view.PasswordInputPrompted")
.EXTENDS( "cryptopotamus.view.Base")
.DEFINITION( function() {
	
	var SUPER = this.SUPER;
	var Base = IMPORT( "cryptopotamus.view.Base");
	var wrap = IMPORT( "utils.Closure.wrap");	


	this.constructor = function( in_parent, in_prompt_text) {
		SUPER.constructor.call( this, in_parent, "span");
		this.password_prompt = this.get_password_prompt( in_prompt_text);
		this.password_entry = this.get_password_entry();
		this.password_prompt.append();
	};
	this.get_value = function() {
		return this.password_entry.get_node().value;
	}
	this.onfocus = function() {
		this.password_prompt.replace( this.password_entry);
		var password_entry = this.password_entry.get_node();
		setTimeout( function() { password_entry.focus();}, 0);
	}
	this.onblur = function() {
		if( this.get_value() === "") {
			this.password_entry.replace( this.password_prompt);
		} else {
			this.password_entry.configure( { onfocus : null});
		}
	}
	this.onchange = function() {
		this.sendMessage( "change");
	};
	this.get_password_prompt = function( in_prompt_text) {
		var config = {
			type: "text",
			value: in_prompt_text,
			style: { color: "grey"},
			onfocus: wrap( this, this.onfocus)
		};
		return new Base( this.get_node(), "input", config);
	}
	this.get_password_entry = function() {
		var config = {
			type: "password",
			onblur: wrap( this, this.onblur),
			onchange: wrap( this, this.onchange),
			onkeyup: wrap( this, this.onchange)
		};
		return new Base( this.get_node(), "input", config);
	}

});
