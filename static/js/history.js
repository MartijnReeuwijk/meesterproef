const historyImage = document.querySelectorAll('.history-container article div img')
historyImage.forEach(elem => {
  elem.addEventListener('click', goBackinHistory)
})

function goBackinHistory(){
  const historyGo = this.getAttribute('data-image')
  const url = window.location.href;
  const selectedHistory = url.split('-')
  const index = selectedHistory.indexOf(historyGo)
  // Oke was hier hard aan het kutten en kwam er niet uit
  // heb al de data, wat dus moet gebeuren heb al een index om tematchen en dan de > items deleten
  window.location.href = historyGo

}
