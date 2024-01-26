/* 
Data Fetching and Rendering Pseudo Code
    1. Create an async function that pulls data from https://jsonplaceholder.typicode.com API
    2. Store and return that data in fetchData function
    3. Create a renderCard function that creates a card component within the DOM.
    4. Create an async function that renders the cards (appending to the DOM) using the data from our fetchData function
    5. Apply some light styles to the card to make them pop. 4 cards in a row desktop view, 2 for tablet, 1 for mobile
    6. Implement lazy loading/infinte scrolling with intersection observer API - Need to research
*/ 

const fetchData = async () => {
  try {
      const response = await fetch("https://jsonplaceholder.typicode.com/albums/1/photos");

      if (!response.ok) {
          console.error("The server responded with an error.");
      }

      const data = await response.json();
      return data;
  } catch (error) {
      console.error("Fetch failed, please try again later", error);
  }
};

const renderCard = (item) => {
  const card = document.createElement("div");
  card.classList = "card";

  const cardHeader = document.createElement("h3");
  cardHeader.classList = "card-header";
  cardHeader.textContent = item.title;

  const cardImg = document.createElement("img");
  cardImg.classList = "card-img";
  cardImg.alt = item.title;
  cardImg.setAttribute("data-src", item.thumbnailUrl);

  card.appendChild(cardHeader);
  card.appendChild(cardImg);

  return card;
};

const lazyLoadImages = () => {
  const images = document.querySelectorAll('.card-img[data-src]');

  const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
          if (entry.isIntersecting) {
              const lazyImage = entry.target;
              lazyImage.src = lazyImage.getAttribute('data-src');
              observer.unobserve(lazyImage);
          }
      });
  }, { threshold: 0.5 });

  images.forEach((image) => {
      observer.observe(image);
  });
};

const renderCards = async (start, end) => {
  const albumContainer = document.getElementById("album-container");
  const lazyLoadTrigger = document.getElementById("lazy-load-trigger");

  try {
      const data = await fetchData();
      const cardElements = [];

      // Create card elements with data-src attribute
      data.slice(start, end).forEach((item) => {
          const card = renderCard(item);
          cardElements.push(card);
      });

      // Append cards to the container
      cardElements.forEach((card) => {
          albumContainer.appendChild(card);
      });

      // Start lazy loading
      lazyLoadImages();

      // Observe the trigger element to dynamically load more images
      const triggerObserver = new IntersectionObserver((entries) => {
          entries.forEach((entry) => {
              if (entry.isIntersecting) {
                  // Load more images when trigger becomes visible
                  renderCards(end, end + 5);
                  // Unobserve the trigger to avoid continuous loading
                  triggerObserver.unobserve(entry.target);
              }
          });
      }, { threshold: 0.1 });

      triggerObserver.observe(lazyLoadTrigger);
  } catch (error) {
      console.error("Error rendering cards", error);
  }
};

// Render 5 cards initially
renderCards(0, 5);