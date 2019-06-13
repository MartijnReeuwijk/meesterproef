import { element } from './element.js'

function newImages (images) {
  return new Promise(async (resolve, reject) => {
    const main = document.querySelector('main')
    let imgs = []

    images.forEach(image => {
      const button = element.create('button', [
        'mainpageImage',
        'previewImage',
        'transition'
      ])

      button.dataset.image = image[0]
      button.dataset.shot = 0
// set comments here @jeroen
      const src = `../images/thumbnails/thumbnails_large/${image[0]}/${image[0]}_0.png`
      const img = element.image(src, '')
// Tim placed a button inside the thing here so we can make ap preview button for each element
      // const previewLink = `<button value="${image[0]}">Preview</preview>`
      button.appendChild(img)

      imgs.push(button)
    })

    await element.update(main, imgs)

    resolve()
  })
}

export const render = {
  newImages
}
