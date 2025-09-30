// Custom script to ensure image visibility
document.addEventListener('DOMContentLoaded', function() {
  // Create the image element
  const imageContainer = document.createElement('div');
  imageContainer.className = 'product-single__box__block';
  imageContainer.style.cssText = 'margin: 20px 0; padding: 10px; text-align: center;';
  
  const img = document.createElement('img');
  img.src = 'https://cdn.shopify.com/s/files/1/0501/1560/8740/files/Frame_93.png?v=1759149467';
  img.alt = 'Product info';
  img.style.cssText = 'display: block !important; visibility: visible !important; max-width: 100%; width: 400px; height: auto; margin: 0 auto;';
  
  imageContainer.appendChild(img);
  
  // Find the target location to insert the image
  const customLiquidBlock = document.querySelector('.product-single__box__block--custom-liquid');
  const descriptionBlock = document.querySelector('.product-single__box__block--description');
  
  if (customLiquidBlock && descriptionBlock) {
    // Insert between custom-liquid and description blocks
    customLiquidBlock.parentNode.insertBefore(imageContainer, descriptionBlock);
  } else if (descriptionBlock) {
    // Insert before description block
    descriptionBlock.parentNode.insertBefore(imageContainer, descriptionBlock);
  } else {
    // Fallback: append to product box
    const productBox = document.querySelector('.product-single__box');
    if (productBox) {
      productBox.appendChild(imageContainer);
    }
  }
});