// Add eventlistener to all the images.
export function thumbnailsEventListener () {
  let thumbnails = document.getElementsByClassName('mainpageImage')

  for (let i = 0; i < thumbnails.length; i++) {
    thumbnails[i].addEventListener('click', e => {
      let image = e.target.childNodes[1].dataset.image
      // let shotNum = e.target.childNodes[1].dataset.shot

      if (window.location.href.includes('/search')) {
        window.location.href += `/${image}`
      } else {
        window.location.href += `search/${image}`
      }
    })
  }
}
