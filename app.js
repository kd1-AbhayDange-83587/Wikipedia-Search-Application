let searchInputEl = document.getElementById("searchInput");

let searchResultsEl = document.getElementById("searchResults");

let spinnerEl = document.getElementById("spinner");

function createAndAppendResults(result) {
    // creating Result Item
    let resultItemEl = document.createElement("div");
    resultItemEl.classList.add("result-item","d-flex", "flex-column");
    searchResultsEl.appendChild(resultItemEl);

    // creating title element
    let {
        link,
        title,
        description
    } = result;
    let resultTitleEl = document.createElement('a');
    resultTitleEl.href = link;
    resultTitleEl.target = '_blank';
    resultTitleEl.textContent = title;
    resultTitleEl.classList.add("result-title");
    resultItemEl.appendChild(resultTitleEl);

    // break element
    let titleBreakEl = document.createElement("br");
    resultItemEl.appendChild(titleBreakEl);

    // creating url
    let urlEl = document.createElement('a');
    urlEl.classList.add("result-url");
    urlEl.href = link;
    urlEl.target = '_blank';
    urlEl.textContent = link;
    resultItemEl.appendChild(urlEl);

    //break el
    let lineBreakEl = document.createElement('br');
    lineBreakEl.appendChild(titleBreakEl);

    // creating description
    let descriptionEl = document.createElement('p');
    descriptionEl.classList.add('link-description');
    descriptionEl.textContent = description;
    resultItemEl.appendChild(descriptionEl);
}

function displayResults(searchResults) {
    spinnerEl.classList.toggle('d-none');
    for (let result of searchResults) {
        createAndAppendResults(result);
    }
}

function searchWikipedia(event) {
    if (event.key === "Enter") {
        spinnerEl.classList.toggle('d-none');
        searchResultsEl.textContent = "";
        let searchInput = searchInputEl.value;
        let url = "https://apis.ccbp.in/wiki-search?search=" + searchInput;
        let options = {
            method: 'GET'
        };
        fetch(url, options)
            .then(function(response) {
                return response.json();
            })
            .then(function(jsonData) {
                let {
                    search_results
                } = jsonData;
                console.log(jsonData);
                displayResults(search_results);
            });
    }
}
searchInputEl.addEventListener("keydown", searchWikipedia);