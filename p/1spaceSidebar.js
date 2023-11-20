async function fetchAds() {
  try {
    const response = await fetch('https://cdn.jsdelivr.net/gh/vivianmediagroup/partnerSystem@latest/p/partners.json');
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching ads:', error);
    return [];
  }
}
function createAdElements(ad) {
  const adContainer = document.createElement('div');
  if (ad.image) {
    const image = document.createElement('img');
    image.src = ad.image;
    image.style.height = '20vh';
    image.style.width = 'auto';
    adContainer.appendChild(image);
  }
  const title = document.createElement('h4');
  title.textContent = ad.title;
  const description = document.createElement('p');
  description.textContent = ad.description;
  description.style.fontSize = '14px';
  const learnMoreButton = document.createElement('button');
  learnMoreButton.textContent = 'Learn More';
  learnMoreButton.style.backgroundColor = 'blue';
  learnMoreButton.style.color = 'white';
  learnMoreButton.onclick = function () {
    window.open(ad.link, '_blank', 'noreferrer');
  };
  const footer = document.createElement('small');
  const adLink = document.createElement('a');
  adLink.href = "https://go.joindefy.com/youradhere";
  adLink.innerHTML = '<br>VMG Ads';
  footer.appendChild(adLink);
  footer.innerHTML += ' | FTC: Sponsored Content';
  adContainer.appendChild(title);
  adContainer.appendChild(description);
  adContainer.appendChild(learnMoreButton);
  adContainer.appendChild(footer);
  return adContainer;
}

async function displayAds() {
  const ads = await fetchAds();
  const sidebarAds = document.querySelectorAll('.sidebarAd');
  sidebarAds.forEach((adContainer) => {
    const randomIndex = Math.floor(Math.random() * ads.length);
    const randomAd = ads[randomIndex];
    const adElement = createAdElements(randomAd);
    adContainer.innerHTML = '';
    adContainer.appendChild(adElement);
  });
}
displayAds();
