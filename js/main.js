// setting gear

//set color
document.querySelector(".toggle-setting .fa-gear").onclick = function () {
  this.classList.toggle("fa-spin");
  document.querySelector(".setting-gear").classList.toggle("open");
};

const colorList = document.querySelectorAll(".colors-list li");
let mainColor = localStorage.getItem("color-option");

if (mainColor !== null) {
  document.documentElement.style.setProperty('--main--color', mainColor);
  colorList.forEach(li => {
    li.classList.remove('active');

    if (li.dataset.color === mainColor){
      li.classList.add('active')
    };
  });
}

colorList.forEach(li => {
  li.addEventListener("click", (e) => {
    handleActive(e);
    document.documentElement.style.setProperty('--main--color', e.target.dataset.color);
    window.localStorage.setItem("color-option", e.currentTarget.dataset.color);
  });
});

//apply or stop random backgrounds
let backgroundOption = true;
let backgroundInterval;
const randomBackgrounds = document.querySelectorAll(".random-backgrounds span");

let backgroundLocalItem = localStorage.getItem("randomize-background");
if (backgroundLocalItem != null) {
  if (backgroundLocalItem == 'true') {
    backgroundOption = true;
    // document.querySelector(".yes").classList.add("active");
  } else {
    backgroundOption = false;
    // document.querySelector('.no').classList.add("active");
  };

  randomBackgrounds.forEach(span => {
    span.classList.remove("active");
  });

  if (backgroundLocalItem === "true") {
    document.querySelector(".random-backgrounds .yes").classList.add("active");
  } else {
    document.querySelector('.random-backgrounds .no').classList.add("active");
  };
};

randomBackgrounds.forEach(span => {
  span.addEventListener("click", (e) => {
    handleActive(e);
    if (e.target.dataset.background === 'yes') {
      backgroundOption = true;
      randomizeImgs();
      localStorage.setItem("randomize-background", true);
    } else {
      backgroundOption = false;
      clearInterval(backgroundInterval);
      localStorage.setItem("randomize-background", false);
    }
  });
});


// swip imgs
let  landing = document.querySelector(".landing-page")
let imgsArray = ["img05.jpg", "img04.jpg", "img03.jpg", "img02.jpg", "img01.jpg"];
function randomizeImgs () {
  if (backgroundOption === true) {
    backgroundInterval = setInterval(() => {
      let randomNum = Math.floor(Math.random() * imgsArray.length);
      landing.style.backgroundImage = 'url("imgs/' + imgsArray[randomNum] + '")';
    }, 5000);
  }
};
randomizeImgs();

//progress onscroll
let ourSkills = document.querySelector(".skills");
window.onscroll = function () {
  let skillsOffsetTop = ourSkills.offsetTop;
  let skillsOuterHeight = ourSkills.offsetHeight;
  let windowHeight = this.innerHeight;
  let windowScrollTop = this.pageYOffset;
  if (windowScrollTop > (skillsOffsetTop + skillsOuterHeight - windowHeight)) {
    let allSkills = document.querySelectorAll('.skill-progress span');
    allSkills.forEach(skill => {
      skill.style.width = skill.dataset.progress;
    });
  }
};

//gallery selector
let ourGallery = document.querySelectorAll('.gallery img');
ourGallery.forEach(img => {
  img.addEventListener('click', (e) => {
    let overlay = document.createElement('div');
    overlay.className = 'popup-overlay';
    document.body.appendChild(overlay);
    let popupBox = document.createElement('div');
    popupBox.className = 'popup-box';
    let popupImage = document.createElement('img');
    popupImage.src = img.src;
    popupBox.appendChild(popupImage);
    document.body.appendChild(popupBox);

    if (img.alt !== null) {
      let imgHeading = document.createElement('h3');
      let imgText = document.createTextNode(img.alt);
      imgHeading.appendChild(imgText);
      popupBox.appendChild(imgHeading);
    };

    let closeButton = document.createElement('span');
    let closeButtonText = document.createTextNode(`x`);
    closeButton.appendChild(closeButtonText);
    closeButton.className = 'close-button';
    popupBox.appendChild(closeButton);
  });
});

document.addEventListener('click', (e) => {
  if (e.target.className == 'close-button') {
    e.target.parentNode.remove();
    document.querySelector('.popup-overlay').remove();
  }
});

//Bullet behavior
const allBullets = document.querySelectorAll('.nav-bullets .bullet');
allBullets.forEach(bullet => {
  bullet.addEventListener('click', (e) => {
    // console.log(window.pageYOffset);
    if (e.target.dataset.section == "about") {
      window.scrollTo({
        top: document.querySelector(".about").offsetTop,
        behavior: "smooth"
      });
    } else if (e.target.dataset.section == "skills") {
      window.scrollTo(0, document.querySelector(".skills").offsetTop);
    } else if (e.target.dataset.section == "gallery") {
      window.scrollTo(0, document.querySelector(".gallery").offsetTop);
    } else if (e.target.dataset.section == "timeline") {
      window.scrollTo(0, document.querySelector(".timeline").offsetTop);
    } else if (e.target.dataset.section == "features") {
      window.scrollTo(0, document.querySelector(".features").offsetTop);
    } else if (e.target.dataset.section == "testimonials") {
      window.scrollTo(0, document.querySelector(".testimonials").offsetTop);
    }
    // document.querySelector(e.target.dataset.section).scrollIntoView();
});
});

function handleActive (ev) {
  ev.target.parentElement.querySelectorAll(".active").forEach(element => {
    element.classList.remove("active");
  });
  ev.target.classList.add("active");
};

let bulletsSpan = document.querySelectorAll(".bullets-option span");
let bulletsContainer = document.querySelector(".nav-bullets");
let bulletLocalItem = localStorage.getItem("bullets-option");

if (bulletLocalItem !== null) {
  bulletsSpan.forEach(span => {
    span.classList.remove("active");
  })
  if (bulletLocalItem === 'Block') {
    bulletsContainer.style.display = "block";
    document.querySelector(".bullets-option .yes").classList.add("active");
  } else {
    bulletsContainer.style.display = "none";
    document.querySelector(".bullets-option .no").classList.add("active");
  }
}

bulletsSpan.forEach(span => {
  span.addEventListener("click", (e) => {
    if (span.dataset.display === 'show') {
      bulletsContainer.style.display = 'block';
      localStorage.setItem("bullets-option", 'Block');
    } else {
      bulletsContainer.style.display = 'none';
      localStorage.setItem("bullets-option", 'none');
    }
    handleActive(e);
  });
});

// Reset Options
document.querySelector(".reset-options").onclick = () => {
  localStorage.clear();
  window.location.reload();
};

// Toggle Menu (Header Responsive)
let toggleBtn = document.querySelector(".toggle-menu");
let tLinks = document.querySelector(".links");
toggleBtn.onclick = function (e) {
  e.stopPropagation();
  this.classList.toggle("menu-active");
  tLinks.classList.toggle("open");
};

document.addEventListener("click", (e) => {
  if (e.target !== toggleBtn && e.target !== tLinks) {
    if (tLinks.classList.contains("open")) {
      toggleBtn.classList.toggle("menu-active");
      tLinks.classList.toggle("open");
    };
  }
});
tLinks.onclick = function (e) {
  e.stopPropagation();
}

swal("Welcome To My Templates", "This Template made for all devices. I Hope You Like It");

