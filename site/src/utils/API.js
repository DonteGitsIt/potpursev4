import axios from "axios";
var token = "x531bsN";
// axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
export default {
    // searches for strains using the strain API
    searchStrainName: function (query) {
        return axios.get("http://strainapi.evanbusse.com/" + token + "/strains/search/name/" + query);
    },

    searchRace: function (query) {
        return axios.get("http://strainapi.evanbusse.com/" + token + "/strains/search/race/" + query);
    },

    searchEffect: function (query) {
        return axios.get("http://strainapi.evanbusse.com/" + token + "/strains/search/effect/" + query);
    },

    searchFlavor: function (query) {
        return axios.get("http://strainapi.evanbusse.com/" + token + "/strains/search/flavor/" + query);
    },

    getEffects: function (){
        return axios.get("http://strainapi.evanbusse.com/"+token+"/searchdata/effects")
    },

    getFlavors: function (){
        return axios.get("http://strainapi.evanbusse.com/"+token+"/searchdata/flavors")
    },

    getStrains: function () {
        return axios.get("/api/strains");
    },

    saveStrain: function(strainData) {
        return axios.post("/api/strains", strainData);
      }
}