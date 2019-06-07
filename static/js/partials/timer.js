import { thumbnailsEventListener } from '../index.js'
import { data } from './data.js'
import { render } from './render.js'

function start (interval) {
  setInterval(async () => {
    try {
      const images = await data.random()
      await render.newImages(images)

      thumbnailsEventListener()
    } catch (err) {
      console.error(err)
    }
  }, interval)
}

export const timer = {
  start
}
