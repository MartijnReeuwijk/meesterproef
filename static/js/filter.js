const input = document.querySelectorAll('fieldset input')

function getFilterdata () {
  return new Promise(async (resolve, reject) => {
    const lastValue = window.location.pathname.split('/').slice(-1)[0].split('-')
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

async function dataFilter () {
  const type = this.value
  const data = await getFilterdata()
  // REMOVE LATER
  console.log(data.results[type])
  return data.results[type]
}

input.forEach(elem => {
  elem.addEventListener('click', dataFilter)
})
