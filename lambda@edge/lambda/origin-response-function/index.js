/* eslint @typescript-eslint/no-var-requires: 0 */

const querystring = require('querystring')

const AWS = require('aws-sdk')
const Sharp = require('sharp')

const S3 = new AWS.S3({
  signatureVersion: 'v4',
})

// set the S3 and API GW endpoints
const BUCKET = 'piazza.photos6'

exports.handler = (event, context, callback) => {
  let response = event.Records[0].cf.response

  console.log('Response status code :%s', response.status)

  //check if image is not present
  if (response.status == 404) {
    let request = event.Records[0].cf.request
    let params = querystring.parse(request.querystring)

    // if there is no dimension attribute, just pass the response
    if (!params.w) {
      callback(null, response)
      return
    }

    // read the required path. Ex: uri /images/100x100/webp/image.jpg
    let path = request.uri

    // read the S3 key from the path variable.
    // Ex: path variable /images/100/webp/image.jpg
    let key = path.substring(1)

    // parse the prefix, width, and image name
    // Ex: key=images/200/image.jpg
    let prefix, originalKey, match, width, requiredFormat, imageName

    try {
      match = key.match(/(.*)\/(\d+)\/(.*)/)
      prefix = match[1]
      width = parseInt(match[2], 10)

      // correction for jpg required for 'Sharp'
      requiredFormat = 'jpeg'
      imageName = match[3]
      originalKey = prefix + '/' + imageName
    } catch (err) {
      // TODO: probably handle this or something
    }

    // get the source image file
    S3.getObject({ Bucket: BUCKET, Key: originalKey })
      .promise()
      // perform the resize operation
      .then((data) => {
        console.log({ data })
        return Sharp(data.Body).resize(width).toFormat('jpeg').toBuffer()
      })
      .then((buffer) => {
        // save the resized object to S3 bucket with appropriate object key.
        S3.putObject({
          Body: buffer,
          Bucket: BUCKET,
          ContentType: 'image/' + requiredFormat,
          CacheControl: 'max-age=31536000',
          Key: key,
          StorageClass: 'STANDARD',
        })
          .promise()
          // even if there is exception in saving the object we send back the generated
          // image back to viewer below
          .catch(() => {
            console.log('Exception while writing resized image to bucket')
          })

        // generate a binary response with resized image
        response.status = 200
        response.body = buffer.toString('base64')
        response.bodyEncoding = 'base64'
        response.headers['content-type'] = [
          { key: 'Content-Type', value: 'image/jpeg' },
        ]
        callback(null, response)
      })
      .catch((err) => {
        console.warn({ err })
        console.log('Exception while reading source image :%j', err)
      })
  } // end of if block checking response statusCode
  else {
    // allow the response to pass through
    callback(null, response)
  }
}
