Vue.component('countries-header', {
    template: '#countriesHeader-template',

})

Vue.component('countries-container', {
    template: '#countriesContainer-template',
    data() {
        return {
            countriesData: [],
        }
    },
    created() {
        let getUrl = `https://restcountries.eu/rest/v2/all?fields=name;population;region;capital;flag;alpha3Code`;
        fetch(getUrl).then(response => {
            return response.json();
        }).then(data => {
            this.countriesData = data;
        })
    }
})

Vue.component('country-card', {
    template: '#countriesContainer-countryCard-template',
    props: {
        country: {}
    },
    data() {
        return {
            countryData: this.country
        }
    }
})


new Vue({
    el: '#app',
})