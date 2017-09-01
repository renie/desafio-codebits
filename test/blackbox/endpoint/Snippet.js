require('../../commonForTests.js');

var testData = [
		{"description":"Description JS for test 1","filename":"test1.js","content":"document.write(\"bla\");"},
		{"description":"Description Ruby for test 2","filename":"test2.rb","content":"puts \"bla\""},
		{"description":"Description Python for test 3","filename":"test3.py","content":"print(\"bla\")"}
	],
	receivedData;

describe('Snippet', () => {
	
	describe('Success Tests', () => {
		it('GET /snippet : get a list of all entries (empty)', (done) => {
			SUPERTEST
				.get('/snippet')
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
					
					done(ASSERT.ok(data) 
						&& ASSERT.ok((data instanceof Array))
						&& ASSERT.equal(data.length, 0));
				})
		});
		
		it('POST /snippet : create entry', (done) => {
			SUPERTEST
				.post('/snippet')
				.set('Accept', 'application/json')
				.send({'data': [testData[0]]})
				.expect(200)
				.expect('Content-Type', /json/)
				.end((err, res) => {
					if (err) {
						console.log(res.body.errors);
						return done(err);
					}
					
					done(ASSERT.ok(res.body.data)
						&& ASSERT.ok((res.body.data instanceof Array))
						&& ASSERT.equal(res.body.data[0].filename, testData[0])
					);
				})
		});
					
		it('POST /snippet : create multiple entries', (done) => {
			SUPERTEST
				.post('/snippet')
				.set('Accept', 'application/json')
				.send({'data': testData})
				.expect(200)
				.expect('Content-Type', /json/)
				.end((err, res) => {
					if (err) {
						console.log(res.body.errors);
						return done(err);
					}
					
					done(ASSERT.ok(res.body.data)
						&& ASSERT.ok((res.body.data instanceof Array))
						&& ASSERT.equal(res.body.data.length, testData.length)
					);
				})
		});
		
		it('GET /snippet : get a list of all entries (full)', (done) => {
			SUPERTEST
				.get('/snippet')
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
					
					done(ASSERT.ok(data) 
						&& ASSERT.ok((data instanceof Array))
						&& ASSERT.equal(data.length, testData.length) );
				})
		});
		
		it('PUT /snippet : update first two elements', (done) => {
			let lastData	= CLONEARRAY(receivedData),
				test		= CLONEARRAY(testData);
			
			test.pop();
			
			test[0].description = 'Exchanged desc 1';
			test[1].description = 'Exchanged desc 2';
			test[0].filename	= 'newname.js';
			test[1].filename	= 'newname.rb';
			test[0].content		= 'alert(0110)';
			test[1].content		= 'Hash.new';
			
			SUPERTEST
				.put('/snippet')
				.set('Accept', 'application/json')
				.send({'data': test})
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
					
					done(ASSERT.ok(data) 
						&& ASSERT.ok((data instanceof Array))
						&& ASSERT.equal(data.length, test.length)
						&& ASSERT.equal(realUpdatedValues, test.length));
				})
		});
	});
	
	describe('Error Tests', () => {
		it('POST /snippet : create entry wrong format (500)', (done) => {
			SUPERTEST
				.post('/snippet')
				.set('Accept', 'application/json')
				.send({'data': testData[0]})
				.expect(500, done)
		});
		
		it('POST /snippet : create entry no data (500)', (done) => {
			SUPERTEST
				.post('/snippet')
				.set('Accept', 'application/json')
				.send()
				.expect(500, done)
		});
		
		it('PUT /snippet : update entry wrong format (500)', (done) => {
			SUPERTEST
				.post('/snippet')
				.set('Accept', 'application/json')
				.send({'data': receivedData[0]})
				.expect(500, done)
		});
		
		it('PUT /snippet : update entry no data (500)', (done) => {
			SUPERTEST
				.post('/snippet')
				.set('Accept', 'application/json')
				.send()
				.expect(500, done)
		});
	});
});