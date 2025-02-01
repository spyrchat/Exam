// Encapsulates HTTP response code and payload
var ResponsePayload = function(code, payload) {
  this.code = code;
  this.payload = payload;
}

// Helper to create a ResponsePayload instance
exports.respondWithCode = function(code, payload) {
  return new ResponsePayload(code, payload);
}

// Writes JSON response to the client
var writeJson = exports.writeJson = function(response, arg1, arg2) {
  var code;
  var payload;

  // If arg1 is a ResponsePayload, extract code and payload
  if(arg1 && arg1 instanceof ResponsePayload) {
    writeJson(response, arg1.payload, arg1.code);
    return;
  }

  // Determine the HTTP status code from arguments
  if(arg2 && Number.isInteger(arg2)) {
    code = arg2;
  }
  else if(arg1 && Number.isInteger(arg1)) {
    code = arg1;
  }

  // Determine the payload from arguments
  if(code && arg1) {
    payload = arg1;
  }
  else if(arg1) {
    payload = arg1;
  }

  // Default to HTTP 200 if no code is provided
  if(!code) {
    code = 200;
  }

  // Convert payload to JSON string if it's an object
  if(typeof payload === 'object') {
    payload = JSON.stringify(payload, null, 2);
  }

  // Write headers and send response
  response.writeHead(code, {'Content-Type': 'application/json'});
  response.end(payload);
}