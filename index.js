#!/usr/bin/env node
var fs = require('fs')
var path = require('path')
var app = require('commander')
var tumblr = require('tumblr')
var jsonfile = require('jsonfile');

var consumerInfo = jsonfile.readFileSync(path.join(__dirname, './consumer.json'))

app
  .arguments('<directory')
  .option('-u, --username <username>')
  .option('-t, --tag <tag>')
  .action(function(directory){
    processDirectory(directory)
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
