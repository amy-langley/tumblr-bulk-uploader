#!/usr/bin/env node --harmony
var fs = require('fs')
var path = require('path')
var app = require('commander')
var tumblr = require('tumblr')
var jsonfile = require('jsonfile')
var co = require('co')
var prompt = require('co-prompt')
var oauth = require('oauth')
var tumblr = require('tumblr')
var t2 = require('tumblrwks')


app
  .arguments('<directory')
  .option('-u, --username <username>')
  .option('-t, --tag <tag>')
  .action(function(directory){
    co(function* (){

      var consumerInfo = jsonfile.readFileSync(path.join(__dirname, './consumer.json'))
      app.consumer_key = consumerInfo.key
      app.consumer_secret = consumerInfo.secret

      // if(!app.username)
        // app.username = yield prompt('username: ')

      // app.password = yield prompt.password('password: ')

      // processDirectory(directory)
      // authenticate()
      try{ simple() } catch(x) { console.log(x) }
    })
  })
  .parse(process.argv)

function processDirectory(directory){
  fs.readdir(directory, function(err, files){
    for(file of files)
      uploadFile(path.join(directory,file))
  })
}

function uploadFile(path){
  console.log(path)
}

function authenticate(andThen){
  console.log('building auth request')
  var oauth = new OAuth.OAuth(
    'https://www.tumblr.com/oauth/request_token',
    'https://www.tumblr.com/oauth/access_token',
    consumerInfo.key,
    consumerInfo.secret,
    '1.0A',
    null,
    'HMAC-SHA1'
  )
  console.log('getting')
  oauth.get(
    'https://www.tumblr.com/oauth/authorize',
    app.username,
    app.password,
    function(e, data, res){
      console.log(res)
    }
  )
}

function simple() {
  var tumb = new t2({consumerKey: app.consumer_key, consumerSecret: app.consumer_secret})
  tumb.get('/info', {hostname: 'aetherstragic.tumblr.com'}, function(err, json){
    console.log(err)
    console.log(json)
  })
}
