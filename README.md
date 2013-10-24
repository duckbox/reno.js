reno.js ( WIP )
=======

*Status :: In development*

Data-binding client-side template engine


###Project setup ( yeoman webapp install )

	npm install -d && bower install


----

###Usuage

Markup

```HTML
	<div id="head">
		<ul id="area">
	        <li>{{title}}</li>
	    </ul>
    </div>
```
	

JS
```JS

	// Reno.compile( selector <string>, data <object> );

	var HeaderRenderer = Reno.compile('#head', { title : 'This is a title' });

	// changing data

	HeaderRenderer.set('title','This is another title');
```


