require('../../commonForTests.js');

var url = URLAPIPATH;

describe('Root', () => {
	
	describe('Success Tests', () => {
		it('GET / : Static serving', (done) => {
			SUPERTEST
				.get('/')
				.expect('Content-Type', /text\/html/)
				.expect(200, done)
		});
		
		it('GET / : Service up', (done) => {
			SUPERTEST
				.get(url)
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
		it('POST / : Static serving (404)', (done) => {
			SUPERTEST
				.post('/')
				.expect(404, done)
		});
		
		it('PUT / : Static serving (404)', (done) => {
			SUPERTEST
				.put('/')
				.expect(404, done)
		});
		
		it('DELETE / : Static serving (404)', (done) => {
			SUPERTEST
				.delete('/')
				.expect(404, done)
		});
		
		it('POST / : 405 method not allowed', (done) => {
			SUPERTEST
				.post(url)
				.expect(405, done);
		});
		
		it('PUT / : 405 method not allowed', (done) => {
			SUPERTEST
				.post(url)
				.expect(405, done);
		});
		
		it('DELETE / : 405 method not allowed', (done) => {
			SUPERTEST
				.post(url)
				.expect(405, done);
		});
	});
});