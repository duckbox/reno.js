(function (root, factory) {
  if (typeof exports === "object" && exports) {
    factory(exports); // CommonJS
  } else {
    var reno = {};
    factory(reno);
    if (typeof define === "function" && define.amd) {
      define(reno); // AMD
    } else {
      root.Reno = reno; // <script>
    }
  }
}(this, function (reno) {

	'use strict';

	var whitespace;
	    whitespace = /^\s+$/g;

    function NodeReader() {}

    NodeReader.prototype = {

    	_data : [],

    	loop : function(nodes, output) {

		    for(var i=0;i<nodes.length;i++) {

		        var node = nodes[i];

		        if(output){
		            this.read(node);
		        }

		        if(node.childNodes){
		            this.scan(node, output);
		        }

		    }

		},

		scan : function(start, output){
		
		    if(start.childNodes) {
		        this.loop(start.childNodes, output);
		    }

		},

		read : function(node) {

		    if(node.nodeType === 1) {	
		    	
		    	// check node for attributes [ later ]

		    } else if(node.nodeType === 3) {

		        if(node.data) {

		        	if( node.data.match(/{{\s*[\w\.]+\s*}}/g) ) {
		        		
		        		this._data.push({ node : node, text: node.data });
		        		
		        	} 

		        }  
		    }  
		},

		getData : function() {

			return this._data;

		}

    }


	var match_tags = /{{\s*[\w\.]+\s*}}/g,
		strip_tags = /[\w\.]+/;

	function clear_tag_space( text ) {
		return text.replace(/{{\s*/g,'{{').replace(/\s*}}/g,'}}')
	}

	function pattern( variable ) {
		return new RegExp('{{'+variable+'}}',"g");
	}

	function parseTags( text ) {
		 return text.match(match_tags).map(function(x) { return x.match(strip_tags)[0]; });
	}



	function Compiler( obj ) {

		this.els = {};

		var reader = new NodeReader();

		reader.scan(document.querySelector('.container'), true);

		var self = this;

		reader.getData().forEach(function( set ){

			var matches = parseTags(set.text);

			set._text = set.text;

			matches.forEach(function( variable, index ){
				
				set._text = clear_tag_space(set._text);

				var mapped = pattern(variable);
    			set._text = set._text.replace(mapped,obj[variable]);
    			set.node.nodeValue = set._text;

    			if( !self.els[variable] ) {
    				self.els[variable] = {};
    				self.els[variable].value = obj[variable];
    				self.els[variable].component = [];
    			} 

    			self.els[variable].component.push( set );

    		});

		});

		return {
			set : function( name, value ) {
				self._set( name, value );
			}	
		}

	}

	Compiler.prototype._set = function( name, value ) {

		this.els[name].value = value;

		var self = this;

		this.els[name].component.forEach(function( model ){

			var set = model,
				matches = parseTags( set.text );

			set._text = clear_tag_space(set.text);

			matches.forEach(function( variable, index ){

				var match_pattern = pattern(variable);

				set._text = set._text.replace(match_pattern, self.els[variable].value);
				set.node.nodeValue = set._text;

			});

		});

	}

	reno.compile = function( options ){

		return new Compiler(options);

	};




}));