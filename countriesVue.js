const header = Vue.component('countries-header', {
    template: '#countriesHeader-template',

})

const Countries = Vue.component('countries-container', {
    template: '#countriesContainer-template',
    props: {
        route: {},
    },
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
        country: {},
    },
    data() {
        return {
            countryData: this.country,
        }
    },

})

const CountryDetails = Vue.component('country-details', {
    template: '#countryDetails-template',
    data() {
        return {
            countryDetails: [],
            borderCountries:[],
            code:this.$route.params.code
        }
    },
    created() {
        let getUrl = `https://restcountries.eu/rest/v2/alpha?codes=${this.code}`;
        
        fetch(getUrl).then(response => {
            return response.json();
        }).then(data => {
            this.countryDetails= data[0];
            this.borderCountries=this.countryDetails.borders;
        })
    }
})

const routes = [
    { path: '/', component: Countries },
    { path: '/countries/:code', component: CountryDetails}
]

var router = new VueRouter({
    routes: routes
})


new Vue({
    el: '#app',
    data: {
        code:'',
    },
    router: router,
    watch:{
        $route (to, from){
           console.log(to.params.code);
           this.code=to.params.code;
            console.log(from);
        }
    }
})
