var data
const results = document.getElementById("results")
const filtersMenu = document.getElementById("filters-menu")
var showFilters = false

const searchFilter = document.getElementById("search")
const discountFilter = document.getElementById("discount")
const freeFilter = document.getElementById("free")
const verifiedFilter = document.getElementById("verified")

function toggleFilters() {
    showFilters = !showFilters
    if (showFilters) filtersMenu.style.display = "flex"
    else filtersMenu.style.display = "none"
}

function createResult(name, icon, url, description, tags) {
    const divResult = document.createElement('div');
    divResult.classList.add('result');

    const imgIcon = document.createElement('img');
    imgIcon.classList.add('result-icon');
    imgIcon.src = icon;

    const divContent = document.createElement('div');
    divContent.classList.add('result-content');

    const divTitle = document.createElement('div');
    divTitle.classList.add('result-title');

    const h1Title = document.createElement('h1');
    h1Title.textContent = name;

    const aLink = document.createElement('a');
    aLink.target = '_blank';
    aLink.href = url;

    const svgIcon = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svgIcon.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
    svgIcon.setAttribute('width', '32');
    svgIcon.setAttribute('height', '32');
    svgIcon.setAttribute('viewBox', '0 0 24 24');

    const pathIcon = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    pathIcon.setAttribute('fill', 'currentColor');
    pathIcon.setAttribute('d', 'M5 21q-.825 0-1.412-.587T3 19V5q0-.825.588-1.412T5 3h7v2H5v14h14v-7h2v7q0 .825-.587 1.413T19 21zm4.7-5.3l-1.4-1.4L17.6 5H14V3h7v7h-2V6.4z');

    const pDescription = document.createElement('p');
    pDescription.textContent = description;

    const ulTags = document.createElement('ul');
    ulTags.classList.add('result-tags');

    divResult.appendChild(imgIcon);
    divResult.appendChild(divContent);
    divContent.appendChild(divTitle);
    divTitle.appendChild(h1Title);
    divTitle.appendChild(aLink);
    aLink.appendChild(svgIcon);
    svgIcon.appendChild(pathIcon);
    divContent.appendChild(pDescription);
    divContent.appendChild(ulTags);

    tags.forEach(tag => {
        const liTag = document.createElement("li");
        liTag.classList.add('result-tag', tag.toLowerCase());
        liTag.textContent = tag;
        ulTags.appendChild(liTag)
    });

    return divResult;
}

function update() {
    results.innerHTML = ""

    let filteredData = data

    if (searchFilter.value) {
        let search = searchFilter.value.toLowerCase()
        filteredData = filteredData.filter(result => result.name.toLowerCase().includes(search) || result.description.toLowerCase().includes(search))
    }

    if (discountFilter.checked) filteredData = filteredData.filter(result => result.tags.includes("Discount"))
    if (freeFilter.checked) filteredData = filteredData.filter(result => result.tags.includes("Free"))
    if (verifiedFilter.checked) filteredData = filteredData.filter(result => result.tags.includes("Verified"))

    searchFilter.placeholder = `Search (${filteredData.length}) college resources...`

    console.log(filteredData)

    filteredData.forEach(result => {
        results.appendChild(createResult(
            result.name,
            result.icon,
            result.url,
            result.description,
            result.tags
        ))
    })
}

document.addEventListener('DOMContentLoaded', function () {
    fetch('data.json')
        .then(response => response.json())
        .then(jsonData => {
            data = jsonData;
            update();
        })
});