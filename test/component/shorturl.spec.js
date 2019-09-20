const chai = require('chai');

const initSetup = require('../lib/utils/initSetup');
const testUtil = require('../lib/utils/testUtil');
const config = require('../../src/config');

const { expect } = chai;
const { urls } = testUtil;

describe('Composer controller', () => {
    let out;

    before(async () => {
        out = await initSetup.prepare();
    });

    beforeEach(async () => {
    });

    describe('Shorturl api test', () => {
        it('/api/v1/shorturl/short endpoint test', async () => {
            const { body } = await out.users.anonymous
                .make('post', urls.composer.component())
                .set({ 'X-Forwarded-For': '0.0.0.0, 1.1.1.1, 2.2.2.2' })
                .send({
                    url: 'google.com',
                })
                .expect(200);
            expect(typeof body.url).to.be.eql('string');
        });
    });
});
