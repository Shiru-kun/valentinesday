// const photo = prompt("Enter the photo URL:");
// const message = prompt("Enter your message:");
// const sender = prompt("Enter your name:");
// document.getElementById("photo").src = photo;
document.getElementById("message").innerHTML = "Mira Alex";
document.getElementById("sender").innerHTML = "By: FK";

const images = document.querySelectorAll('img[data-src]');

const observer = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const img = entry.target;
      img.src = img.dataset.src;
      observer.unobserve(img);
    }
  });
});

images.forEach(img => observer.observe(img));


const elementsWithBg = document.querySelectorAll('.flower-bg');
const bgImages = Array.from(elementsWithBg).map(element => {
  const style = window.getComputedStyle(element);
  return style.backgroundImage.slice(4, -1).replace(/["']/g, "");
});

Promise.all(bgImages.map(url => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.src = url;
    img.onload = () => resolve(url);
    img.onerror = reject;
  });
})).then(() => {
  const style = document.createElement('style');
  style.innerHTML = bgImages.reduce((acc, url, i) => {
    return acc + `.flower-bg:nth-child(${i + 1}) { background-image: url(${url}) }`;
  }, "");
  document.head.appendChild(style);
});

