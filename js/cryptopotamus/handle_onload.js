/*****************************************************************************
 * 
 *****************************************************************************/
 
PACKAGE_FUNCTION( "cryptopotamus.handle_onload", function() {

	var view = IMPORT( "cryptopotamus.View");
	var Div = IMPORT( "cryptopotamus.view.Div");
	var FancyDiv = IMPORT( "cryptopotamus.view.FancyDiv");
	var FancierDiv = IMPORT( "cryptopotamus.view.FancierDiv");

	var div;
	/*
	div = new Div( content);
	console.log( "\n\n\n");
	div = new FancyDiv( content);
	console.log( "\n\n\n");
	*/
	div = new FancierDiv( content);
	console.log( "\n\n\n");
	div = new FancierDiv( content);
	console.log( "\n\n\n");

	var content = document.getElementById( "content");
	content.appendChild( view.new_top_nav());
	content.appendChild( view.new_text_input( "name here"));
	

	
	/*
	var announce_new_salt = function() {
		//window.alert( "new salt: " + m.get_salt());
	};
	m.publisher.subscribe( {}, announce_new_salt, m.NEW_SALT);
	*/
});