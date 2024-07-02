import { defineEventHandler, getQuery} from "h3";

export default defineEventHandler(async (event) => {
    const {name} = getQuery(event)
    if (!name){
        return {
            error: "Pokemon name is required"
        }
    }
    const api_key = "ZXCJVJZCV993923N2F8202N2F0"
    console.log(`This should only print in backend not in frontend ${api_key}`)

    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`)
    if (!response.ok){
        return { error: "Pokemon not found."}
    }
    const data = await response.json()
    return data
})