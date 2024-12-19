// Retrieving data from storage, getting the list of blocked shows from chrome.storage.sync
// Checks if any of the blocked titles appears in the text of the page
// If so, a blur effect is applied to the page content, which can later be unblurred
chrome.storage.sync.get({ blockedShows: []}, function(data) { 
    const blockedShows = data.blockedShows;
    if (blockedShows.length === 0) {
        return;
    }

    const bodyText = document.body.innerText.toLowerCase();

    blockedShows.forEach(show => {
        if (bodyText.includes(show.toLowerCase())) {
            document.body.style.filter = "blur(5px)";
            document.body.innerHTML += "<div class='spoiler-alert'>Spoiler Alert! This content may contain spoilers for one of your blocked titles!>"
            // innerHTML retrieves content from an element, returning the HTML markup as a string
        }
    });
});