/*****************************************************************************
 * 
 *****************************************************************************/
 
PACKAGE_FUNCTION( "cryptopotamus.handle_onload", function() {
	
	var view = IMPORT( "cryptopotamus.View");

	var content = document.getElementById( "content");
	content.appendChild( view.new_top_nav());
	//content.appendChild( v.new_text_input());
	content.appendChild( view.new_text_input( "name here"));
	/*
	var announce_new_salt = function() {
		//window.alert( "new salt: " + m.get_salt());
	};
	m.publisher.subscribe( {}, announce_new_salt, m.NEW_SALT);
	*/
});