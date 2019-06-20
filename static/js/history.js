const historyImage = document.querySelectorAll('.history-container article div img')
historyImage.forEach(elem => {
  elem.addEventListener('click', goBackinHistory)
})

function goBackinHistory(){
  const historyGo = this.getAttribute('data-image')
  console.log(historyGo);
  const url = window.location.href;
  console.log(url.split('-'));
  // .split('-')
  // const history =
  // console.log(history);

}
