require('../../commonForTests.js');

describe('Root', () => {
	it('should return 200 http code on root url', (done) => {
		SUPERTEST
			.get('/')
			.expect(200)
			.end((err, res) => {
				if (err) 
					return done(err);
				
				done(ASSERT.equal(res.body.data, 'service up'));
			})
	});
});