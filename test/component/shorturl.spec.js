const chai = require('chai');

const initSetup = require('../lib/utils/initSetup');
const testUtil = require('../lib/utils/testUtil');
const config = require('../../src/config');

const { expect } = chai;
const { urls } = testUtil;

describe('Composer controller', () => {
    let out;
    
    let redirectionId = null;
    before(async () => {
        out = await initSetup.prepare();
    });

    beforeEach(async () => {
    });

    describe('Shorturl api test', () => {
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

        it('localhost:3000/api/v1/shorturl/:redirectionId endpoint test', async () => {
            const { body } = await out.users.anonymous
                .make('get', urls.composer.base()+redirectionId)
                .set({ 'X-Forwarded-For': '0.0.0.0, 1.1.1.1, 2.2.2.2' })
                .expect(200);
            console.log(body)
            expect(body.url).to.be.eql('aox.dev');
        });

        it('localhost:3000/api/v1/shorturl/:redirectionId endpoint test', async () => {
            const { body } = await out.users.anonymous
                .make('get', urls.composer.base()+redirectionId)
                .set({ 'X-Forwarded-For': '0.0.0.0, 1.1.1.1, 2.2.2.2' })
                .expect(200);
            console.log(body)
            expect(body.url).to.be.eql('aox.dev');
        });

    });
});