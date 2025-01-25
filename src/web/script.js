const recents = [
  {
    id: 1,
    title: "JavaScript",
    url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript",
    description: "JavaScript documentation",
    image: "https://placehold.co/60x60?text=JS",
  },
  {
    id: 2,
    title: "Python",
    url: "https://docs.python.org/3/",
    description: "Python documentation",
    image: "https://placehold.co/60x60?text=Py",
  },
  {
    id: 3,
    title: "React",
    url: "https://reactjs.org/docs/getting-started.html",
    description: "React documentation",
    image: "https://placehold.co/60x60?text=React",
  },
  {
    id: 4,
    title: "React",
    url: "https://reactjs.org/docs/getting-started.html",
    description: "React documentation",
    image: "https://placehold.co/60x60?text=React",
  },
];
const docs = [
  {
    id: 1,
    title: "Supabase",
    url: "https://supabase.com/docs",
    description: "Supabase documentation",
    image: "https://placehold.co/60x60?text=JS",
  },
  {
    id: 2,
    title: "Python",
    url: "https://docs.python.org/3/",
    description: "Python documentation",
    image: "https://placehold.co/60x60?text=Py",
  },
  {
    id: 3,
    title: "React",
    url: "https://reactjs.org/docs/getting-started.html",
    description: "React documentation",
    image: "https://placehold.co/60x60?text=React",
  },
  {
    id: 1,
    title: "JavaScript",
    url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript",
    description: "JavaScript documentation",
    image: "https://placehold.co/60x60?text=JS",
  },
  {
    id: 2,
    title: "Python",
    url: "https://docs.python.org/3/",
    description: "Python documentation",
    image: "https://placehold.co/60x60?text=Py",
  },
  {
    id: 3,
    title: "React",
    url: "https://reactjs.org/docs/getting-started.html",
    description: "React documentation",
    image: "https://placehold.co/60x60?text=React",
  },
  {
    id: 1,
    title: "JavaScript",
    url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript",
    description: "JavaScript documentation",
    image: "https://placehold.co/60x60?text=JS",
  },
  {
    id: 2,
    title: "Python",
    url: "https://docs.python.org/3/",
    description: "Python documentation",
    image: "https://placehold.co/60x60?text=Py",
  },
  {
    id: 3,
    title: "React",
    url: "https://reactjs.org/docs/getting-started.html",
    description: "React documentation",
    image: "https://placehold.co/60x60?text=React",
  },
];

const recentContainer = document.getElementById("recent-container");
const popularContainer = document.getElementById("popular-container");
const detailsPage = document.getElementById("detailsPage");
const iframe = document.getElementById("docsFrame");
const recentsSection = document.getElementById("recentsSection");
const popularSection = document.getElementById("popularSection");
const backButton = document.getElementById("backButton");
const searchInput = document.getElementById("search");
const searchButton = document.getElementById("searchButton");

// Dynamically populate recent and popular sections
function populateDocs(container, docsList) {
  docsList.forEach((doc) => {
    const docDiv = document.createElement("div");
    docDiv.className = "items-component";
    docDiv.innerHTML = `
      <img id="comp-image" src="${doc.image}" alt="${doc.title}" />
      <div id="to-side">
        <h3>${doc.title}</h3>
        <p>${doc.description}</p>
      </div>
    `;
    docDiv.addEventListener("click", () => {
      loadDoc(doc.url);
      history.pushState(
        { url: doc.url },
        doc.title,
        `#/${doc.title.toLowerCase()}`
      );
    });
    container.appendChild(docDiv);
  });
}

function loadDoc(url) {
  recentsSection.style.display = "none";
  popularSection.style.display = "none";
  detailsPage.style.display = "block";
  iframe.src = url;
}

// Handle back button click
backButton.addEventListener("click", () => {
  recentsSection.style.display = "block";
  popularSection.style.display = "block";
  detailsPage.style.display = "none";
  iframe.src = "";
  history.pushState(null, null, "/");
});

// Populate recents and popular sections
populateDocs(recentContainer, recents);
populateDocs(popularContainer, docs);
const isValidUrl = (urlString) => {
  var a = document.createElement("a");
  a.href = urlString;
  return a.host && a.host !== window.location.host;
};
async function getMetadata(query) {
  try {
    // Fetch the response and process it as text
    come = "https://cors-anywhere.herokuapp.com/" + query;
    const response = await fetch(query);
    const html = await response.text();

    // Parse the HTML response into DOM elements
    const parsedHTML = $.parseHTML(html);
    let txt = ""; // Ensure txt is declared

    // Iterate through the parsed HTML
    $.each(parsedHTML, function (i, el) {
      if (
        el.nodeName.toLowerCase() === "meta" && // Check if it's a meta tag
        $(el).attr("name") != null // Ensure it has a name attribute
      ) {
        const content = $(el).attr("content")
          ? $(el).attr("content")
          : $(el).attr("value")
          ? $(el).attr("value")
          : "";

        txt += `${$(el).attr("name")}=${content}<br>`;
        console.log($(el).attr("name"), "=", content, el);
      }
    });

    // Optionally return or use the txt variable
    return txt;
  } catch (error) {
    console.error("Error fetching metadata:", error);
  }
}

// Handle search functionality
searchButton.addEventListener("click", async () => {
  const searchQuery = searchInput.value.trim().toLowerCase();
  const recents = [];
  const foundDoc = docs.find((doc) =>
    doc.title.toLowerCase().includes(searchQuery)
  );

  isValid = isValidUrl(searchQuery);
  try {
    if (isValid) {
      loadDoc(searchQuery);
      history.pushState({ url: searchQuery }, `#/search`);
      recentsdata = await getMetadata(searchQuery);
      recents.push(recentsdata);
      console.log(recents, recentsdata);
    }
    if (foundDoc) {
      loadDoc(foundDoc.url);
      history.pushState(
        { url: foundDoc.url },
        foundDoc.title,
        `#/${foundDoc.title.toLowerCase()}`
      );
    }
  } catch (error) {
    console.log(error);
  }
});

// Handle browser navigation
window.addEventListener("popstate", (event) => {
  if (event.state && event.state.url) {
    loadDoc(event.state.url);
  } else {
    backButton.click();
  }
});

