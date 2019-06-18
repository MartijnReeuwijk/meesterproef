import { thumbnailsEventListener } from './index.js'
import { render } from './partials/render.js'
import { data } from './partials/data.js'
import { timer } from './partials/timer.js'

async function renderFilterdata () {
  timer.stop()

  let filteredImages = []
  const filterdData = await data.getFilterdata(this.value)
  const dataResults = filterdData.results[this.value]
  const filterdDataId = dataResults.map(id => id.split('_')[0])

  for (let i = 0; i < 9; i++) {
    filteredImages.push(filterdDataId[i])
  }

  await render.newImages(filteredImages)

  thumbnailsEventListener()

  timer.related(filterdDataId, 5000)
}
const input = document.querySelectorAll('form input')
input.forEach(elem => {
  elem.addEventListener('click', renderFilterdata)
})
