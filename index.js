const villagerListSection = document.querySelector('section#villager-list');
const modal = document.querySelector('div#modal');
const defaultURL = 'https://acnhapi.com/v1/villagers/';
const viewMoreButton = document.querySelector('button#view-more');
const topButton = document.querySelector('button#back-to-top');

let villagerLimit = 10;

window.onclick = event => {
    if (event.target === modal) {
        clearModal(modal);
    }
}

const clearModal = modal => {
    modal.classList.toggle("hidden"); //hides modal if window clicked outside the modal
    modal.innerHTML = "";  //clears html so old data is not still there while fetching next villager clicked
}

modal.addEventListener("click", (event) => {
    const trigger = event.target;
    if (trigger.id === "close") {
        clearModal(modal);
    } else if (trigger.id === "add-favourite") {
        toggleHeart(trigger);
    }
})

villagerListSection.addEventListener("click", (event) => {
    const trigger = event.target;
    if (trigger.className === "villager-card" || trigger.parentNode.className === "villager-card") {
        //trigger modal
        modal.classList.toggle("hidden");
        //populate with villager details
        const id = event.target.getAttribute('villager-id');
        populateVillagerModal(id);
    }
})

viewMoreButton.addEventListener("click", () => {
    villagerLimit += 10;
    getVillagers();
})

topButton.addEventListener("click", () => {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
})

const populateVillagerModal = async id => {
    try {
        const response = await fetch(`${defaultURL}${id}`);
        const villager = await response.json();
        fillVillagerModal(villager);
    } catch (error) {
        console.error(error);
    }

}

function fillVillagerModal(villager) {   
    let html = "";
    html += renderVillagerModal(villager);
    modal.innerHTML = html;
}

function renderVillagerModal(villager){
    const villagerName = villager.name['name-USen'];
    return `
        <div class="modal-content">
            <h2>${villagerName}</h2>
            <i class="fa fa-times" id="close"></i>
            <img src='${villager.image_uri}'/>
            <ul class="modal-list">
                <li><b>Species:</b> ${villager.species}</li>
                <li><b>Gender:</b> ${villager.gender}</li>
                <li><b>Personality:</b> ${villager.personality}</li>
                <li><b>Birthday:</b> ${villager['birthday-string']}</li>
                <li><b>Hobby:</b> ${villager.hobby}</li>
                <li><b>Catchphrase:</b> "${villager['catch-phrase']}"</li>
                <li><b>Saying:</b> "${villager.saying}"</li>
            </ul>
            <span title="Add favourite" id="add-favourite" class="fa fa-heart-o"></span>
        </div>`;   
}
function toggleHeart(element) {
    if (element.className === "fa fa-heart-o") {
        element.classList.add("fa-heart");
        element.classList.remove("fa-heart-o");
        //alert("Added favourite");
    } else if (element.className === "fa fa-heart") {
        element.classList.add("fa-heart-o");
        element.classList.remove("fa-heart");
        //alert("Removed favourite");
    }
}

// const fetchVillagers = async () => {
//     for(let i=1; i <= villagerQuantity; i++) {
//         await getVillager(i);
//     }
// }

// const getVillager = async id => {   
//     try {
//         const response = await fetch(`${defaultURL}${id}`);
//         const villager = await response.json();
//         createVillagerCard(villager);
//     } catch (error) {
//         console.error(error);
//     }
// }
async function getVillagers() {   
    try {
        const response = await fetch(`${defaultURL}`);
        const villager = await response.json();
        createVillagerCard(villager);
    } catch (error) {
        console.error(error);
    }
}

getVillagers();

function createVillagerCard(villager) {
    let html = "";
    let i = 0;
    for (const x in villager) {
        if (i<villagerLimit) {
            html += renderVillagerCard(villager[x]);
        } else {
            break;
        }
        i++;
    }  
    villagerListSection.innerHTML = html;
}

function renderVillagerCard(villager) {
    const villagerName = villager['name']['name-USen'];
    
    return `
        <div
            class="villager-card"
            villager-name='${villagerName}'
            villager-id='${villager.id}'
        >
            <h2
                class="villager-name"
                villager-name='${villagerName}'
                villager-id='${villager.id}'
            >
                ${villagerName}
            </h2>
            <img
                src='${villager.icon_uri}'
                villager-name='${villagerName}'
                villager-id='${villager.id}'
            />
        </div>
    `;
}

