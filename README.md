rebel-repeater
==============

A web component inspired by ngRepeat from the AngularJS framework.

Usage
=====

You can simply include the either the ES5 version from `dist/` or the ES2015 version from `src/` into your project and make use of the custom element `rebel-repeater`.

```javascript
    <script src="dist/rebel-repeater.js"></script>
    <ul>
        <rebel-repeater shadow="true">
            <li>${firstName} ${lastName}</li>
        </rebel-repeater>
    </ul>
    <script>
        document.querySelector("#people").setContent([{"firstName": "Bilbo", "lastName": "Baggins"}, {"firstName": "Frodo", "lastName": "Baggins"}, {"firstName": "Samwise", "lastName": "Gamgee"}]);
    </script>
```

For convenience you can also install it via npm: `npm install rebel-repeater` 

Polyfills
=========

This web component uses V1 of the [Custom Elements](https://developers.google.com/web/fundamentals/getting-started/primers/customelements) specification, to get this working in most browsers you are going to need to use a polyfill. It is recommended that you include the following [SkateJS Web Components](https://github.com/skatejs/web-components) polyfill:

`<script src="https://unpkg.com/skatejs-web-components/dist/index-with-deps.min.js"></script>`

API
===

At this point in time the component is very primitive and more a proof of concept than anything useful. 

Attributes
----------

| Attribute Name | Required | Type | Example | Comments |
| -------------- | -------- | ---- | ------- | -------- |
| shadow         |   No   | boolean | true, false | Used to tell the component if it should wrap the repeated content within the Shadow DOM |

Template
--------

You create the template which is to be repeated within the `rebel-repeater` element itself and make use of the ES2015 template string variables `${}` to pull out object properties. For example if you had populated the content attribute with an array of objects which look like this:

```
{
    "title": "Game of Thrones",
    "genre": "Adventure, Drama, Fantasy"
}
```

You could write the following template to pull out the show title:

`<p>${title}</p>`

Contributing
============

To contribute to this project all you will need is jspm installed and a love of web components. Please submit any suggestions or changes via a pull request.