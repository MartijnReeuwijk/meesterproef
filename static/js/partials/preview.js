function toggleDetailPage () {
  document.getElementsByClassName('modalHolder')[0].classList.toggle('displayNone')
  document.getElementsByClassName('shadowOverlay')[0].classList.toggle('displayNone')
  document.getElementsByClassName('videoFile')[0].pause()
}
document.getElementsByClassName('closeDetail')[0].addEventListener('click', toggleDetailPage)
document.getElementsByClassName('shadowOverlay')[0].addEventListener('click', toggleDetailPage)

export function addPreviewListeners () {
  const prev = Array.from(document.getElementsByClassName('prevButton'))
  prev.forEach(elem => {
    // elem.addEventListener('click', toggleDetailPage)
    elem.addEventListener('click', function () {
      toggleDetailPage()
      makeDetailPage(this)
    })
  })
}

// title
// author
// co
// length
// date
// directed
async function makeDetailPage (button) {
  const response = await getDetailData(button.dataset.image)
  const data = response.GetRecord.record.metadata['oai_dc:dc']
  const newData = {
    title: data['dc:title'].$t ? data['dc:title'].$t : data['dc:title']['0'].$t,
    co: 'a',
    data: data['dc:date'],
    video: data['dc:format'][0],
    creator: data['dc:creator'].$t ? data['dc:creator'].$t : data['dc:creator']['0'].$t
  }
  document.getElementsByClassName('title')[0].textContent = newData.title
  document.getElementsByClassName('creator')[0].textContent = newData.creator
  document.getElementsByClassName('date')[0].textContent = newData.data
  document.getElementsByClassName('videoFile')[0].src = newData.video
}

async function getDetailData (video) {
  const id = video
  return new Promise(async function(resolve, reject) {
    try {
      const res = await fetch(`/ob-video/${id}`)
      let data = await res.json()
      resolve(data)
    } catch (err) {
      reject(err)
    }
  })
}

addPreviewListeners()
