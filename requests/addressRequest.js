module.exports = function addressRequest (error, response, body) {
  if (!error && response.statusCode === 200) {
    return body // Show the HTML for the Google homepage.
  }
}
