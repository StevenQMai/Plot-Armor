// Retrieving data from storage, getting the list of blocked shows from chrome.storage.sync
// Checks if any of the blocked titles appears in the text of the page
// If so, a blur effect is applied to the page content, which can later be unblurred
chrome.storage.sync.get({ 
    blockedShows: [],
    blurPreference: "page"
}, 
    function(data) { 
    const blockedShows = data.blockedShows;
    const blurPreference = data.blurPreference; // 'page' or 'sentence'

    if (blockedShows.length === 0) {
        return;
    }

    const bodyText = document.body.innerText.toLowerCase();

    // Loop through the blocked shows
    blockedShows.forEach(show => {
        if (bodyText.includes(show.toLowerCase())) {
            // Apply blur based on user preference

            if (blurPreference === "page") {
                applyPageBlur();
            } else if (blurPreference === "sentence") {
                applySentenceBlur(show);
            }
        }
    });
});


function applyPageBlur() {
    document.body.style.filter = "blur(5px)";
    document.body.innerHTML += "<div class='spoiler-alert'>Spoiler Alert! This content may contain spoilers for one of your blocked titles!>"
    // innerHTML retrieves content from an element, returning the HTML markup as a string
}

    
// Function to blur individual sentences containing spoilers
function applySentenceBlur(show) {
    const bodyText = document.body.innerText;
    const sentences = bodyText.split(/(?<=[.!?])\s+/); // Split into sentences by punctuation marks

    sentences.forEach((sentence) => {
        if (sentence.toLowerCase().includes(show.toLowerCase())) {
            blurSentence(sentence);
        }
    });

    document.body.innerHTML += "<div class='spoiler-alert'>Spoiler Alert! This content may contain spoilers for one of your blocked titles!</div>";
}

// Helper function to blur a specific sentence
function blurSentence(sentence) {
    const sentenceElement = document.createElement('span');
    sentenceElement.style.filter = "blur(5px)";
    sentenceElement.innerText = sentence;

    // Wrap the blurred sentence in a div and replace the original content
    const sentenceDiv = document.createElement('div');
    sentenceDiv.appendChild(sentenceElement);
    document.body.innerHTML = document.body.innerHTML.replace(sentence, sentenceDiv.outerHTML);
}