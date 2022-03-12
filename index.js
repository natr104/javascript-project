const villagerListSection = document.querySelector('section#villager-list');
const modal = document.querySelector('div.modal');
const defaultURL = 'https://acnhapi.com/v1/villagers';

let villagerQuantity = 10;

window.onclick = (event) => {
    if (event.target === modal) {
        modal.style.display = "none";
    }
}

villagerListSection.addEventListener("click", (event) => {
    const trigger = event.target;
    if (trigger.className === "villager-card" || trigger.parentNode.className === "villager-card") {
        //trigger modal
        modal.style.display = "block";
        //populate with villager details
        
    }
})




const fetchVillagers = async () => {
    for(let i=1; i <= villagerQuantity; i++) {
        await getVillager(i);
    }
}

const getVillager = async id => {   
    try {
        const response = await fetch(`https://acnhapi.com/v1/villagers/${id}`);
        const villager = await response.json();
        console.log(villager);
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

function renderVillagerCard({name, icon_uri}) {
    const villagerName = name['name-USen'];
    
    return `
        <div
            class="villager-card"
            villager-name='${villagerName}'
        >
            <h2
                class="villager-name"
                villager-name='${villagerName}'
            >
                ${villagerName}
            </h2>
            <img
                src='${icon_uri}'
                villager-name='${villagerName}'
            />
        </div>
    `
}

