const chai = require('chai');

const initSetup = require('../lib/utils/initSetup');
const testUtil = require('../lib/utils/testUtil');

const shorturlModel = require('../../src/repositories/shorturl');
const config = require('../../src/config');

const { expect } = chai;
const { urls } = testUtil;

describe('Composer controller', () => {
    let out;
    
    let redirectionId = null;
    before(async () => {
        out = await initSetup.prepare();

        const toInsert = Array.from('x'.repeat(100)).map( url => ({
            url:'http://google.com',
        }));

        await shorturlModel.create(toInsert);
    });

    beforeEach(async () => {
    });

    describe('Shorturl api test', () => {
        // We create a new entry to shortUrl
        it('/api/v1/shorturl/short endpoint test', async () => {
            const { body } = await out.users.anonymous
                .make('post', urls.composer.short())
                .set({ 'X-Forwarded-For': '0.0.0.0, 1.1.1.1, 2.2.2.2' })
                .send({
                    url: 'aox.dev',
                })
                .expect(200);
            redirectionId = body.url;
            expect(typeof body.url).to.be.eql('string');
        });

        // We follow the previously created url
        it('localhost:3000/api/v1/shorturl/:redirectionId endpoint test', async () => {
            const { body } = await out.users.anonymous
                .make('get', urls.composer.base()+redirectionId)
                .set({ 'X-Forwarded-For': '0.0.0.0, 1.1.1.1, 2.2.2.2' })
                .expect(200);
            expect(body.url).to.be.eql('aox.dev');
        });

        // We hit the same shorted url again
        it('localhost:3000/api/v1/shorturl/:redirectionId endpoint test', async () => {
            const { body } = await out.users.anonymous
                .make('get', urls.composer.base()+redirectionId)
                .set({ 'X-Forwarded-For': '0.0.0.0, 1.1.1.1, 2.2.2.2' })
                .expect(200);
            expect(body.url).to.be.eql('aox.dev');
        });

    });
});
