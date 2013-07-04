JImgur
======

A javascript client for interacting with the imgur.com API version 3.

Built using a publish/subscribe pattern.

##TODO
Check out the issue list and feel free to send in a pull request.

##Examples

###Subscribe
Subscribe takes a channel name, which is completely up to you what to call it.
```javascript
"myChannelName"
```


The second parameter is ajax configuration parameters. These are required fields.
```javascript
{ clientID: 'YOUR_CLIENT_ID', name: "image", id: "aWabySL" }
```


The last parameter is a callback function, typically you would use this to manipulate the page.
```javascript
function() { //what do you want to do with the data once you get it?
            var response = JSON.parse(this.channels["image"]["response"])
            $("#example1").html('<img src=' + response.data.link + ' />'); }
```

Put it all together:
```javascript
Jimgur.subscribe(
          "myChannelName", //give it a name to refer to your calls
          { clientID: 'YOUR_CLIENT_ID', name: "image", id: "aWabySL" }, //object literal that says what you want to get from imgur
          function() { //what do you want to do with the data once you get it?
            var response = JSON.parse(this.channels["image"]["response"])
            $("#example1").html('<img src=' + response.data.link + ' />'); }
        );
```

###Fetch

Refresh the data from the API:

```javascript
Jimgur.fetch("myChannelName")
```

Each call to this replaces imgur's response in the channel object.

###Publish

Execute your callback functions you subscribed to:

```javascript
Jimgur.publish("myChannelName")
```

###Unsubscribe

Remove all objects in a channel.

```javascript
Jimgur.unsubscribe("myChannelName")
```

Returns false if not found.
