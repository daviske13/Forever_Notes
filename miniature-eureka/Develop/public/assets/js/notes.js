const noteList = document.querySelector("#note-list ul");

function displayNotes(notes) {
    noteList.innerHTML = "";

    notes.forEach((note) => {
    const li = document.createElement("li");
    const link = document.createElement("a");
