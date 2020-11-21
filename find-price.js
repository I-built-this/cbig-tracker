let prices = {};

let observer = new MutationObserver(mutations => {
    for (let mutation of mutations) {

        let auction = {
            Name: mutation.target.parentNode.parentNode.parentNode.parentNode.childNodes[2].childNodes[0].textContent,
            lotNumber: mutation.target.parentNode.parentNode.parentNode.parentNode.attributes['data-lot'].value,
            price: parseFloat(mutation.target.dataset.value),
        }
        
        if (!prices[auction.lotNumber]) {
            prices[auction.lotNumber] = auction.price

            let tracker = document.createElement("div")
            tracker.textContent = `Lowest Seen: $${auction.price.toFixed(2)}`;
            tracker.id = auction.lotNumber;
            tracker.style.cssText = 'text-align: center; width: 100%;'

            mutation.target.parentNode.parentNode.parentNode.prepend(tracker)
        } else if(prices[auction.lotNumber] > auction.price) {
            prices[auction.lotNumber] = auction.price
            document.getElementById(auction.lotNumber).textContent = `Lowest Seen: $${auction.price.toFixed(2)}`
        }
            
    }
});

observer.observe(document, { subtree: true, attributes: true, attributeFilter: ['data-value'] });