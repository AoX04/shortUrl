const supertest = require('supertest');

class Agent {
    
    constructor(app) {
        this.app = app;
    }
    
    //method: string, url: string
    make(method, url) {
        return supertest(this.app)[method](url);
    }
}

exports.Agent = Agent;