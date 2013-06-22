JqImgur = (function() {
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
      r = $.ajax({
        url: "https://api.imgur.com/3/" + model.name + "/" + model.id,
        type: model.requestType,
        beforeSend: function(xhr){console.log(xhr); xhr.setRequestHeader('Authorization', 'Client-ID ' + model.clientID);},
      });
    }
    channels[channel].push({response: r})
    return channels[channel];
  }

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

