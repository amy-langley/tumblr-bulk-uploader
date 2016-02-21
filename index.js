#!/usr/bin/env node --harmony
var fs = require('fs')
var path = require('path')
var app = require('commander')
var jsonfile = require('jsonfile')
var co = require('co')
var prompt = require('co-prompt')
var oauth = require('oauth')
var tumblr = require('tumblr.js')


app
  .arguments('<directory')
  .option('-u, --username <username>')
  .option('-t, --tag <tag>')
  .action(function(directory){
    co(function* (){

      var consumerInfo = jsonfile.readFileSync(path.join(__dirname, './consumer.json'))
      var token = jsonfile.readFileSync(path.join(__dirname, './token.json'))

      app.credentials = Object.assign({}, consumerInfo, token)

      if(!app.username)
        app.username = yield prompt('username: ')

      app.password = yield prompt.password('password: ')

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

function simple() {
  // console.log(app.credentials)
  var client = tumblr.createClient(app.credentials);

  // Make the request
  client.userInfo(function (err, data) {
    console.log(data)
  });
}
