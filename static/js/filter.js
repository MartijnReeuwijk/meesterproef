import { render } from './partials/render.js'
import { data } from './partials/data.js'

async function renderFilterdata () {
  let filteredImages = []
  const filterdData = await data.getFilterdata(this.value)
  const dataResults = filterdData.results[this.value]
  const filterdDataId = dataResults.map(id => id.split('_')[0])
  for (let i = 0; i < 9; i++) {
    filteredImages.push(filterdDataId[i])
  }
  render.newImages(filteredImages)
}
const input = document.querySelectorAll('form input')
input.forEach(elem => {
  elem.addEventListener('click', renderFilterdata)
})
