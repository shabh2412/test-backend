const sample_products = [];

allProducts.forEach((li, idx) => {
  const img = li.querySelector("a > div > img")?.src;
  const info = li.querySelector(".result-product-item-info");
  const title = info.querySelector(".product-item-title").innerText;
  const author = info.querySelector(".product-item-author")?.innerText;
  const formattedPrice = info.querySelector(".wizzy-product-item-price ")?.innerText;
  const price = +(formattedPrice?.split("₹")[1]);
  sample_products.push(
    {
      img,
      title,
      author,
      formattedPrice,
      price,
      id: idx,
    }
  );
});

sample_products;