var pokemonQuantity = document.querySelector('#pokemonQuantity')
pokemonQuantity.addEventListener('keyup', () => {
    catchPokemons(pokemonQuantity.value)
})

function catchPokemons(pokemonQuantity) {

    fetch('https://pokeapi.co/api/v2/pokemon?limit=' + pokemonQuantity)
    .then(response => response.json())
    .then(allpokemon => {
        var pokemons = []
        
        // console.log(pokemons)
        allpokemon.results.map((val) => {
            fetch(val.url)
            .then(response => response.json())
            .then(pokemonSingle => {
                    pokemons.push({name: val.name, image: pokemonSingle.sprites.front_default, weight: pokemonSingle.weight, height: pokemonSingle.height})	

                    if(pokemons.length == pokemonQuantity) {
                        // Finished requests
                        // console.log(pokemonSingle)
                        var pokemonBoxes = document.querySelector('.pokemon-boxes')
                        pokemonBoxes.innerHTML = ''

                        pokemons.map(function(val) {
                            pokemonBoxes.innerHTML += `
                            <div class="pokemon-box">
                            <img
                                    src=`+val.image+`
                                    alt=""
                                    />
                                    <p>`+val.name+`</p>
                                    <p>`+val.weight+` g</p>
                                    <p>`+val.height+` cm</p>
                                    </div>
                                    `
                                })
                    }
                })
        })
        
        pokemons.map((val) => {
            console.log(val.name)
        })
    })
}

catchPokemons(10)