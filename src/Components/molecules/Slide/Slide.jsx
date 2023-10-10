import React from "react";
import "../Slide/Slide.css";
import Button from "@mui/material/Button";
import Slide from "@mui/material/Slide";
import TextField from "@mui/material/TextField";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import Stack from "@mui/material/Stack";
import { MobileDatePicker } from "@mui/x-date-pickers/MobileDatePicker";
import { useTranslation } from "react-i18next";


const SlideModal = ({ showSlide, hideSlide, submit }) => {
  const [value, setValue] = React.useState(null);
  const { t } = useTranslation();
  
  return (
    <Slide
      in={showSlide}
      direction="up"
      timeout={{ appear: 500, enter: 500, exit: 500 }}
    >
      <div className="slide_main_div">
        <div className="cancelButton" onClick={hideSlide}>
          Cancel
        </div>
        <div className="selectDates">
          <h4
            style={{
              display: "flex",
              alignItems: "flex-end",
              height: "100%",
              fontSize: "15px",
              color: "rgb(34, 34, 34)",
            }}
          >
            Select Dates
          </h4>
        </div>
        <div className="calender_main_div">
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <Stack spacing={3}>
              <MobileDatePicker
                label="Select Date"
                value={value}
                onChange={(newValue) => {
                  setValue(newValue);
                }}
                renderInput={(params) => <TextField {...params} size="small" />}
              />
            </Stack>
          </LocalizationProvider>
        </div>
        <div className="ef-button--container">
          <Button
            variant="contained"
            onClick={() => submit()}
            style={{
              backgroundColor: "#7665cf",
              borderRadius: "10px",
              width: "80%",
              marginTop: '2rem'
            }}
          >
            Done
          </Button>
        </div>
      </div>
    </Slide>
  );
};

export default SlideModal;
