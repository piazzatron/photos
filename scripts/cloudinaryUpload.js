require('dotenv').config()
const fs = require('fs')
const process = require('process')
const cloudinary = require('cloudinary').v2
const prompts = require('prompts')

const HOME_FOLDER = 'uploads'

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
})

const uploadPhoto = async (file) => {
  console.log(`Uploading ${file}`)
  const res = await cloudinary.uploader.upload(`${HOME_FOLDER}/${file}`, {
    folder: 'piazza.photos',
    use_filename: true
  })
  return res.public_id
}

const uploadAll = async () => {
  const files = fs.readdirSync(`${process.cwd()}/${HOME_FOLDER}`)
  const {response} = await prompts({ type: 'text', name: 'response', message: `Upload [${files}]? y / n`})
  if (response !== 'y') return
  const res = []
  for (let file of files) {
    try {
      const id = (await uploadPhoto(file)).split('/')[1]
      res.push(id)
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
