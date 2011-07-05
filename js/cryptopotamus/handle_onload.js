/*****************************************************************************
 * 
 *****************************************************************************/
 
FUNCTION( "cryptopotamus.handle_onload")
.DEFINITION( function() {
	
	var view = IMPORT( "cryptopotamus.View");
	var Text = IMPORT( "cryptopotamus.view.Text");
	var TextInputPrompted = IMPORT( "cryptopotamus.view.TextInputPrompted");
	var PasswordInputPrompted = IMPORT( "cryptopotamus.view.PasswordInputPrompted");

	var content = document.getElementById( "content");
	content.appendChild( view.new_top_nav());
	content.appendChild( view.new_text_input( "name here"));
	
	
	new Text( content, "hey there");
	new TextInputPrompted( content, "type your text");
	new PasswordInputPrompted( content, "type your password");
	
	
	
/*
	
	var named_functions = {};
	var is_initializing = false;
	function initialize( in_constructor) {
		var was_initializing = is_initializing;
		is_initializing = true;
		var instance = new in_constructor();
		is_initializing = was_initializing;
		return instance;
	}
	function CLASS( in_name) {
		if( !named_functions[ in_name]) {
			named_functions[ in_name] = function() {
				if( this.super_constructor) this.SUPER = initialize( this.super_constructor);
				for( var i = 0; i < arguments.callee.mixins.length; i++) arguments.callee.mixins[ i].call( this);
				if( this.constructor != arguments.callee) this.CONSTRUCTOR = this.constructor;
				if( !is_initializing && this.CONSTRUCTOR) {
					this.CONSTRUCTOR.apply( this, [].slice.call( arguments));
				}
			};
			named_functions[ in_name].mixins = [];
			named_functions[ in_name].uninitialized = false;
			named_functions[ in_name].EXTENDS = function( in_super_name){
				named_functions[ in_name].super_name = in_super_name;
				named_functions[ in_name].uninitialized = true;
				return named_functions[ in_name];
			};
			named_functions[ in_name].DEFINITION = function( in_function){
				named_functions[ in_name].mixins.push( in_function);
				return named_functions[ in_name];
			};
		}
		return named_functions[ in_name];
	}
	function retreive( in_name) {
		var wrapper_class = CLASS( in_name);
		if( wrapper_class.uninitialized) {
			var super_class = retreive( wrapper_class.super_name);
			wrapper_class.prototype = initialize( super_class);
			wrapper_class.prototype.constructor = wrapper_class;
			wrapper_class.prototype.super_constructor = super_class;
			wrapper_class.uninitialized = false;
		}
		return wrapper_class;
	}
	
	CLASS( "Mammal")
	.EXTENDS( "Animal")
	.DEFINITION( function() {
		var SUPER = this.SUPER;
		console.log( "creating Mammal");
		this.talk = function() {
			console.log( "grunt");
			SUPER.talk();
		};
	});
	
	CLASS( "Animal")
	.DEFINITION( function() {
		console.log( "creating Animal");
		this.is_alive = true;
		this.is_cuddly = false;
		this.talk = function() {
			console.log( "breath");
		};
		this.constructor = function() {
			console.log( "I'm not a vegetable " + [].slice.call( arguments));
		};
	});
	
	var dog_mixin = function() {
		this.talk = function() {
			console.log( "woof");
			this.SUPER.talk();
		};
	};
	
	var cat_mixin = function() {
		this.talk = function() {
			console.log( "meow");
			this.SUPER.talk();
			this.SUPER.SUPER.talk();
			this.SUPER.SUPER.talk = function() {
				console.log( "scratch");
			};
			this.SUPER.talk();
			
		};
	};
	
	var pet_mixin = function() {
		this.is_cuddly = true;
		this.constructor = function( in_name) {
			console.log( "I'm " + in_name);
		};
	};
	
	CLASS( "Cat")
	.EXTENDS("Mammal")
	.DEFINITION( cat_mixin)
	.DEFINITION( function() {
		console.log( "creating Cat");
	});
	
	CLASS( "Dog")
	.EXTENDS( "Mammal")
	.DEFINITION( dog_mixin)
	.DEFINITION( pet_mixin)
	.DEFINITION( function() {
		console.log( "creating Dog");
	});
	
	
	var Cat = retreive( "Cat");
	var Dog = retreive( "Dog");
	var Mammal = retreive( "Mammal");
	var Animal = retreive( "Animal");
	

	var felix = new Cat( "felix");
	felix.is_alive = false;
	
	console.log( "felix is alive: " + felix.is_alive);
	console.log( felix instanceof Cat);
	console.log( felix instanceof Dog);
	console.log( felix instanceof Mammal);
	console.log( felix instanceof Animal);
	
	felix.talk();
	console.log( "is cuddly: " + felix.is_cuddly);
	
	var spot = new Dog( "spot");
	
	console.log( "spot is alive: " + spot.is_alive);
	console.log( spot instanceof Cat);
	console.log( spot instanceof Dog);
	console.log( spot instanceof Mammal);
	console.log( spot instanceof Animal);
	console.log( spot instanceof Object);
	
	spot.talk();
	console.log( "is cuddly: " + spot.is_cuddly);

*/
















	/*
	var adder = function( a, b) {
		this.sum = a + b;
		console.log( this.sum);
	};
	var test = new adder( 1, 1);
	console.log( test.sum);
	console.log( test instanceof adder);
	
	function construct( constructor, args) {
		var module = function() { constructor.apply( this, args);};
		module.prototype = constructor.prototype;
		return new module();
	}
	
	var construction = construct( adder, [ 2, 2]);
	console.log( construction.sum);
	console.log( construction instanceof adder);
	
	var spoofer = function() { 
	//	adder.apply( this, [ 3, 3]);
		spoofer.prototype = new adder();
//		this.__proto__ = adder.prototype;
	};
	//spoofer.prototype = adder.prototype;
	console.log( "=====");
	var spoof = new spoofer();
	console.log( spoof.constructor.prototype === adder.prototype);
	console.log( spoofer.prototype === adder.prototype);
	console.log( spoof.__proto__.__proto__ === adder.prototype);
	console.log( spoof instanceof adder);
	console.log( "-----");
	spoof = new spoofer();
	console.log( spoof.constructor.prototype === adder.prototype);
	console.log( spoofer.prototype === adder.prototype);
	var temp = {};
	spoof.__proto__ = temp;
	adder.prototype = temp;
	console.log( spoof.__proto__.__proto__ === adder.prototype);
	console.log( spoof instanceof adder);
	*/
	/*
	var announce_new_salt = function() {
		//window.alert( "new salt: " + m.get_salt());
	};
	m.publisher.subscribe( {}, announce_new_salt, m.NEW_SALT);
	*/
});