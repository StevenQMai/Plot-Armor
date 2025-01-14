
// Ensures that only one checkbox is selected at a time
function check(input) {
    let checkboxes = document.getElementsByClassName("radioCheck");

    for (let i = 0; i < checkboxes.length; i++) {
        if (checkboxes[i] !== input) {
            checkboxes[i].checked = false;
        }
    }
    if (input.checked === false) {
        input.checked = false;
    } else {
        input.checked = true;
    }

    return input.checked

}