require('dotenv').config()
const fs = require('fs')
const process = require('process')
const S3 = require('aws-sdk/clients/s3')
const prompts = require('prompts')


const s3 = new S3()

const HOME_FOLDER = 'uploads'

const uploadPhoto = async (file) => {
  console.log(`Uploading ${file}`)
  const fileBody = fs.readFileSync(`${process.cwd()}/${HOME_FOLDER}/${file}`)
  await (s3.upload({Bucket: 'piazza.photos6', Key: `images/${file}`, Body: fileBody, ContentType: 'image/jpeg'}).promise())
}

const uploadAll = async () => {
  const files = fs.readdirSync(`${process.cwd()}/${HOME_FOLDER}`)
  const {response} = await prompts({ type: 'text', name: 'response', message: `Upload [${files}]? y / n`})
  if (response !== 'y') return
  const res = []
  for (let file of files) {
    try {
      await uploadPhoto(file)
      res.push(file.split('.')[0])
    } catch (e) {
      console.error(e)
      throw e
    }
  }
  res.forEach(r =>
    console.log(`<InteractiveImage image_id="${r}" />`)
  )
}

uploadAll()
