function showOverlay () {
  document.getElementsByClassName('socialHolder')[0].classList.toggle("displayNone");
  document.getElementsByClassName('overlayDark')[0].classList.toggle("displayNone");
}
document.getElementsByClassName('overlayDark')[0].addEventListener('click', showOverlay)
document.getElementsByClassName('closeOverlay')[0].addEventListener('click', showOverlay)
