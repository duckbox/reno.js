reno.js ( WIP )
=======

*Status :: In development*

Data-binding client-side template engine


###Project setup ( yeoman webapp install )

	npm install -d && bower install

	// run server

	grunt server


----

###Usuage

Markup

```HTML
<ul id="head">
    <li>{{title}}</li>
</ul>
```
	

JS
```JS
// Reno.compile( selector <string>, data <object> );

var HeaderRenderer = Reno.compile('#head', { title : 'This is a title' });

// changing data

HeaderRenderer.set('title','This is another title');
```


