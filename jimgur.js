Jimgur = (function() {
  var channels = {};

  var subscribe = function(name, model, fn){
      if (!channels[name]){
        channels[name] = [];
      }
      channels[name].push( { context: this, model: model, callback: fn } );
      return this;
  };

  var unsubscribe = function(name) {
    if (!channels[name]){
      return false;
    }
    for (var i = 0, l = channels[name].length; i < l; i++) {
      delete channels[name][i]
    }
  };

  var publish = function(name){
      var args;
      if (!channels[name]){
        return false;
      }
      args = Array.prototype.slice.call(arguments, 1);
      for (var i = 0, l = channels[name].length; i < l; i++) {
          var subscription = channels[name][i];
          subscription.callback.apply(subscription.context, args);
      }
      return this;
  };

  var xhr = function(channel) {
    for (var i = 0, l = channels[channel].length; i < l; i++) {
      var model = channels[channel][i].model;
      //TODO: drop in mediator and remove jQuery for native XHR calls.
      r = $.ajax({
        url: "https://api.imgur.com/3/" + model.name + "/" + model.id,
        type: model.requestType,
        beforeSend: function(xhr){console.log(xhr); xhr.setRequestHeader('Authorization', 'Client-ID ' + model.clientID);},
      });
    }
    channels[channel].push({response: r})
    return channels[channel];
  }
  
  var xhrhandler = function(request) {
	  if (typeof request!==typeof {}) { throw "xhrhandler: no request data parsed"; }
	  if (typeof request.url!=="string") { throw "xhrhandler: no url parsed"; }
	  if (typeof request.type!=="string") { request.type = "GET"; }
	  var x = (XMLHttpRequest)? new XMLHttpRequest() : new ActiveXObject("Microsoft.XMLHTTP");
	  var useEvent = false;
	  if (typeof request.callback=="function") { useEvent = true; }
	  x.open(request.type, request.url, useEvent);
	  if (useEvent) { x.onreadystatechange = request.callback; }
	  if (typeof request.beforeSend=="function") { try {request.beforeSend.call(this, x);} catch (e) {console.log(e);} }
	  x.send();
	  if (useEvent) { return [true]; } else { return [true, [x.status, x.getAllResponseHeaders(), x.responseText, x.responseXML]]; }
  };

  return {
      fetch: xhr,
      publish: publish,
      subscribe: subscribe,
      unsubscribe: unsubscribe,
      installTo: function( obj ){
                   obj.subscribe = subscribe;
                   obj.unsubscribe = unsubscribe;
                   obj.publish = publish;
                 }
  };
})();

