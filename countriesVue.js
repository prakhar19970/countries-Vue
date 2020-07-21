const header = Vue.component('countries-header', {
    template: '#countriesHeader-template',

})

const Countries = Vue.component('countries-container', {
    template: '#countriesContainer-template',
    data() {
        return {
            countriesData: [],
            searchEntry:'',
            regionSelected:'',
        }
    },
    created() {
        let getUrl = `https://restcountries.eu/rest/v2/all?fields=name;population;region;capital;flag;alpha3Code`;
        fetch(getUrl).then(response => {
            return response.json();
        }).then(data => {
            this.countriesData = data;
        })
    },
    computed:{
        filteredResults: function(){

            if(this.searchEntry && this.regionSelected){
                let countries=this.countriesData.filter((country)=>{
                    return country.region.toLowerCase() === this.regionSelected.toLowerCase();
                })
                return countries.filter((country)=>{
                    return country.name.toLowerCase().includes(this.searchEntry.toLowerCase());
                })
            }

            else if(this.searchEntry){
               return this.countriesData.filter((country)=>{
                    return country.name.toLowerCase().includes(this.searchEntry.toLowerCase());
                })
            }

            else if(this.regionSelected){
            return this.countriesData.filter((country)=>{
                    return country.region.toLowerCase() === this.regionSelected.toLowerCase();
                })
            }
            else{
                return this.countriesData;
            }
        }
    }
})



Vue.component('country-card', {
    template: '#countriesContainer-countryCard-template',
    props: {
        country: {},
    },
    computed:{
        countryData:function(){
                return this.country;
            }
    }

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
    { path: '/countries/:code', component: CountryDetails,}
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
           this.code=to.params.code;
        }
    }
})
