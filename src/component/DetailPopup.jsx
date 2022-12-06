import React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { Typography } from "@mui/material";

const DetailPopup = ({ countryInfo, handleClose, open }) => {
  return (
    <div>
      <Dialog open={open} onClose={handleClose} size="md">
        <DialogTitle>Thông tin quốc gia</DialogTitle>
        <DialogContent>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              flexFlow: "row wrap",
              background: "#eaf1ed",
              padding: "20px",
              borderRadius: "4px",
            }}
          >
            <div style={{ width: "50%" }} className="flag-name">
              <img
                className="card-img"
                src={countryInfo.flag}
                style={{
                  display: "block",
                  marginLeft: "auto",
                  marginRight: "auto",
                  width: "30%"
                }}
              />
              <Typography align="center">{countryInfo?.name}</Typography>
            </div>

            <div style={{ width: "50%" }} className="information">
              <Typography>population: {countryInfo.population}</Typography>
              <Typography>region: {countryInfo.region}</Typography>
              <Typography>subregion: {countryInfo.subregion}</Typography>
            </div>
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} autoFocus variant="contained">
            Đóng
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default DetailPopup;
