jimgur
======

A jQuery plugin for interacting with the imgur.com API version 3.

#Configuration
$options = {
  clientID: YOUR_CLIENT_ID,
  model: "image", //if you want to retrieve account info
  authType: "callback" || "anonymous"
}

#Examples

$.jimgur("account", $options)  - fetch your account information

