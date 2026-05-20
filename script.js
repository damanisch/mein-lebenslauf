document.addEventListener("DOMContentLoaded", function() {
    // Wir suchen alle Details-Elemente innerhalb der Dossier-Sektion
    const dossierDetails = document.querySelectorAll('.dossier-section details');

    dossierDetails.forEach(detailsElement => {
        detailsElement.addEventListener('toggle', (e) => {
            // Nur aktiv werden, wenn der Reiter gerade geöffnet wird
            if (detailsElement.open) {
                // Alle anderen Reiter in der Dossier-Sektion schließen
                dossierDetails.forEach(other => {
                    if (other !== detailsElement) {
                        other.removeAttribute('open');
                    }
                });
            }
        });
    });
});