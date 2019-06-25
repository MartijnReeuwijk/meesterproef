import { url } from './partials/url.js'
import { timer } from './partials/timer.js'

export function thumbnailsEventListener () {
  let thumbnails = document.getElementsByClassName('previewImage')

  for (let i = 0; i < thumbnails.length; i++) {
    thumbnails[i].addEventListener('click', e => {
      let image = e.target.dataset.image
      // let shotNum = e.target.childNodes[1].dataset.shot

      url.add(image)
    })
  }
}

function init () {
  timer.start(5000)
  thumbnailsEventListener()
  if (document.querySelector('.history-container')) {
    document.querySelector('.history-container').scrollTop = 0
  }
}

init()
