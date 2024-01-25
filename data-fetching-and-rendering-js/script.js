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
        console.log("Network response not ok");
      }
  
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("There was an error fetching data:", error);
      throw error;
    }
  }

  const renderCard = item => {
      const card = document.createElement("div");
      card.classList = "card";
    
      const cardHeader = document.createElement("h3");
      cardHeader.classList = "card-header";
      cardHeader.textContent = item.title;

      const cardImg = document.createElement("img");
      cardImg.classList = "card-img";
      cardImg.src = item.thumbnailUrl;
      cardImg.title = item.title;

      card.appendChild(cardHeader);
      card.appendChild(cardImg); 

      return card;
  }

  const renderCards = async (start, end) => {
      const albumContainer = document.getElementById("album-container");
      try {
          const data = await fetchData();
          data.slice(start, end).forEach(item => {
              const card = renderCard(item);
              albumContainer.appendChild(card);
          });
      }
      catch(error) {
          console.error("There was an error rendering the cards:", error);
      }
  }

  renderCards(0, 10);