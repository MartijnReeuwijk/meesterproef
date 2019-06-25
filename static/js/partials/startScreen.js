const holder = document.querySelector(".explanation-container")
const tutorialName = document.querySelector(".tutorial-names")
const tutorialexplained = document.querySelector(".tutorial-explanation")
const tutorial = document.querySelector(".tutorial-container")
let tutorialNumber = -1;

const tGrid = {
  name: "The first section is a grid of shots from films",
  demo: `<section class="displayFlex">
  <article>
    <p>This block represents a still from a film scene</p>
    <p>You can preview this shot or simply click to view related stills</p> <button class="tutorial-prevBtn transition">Preview</button>
  </article>
  <article>
    <p>This block represents a still from a film scene</p>
    <p>You can preview this shot or simply click to view related stills</p> <button class="tutorial-prevBtn transition">Preview</button>
  </article>
  <article>
    <p>This block represents a still from a film scene</p>
    <p>You can preview this shot or simply click to view related stills</p> <button class="tutorial-prevBtn transition">Preview</button>
  </article>
  <article>
    <p>This block represents a still from a film scene</p>
    <p>You can preview this shot or simply click to view related stills</p> <button class="tutorial-prevBtn transition">Preview</button>
  </article>
  <article>
    <p>This block represents a still from a film scene</p>
    <p>You can preview this shot or simply click to view related stills</p> <button class="tutorial-prevBtn transition">Preview</button>
  </article>
  <article>
    <p>This block represents a still from a film scene</p>
    <p>You can preview this shot or simply click to view related stills</p> <button class="tutorial-prevBtn transition">Preview</button>
  </article>
  <article>
    <p>This block represents a still from a film scene</p>
    <p>You can preview this shot or simply click to view related stills</p> <button class="tutorial-prevBtn transition">Preview</button>
  </article>
  <article>
    <p>This block represents a still from a film scene</p>
    <p>You can preview this shot or simply click to view related stills</p> <button class="tutorial-prevBtn transition">Preview</button>
  </article>
  <article>
    <p>This block represents a still from a film scene</p>
    <p>You can preview this shot or simply click to view related stills</p> <button class="tutorial-prevBtn transition">Preview</button>
  </article>
</section>`,
  explanation: "At first you will be served random images where you select one and in turn you will be rendered shots visually similar to your selection. You can view 9 stills from films related to one another and preview each shot in greater detail and get to know what exactly it is your'e looking at. After viewing you can select one to continue viewing shots related to it."
}
const tTimer = {
  name: "The second section is a timer",
  demo: `<div class="overlay-timer">
        <p><span class="timeSeconds">9</span><span>s</span></p>
      </div>`,
  explanation: "In the app you will have 10 seconds till the next set of related stills will be rendered. It will keep looping through the related images so it's not too bad if you miss a set because it'll come by again... eventually."
}
const tHistory = {
  name: "The third section is a view of the stills youve clicked so far",
  demo: `<div class="testHistory"><article></article><article></article><article></article></div>`,
  explanation: "You can view which shots you've previously selected and also go back in your history and change your path."
}
const tShare = {
  name: "The fourth section is sharing",
  demo: `<div class="tutorial-sharing"><button></button></div>`,
  explanation: "You can share your viewing path through various apps and let others view the videos you selected."
}
const tStart = {
  name: "Thats all sections and functions",
  demo: `<button class="explorer">Start exploring</button>`,
  explanation: "Now your'e ready to explore. Have fun"
}

const nameArray = [`${tGrid.name}`, `${tTimer.name}`, `${tHistory.name}`, `${tShare.name}`, `${tStart.name}`]
const demoArray = [`${tGrid.demo}`, `${tTimer.demo}`, `${tHistory.demo}`, `${tShare.demo}`, `${tStart.demo}`]
const explanationArray = [`${tGrid.explanation}`, `${tTimer.explanation}`, `${tHistory.explanation}`, `${tShare.explanation}`, `${tStart.explanation}`]

document.querySelector(".skipper").addEventListener("click", function() {
  document.querySelector(".intro-overlay").classList.add("hidden")
  document.querySelector(".intro").classList.add("hidden")
})


document.querySelector(".next").addEventListener("click", function() {
  tutorialNumber++;
  if (tutorialNumber == 4) {
    this.textContent = "restart tutorial"
    console.log(tutorialNumber)
    tutorialName.textContent = nameArray[`${tutorialNumber}`]
    tutorial.textContent = ""
    tutorial.insertAdjacentHTML("beforeend", demoArray[`${tutorialNumber}`])
    tutorialexplained.textContent = explanationArray[`${tutorialNumber}`]
    this.setAttribute("style", "font-size:10px;");
    document.querySelector(".explorer").addEventListener("click", function() {
      document.querySelector(".intro-overlay").classList.add("hidden")
      document.querySelector(".intro").classList.add("hidden")
    })
    tutorialNumber = -1;
  } else {
    console.log(tutorialNumber)
    tutorialName.textContent = nameArray[`${tutorialNumber}`]
    tutorial.textContent = ""
    tutorial.insertAdjacentHTML("beforeend", demoArray[`${tutorialNumber}`])
    tutorialexplained.textContent = explanationArray[`${tutorialNumber}`]
    if (tutorialNumber == 1) {
      timerThing();
    } else if (tutorialNumber == 0) {
      document.querySelector(".next").setAttribute("style", "font-size:20px;");
      document.querySelector(".next").textContent = "Next >"
    }
  }


})
// document.querySelectorAll(".intro .displayFlex article").forEach(article => {
//   article.addEventListener("click", function() {
//     document.querySelectorAll(".intro .displayFlex article").forEach(article => {
//       article.setAttribute("style", "opacity:0; background-color: #fff; ")
//       setTimeout(function() {
//         article.setAttribute("style", "opacity:1; background: none;")
//       }, 500)
//       article.querySelector("p:last-of-type").textContent = "You're now viewing a new set of shots related to the one you selected"
//     })
//     totalTime = 9;
//     timeInSeconds.textContent = totalTime
//     const renderArticle = `<article class=""></article>`
//     document.querySelector(".testHistory").insertAdjacentHTML("beforeend", renderArticle)
//   })
// })

// document.querySelectorAll(".tutorial-prevBtn").forEach(button => {
// button.addEventListener("click", function(){
// console.log("click button")
// })
// })


document.querySelector(".starter").addEventListener("click", function() {
  document.querySelector(".expl-txt").classList.add("hidden")
  document.querySelector(".explanation-container").classList.remove("hidden")
  // totalTime = 9;
  // timeInSeconds.textContent = totalTime
})




let totalTime = 9;

function timerThing() {
  const timeInSeconds = document.querySelector(".timeSeconds")
  setInterval(function() {
    if (totalTime <= 0) {
      totalTime = 10;
      totalTime--;
      timeInSeconds.textContent = totalTime
      // document.querySelectorAll(".intro .displayFlex article").forEach(article => {
      // article.setAttribute("style", "opacity:0; background-color: #fff; ")
      // setTimeout(function() {
      // article.setAttribute("style", "opacity:1; background: none;")
      // }, 500)
      // article.querySelector("p:last-of-type").textContent = "You're now looking at a new set of stills because the timer just looped"
      // article.querySelector("p:first-of-type").textContent = "You're still able to click, filter and preview the related stills"
      // })
    } else {
      totalTime--;
      timeInSeconds.textContent = totalTime;
    }
  }, 999);
}
