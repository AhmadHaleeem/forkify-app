import axios from 'axios'

async function getResult(query) {
    const key = '78f60614377026eba6720d4b216d23a0';
    try {
        const res = await axios(`https://www.food2fork.com/api/search?key=${key}&q=${query}`)
        const recipes = res.data.recipes;
        console.log(recipes);
    } catch (e) {
        alert(e)
    }

}

getResult('pizza');

// https://www.food2fork.com/api/search
// 78f60614377026eba6720d4b216d23a0