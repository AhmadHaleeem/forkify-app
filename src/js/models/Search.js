import axios from 'axios'

class Search {
    constructor(query) {
        this.query = query
    }

    async getResult() {
        const key = '78f60614377026eba6720d4b216d23a0';
        try {
            const res = await axios(`https://www.food2fork.com/api/search?key=${key}&q=${this.query}`)
            this.result = res.data.recipes;
            // console.log(this.result);
        } catch (e) {
            alert(e)
        }
    }
}

export default Search