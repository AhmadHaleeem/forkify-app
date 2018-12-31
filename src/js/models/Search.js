import axios from 'axios'

class Search {
    constructor(query) {
        this.query = query
    }

    async getResult() {
        const key = '505d9b264c5b252656cd73accabd9d57';
        try {
            const res = await axios(`https://www.food2fork.com/api/search?key=${key}&q=${this.query}`)
            this.result = res.data.recipes;
        } catch (e) {
            alert(e)
        }
    }
}

export default Search