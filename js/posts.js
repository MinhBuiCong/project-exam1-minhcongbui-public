const postUrl =
  " https://royals-shop.com/techblog/wp-json/wp/v2/posts?per_page=14";
const urlCategories =
  " https://royals-shop.com/techblog/wp-json/wp/v2/categories?per_page=100";

const blogContainer = document.querySelector(".blog-container");
const categoriesContainer = document.querySelector(".categories-container");
const categoriesName = document.querySelector(".categories-name");
const posts = document.querySelector(".posts");
const bigCard = document.querySelector(".big-card");
const smallCardContainer = document.querySelector(".small-card-section");
const viewMore = document.querySelector(".view-more");
const button = document.querySelector(".category-button");
const itemContent = 10;
let data;

async function getUrl() {
  try {
    const responsePosts = await fetch(postUrl);
    const responseCategories = await fetch(urlCategories);
    const postData = await responsePosts.json();
    const postCategories = await responseCategories.json();
    data = postData.map(function (data, index) {
      return {
        id: index,
        link: data.id,
        title: data.title,
        image: data.featured_media_src_url,
        slug: data.slug,
        description: data.excerpt,
        date: convertDate(data),
        categories: data.categories,
      };
    });
    createPosts(data);
    createCategoryButtons(postCategories);
  } catch (error) {
    blogContainer.innerHTML = `<h1> Something is not right</h1>`;
    console.log("error :>> ", error);
  }
}

getUrl();

function createCategoryButtons(postCategories) {
  for (let i = 0; i < postCategories.length; i++) {
    categoriesName.innerHTML += `
    <button class="category-button">${postCategories[i].name}</button>`;
  }
}

function createPosts(data) {
  for (let i = 0; i < data.length; i++) {
    var cards = `
                      <div class="image-content ${data[i].categories}">
                      <img class="background-image"src="${data[i].image}" alt="${data[i].slug}" ></img>
                      <div class="publication-details">
                      <a href="../blog-detail.html?id=${data[i].link}" class="author">Author: Minh Cong Bui</a>
                      <span class="date">Published: ${data[i].date}</span>
                      </div>
                      </div>
                      <div class="post-content">
                      <h2 class="card-title">${data[i].title["rendered"]}</h2>
                      <h3 class="card-subtitle">sub-title</h3>
                      <p class="card-description">${data[i].description["rendered"]}</p>
                      <div class="card-action">
                      <a href="../blog-detail.html?id=${data[i].link}">Read more &rarr;</a>
                      </div>
                      </div>`;
    if (i === 0) {
      bigCard.innerHTML = cards;
    }
    if (i > 0) {
      smallCardContainer.innerHTML += `<div class="small-card">${cards}</div>`;
      let smallCard = document.querySelectorAll(".small-card");
      let totalCard = smallCard.length;
      addHiddenClass(smallCard, totalCard);

      viewMore.addEventListener("click", function () {
        buttonViewMore(smallCard, totalCard);
      });
    }
  }
}

function convertDate(data) {
  return data.date.split("T")[0];
}

function addHiddenClass(smallCard, totalCard) {
  console.log("itemContent :>> ", itemContent);
  for (var i = itemContent - 1; i < totalCard; i++) {
    smallCard[i].classList.add("hidden");
  }
}

function buttonViewMore(smallCard, totalCard) {
  for (var i = itemContent - 1; i < totalCard; i++) {
    smallCard[i].classList.remove("hidden");
    viewMore.style.display = "none";
  }
}
