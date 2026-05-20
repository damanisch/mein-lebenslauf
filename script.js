document.addEventListener("DOMContentLoaded", function() {
    const allDetails = document.querySelectorAll('details');
    
    allDetails.forEach(detailsElement => {
        const summary = detailsElement.querySelector('summary');
        if (summary && summary.innerText.includes('Ricola')) {
            detailsElement.addEventListener('toggle', () => {
                if (detailsElement.open) {
                    document.body.classList.add('ricola-active');
                } else {
                    document.body.classList.remove('ricola-active');
                }
            });
        }
    });
});