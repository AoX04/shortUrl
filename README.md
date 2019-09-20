# shortUrl
 url shortner microservice

### Disclaimer.
This project is way WAY! over engineered, but is to show a fully fledged microservice, with enterprise level of quality, automated component tests, linted using airbnb guidelines,with a high degree of observability using bunyan as a logger and storied logings using common sessionId per requests.
Independant configuration settings dynamically set based on enviroment.
Using joi for fully api routes validation, and custom Error classes.

## Architecture

#

### How are we shorting the URL's?

The first solution that came to mind, was just doing an md5 hash, or rc16m, but due to entropy low enough character count cant be guaranteed.

the much simpler solution of just counting up, and saving the id, you short a new url and the db is empty then the url would be a single character 0, we are counting base 36 to shorten the ammount of characters.

### How does the crawler works?

In src/services/crawler.js we are using a concurrent async queue, when we add new elements, in a non blocking way the queue process them up to the configured max count at the time.

please refer to the following link for furhter documentation.
https://caolan.github.io/async/v3/docs.html#queue

### Why are the controllers wraped that way?

We have common handlers for the controllers, if they fail, we always have a fallback handler.


#

# How to run it

The application entry point is:
 > npm start

The enviroment variables need to be set
 > MOCHA_REPORTER=spec

 > CONFIG_ENV=testing

 
To run automated test against the microservice
 >npm test

Which will also pollinate the service with 100 dummy url's.

All url endpoints are documented with examples on
> shorturl.postman_collection.json
