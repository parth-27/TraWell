import { useState } from 'react';
import styles from './SearchBar.module.scss';
import DateIcon from '@material-ui/icons/Event';
import TimeIcon from '@material-ui/icons/Schedule';
import DoubleArrowIcon from '@material-ui/icons/DoubleArrow';
import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider, DatePicker } from '@material-ui/pickers';
import { createMuiTheme } from '@material-ui/core';
import { ThemeProvider } from '@material-ui/styles';
import { indigo as primary } from '@material-ui/core/colors';

const myTheme = createMuiTheme({
    palette: {
        primary: primary
    }
});

// Prop: 'mobile' (bool) - when it is added, bigger screen
//sizes will have the same layout

const SearchBar = ({ mobile }) => {
    const [selectedStartDate, setStartDate] = useState(new Date());
    const [selectedEndDate, setEndDate] = useState(new Date());
    const [isOpen, setIsOpen] = useState(false);
    const [isOpenEnd, setIsOpenEnd] = useState(false);
    const [selectedPickupTime, setSelectedPickupTime] = useState('10:00');
    const [selectedDropoffTime, setSelectedDropoffTime] = useState('11:00');
    const [isFromOpen, setIsFromOpen] = useState(false);
    const [isUntilOpen, setIsUntilOpen] = useState(false);

    const day = {
        start: selectedStartDate.getDate(),
        end: selectedEndDate.getDate()
    };
    const month = {
        start: selectedStartDate.getMonth() + 1,
        end: selectedEndDate.getMonth() + 1
    };
    const year = {
        start: selectedStartDate.getFullYear(),
        end: selectedStartDate.getFullYear()
    };

    const handleDateClick = () => {
        setIsOpen(true);
    };

    let contStyle = styles.cont;
    if (!mobile) {
        contStyle = `${styles.cont} ${styles.contWide}`;
    }

    let unitContStyle = styles.untiCont;
    if (!mobile) {
        unitContStyle = `${styles.unitCont} ${styles.unitContWide}`;
    }

    let arrowContStyle = styles.arrowCont;
    if (!mobile) {
        arrowContStyle = `${styles.arrowCont} ${styles.arrowContWide}`;
    }

    return (
        <ThemeProvider theme={myTheme}>
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <div className={contStyle}>
                    <div className={unitContStyle}>
                        <div className={styles.label}>
                            <p>From</p>
                        </div>
                        <div className={styles.dateTimeCont}>
                            <div className={styles.calendarCont}>
                                <DatePicker
                                    disablePast
                                    autoOk={true}
                                    variant='inline'
                                    open={isOpen}
                                    onOpen={() => setIsOpen(true)}
                                    onClose={() => setIsOpen(false)}
                                    label='From'
                                    format='MM/dd/yyyy'
                                    value={selectedStartDate}
                                    onChange={setStartDate}
                                />
                            </div>
                            <div className={styles.date} onClick={handleDateClick}>
                                <p>{`${month.start}/${day.start}/${year.start}`} </p>
                                <DateIcon />
                            </div>

                            {/* <div className={styles.timeCont}>
                                <div
                                    className={styles.time}
                                    onClick={() => setIsFromOpen(true)}>
                                    <p>{selectedPickupTime}</p>
                                    <TimeIcon />
                                </div>
                                {isFromOpen && (
                                    <div className={timeDropdownStyle}>
                                        {availableTimes.map((time) => {
                                            return (
                                                <p
                                                    className={styles.timeValue}
                                                    onClick={() => handleDropdownSelection('from', time)}>
                                                    {time}
                                                </p>
                                            );
                                        })}
                                    </div>
                                )}
                            </div> */}
                        </div>
                    </div>

                    <div className={arrowContStyle}>
                        <DoubleArrowIcon className={styles.arrow} />
                    </div>

                    <div className={unitContStyle}>
                        <div className={styles.label}>
                            <p>Until</p>
                        </div>
                        <div className={styles.dateTimeCont}>
                            <div className={styles.calendarContEnd}>
                                <DatePicker
                                    disablePast
                                    autoOk
                                    variant='inline'
                                    open={isOpenEnd}
                                    onOpen={() => setIsOpenEnd(true)}
                                    onClose={() => setIsOpenEnd(false)}
                                    label='Open me from button'
                                    format='MM/dd/yyyy'
                                    value={selectedEndDate}
                                    onChange={setEndDate}
                                />
                            </div>
                            <div className={styles.date} onClick={() => setIsOpenEnd(true)}>
                                <p>{`${month.end}/${day.end}/${year.end}`}</p>
                                <DateIcon />
                            </div>

                            {/* <div className={styles.timeCont}>
                                <div
                                    className={styles.time}
                                    onClick={() => setIsUntilOpen(true)}>
                                    <p>{selectedDropoffTime}</p>
                                    <TimeIcon />
                                </div>
                                {isUntilOpen && (
                                    <div className={timeDropdownStyle}>
                                        {availableTimes.map((time) => {
                                            return (
                                                <p
                                                    className={styles.timeValue}
                                                    onClick={() =>
                                                        handleDropdownSelection('until', time)
                                                    }>
                                                    {time}
                                                </p>
                                            );
                                        })}
                                    </div>
                                )}
                            </div> */}
                        </div>
                    </div>
                </div>
            </MuiPickersUtilsProvider>
        </ThemeProvider>
    );
};

export default SearchBar;
