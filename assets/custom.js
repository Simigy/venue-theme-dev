/*-----------------------------------------------------------------------------/
/ Custom Theme JS
/-----------------------------------------------------------------------------*/

// Insert any custom theme js here...
// Add this at the end of your custom.js file
document.addEventListener('DOMContentLoaded', function() {
  // Monitor for script loads
  const originalCreateElement = document.createElement;
  document.createElement = function(tag) {
    const element = originalCreateElement.call(document, tag);
    if (tag.toLowerCase() === 'script') {
      element.addEventListener('load', function() {
        if (this.src && this.src.includes('appointo')) {
          console.log('Appointo script loaded:', this.src);
        }
      });
    }
    return element;
  };
  
  // Monitor querySelectorAll calls
  const originalQuerySelectorAll = document.querySelectorAll;
  document.querySelectorAll = function(selector) {
    const result = originalQuerySelectorAll.call(document, selector);
    if (new Error().stack.includes('appointo')) {
      console.log('Appointo querySelectorAll:', selector, result.length);
      console.trace('Appointo querySelectorAll trace');
    }
    return result;
  };

  // Add a style tag to hide Appointo elements in cart
  const styleEl = document.createElement('style');
  styleEl.textContent = `
    /* Hide Appointo elements in cart context */
    .cart-drawer appointo-element,
    .cart-popup appointo-element,
    #cart-notification appointo-element,
    .cart-page appointo-element {
      display: none !important;
    }
  `;
  document.head.appendChild(styleEl);
  
  // Log for debugging
  console.log('Appointo cart conflict prevention loaded');
});

// Root Cause Analysis

The issue appears to be related to the Appointo appointment booking app that's installed on your Shopify store. From our findings:

1. The app is referenced in your `settings_data.json` as "appointment-booking-appointo"
2. The script `appointo_bundle.js` is likely injected by Shopify through the `content_for_header` tag in your theme.liquid (line 200-300)
3. The error occurs because the script is trying to access DOM elements that either:
   - Don't exist at the time the script runs
   - Have been modified by your custom theme implementation
   - Are conflicting with your theme's cart implementation

## Solution Options

### Option 1: Add Custom CSS to Hide Appointo Elements in Cart

Since the error appears to be related to the cart functionality, you can add CSS to prevent Appointo from interfering with your cart:

// Additional fix that runs later in the page lifecycle
window.addEventListener('load', function() {
  setTimeout(function() {
    // Add a style tag to hide Appointo elements in cart (backup)
    const styleEl = document.createElement('style');
    styleEl.textContent = `
      /* Hide Appointo elements in cart context */
      .cart-drawer appointo-element,
      .cart-popup appointo-element,
      #cart-notification appointo-element,
      .cart-page appointo-element {
        display: none !important;
      }
    `;
    document.head.appendChild(styleEl);
    
    console.log('Appointo cart conflict prevention (delayed) loaded');
  }, 1000); // Run 1 second after page load
});
