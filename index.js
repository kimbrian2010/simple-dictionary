const input = document.getElementById("input");
const infoText = document.getElementById("info-text");
const definitionEl = document.getElementById("definition");
const wordEl = document.getElementById("word");
const meaningEl = document.getElementById("meaning");
const audioEl = document.getElementById("audio");


async function fetchWordAPI(word) {
    try {
        infoText.style.display = "block";
        definitionEl.style.display = "none" //Hide class while waiting for word fetch
        infoText.innerText = `Searching for the meaning of "${word}"`

        const wordURL = `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`;
        const result = await fetch(wordURL).then((res) => res.json());

        if (result.title) { //If no word returned
            infoText.style.display = "none"; //Hidding wait message after word fetch
            definitionEl.style.display = "block" //Show hidden class in CSS
            wordEl.innerText = word;
            meaningEl.innerText = "Not Available; most likely not an English word";
            audioEl.style.display = "none";
        } else {
            console.log(result);
            infoText.style.display = "none"; //Hidding wait message after word fetch
            definitionEl.style.display = "block" //Show hidden class in CSS
            audioEl.style.display = "inline-flex";
            wordEl.innerText = result[0].word;
            meaningEl.innerText = result[0].meanings[0].definitions[0].definition;
            audioEl.src = result[0].phonetics[0].audio;
        }

    } catch (error) {
        console.log(error);
        infoText.innerText = "Something went wrong, try later!" //Display message when there no Internect connect etc
    }
}


input.addEventListener("keyup", (e) => {
    if (e.target.value && e.key === "Enter") {
        fetchWordAPI(e.target.value);
    };

});