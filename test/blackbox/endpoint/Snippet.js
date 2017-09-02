require('../../commonForTests.js');

var testData = [
		{"description":"Description JS for test 1","filename":"test1.js","content":"document.write(\"bla\");"},
		{"description":"Description Ruby for test 2","filename":"test2.rb","content":"puts \"bla\""},
		{"description":"Description Python for test 3","filename":"test3.py","content":"print(\"bla\")"}
	],
	url = URLAPIPATH + 'snippet/',
	receivedData;

describe('Snippet', () => {
	
	describe('Success Tests', () => {
		it('GET /snippet : get a list of all entries (empty)', (done) => {
			SUPERTEST
				.get(url)
				.set('Accept', 'application/json')
				.expect(200)
				.expect('Content-Type', /json/)
				.end((err, res) => {
					let data = res.body;
					
					if (err) {
						console.error(data.errors);
						return done(err);
					}
					
					data = data.data;
					
					ASSERT.ok(data);
					ASSERT.ok((data instanceof Array));
					ASSERT.equal(data.length, 0);
					
					done();
				});
		});
		
		it('POST /snippet : create entry', (done) => {
			SUPERTEST
				.post(url)
				.set('Accept', 'application/json')
				.send({'data': [testData[0]]})
				.expect(200)
				.expect('Content-Type', /json/)
				.end((err, res) => {
					if (err) {
						console.error(res.body.errors);
						return done(err);
					}

					ASSERT.ok(res.body.data);
					ASSERT.ok((res.body.data instanceof Array));
					ASSERT.equal(res.body.data[0].filename, testData[0].filename);
					
					done();
				});
		});
					
		it('POST /snippet : create multiple entries', (done) => {
			SUPERTEST
				.post(url)
				.set('Accept', 'application/json')
				.send({'data': testData})
				.expect(200)
				.expect('Content-Type', /json/)
				.end((err, res) => {
					if (err) {
						console.error(res.body.errors);
						return done(err);
					}
					
					ASSERT.ok(res.body.data);
					ASSERT.ok((res.body.data instanceof Array));
					ASSERT.equal(res.body.data.length, testData.length);
					
					done();
				});
		});
		
		it('GET /snippet : get a list of all entries (full)', (done) => {
			SUPERTEST
				.get(url)
				.set('Accept', 'application/json')
				.expect(200)
				.expect('Content-Type', /json/)
				.end((err, res) => {
					let data = res.body;
					
					if (err) {
						console.error(data.errors);
						return done(err);
					}
					
					data = data.data;
					receivedData = CLONEARRAY(data);
					
					ASSERT.ok(data);
					ASSERT.ok((data instanceof Array));
					ASSERT.equal(data.length, testData.length + 1);
					
					done();
				});
		});
		
		it('PUT /snippet : update first two entries', (done) => {
			let lastData	= CLONEARRAY(receivedData);
			
			lastData = lastData.slice(0,2);
			
			lastData[0].description = 'Exchanged desc 1';
			lastData[1].description = 'Exchanged desc 2';
			lastData[0].filename	= 'newname.js';
			lastData[1].filename	= 'newname.rb';
			lastData[0].content		= 'alert(0110)';
			lastData[1].content		= 'Hash.new';
			
			SUPERTEST
				.put(url)
				.set('Accept', 'application/json')
				.send({'data': lastData})
				.expect(200)
				.expect('Content-Type', /json/)
				.end((err, res) => {
					let data = res.body,
						realUpdatedValues = 0;
					
					if (err) {
						console.error(data.errors);
						return done(err);
					}
					
					data = data.data;
					
					data.forEach(item => {
						item.ok && item.nModified && realUpdatedValues++;
					});
					
					ASSERT.ok(data) ;
					ASSERT.ok((data instanceof Array));
					ASSERT.equal(data.length, lastData.length);
					ASSERT.equal(realUpdatedValues, lastData.length);
					
					done();
				});
		});
		
		it('DELETE /snippet : remove one entry', (done) => {
			SUPERTEST
				.delete(url + receivedData[0]._id)
				.set('Accept', 'application/json')
				.expect(200)
				.expect('Content-Type', /json/)
				.end((err, res) => {
					let data = res.body;
					
					if (err) {
						console.error(data.errors);
						return done(err);
					}
					
					data = data.data;
					
					ASSERT.ok(data);
					ASSERT.ok((data instanceof Array));
					ASSERT.equal(data.length, 1);
					ASSERT.equal(data[0]._id, receivedData[0]._id);
					
					done();
				});
		});
	});
	
	describe('Error Tests', () => {
		it('POST /snippet : create entry wrong format (400)', (done) => {
			SUPERTEST
				.post(url)
				.set('Accept', 'application/json')
				.send({'data': testData[0]})
				.expect(400, done);
		});
		
		it('POST /snippet : create entry no data (400)', (done) => {
			SUPERTEST
				.post(url)
				.set('Accept', 'application/json')
				.send()
				.expect(400, done);
		});
		
		it('PUT /snippet : update entry wrong format (400)', (done) => {
			SUPERTEST
				.post(url)
				.set('Accept', 'application/json')
				.send({'data': receivedData[0]})
				.expect(400, done);
		});
		
		it('PUT /snippet : update entry no data (400)', (done) => {
			SUPERTEST
				.post(url)
				.set('Accept', 'application/json')
				.send()
				.expect(400, done);
		});
		
		it('DELETE /snippet : remove entry just removed (404)', (done) => {
			SUPERTEST
				.delete(url + receivedData[0]._id)
				.expect(404, done);
		});
		
		it('DELETE /snippet : remove entry no data (404)', (done) => {
			SUPERTEST
				.delete(url)
				.expect(404, done);
		});
	});
});