import { render } from './partials/render.js'

const input = document.querySelectorAll('fieldset input')

function getFilterdata () {
  return new Promise(async (resolve, reject) => {
    const lastValue = window.location.pathname.split('/').slice(-1)[0].split('-').slice(-1)[0]
    const url = window.location.protocol + '//' + window.location.host + '/' + 'filter' + '/' + lastValue

    try {
      const res = await fetch(url)
      const data = await res.json()
      resolve(data)
    } catch (err) {
      reject(err)
    }
  })
}

async function renderFilterdata () {
  let filteredImages = [];
  const filterdData = await getFilterdata(this.value)
  const dataResults = filterdData.results[this.value]
  const filterdDataId = dataResults.map(id => id.split('_')[0])
  for (let i = 0; i < 9; i++) {
    filteredImages.push(filterdDataId[i])
  }
  render.newImages(filteredImages)
}

input.forEach(elem => {
  elem.addEventListener('click', renderFilterdata)
})
