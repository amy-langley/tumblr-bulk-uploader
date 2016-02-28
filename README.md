# tumblr-bulk-uploader

This will be a Node command-line client for bulk uploading a directory of images to tumblr, preferably queueing them as long as I can figure out how to do it.

## Authentication

Obtain your tokens from the Tumblr API at https://api.tumblr.com/console/calls/user/info These values will go in the consumer.json and token.json files. I have excluded mine from this repository so as not to disclose my keys but the application will not run without them.

### consumer.json

```
{
  "consumer_key": "your value here",
  "consumer_secret": "your value here"
}
```

### token.json

```
{
  "token" : "your value here",
  "token_secret" : "your value here"
}
```
