reno.js ( WIP )
=======

*Status :: In development*

Data-binding client-side template engine


###Project setup ( yeoman webapp install )

	npm install -d && bower install


----

###Usuage

	// Reno.compile( selector <string>, data <object> );

	var API = Reno.compile('#area', { title : 'This is a title' });

	// changing data

	API.set('title','This is another title');


