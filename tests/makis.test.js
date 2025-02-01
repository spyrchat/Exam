const http = require('http');
const test = require('ava');
const got = require('got');
const app = require('../index.js');
const { json } = require('stream/consumers');

test.before(async (t) => {
	// Create server
	t.context.server = http.createServer(app);
	const server = t.context.server.listen();
	const { port } = server.address();
	t.context.got = got.extend({
	  responseType: "json",
	  prefixUrl: `http://localhost:${port}`,
	});
  });

test.after.always((t) => {
	t.context.server.close();
});


test("GET /authors", async (t) => {
	const { body, statusCode } = await t.context.got.get(`authors`);
	t.truthy(body, "Body exists");
	t.truthy(statusCode, "Status code exists");
	
	t.is(statusCode, 200, "Status code must be 200");
});

test("PUT /authors/{authorId}", async (t) => {
	const authorId = 0;
	const { body, statusCode } = await t.context.got.put(`authors/${authorId}`, {json: {name: "Test Author"}});
	t.truthy(body, "Body exists");
	t.truthy(statusCode, "Status code exists");
	
	t.is(statusCode, 200, "Status code must be 200");
});


test("Post /authors", async (t) => {
	const authorId = 0;
	const { body, statusCode } = await t.context.got.post(`authors`, {json: {name: "Test Author"}});
	t.truthy(body, "Body exists");
	t.truthy(statusCode, "Status code exists");
	
	t.is(statusCode, 200, "Status code must be 200");
});

