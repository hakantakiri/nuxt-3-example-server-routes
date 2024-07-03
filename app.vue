<template>
   <div>
    <input v-model="pokemonName" placeholder="Enter a Pokémon name" />
    <button @click="fetchPokemon">Get Pokémon</button>
    <div v-if="pokemon">
      <h2>{{ pokemon.name }}</h2>
      <img :src="pokemon.sprites.front_default" alt="Pokemon Image" />
      <p>Height: {{ pokemon.height }}</p>
      <p>Weight: {{ pokemon.weight }}</p>
    </div>
    <div v-if="error">{{ error }}</div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

interface Pokemon {
  name: string
  height: number
  weight: number
  sprites: {
    front_default: string
  }
}


const pokemonName = ref<string>('')
const pokemon = ref<Pokemon | null>(null)
const error = ref<string | null>(null)

const fetchPokemon = async () => {
  error.value = null
  if (!pokemonName.value) {
    error.value = 'Please enter a Pokémon name.'
    return
  }
  try {
    const response = await fetch(`/api/pokemon?name=${pokemonName.value}`)
    const data = await response.json()
    if (data.error) {
      error.value = data.error
      pokemon.value = null
    } else {
      pokemon.value = data
    }
  } catch (err) {
    error.value = 'Failed to fetch data.'
  }
}
</script>

<style scoped>
div {
  text-align: center;
}
input {
  margin-right: 10px;
}
</style>