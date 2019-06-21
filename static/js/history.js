const history = {
  container: document.querySelector('.history-container'),
  images: document.querySelectorAll('.history-container img'),
  back: e => {
    const imgNumber = e.target.dataset.number

    const urlParts = window.location.href.split('/')
    const historyUrl = urlParts[urlParts.length - 1]
    const historyItems = historyUrl.split('-')

    const newHistory = historyItems.filter((item, i) => {
      if (i <= imgNumber) return true
    })

    window.location.href = `/search/${newHistory.join('-')}`
  }
}

history.images.forEach(elem => {
  elem.addEventListener('click', history.back)
})
