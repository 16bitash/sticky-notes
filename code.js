let inputContainer = document.getElementById("input_container");
let titleInput = document.getElementById("title_input");
let contentInput = document.getElementById("content_input");
let inputIconsContainer = document.getElementById("input_icons_container");
let whiteInputColorButton = document.getElementById("white-input-color");
let doneBtn = document.getElementById("done_btn");
let notesContainer = document.getElementById("notes_container");
let notesArr = [];

window.onload = function () {
    changeInputColor(whiteInputColorButton, "#ffffff");
};

window.onclick = function (e) {
    if (!inputContainer.contains(e.target)) {
        addNote();
    }
};

contentInput.onfocus = function () {
    titleInput.style.display = "block";
    inputIconsContainer.style.display = "flex";
};

class noteData {
    constructor(titleInput, contentInput) {
        let date = new Date();
        let hour = date.getHours();
        let minutes = date.getMinutes();
        let day = date.getDate();
        let month = date.getMonth() + 1;
        let year = date.getFullYear();
        this.time = hour + ":" + minutes + " " + day + "/" + month + "/" + year;
        this.titleInput = titleInput;
        this.contentInput = contentInput;
        this.bgColor = document.defaultView.getComputedStyle(inputContainer, null).getPropertyValue('background-color');
    }
}

doneBtn.onclick = addNote;

function collapseInput() {
    titleInput.value = "";
    contentInput.value = "";
    titleInput.style.display = "none";
    inputIconsContainer.style.display = "none";
}

function addNote() {
    if (contentInput.value != "" || titleInput.value != "") {
        notesArr.push(new noteData(titleInput.value, contentInput.value));
        refreshNotes();
    }
    collapseInput();
}

function refreshNotes() {
    notesContainer.innerHTML = "";
    for (let i = 0; i < notesArr.length; i++) {
        let currentObject = notesArr[i];
        let note = document.createElement("div");
        note.className = "note shadow";
        let pinIconContainer = document.createElement("span");
        pinIconContainer.className = "floating-icon-container shadow pin-icon-container";
        let pinIcon = document.createElement("i");
        pinIcon.className = "fa fa-thumb-tack floating-icon";
        let deleteIconContainer = document.createElement("span");
        deleteIconContainer.className = "floating-icon-container shadow delete-icon-container";
        deleteIconContainer.onclick = deleteNote;
        let deleteIcon = document.createElement("i");
        deleteIcon.className = "fa fa-trash floating-icon";
        let title = document.createElement("div");
        title.className = "note_title";
        title.innerHTML = currentObject.titleInput;
        let content = document.createElement("span");
        content.className = "note_content";
        content.innerHTML = currentObject.contentInput;
        let iconsContainer = document.createElement("div");
        iconsContainer.className = "icons-container";
        let timeIcon = document.createElement("i");
        timeIcon.className = "icon fa fa-clock-o fa-lg";
        let timeTooltip = document.createElement("span");
        timeTooltip.className = "tooltip";
        timeTooltip.innerHTML = currentObject.time;
        let colorIcon = document.createElement("i");
        colorIcon.className = "icon change-color fa fa-paint-brush fa-lg";
        let colorPalette = document.createElement("span");
        colorPalette.className = "color-palette shadow";
        let whiteColor = document.createElement("span");
        whiteColor.className = "color-box white shadow";
        whiteColor.onclick = (e) => {changeNoteColor(e.target, "rgb(255, 255, 255)")};
        let blueColor = document.createElement("span");
        blueColor.className = "color-box blue shadow";
        blueColor.onclick = (e) => {changeNoteColor(e.target, "rgb(128, 206, 214)")};
        let greyColor = document.createElement("span");
        greyColor.className = "color-box grey shadow";
        greyColor.onclick = (e) => {changeNoteColor(e.target, "rgb(197, 213, 197)")};
        let greenColor = document.createElement("span");
        greenColor.className = "color-box green shadow";
        greenColor.onclick = (e) => {changeNoteColor(e.target, "rgb(153, 255, 153)")};
        let colorTooltip = document.createElement("span");
        colorTooltip.className = "tooltip";
        colorTooltip.innerHTML = "Change Color";
        let leftArrowIcon = document.createElement("i");
        leftArrowIcon.className = "icon fa fa-arrow-left fa-lg";
        leftArrowIcon.onclick = moveLeft;
        let leftArrowIconTooltip = document.createElement("span");
        leftArrowIconTooltip.className = "tooltip";
        leftArrowIconTooltip.innerHTML = "Move Left";
        let rightArrowIcon = document.createElement("i");
        rightArrowIcon.className = "icon fa fa-arrow-right fa-lg";
        rightArrowIcon.onclick = moveRight;
        let rightArrowIconTooltip = document.createElement("span");
        rightArrowIconTooltip.className = "tooltip";
        rightArrowIconTooltip.innerHTML = "Move Right";

        notesContainer.appendChild(note);
        note.appendChild(pinIconContainer);
        pinIconContainer.appendChild(pinIcon);
        note.appendChild(deleteIconContainer);
        deleteIconContainer.appendChild(deleteIcon);
        note.appendChild(title);
        note.appendChild(content);
        note.appendChild(iconsContainer);
        iconsContainer.appendChild(timeIcon);
        timeIcon.appendChild(timeTooltip);
        iconsContainer.appendChild(colorIcon);
        colorIcon.appendChild(colorPalette);
        colorPalette.appendChild(whiteColor);
        colorPalette.appendChild(blueColor);
        colorPalette.appendChild(greyColor);
        colorPalette.appendChild(greenColor);
        colorIcon.appendChild(colorTooltip);
        iconsContainer.appendChild(leftArrowIcon);
        leftArrowIcon.appendChild(leftArrowIconTooltip);
        iconsContainer.appendChild(rightArrowIcon);
        rightArrowIcon.appendChild(rightArrowIconTooltip);

        note.setAttribute("arr-index", i);
        adjustFont(content, note, 60);
        changeNoteColor(blueColor, currentObject.bgColor);
    }
}

function adjustFont(innerContainer, outerContainer, initialFontSize) {
    let currFontSize = initialFontSize - 1;
    let horizontalMarginOfInnerContainer =
        parseInt(document.defaultView.getComputedStyle(innerContainer, null).getPropertyValue('margin-left'));
    while (outerContainer.offsetWidth - innerContainer.offsetWidth <= 2 * horizontalMarginOfInnerContainer) {
        innerContainer.style.fontSize = currFontSize + "px";
        if (currFontSize <= 25) {
            innerContainer.style.wordWrap = "break-word";
            if (outerContainer.offsetWidth - innerContainer.offsetWidth < 2 * horizontalMarginOfInnerContainer) {
                innerContainer.style.wordBreak = "break-all";
            }
            break;
        }
        currFontSize--;
    }
}

function deleteNote(e) {
    let note = e.target.parentNode;
    //to make sure the our note is outer div
    if (note.tagName != "DIV") {
        note = note.parentNode;
    }
    let index = note.getAttribute("arr-index");
    notesArr.splice(index, 1);
    refreshNotes();
}

function moveLeft(e) {
    let note = e.target.parentNode.parentNode;  //double nested icon
    let index = parseInt(note.getAttribute("arr-index"));
    if (index === 0) {
        return;
    }
    let noteObject = notesArr[index];
    notesArr[index] = notesArr[index - 1];
    notesArr[index - 1] = noteObject;
    refreshNotes();
}

function moveRight(e) {
    let note = e.target.parentNode.parentNode;  //double nested icon
    let index = parseInt(note.getAttribute("arr-index"));
    if (index === notesArr.length - 1) {
        return;
    }
    let noteObject = notesArr[index];
    notesArr[index] = notesArr[index + 1];
    notesArr[index + 1] = noteObject;
    refreshNotes();
}

function changeNoteColor(clickedObject, color) {
    let note = clickedObject.parentNode.parentNode.parentNode.parentNode;
    note.style.backgroundColor = color;
    colorHighlight(clickedObject);
}

function changeInputColor(clickedObject, color) {
    inputContainer.style.backgroundColor = color;
    titleInput.style.backgroundColor = color;
    contentInput.style.backgroundColor = color;
    colorHighlight(clickedObject);
}

function colorHighlight(colorBox) {
    let allColors = colorBox.parentNode.childNodes;
    for (let i = 0; i < allColors.length; i++) {
        // Hardcoding to ignore all the return(next line) values
        if (allColors[i].nodeName === "#text") {
            continue;
        }
        allColors[i].style.borderWidth = 0;
    }
    colorBox.style.borderWidth = "1px";
}