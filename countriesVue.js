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
            console.log(response);
            return response.json();
        }).then(data => {
            console.log(data);
            this.countriesData = data;
        })
    }
})

Vue.component('country-card', {
    template: '#countriesContainer-countryCard-template',
})


new Vue({
    el: '#app',
})