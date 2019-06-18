function openDetail () {
  document.querySelector('.modalHolder').classList.toggle('hidden')
}
document.querySelector('.closeDetail').addEventListener('click', openDetail)
document.querySelector('.modalHolder').addEventListener('click', openDetail)
// document.querySelectorAll('.displayFlex button div').forEach(button => {
//       button.addEventListener('click', openDetail);
//       console.log(this);
// Get the data-image from the clicked button to make a new request for more data on the shot to dispay within the detail page
//     })
