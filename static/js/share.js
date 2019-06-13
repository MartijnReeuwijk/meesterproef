function showOverlay () {
  const overlay = document.getElementsByClassName('socialHolder')[0]
  const shadow = document.getElementsByClassName('overlayDark')[0]
  if (shadow.classList.contains('displayNone')) {
    overlay.classList.remove('displayNone')
    shadow.classList.remove('displayNone')
  } else {
    overlay.classList.add('displayNone')
    shadow.classList.add('displayNone')
  }
}
document.getElementsByClassName('overlayDark')[0].addEventListener('click', showOverlay)
document.getElementsByClassName('closeOverlay')[0].addEventListener('click', showOverlay)
