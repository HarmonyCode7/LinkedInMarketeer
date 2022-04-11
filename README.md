# Linkedin Marketeer
A simple bot for sending marketing custom messages to target audiences in a programatic way.

## How to use 
Provide a url to marketeer function as shown below. The url is the linkedin profile link.
###### marketeer function
```javascript
const url = "http://linkedin.com/userprofile_page"
marketeer(url);
```
###### login
```javascript
const page = Browser; # a valid puppeteer browser instance object
login(page); # returns a page promise
```

