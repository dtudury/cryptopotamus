
CLASS( "cryptopotamus.view.GeneratorList")
.EXTENDS( "cryptopotamus.view.Base")
.DEFINITION( function() {
	
	var SUPER = this.SUPER;
	var Generator = IMPORT( "cryptopotamus.view.Generator");
	var Model = IMPORT( "cryptopotamus.Model");

	this.constructor = function( in_parent) {
		SUPER.constructor.call( this, in_parent, "div", this.get_configuration());
		Model.publisher.subscribe( this, update, Model.INSERTION);
		Model.publisher.subscribe( this, update, Model.DELETION);
	};

	function update( in_index) {
		LOG( "GeneratorList update " + in_index);
		for( var i = 0; i < Model.get_generator_count(); i++) {
			( new Generator( this.get_node())).append();
		}
	}

	//override
	this.get_configuration = function() {
		return {
			style: { display: "block"}
		};
	};
});
