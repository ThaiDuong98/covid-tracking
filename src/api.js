import axios from "axios";

const covidAPI = {
  getAllCountries() {
    return axios
      .get("https://api.covid19api.com/summary", {})
      .then((res) => {
        return Promise.resolve(res.data);
      })
      .catch((err) => {
        return Promise.reject(err);
      });
  },
  getCountry(name) {
    return axios.get(`https://restcountries.com/v2/name/${name}`, {})
    .then(res => {
        return Promise.resolve(res.data)
    })
    .catch(err => {
        return Promise.reject(err)
    })
  },
};

export default covidAPI;
