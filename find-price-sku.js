let price;

let observer = new MutationObserver(mutations => {
    for (let mutation of mutations) {
        if (mutation.target.parentNode.parentNode.parentNode.className === 'rs lot-bid') {

            let currentPrice = parseFloat(mutation.target.dataset.value)

            if (!price) {
                price = currentPrice
                let tracker = document.createElement("div")
                tracker.id = 'tracker-price';
                tracker.style.cssText = 'text-align: center; width: 100%; font-size: 32px;';
                tracker.textContent = `Lowest Seen: $${price.toFixed(2)}`;
                mutation.target.parentNode.parentNode.parentNode.prepend(tracker)
            } else if (price > currentPrice) {
                price = currentPrice
                document.getElementById('tracker-price').textContent = `Lowest Seen: $${price.toFixed(2)}`
            }

        }

    }
});

observer.observe(document, { subtree: true, attributes: true, attributeFilter: ['data-value'] });