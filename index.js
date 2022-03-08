//const result = fetch('https://acnhapi.com/v1/villagers')

// result
// .then(response => response.json())
// .then(data => {
//     console.log(data)
    
// })
const defaultURL = 'https://acnhapi.com/v1/villagers'

async function fetchVillagerDetails(url) {   
    try {
        const response = await fetch(url)
        const data = await response.json()
        return data
    } catch (error) {
        console.error(error)
    }
}

function renderVillagerCards(data) {
    const section = document.querySelector('#villager-list')
    
}