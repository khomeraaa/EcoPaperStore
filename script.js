"strict";

import { ProductObj } from './object.js';

window.onload = function() {
  window.scrollTo(0, 0);
};

// Renders HTML for all Products in the ProductObj.Cups array
const renderAllProducts = function(itemContainer, productName) {
  const products = ProductObj[productName];  // Access the products array dynamically
  products.forEach(product => {
      let colorsHTML = product.color.map(color => `
          <span class="color-circle" style="background-color: ${color};">
              <span class="tooltip">${color}</span>
          </span>
      `).join('');

      let render = `
      <div class="best-p1">
          <div class="overlay-overflow">
              <div class="overlay hidden">
                  <h1 class='min-quantity'>გამოყენება: ${product.usefor}</h1>
                  <span class='line'></span>
                  <h1 class='min-quantity'>მატერია: ${product.materials}</h1>
                  <span class='line'></span>
                  <h1 class='min-quantity'>მინიმუმი რაოდენობა: 1000 ცალი.</h1>
                  <span class='line'></span>
                  <h1 class='min-quantity'>ზომები: ${product.size.join(', ')}</h1>
                  <span class='line'></span>
                  <h1 class='min-quantity'>ფერები: ${colorsHTML}</h1>
              </div>
          </div>
          <img src="${product.img}" alt="img" class='img-zoom'>
          <div class="best-p1-txt">
              <div class="name-of-p">
                  <h1 class='product-name'>${product.name}</h1>
              </div>
              <div class="price">
                  <!-- Color circles are not included here -->
              </div>
              <div class="buy-now">
                  <button class="btn info-link">უფრო მეტი</button>
              </div>
          </div>
      </div>
      `;
      itemContainer.insertAdjacentHTML("beforeend", render);
  });
};

// Usage examples
const cups = document.querySelector(".cups");
renderAllProducts(cups, 'Cups');  // This will render all cups into the .cups container

const boxes = document.querySelector(".boxes");
renderAllProducts(boxes, 'Boxes');  // This will render all boxes into the .boxes container
const straws = document.querySelector(".straws");
renderAllProducts(straws, 'Straws');  // This will render all cups into the .cups container

const packaging = document.querySelector('.packaging')
renderAllProducts(packaging, 'Packaging')



console.log('error');
// rendered buttons activation/deactivation on click (should reread)
document.addEventListener('DOMContentLoaded', function () {
  const buttons = document.querySelectorAll(".btn");

  buttons.forEach((button) => {
    button.addEventListener("click", function (event) {
      event.stopPropagation(); // Prevent click from immediately propagating to document

      const parentContainer = this.closest(".best-p1");
      const overlay = parentContainer.querySelector(".overlay");
      const infoLink = parentContainer.querySelector('.info-link');

      // Toggle current button and its associated elements
      overlay.classList.toggle("hidden");
      if (infoLink) {
        infoLink.classList.toggle('info-link-active'); // Ensure correct class name for toggle
      }

      // Deactivate other buttons
      buttons.forEach(btn => {
        if (btn !== button) {
          const otherParent = btn.closest(".best-p1");
          const otherOverlay = otherParent.querySelector(".overlay");
          const otherInfoLink = otherParent.querySelector('.info-link');

          otherOverlay.classList.add("hidden");
          if (otherInfoLink) {
            otherInfoLink.classList.remove('info-link-active'); // Ensure correct class name for removal
          }
        }
      });
    });
  });

  // Clicking outside any button should deactivate all
  document.addEventListener("click", function () {
    buttons.forEach(button => {
      const parentContainer = button.closest(".best-p1");
      const overlay = parentContainer.querySelector(".overlay");
      const infoLink = parentContainer.querySelector('.info-link');

      overlay.classList.add("hidden");
      if (infoLink) {
        infoLink.classList.remove('info-link-active'); // Ensure correct class name for removal
      }
    });
  });
});





// slider of Personal info (should reread usable)
const slider = function () {
  const slides = document.querySelectorAll('.slide');
  const btnLeft = document.querySelector('.slider__btn--left');
  const btnRight = document.querySelector('.slider__btn--right');
  const dotContainer = document.querySelector('.dots');

  let curSlide = 0;
  const maxSlide = slides.length;
  let autoSlideInterval;
  // auto sliding interval
  const autoSlideTime = 7000;

  const goToSlide = function (slide) {
    slides.forEach((s, i) => {
      s.style.transform = `translateX(${100 * (i - slide)}%)`;
      s.style.opacity = (i === slide) ? '1' : '0.4'; // Setting opacity based on current slide
    });
    curSlide = slide;
    activateDot(slide);
    activateline(slide);
  };
  

  const activateDot = function (slide) {
    document.querySelectorAll('.dots__dot').forEach(dot => dot.classList.remove('dots__dot--active'));
    document.querySelector(`.dots__dot[data-slide="${slide}"]`)?.classList.add('dots__dot--active');
  };

  const activateline = function (slide) {
    document.querySelectorAll('.flex-line').forEach(dot => dot.classList.remove('flex-line--active'));
    document.querySelector(`.flex-line[data-slide="${slide}"]`)?.classList.add('flex-line--active');
  };

  const nextSlide = function () {
    goToSlide((curSlide + 1) % maxSlide);
  };

  const prevSlide = function () {
    goToSlide((curSlide - 1 + maxSlide) % maxSlide);
  };

  // starts autoslide based on nextslide and time
  const startAutoSlide = function () {
    autoSlideInterval = setInterval(nextSlide, autoSlideTime);
  };

  // stops autoslide. for example user clicks this function stops autoslide to count start from beggining
  const stopAutoSlide = function () {
    clearInterval(autoSlideInterval);
  };

  const init = function () {
    goToSlide(0);
    startAutoSlide();
  };

  btnRight.addEventListener('click', function () {
    nextSlide();
    stopAutoSlide();
    startAutoSlide();
  });

  btnLeft.addEventListener('click', function () {
    prevSlide();
    stopAutoSlide();
    startAutoSlide();
  });

  dotContainer.addEventListener('click', function (e) {
    if (e.target.classList.contains('dots__dot') || e.target.classList.contains('flex-line')) {
      const slide = parseInt(e.target.dataset.slide);
      goToSlide(slide);
      stopAutoSlide();
      startAutoSlide();
    }
  });

  document.addEventListener('keydown', function (e) {
    if (e.key === 'ArrowLeft') {
      prevSlide();
    } else if (e.key === 'ArrowRight') {
      nextSlide();
    }
    stopAutoSlide();
    startAutoSlide();
  });

  init();
};

slider();


// eco cursor following logo at the bottom of the page(should reread usable) 
const logo = document.getElementById("logo"),
      images = logo.querySelectorAll("img");

const getActive = () => document.body.dataset.active === "true",
      setActiveTo = active => document.body.dataset.active = active;

const shift = (image, index, rangeX, rangeY) => {
  const active = getActive();
        
  const translationIntensity = active ? 1 : 1,
        maxTranslation = translationIntensity * (index + 2),
        currentTranslation = `${maxTranslation * rangeX}% ${maxTranslation * rangeY}%`;
  
  // Changes logo size on hover
  const scale = active ? 1 + (index / 10) : 1;
  
  image.animate({ 
    translate: currentTranslation, 
    scale 
  }, { duration: 250, fill: "forwards", easing: "ease" });
}

const shiftAll = (images, rangeX, rangeY) => 
  images.forEach((image, index) => shift(image, index, rangeX, rangeY));

const shiftLogo = (e, images) => {  
  const rect = logo.getBoundingClientRect(),
        radius = 1000;
  
  const centerX = rect.left + (rect.width / 2),
        centerY = rect.top + (rect.height / 2);
  
  const rangeX = (e.clientX - centerX) / radius,
        rangeY = (e.clientY - centerY) / radius;
  
  shiftAll(images, rangeX, rangeY);
}

const resetLogo = () => {
  setActiveTo(false);
  shiftAll(images, 0.4, -0.7);
}

window.onmousemove = e => shiftLogo(e, images);

document.body.onmouseleave = () => {
  if(!getActive()) resetLogo();
}

resetLogo();






// smoothly scrolls on navbar button clicks(usable sould reread)
document.addEventListener("DOMContentLoaded", function() {
  // Select all links within the navbar with href starting with '#'
  const navbarLinks = document.querySelectorAll('.navbar a[href^="#"]');

  // Add an event listener to each link
  navbarLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault(); // Prevent the default anchor click behavior

      // Get the section to scroll to using the href attribute of the clicked link
      const targetId = link.getAttribute('href');
      const targetSection = document.querySelector(targetId);

      // Use scrollIntoView to smoothly scroll to the section
      if (targetSection) {
        targetSection.scrollIntoView({
          behavior: 'smooth', // Enables smooth scrolling
          block: 'start'      // Aligns the section to the top of the viewport
        });
      }
      
    });
  });
});


// reveals sections on scrolling and animates via css (sould reread usable)
const allSections = document.querySelectorAll('.section')
const revealSection = function (entries, observer) {
  const [entry] = entries;
  if(!entry.isIntersecting) return;
  entry.target.classList.remove('seciton--hidden');
  observer.unobserve(entry.target);

}
const secitonObserver = new IntersectionObserver(revealSection, {
  root: null,
  threshold: 0.10,
});
allSections.forEach(function(section) {
  secitonObserver.observe(section);
  section.classList.add('seciton--hidden')
})




// copy on click + animation (should reread usable)

function copyToClipboard(text) {
  // Create a temporary textarea element to help with copying
  const textarea = document.createElement('textarea');
  textarea.value = text;
  document.body.appendChild(textarea);

  // Select the text inside the textarea
  textarea.select();
  textarea.setSelectionRange(0, 99999); // For mobile devices

  // Copy the text inside the textarea
  document.execCommand('copy');

  // Remove the temporary textarea
  document.body.removeChild(textarea);

  // Show the notification
  const notification = document.getElementById('notification');
  notification.style.display = 'block';
  notification.style.opacity = '1';

  // After a few seconds, fade out the notification
  setTimeout(() => {
      notification.style.opacity = '0';
      notification.addEventListener('transitionend', () => {
          notification.style.display = 'none';
      }, { once: true });
  }, 2500); // Adjust time as needed
}

