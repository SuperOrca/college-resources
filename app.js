async function fetchData() {
    const response = await fetch('./data.json');
    return response.json();
}

function toggleFilters() {
    const filtersMenu = document.getElementById("filters-menu");
    filtersMenu.style.display = (filtersMenu.style.display === "flex") ? "none" : "flex";
}

function createResult({ name, icon, url, description, tags }) {
    const divResult = document.createElement('div');
    divResult.className = 'result';

    const imgIcon = new Image();
    imgIcon.className = 'result-icon';
    imgIcon.src = icon;
    imgIcon.alt = `Icon of ${name}`;

    const divContent = document.createElement('div');
    divContent.className = 'result-content';

    const divTitle = document.createElement('div');
    divTitle.className = 'result-title';

    const h1Title = document.createElement('h1');
    h1Title.textContent = name;

    const aLink = document.createElement('a');
    aLink.href = url;
    aLink.target = '_blank';

    const svgIcon = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svgIcon.setAttribute('viewBox', '0 0 24 24');
    svgIcon.innerHTML = '<path fill="currentColor" d="M5 21q-.825 0-1.412-.587T3 19V5q0-.825.588-1.412T5 3h7v2H5v14h14v-7h2v7q0 .825-.587 1.413T19 21zm4.7-5.3l-1.4-1.4L17.6 5H14V3h7v7h-2V6.4z"></path>';

    const pDescription = document.createElement('p');
    pDescription.textContent = description;

    const ulTags = document.createElement('ul');
    ulTags.className = 'result-tags';

    tags.forEach(tag => {
        const liTag = document.createElement("li");
        liTag.className = 'result-tag ' + tag.toLowerCase();
        liTag.textContent = tag;
        ulTags.appendChild(liTag);
    });

    divResult.appendChild(imgIcon);
    divResult.appendChild(divContent);
    divContent.appendChild(divTitle);
    divTitle.appendChild(h1Title);
    divTitle.appendChild(aLink);
    aLink.appendChild(svgIcon);
    divContent.appendChild(pDescription);
    divContent.appendChild(ulTags);

    return divResult;
}

async function update() {
    const data = await fetchData();
    const results = document.getElementById("results");
    results.innerHTML = '';

    const searchFilter = document.getElementById("search").value.toLowerCase();
    const filters = {
        discount: document.getElementById("discount").checked,
        free: document.getElementById("free").checked,
        trial: document.getElementById("trial").checked,
        verified: document.getElementById("verified").checked
    };

    const filteredData = data.filter(result => {
        const searchCriteria = searchFilter.length === 0 || result.name.toLowerCase().includes(searchFilter) || result.description.toLowerCase().includes(searchFilter);
        const discountCriteria = !filters.discount || result.tags.includes("Discount");
        const freeCriteria = !filters.free || result.tags.includes("Free");
        const trialCriteria = !filters.trial || result.tags.includes("Trial");
        const verifiedCriteria = !filters.verified || result.tags.includes("Verified");

        return searchCriteria && discountCriteria && freeCriteria && trialCriteria && verifiedCriteria;
    });

    document.getElementById("search").placeholder = `Search (${filteredData.length}) college resources...`;

    filteredData.forEach(result => results.appendChild(createResult(result)));
}

document.addEventListener('DOMContentLoaded', update);
