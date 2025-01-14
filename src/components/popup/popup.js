// Handles user interactions (adding a title to the blocklist and storing preferences)

document.getElementById("add-show").addEventListener("click", function() { // when this button is clicked, the function inside executes
    const showTitle = document.getElementById("show").value.trim(); // gets the value from the input field with ID #show
    if (showTitle) { //only executes if the input field isnt empty (prevents blank show titles from being added)
        chrome.storage.sync.get({ blockedShows: []}, function(data) { // retrieves the current list of blocked shows from Chrome's sync storage with a default value of an empty array if no blocked shows are saved yet
            const updatedShows = [...data.blockedShows, showTitle]; // takes the current list of blocked shows and adds the new showTitle to it
            chrome.storage.sync.set({ blockedShows: updatedShows }, function () { // updates the blockedShows list in chrome's sync storage with the new array
                renderShows(); // update the UI based on the newly added shows
            });
        });
    }
});

function renderShows() {
    chrome.storage.sync.get({ blockedShows: [] }, function(data) {
        const listElement = document.getElementById("show-list");
        listElement.innerHTML = '';
        data.blockedShows.forEach(function(show) {
            const li = document.createElement("li");
            li.textContent = show;
            listElement.appendChild(li);
        });
    });
}

renderShows();