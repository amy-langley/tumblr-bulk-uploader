#!/usr/bin/env node --harmony
var fs = require('fs')
var path = require('path')
var app = require('commander')
var tumblr = require('tumblr')
var jsonfile = require('jsonfile');
var co = require('co');
var prompt = require('co-prompt');

var consumerInfo = jsonfile.readFileSync(path.join(__dirname, './consumer.json'))

app
  .arguments('<directory')
  .option('-u, --username <username>')
  .option('-t, --tag <tag>')
  .action(function(directory){
    co(function* (){
      if(!app.username)
        app.username = yield prompt('username: ')

      app.password = yield prompt.password('password: ')

      processDirectory(directory)
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
