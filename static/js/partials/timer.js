import { thumbnailsEventListener } from '../index.js'
import { data } from './data.js'
import { render } from './render.js'

function start (interval) {
  setInterval(async () => {
    const url = window.location.href
    const urlParts = url.split('/')
    const images = urlParts[urlParts.length - 1].split('-')
    const currentImage = images[images.length - 1]

    if (url.includes('/search')) {
      try {
        const images = await data.related(currentImage)
        console.log(images)
        await render.newImages(images)

        thumbnailsEventListener()
      } catch (err) {
        console.error(err)
      }
    } else {
      try {
        const images = await data.random()
        await render.newImages(images)

        thumbnailsEventListener()
      } catch (err) {
        console.error(err)
      }
    }
  }, interval)
}

export const timer = {
  start
}
