/*Jimgur - the Javascript API client for imgur.com.
 *
 *Examples:
 * Create a handler for your imgur object:
 * clientID
 *
 * 
 */
Jimgur = (function() {
  var channels = {};

  var subscribe = function(name, model, fn){
      if(typeof(name) == "string" && typeof(model) == "object" && typeof(fn) == "function")
      {
        if (!channels[name]){
          channels[name] = [];
        }
        //replace if called again
        channels[name] = { context: this, model: model, callback: fn };
      } else {
        throw "Invalid parameters for subscribing."
      }
      return this;

  };

  var unsubscribe = function(name) {
    if (!channels[name]){
      return false;
    }
    for (var i = 0, l = channels[name].length; i < l; i++) {
      console.log(channels[name][i] + " is deleted")
      delete channels[name][i]
    }
  };

  var publish = function(name){
      var args;
      var response = JSON.parse(channels[name]["response"]);
      if (channels[name].hasOwnProperty("response")){
        args = Array.prototype.slice.call(arguments, 1);
        var subscription = channels[name];
        subscription.callback.apply(subscription.context, args);
      } else {
        throw "No response data from the server. Try Jimgur.fetch('channelname') first?"
      }
      return channels[name];
  };

  var xhr = function(name) {
    var model = channels[name]["model"]
    r = "";
    t = xhrhandler({
      url: "https://api.imgur.com/3/" + model.name + "/" + model.id,
      type: model.requestType,
      beforeSend: function(xhr){console.log(xhr); xhr.setRequestHeader('Authorization', 'Client-ID ' + model.clientID);},
    });
    if (t[0]) { r = t[1][2]; }
    channels[name].response = r;
  }
  
  var xhrhandler = function(request) {
	  if (typeof request!==typeof {}) { throw "xhrhandler: no request data parsed"; }
	  if (typeof request.url!=="string") { throw "xhrhandler: no url parsed"; }
	  if (typeof request.type!=="string") { request.type = "GET"; }
	  try {
		  var x = (XMLHttpRequest)? new XMLHttpRequest() : new ActiveXObject("Microsoft.XMLHTTP");
		  var useEvent = false;
		  if (typeof request.callback=="function") { useEvent = true; }
		  x.open(request.type, request.url, useEvent);
		  if (useEvent) { x.onreadystatechange = request.callback; }
		  if (typeof request.beforeSend=="function") { try {request.beforeSend.call(this, x);} catch (e) {console.log(e);} }
		  x.send();
		  if (useEvent) { return [true]; } else { return [true, [x.status, x.getAllResponseHeaders(), x.responseText, x.responseXML]]; }
	  } catch (e) {
		  console.log("xhrhandler encountered an error: " + e);
		  return [false];
	  }
  };

  return {
      fetch: xhr,
      publish: publish,
      subscribe: subscribe,
      unsubscribe: unsubscribe,
      channels: channels,
      installTo: function( obj ){
                   obj.subscribe = subscribe;
                   obj.unsubscribe = unsubscribe;
                   obj.publish = publish;
                 }
  };
})();

