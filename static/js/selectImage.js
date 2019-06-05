// Add eventlistener to all the images.
function thumbnailsEventsListener() {
  console.log("re");
  let thumbnails = document.getElementsByClassName("mainpageImage");
  for (let i = 0; i < thumbnails.length; i++) {
    console.log(thumbnails[i]);
    thumbnails[i].addEventListener("click", function(e){
      let image = e.target.dataset.image;
      let shotNum = e.target.dataset.shot;

      if (window.location.href.includes("/semia")) {
        window.location.href += `/${image}`;
      } else {
        window.location.href += `search/${image}`;
      }
    });
  }
}
thumbnailsEventsListener();
