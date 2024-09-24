// TODO Profile Page
// TODO Checkout using stepper(both frontend and backend)
    // TODO Mock payment with animation
    // TODO Delivery status
// TODO Fancy landing page in /home
// TODO Decorate all pages with images/gifs/animations 

// TODO Implement Google Auth

// BUG Debounced callback not working in button scope for last element only. 
    // - Have workaround but RCA not yet finalised

// BUG This is security threat. - I am calculating the discounted prices in frontend.
// This means that the user can add a breakpoint wherever from dev tools and modify the values.
// Now these values will only be used in react while doing the API call and they can enter any price they want.
// To fix this, all the prices should be stored with the product in the db and it should be used only from there.
// Alternatively, instead of passing the price from front-end, we can only use it for display and recalculate the price in backend.