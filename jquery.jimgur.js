(function($) {
  $.fn.jimgur = function(opts) {
    var settings = $.extend({
      apiURL: "https://api.imgur.com/3/"
    }, opts),
    image = {
      get: function(data) { },
      post: function(data) { },
      put: function(data) { },
      del: function() { }
    },
    comment = {
      get: function() { },
      post: function(data) { },
      put: function(data) { },
      del: function() { }
    },
    album = {
      get: function() { },
      post: function(data) { },
      put: function(data) { },
      del: function() { }
    };
    return { image: this.image, comment: this.comment, album: this.album }
  };
})(jQuery);

