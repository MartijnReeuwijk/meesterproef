import { element } from './element.js'

function newImages (images) {
  return new Promise(async (resolve, reject) => {
    const main = document.querySelector('main')
    let imgs = []

    images.forEach(image => {
      const div = element.create('div', [
        'mainpageImage',
        'previewImage',
        'transition'
      ])

      div.dataset.image = image[0]
      div.dataset.shot = 0

      const src = `../images/thumbnails/thumbnails_large/${image[0]}/${image[0]}_0.png`
      const img = element.image(src, '')

      div.appendChild(img)

      imgs.push(div)
    })

    await element.update(main, imgs)

    resolve()
  })
}

export const render = {
  newImages
}
