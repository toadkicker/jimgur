jimgur
======

A jQuery plugin for interacting with the imgur.com API version 3.


Returns an object so you can do whatever you want with your
user interface. Built using a publish/subscribe pattern.

##TODO
Check out the issue list and feel free to send in a pull request.

##Examples

###Subscribe
Subscribe takes a channel name, which is completely up to you what to call it. You can also use the same channel name and get an array.


The second parameter is your ajax configuration parameters. 


The last parameter is a callback function.

```javascript
JqImgur.subscribe("myChannelName", { name: "image", id: "gevOKU7", clientID: "YOUR_CLIENT_ID"}, function() { alert("ching!"); } );
```

###Fetch

Fetch the data from the API:

```javascript
JqImgur.fetch("gevOKU7")
```

###Publish

Execute your callback functions you subscribed to:

```javascript
JqImgur.publish("myChannelName")
```
