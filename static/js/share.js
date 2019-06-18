function showOverlay () {
  document.getElementsByClassName('socialHolder')[0].classList.toggle('displayNone')
  document.getElementsByClassName('overlayDark')[0].classList.toggle('displayNone')
}

function toClip () {
  var copyText = document.getElementById('textareaHiden')
  console.log(copyText.value)
  copyText.select()
  document.execCommand('copy')
  alert('Link is copied' + copyText.value)
}

document.getElementsByClassName('overlayDark')[0].addEventListener('click', showOverlay)
document.getElementsByClassName('closeOverlay')[0].addEventListener('click', showOverlay)
document.getElementsByClassName('shareIcon')[0].addEventListener('click', showOverlay)
document.getElementsByClassName('copy')[0].addEventListener('click', toClip)
