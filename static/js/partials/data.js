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

export const data = {
  random
}
