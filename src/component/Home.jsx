import React, { useEffect, useState } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import covidAPI from "../api";
import DetailPopup from "./DetailPopup";
import { toast } from "react-toastify";
import "../App.css";

const Home = () => {
  const [countriesClone, setCountriesClone] = useState([]);
  const [countries, setCountries] = useState([]);
  const [dataSort, setDataSort] = useState(0);
  const [open, setOpen] = React.useState(false);
  const [countryName, setCountryName] = useState("");
  const [countryInfo, setCountryInfo] = useState({});

  const handleClickOpen = (country) => {
    if (country) {
      setCountryName(country.Country);
    }
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    if (countryName) {
      covidAPI.getCountry(countryName).then((res) => {
        console.log(res[0]);
        setCountryInfo(res[0]);
        setOpen(true);
      });
    }
  }, [countryName]);

  useEffect(() => {
    covidAPI.getAllCountries().then((res) => {
      console.log(res.Countries);
      if (res.Countries) {
        setCountries(res.Countries);
        setCountriesClone(res.Countries);
      } else {
        toast.error("Lỗi truy cập API");
      }
    });
  }, []);

  const handleSortBy = (e) => {
    setDataSort(e.target.value);
  };

  const sortByCountry = (country) => {
    return {
      Country: country?.Country,
      TotalConfirmed: country?.TotalConfirmed,
      TotalDeaths: country?.TotalDeaths,
      TotalRecovered: country?.TotalRecovered,
    };
  };

  useEffect(() => {
    if (dataSort !== 0) {
      if (countriesClone && countriesClone.length > 0) {
        let countryList = [...countriesClone];
        let firstCountry = countryList[0];
        let country = {};
        let newSortCountries = [];

        if (dataSort === 1) {
          setCountries(countryList);
          return;
        } else if (dataSort === 2) {
          for (let i = 0; i < countryList.length; i++) {
            if (countryList[i]?.TotalConfirmed > firstCountry?.TotalConfirmed) {
              country = sortByCountry(countryList[i]);
            }
          }
        } else if (dataSort === 3) {
          for (let i = 0; i < countryList.length; i++) {
            if (countryList[i]?.TotalDeaths > firstCountry?.TotalDeaths) {
              country = sortByCountry(countryList[i]);
            }
          }
        } else {
          for (let i = 0; i < countryList.length; i++) {
            if (countryList[i]?.TotalRecovered < firstCountry?.TotalRecovered) {
              country = sortByCountry(countryList[i]);
            }
          }
        }
        newSortCountries.push(country);
        setCountries(newSortCountries);
      } else {
        toast.error("Lỗi truy cập API");
      }
    }
  }, [dataSort]);

  return (
    <div>
      <h1 style={{ textAlign: "center", marginTop: "10px" }}>
        Danh sách quốc gia chịu ảnh hưởng bởi dịch covid 19
      </h1>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          marginTop: "5px",
          marginBottom: "5px",
        }}
      >
        <FormControl sx={{ m: 1, width: "30%" }} size="small">
          <InputLabel>sort by</InputLabel>
          <Select label="sort by" value={dataSort} onChange={handleSortBy}>
            <MenuItem value={1}>All</MenuItem>
            <MenuItem value={2}>The most total confirmed cases</MenuItem>
            <MenuItem value={3}>The highest number of deaths</MenuItem>
            <MenuItem value={4}>The least number of recovered cases</MenuItem>
          </Select>
        </FormControl>
      </div>
      <div
        style={{
          display: "flex",
          flexFlow: "row wrap",
          justifyContent: "center",
        }}
      >
        {countries &&
          countries.map((country) => (
            <Card
              sx={{ width: "22%" }}
              key={country.ID}
              style={{ margin: "10px", cursor: "pointer" }}
              className="card-item"
            >
              <CardContent onClick={() => handleClickOpen(country)}>
                <Typography
                  sx={{ fontSize: 14 }}
                  color="text.secondary"
                  gutterBottom
                >
                  {country.Country}
                </Typography>
                <Typography variant="body2">
                  TotalConfirmed: {country.TotalConfirmed}
                </Typography>
                <Typography variant="body2">
                  TotalDeaths: {country.TotalDeaths}
                </Typography>
                <Typography variant="body2">
                  TotalRecovered: {country.TotalRecovered}
                </Typography>
              </CardContent>
            </Card>
          ))}
      </div>

      {open && (
        <DetailPopup
          open={open}
          handleClose={handleClose}
          countryInfo={countryInfo}
        />
      )}
    </div>
  );
};

export default Home;
