export async function load() {
    const res = await fetch('https://fdnd.directus.app/items/person/?filter[squads][squad_id][name]=2G&filter[id][_eq]=256')
    const data = await res.json();

    console.log(data)

    return { person: data.data }
}