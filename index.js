const villagerListSection = document.querySelector('section#villager-list');
const modal = document.querySelector('div.modal');
const defaultURL = 'https://acnhapi.com/v1/villagers/';

let villagerQuantity = 10;

window.onclick = (event) => {
    if (event.target === modal) {
        modal.style.display = "none";
        modal.innerHTML = "";
    }
}

villagerListSection.addEventListener("click", (event) => {
    const trigger = event.target;
    if (trigger.className === "villager-card" || trigger.parentNode.className === "villager-card") {
        //trigger modal
        modal.style.display = "block";
        //populate with villager details
        const id = event.target.getAttribute('villager-id');
        populateVillagerModal(id);
    }
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
        </div>`;
    
}

const fetchVillagers = async () => {
    for(let i=1; i <= villagerQuantity; i++) {
        await getVillager(i);
    }
}

const getVillager = async id => {   
    try {
        const response = await fetch(`${defaultURL}${id}`);
        const villager = await response.json();
        createVillagerCard(villager);
    } catch (error) {
        console.error(error);
    }
}

fetchVillagers();

function createVillagerCard(villager) {
    let html = "";
    html += renderVillagerCard(villager);
    villagerListSection.innerHTML += html;
}

function renderVillagerCard({id, name, icon_uri}) {
    const villagerName = name['name-USen'];
    
    return `
        <div
            class="villager-card"
            villager-name='${villagerName}'
            villager-id='${id}'
        >
            <h2
                class="villager-name"
                villager-name='${villagerName}'
                villager-id='${id}'
            >
                ${villagerName}
            </h2>
            <img
                src='${icon_uri}'
                villager-name='${villagerName}'
                villager-id='${id}'
            />
        </div>
    `
}

