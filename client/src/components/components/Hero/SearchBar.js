import 'date-fns';
import React from 'react';
import DateFnsUtils from '@date-io/date-fns';
import {
    MuiPickersUtilsProvider,
    KeyboardDatePicker,
} from '@material-ui/pickers';
import { TextField } from "@material-ui/core";

export default function SearchBar() {
    // The first commit of Material-UI
    const [selectedDate, setSelectedDate] = React.useState(new Date('2014-08-18T21:11:54'));

    const handleDateChange = (date) => {
        setSelectedDate(date);
    };

    const changeCityState = (event) =>{
        console.log(event.target.value);
    }

    return (
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <div style={{ display: "flex", flexDirection: "column", width: "80%", margin: "auto" }}>
                <div className="selectDiv" style={{marginBottom:"7%"}}>
                    <select required className="dropdown-inputs" id="city-selection" style={{borderRadius:"10px"}} onChange={(e)=> changeCityState(e)}>
                        <option disabled selected>City</option>
                        <option value="Ahmedabad">Ahemadabad</option>
                        <option value="Gandhinagar">Gandhinagar</option>
                        <option value="Rajkot">Rajkot</option>
                        <option value="Surat">Surat</option>
                        <option value="Dahod">Dahod</option>
                    </select>
                </div>
                <KeyboardDatePicker
                    margin="normal"
                    id="date-picker-dialog"
                    label="From"
                    format="MM/dd/yyyy"
                    value={selectedDate}
                    onChange={handleDateChange}
                    KeyboardButtonProps={{
                        'aria-label': 'change date',
                    }}
                />
                <div style={{ width: "100%", margin: "8% auto 0.75% auto", textAlign: "center" }}><img src="downarrow.png" width="5%" height="5%" /></div>

                <KeyboardDatePicker
                    margin="normal"
                    id="date-picker-dialog"
                    label="To"
                    format="MM/dd/yyyy"
                    value={selectedDate}
                    onChange={handleDateChange}
                    KeyboardButtonProps={{
                        'aria-label': 'change date',
                    }}
                />
            </div>
        </MuiPickersUtilsProvider>
    );
}
