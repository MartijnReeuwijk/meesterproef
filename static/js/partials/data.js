/* global fetch */

function random (amount = 9) {
  return new Promise(async (resolve, reject) => {
    try {
      const res = await fetch(`/random/${amount}`)
      const data = await res.json()

      resolve(data)
    } catch (err) {
      reject(err)
    }
  })
}

function related (id, amount = 9) {
  return new Promise(async (resolve, reject) => {
    try {
      const res = await fetch(`/related/${id}/${amount}`)
      let data = await res.json()

      data = data.map(image => image.split('_')[0])

      resolve(data)
    } catch (err) {
      reject(err)
    }
  })
}

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

export const data = {
  random,
  related,
  getFilterdata
}
