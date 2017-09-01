require('../../commonForTests.js');

describe('Root', () => {
	
	describe('Success Tests', () => {
		it('GET / : Service up', (done) => {
			SUPERTEST
				.get('/')
				.expect(200)
				.end((err, res) => {
					if (err) 
						return done(err);
					
					ASSERT.equal(res.body.data, 'service up');
					
					done();
				});
		});
	});
	
	describe('Error Tests', () => {
		it('POST / : 405 method not allowed', (done) => {
			SUPERTEST
				.post('/')
				.expect(405, done);
		});
		
		it('PUT / : 405 method not allowed', (done) => {
			SUPERTEST
				.post('/')
				.expect(405, done);
		});
		
		it('DELETE / : 405 method not allowed', (done) => {
			SUPERTEST
				.post('/')
				.expect(405, done);
		});
	});
});