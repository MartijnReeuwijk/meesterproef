import { thumbnailsEventListener } from '../index.js'
import { data } from './data.js'
import { render } from './render.js'

let timerVar

function start (interval) {
  timerVar = setInterval(async () => {
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

function related (images, interval) {
  timerVar = setInterval(async () => {
    let newImages = []

    for (let i = 0; i < 9; i++) {
      newImages.push(images[Math.floor(Math.random() * images.length)])
    }

    await render.newImages(newImages)

    thumbnailsEventListener()
  }, interval)
}

function stop () {
  clearInterval(timerVar)

  console.log('Stopped the timer')
}

function changeInterval (interval) {
  stop()

  start(interval)
}

export const timer = {
  start,
  stop,
  changeInterval,
  related
}
