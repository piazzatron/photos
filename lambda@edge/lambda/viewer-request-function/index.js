/* eslint @typescript-eslint/no-var-requires: 0 */

const querystring = require('querystring')

// Dimensions will be passed along as id?w=123

exports.handler = (event, context, callback) => {
  const request = event.Records[0].cf.request

  const params = querystring.parse(request.querystring)

  // fetch the uri of original image
  let fwdUri = request.uri

  const width = params.w

  if (!width) {
    callback(null, request)
    return
  }

  // parse the prefix, image name and extension from the uri.
  // In our case /images/image.jpg

  const match = fwdUri.match(/(.*)\/(.*)\.(.*)/)

  // images
  let prefix = match[1]
  let imageName = match[2]
  let extension = match[3]

  let url = [prefix, width, `${imageName}.${extension}`]
  fwdUri = url.join('/')

  // final modified url is of format /images/200/image.jpg
  request.uri = fwdUri
  callback(null, request)
}
