import { element } from './element.js'

function newImages (images) {
  return new Promise(async (resolve, reject) => {
    const main = document.querySelector('main')
    let imgs = []

    images.forEach(image => {
      const div = element.create('div', 'mainpageImage')

      const previewButton = element.create('button', [
        'prevButton',
        'borderRadius'
      ])
      element.text('Preview', previewButton)

      const imageButton = element.create('button', [
        'mainpageImage',
        'previewImageSearch',
        'previewImage',
        'borderRadius',
        'fade',
        'transition'
      ])
      previewButton.dataset.image = image
      previewButton.setAttribute('type', 'button');
      imageButton.dataset.image = image
      imageButton.dataset.shot = 0
// set comments here @jeroen
      const src = `../images/thumbnails/thumbnails_large/${image}/${image}_0.png`
      const img = element.image(src, '')
// Tim placed a button inside the thing here so we can make ap preview button for each element
      // const previewLink = `<button value="${image[0]}">Preview</preview>`
      div.appendChild(imageButton)
      div.appendChild(previewButton)
      imageButton.appendChild(img)


      imgs.push(div)
    })

    await element.update(main, imgs)

    resolve()
  })
}

export const render = {
  newImages
}
