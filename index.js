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

      // if(!app.username)
        // app.username = yield prompt('username: ')

      // app.password = yield prompt.password('password: ')

      processDirectory(directory)
    })
  })
  .parse(process.argv)

function processDirectory(directory){
  fs.readdir(directory, function(err, files){
    for(file of files)
      postPhoto(path.join(directory,file))
  })
}

function postPhoto(path){
  app.client = app.client || tumblr.createClient(app.credentials)
  var opts = {
    state: 'queue',
    tags: 'testing',
  }

  opts = Object.assign({}, opts, {data: path})
  app.client.photo('aetherstragic', opts, (err,data) => {
    var message = err?
      'Failed to upload file ' + path :
      'Uploaded ' + path

    console.log(message)
  })
}
