
/*****************************************************************************
 * 
 *****************************************************************************/

(function() {

	//get global namespace so we can call CLASS, IMPORT, and FUNCTION
	var global = ( function(){ return this;}).call();

	var _logger = null;
	var _log = null;
	var _topnav = null;

	global.ATTACH_LOGGER = function( in_div) {
		if( !_logger) {
			_logger = document.createElement( "div");
			_logger.style.backgroundColor = "#7f7f7f";
			_logger.style.color = "#ffffff";
			_logger.style.filter = "alpha(opacity=75)";
			_logger.style.opacity = 0.75;
			_logger.style.position = "absolute";
			_logger.style.bottom = 0;
			_logger.style.left = 0;
			_logger.style.width = "100%";


			_topnav = document.createElement( "div");
			_topnav.style.backgroundColor = "#9f9f9f";
			_topnav.style.position = "absolute";
			_topnav.style.right = 0;
			var clear_button = document.createElement( "a");
			clear_button.appendChild( document.createTextNode( "clear"));
			clear_button.href = "javascript: void( 0)";
			clear_button.onmousedown = CLEAR_LOGGER;
			var close_button = document.createElement( "a");
			close_button.appendChild( document.createTextNode( "x"));
			close_button.href = "javascript: void( 0)";
			close_button.onmousedown = REMOVE_LOGGER;
			_topnav.appendChild( document.createTextNode( " | "));
			_topnav.appendChild( clear_button);
			_topnav.appendChild( document.createTextNode( " | "));
			_topnav.appendChild( close_button);
			_topnav.appendChild( document.createTextNode( " | "));

			_log = document.createElement( "div");
			_logger.appendChild( _log);
		}
		document.body.appendChild( _logger);
	};
	global.CLEAR_LOGGER = function( in_div) {
		while( _log.childNodes.length > 0) {
			_log.removeChild( _log.lastChild);
		}
		_logger.removeChild( _topnav);
	};
	global.REMOVE_LOGGER = function( in_div) {
		document.body.removeChild( _logger);
	};
	global.LOG = function( in_message) {
		_logger.insertBefore( _topnav, _logger.firstChild);
		_log.insertBefore( document.createElement( "br"), _log.firstChild);
		_log.insertBefore( document.createTextNode( in_message), _log.firstChild);
		while( _log.childNodes.length > 20) {
			_log.removeChild( _log.lastChild);
		}
	};

})();
