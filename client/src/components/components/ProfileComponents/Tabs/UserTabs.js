import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import SwipeableViews from 'react-swipeable-views';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import UserCarCardList from '../../../assets/UserCarCard/UserCarCardList';
import axios from 'axios';
import { authHeader } from "../../../../services/authHeader";
import './UserTabs.css';
import { useHistory } from 'react-router-dom';


function TabPanel(props) {
    const { children, value, index, ...other } = props;
  
    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`full-width-tabpanel-${index}`}
        aria-labelledby={`scrollable-auto-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box p={3}>
            <Typography>{children}</Typography>
          </Box>
        )}
      </div>
    );
  }
  
  TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
  };
  
  function a11yProps(index) {
    return {
      id: `scrollable-auto-tab-${index}`,
      'aria-controls': `scrollable-auto-tabpanel-${index}`,
    };
  }
  
  const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        width: '75%',
        backgroundColor: theme.palette.background.paper,
        boxShadow: "-1px 1px 13px 1px rgba(0, 0, 0, 0.3)",
        margin:"auto 5%",
        top : "0%"
    },
  }));


export const UserTabs = () => {
    const classes = useStyles();
    const theme = useTheme();
    const [value, setValue] = React.useState(0);
    const history = useHistory();
    const [data, setData] = React.useState();

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const handleChangeIndex = (index) => {
        console.log(index);
        setValue(index);
    };

    useEffect(() => {
        if (value === 0) {
            axios({
                method: "get",
                url: "http://localhost:8000/user/getaddedcar",
                headers: authHeader(),
            }).then((res) => {
                if (res.status === 200) {
                    console.log(res.data);
                    setData(res.data)
                }
            }).catch = (err) => {
                console.log(err);
            };
        } else if (value === 1) {
            axios({
                method: "get",
                url: "http://localhost:8000/user/getlendedcar",
                headers: authHeader(),
            }).then((res) => {
                if (res.status === 200) {
                    console.log(res.data);
                    setData(res.data)
                }
            }).catch = (err) => {
                console.log(err);
            };
        } else if (value === 2) {
            axios({
                method: "get",
                url: "http://localhost:8000/user/getrentedcar",
                headers: authHeader(),
            }).then((res) => {
                if (res.status === 200) {
                    console.log(res.data);
                    setData(res.data)
                }
            }).catch = (err) => {
                console.log(err);
            };
        } else if (value === 3) {
            axios({
                method: "get",
                url: "http://localhost:8000/user/getrequestedcar",
                headers: authHeader(),
            }).then((res) => {
                if (res.status === 200) {
                    console.log(res.data.lendedby);
                    setData(res.data.lendedby)
                }
            }).catch = (err) => {
                console.log(err);
            };
        } else {
            axios({
                method: "get",
                url: "http://localhost:8000/user/getrequestedcar",
                headers: authHeader(),
            }).then((res) => {
                if (res.status === 200) {
                    console.log(res.data.borrowedby,"user tabs 4");
                    setData(res.data.borrowedby);
                }
            }).catch = (err) => {
                console.log(err);
            };
        }
    }, [value])

    return (
        <div>
            <AppBar position="static" color="default">
                <Tabs
                    value={value}
                    onChange={handleChange}
                    indicatorColor="primary"
                    textColor="primary"
                    variant="scrollable"
                    scrollButtons="auto"
                    aria-label="scrollable auto tabs example"
                >
                    <Tab style={{ padding: "1%" }} label="My Cars" {...a11yProps(0)} ></Tab>
                    <Tab style={{ padding: "1%" }} label="Lended Cars" {...a11yProps(1)}></Tab>
                    <Tab style={{ padding: "1%" }} label="Rented Cars" {...a11yProps(2)}></Tab>
                    <Tab style={{ padding: "1%" }} label="Received Requests" {...a11yProps(3)}></Tab>
                    <Tab style={{ padding: "1%" }} label="Sent Requests" {...a11yProps(4)}></Tab>
                </Tabs>
            </AppBar>
            <SwipeableViews
                axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
                index={value}
                onChangeIndex={handleChangeIndex}
                style={{ fontSize: "3vh" }}
            >
                <TabPanel value={value} index={0} dir={theme.direction}>
                    {data && <UserCarCardList list={data} cardtype="0" />}
                </TabPanel>
                <TabPanel value={value} index={1} dir={theme.direction}>
                    {data && <UserCarCardList list={data} cardtype="1" />}
                </TabPanel>
                <TabPanel value={value} index={2} dir={theme.direction}>
                    {data && <UserCarCardList list={data} cardtype="2" />}
                </TabPanel>

                <TabPanel value={value} index={3} dir={theme.direction}>
                    {data && <UserCarCardList list={data} cardtype="3" />}
                </TabPanel>

                <TabPanel value={value} index={4} dir={theme.direction}>
                    {data && <UserCarCardList list={data} cardtype="4" />}
                </TabPanel>
            </SwipeableViews>
        </div>
    )
}

const dataItem = {
    added_all: [
        {
            carid: "",
            pictures: "",
            registration_no: "",
            rent: "",
            deposite: "",
            company: "",
            modl: "",
            category: "",
            fuel_type: "",
            no_of_passenger: 0,
            color: "",
            engine_type: "",
            features: ["asnkjfnd"],
            city: "",
            lender_email: "",
        }, {
            carid: "",
            pictures: "",
            registration_no: "",
            rent: "",
            deposite: "",
            company: "",
            modl: "",
            category: "",
            fuel_type: "",
            no_of_passenger: 0,
            color: "",
            engine_type: "",
            features: ["", ""],
            city: "",
            lender_email: "",
        },
    ],
    lended: [
        {
            booking_details: {
                "trip_status": 0,
                "cancel": 0,
                "_id": "6093f8920e7bfc4b044a3e45",
                "bookingid": "B1",
                "lender_email": "shreyansh_shah@yahoo.com",
                "borrower_email": "jeet@gmail.com",
                "carid": "C1",
                "from_date": "1970-01-01T00:00:00.000Z",
                "to_date": "1970-01-01T00:00:00.000Z",
                "rent": 5000,
                "__v": 0
            },
            car_details: {
                "_id": "6093de41c4799f43583e0613",
                "carid": "C1",
                "city": "Ahmedabad",
                "lender_email": "shreyansh_shah@yahoo.com",
                "__v": 0,
                "features": [],
                pictures : "",
                name:""
            },
            "borrower_details": {
                "_id": "6095984532c6712ca89596ed",
                "name": "jeet shah",
                "email": "jeet@gmail.com",
                "password": "$2a$10$/5QJOlieKq.yEtlNF6Kzn.YY4SPF/WCmu171GtiFCRs9f8fgWN0f6",
                "phone_no": 6549873210,
                "address": "ah,ahm",
                "pincode": 380001,
                "city": "ahm",
                "createdAt": "2021-05-07T19:43:01.948Z",
                "updatedAt": "2021-05-07T19:43:01.948Z",
                "__v": 0
            }
        },
        {
            "booking_details": {
                "trip_status": 1,
                "cancel": 0,
                "_id": "6093f8c66b5db65520a046a5",
                "bookingid": "B2",
                "lender_email": "shreyansh_shah@yahoo.com",
                "borrower_email": "jeet@gmail.com",
                "carid": "C1",
                "from_date": "2020-10-07T00:00:00.000Z",
                "to_date": "2020-10-10T00:00:00.000Z",
                "rent": 5000,
                "__v": 0
            },
            "car_details": {
                "_id": "6093de41c4799f43583e0613",
                "carid": "C1",
                "city": "Ahmedabad",
                "lender_email": "shreyansh_shah@yahoo.com",
                "__v": 0,
                "features": []
            },
            "borrower_details": {
                "_id": "6095984532c6712ca89596ed",
                "name": "jeet shah",
                "email": "jeet@gmail.com",
                "password": "$2a$10$/5QJOlieKq.yEtlNF6Kzn.YY4SPF/WCmu171GtiFCRs9f8fgWN0f6",
                "phone_no": 6549873210,
                "address": "ah,ahm",
                "pincode": 380001,
                "city": "ahm",
                "createdAt": "2021-05-07T19:43:01.948Z",
                "updatedAt": "2021-05-07T19:43:01.948Z",
                "__v": 0
            }
        }
    ],
    rented: [
        {
            "booking_details": {
                "trip_status": 0,
                "cancel": 0,
                "_id": "6093f8920e7bfc4b044a3e45",
                "bookingid": "B1",
                "lender_email": "shreyansh_shah@yahoo.com",
                "borrower_email": "jeet@gmail.com",
                "carid": "C1",
                "from_date": "1970-01-01T00:00:00.000Z",
                "to_date": "1970-01-01T00:00:00.000Z",
                "rent": 5000,
                "__v": 0
            },
            "car_details": {
                "_id": "6093de41c4799f43583e0613",
                "carid": "C1",
                "city": "Ahmedabad",
                "lender_email": "shreyansh_shah@yahoo.com",
                "__v": 0,
                "features": []
            },
            "lender_details": {
                "_id": "6095984532c6712ca89596ed",
                "name": "jeet shah",
                "email": "jeet@gmail.com",
                "password": "$2a$10$/5QJOlieKq.yEtlNF6Kzn.YY4SPF/WCmu171GtiFCRs9f8fgWN0f6",
                "phone_no": 6549873210,
                "address": "ah,ahm",
                "pincode": 380001,
                "city": "ahm",
                "createdAt": "2021-05-07T19:43:01.948Z",
                "updatedAt": "2021-05-07T19:43:01.948Z",
                "__v": 0
            }
        },
        {
            "booking_details": {
                "trip_status": 0,
                "cancel": 0,
                "_id": "6093f8c66b5db65520a046a5",
                "bookingid": "B2",
                "lender_email": "shreyansh_shah@yahoo.com",
                "borrower_email": "jeet@gmail.com",
                "carid": "C1",
                "from_date": "2020-10-07T00:00:00.000Z",
                "to_date": "2020-10-10T00:00:00.000Z",
                "rent": 5000,
                "__v": 0
            },
            "car_details": {
                "_id": "6093de41c4799f43583e0613",
                "carid": "C1",
                "city": "Ahmedabad",
                "lender_email": "shreyansh_shah@yahoo.com",
                "__v": 0,
                "features": []
            },
            "lender_details": {
                "_id": "6095984532c6712ca89596ed",
                "name": "jeet shah",
                "email": "jeet@gmail.com",
                "password": "$2a$10$/5QJOlieKq.yEtlNF6Kzn.YY4SPF/WCmu171GtiFCRs9f8fgWN0f6",
                "phone_no": 6549873210,
                "address": "ah,ahm",
                "pincode": 380001,
                "city": "ahm",
                "createdAt": "2021-05-07T19:43:01.948Z",
                "updatedAt": "2021-05-07T19:43:01.948Z",
                "__v": 0
            }
        },
    ],
    request: {
        requesttome: [
            {
                bookingID: "",
                carid: "",
                pictures: "",
                registration_no: "",
                rent: "",
                deposite: "",
                company: "",
                modl: "",
                renter_email: "",
                renter_name: "",
                renter_city: "",
                renter_contact: "",
                from_date: "",
                to_date: "",
                booking_status: 1,
            }, {
                bookingID: "",
                carid: "",
                pictures: "",
                registration_no: "",
                rent: "",
                deposite: "",
                company: "",
                modl: "",
                renter_email: "",
                renter_name: "",
                renter_city: "",
                renter_contact: "",
                from_date: "",
                to_date: "",
                booking_status: -1,
            },
        ],
        requestbyme: [
            {
                "booking_details": {
                    "trip_status": 0,
                    "cancel": 0,
                    "_id": "6093f8920e7bfc4b044a3e45",
                    "bookingid": "B1",
                    "lender_email": "jeet.s3@ahduni.edu.in",
                    "borrower_email": "manavkumar.v@ahduni.edu.in",
                    "carid": "C1",
                    "from_date": "2021-05-08T00:00:00.000Z",
                    "to_date": "2021-05-11T00:00:00.000Z",
                    "rent": 5000,
                    "__v": 0
                },
                "car_details": {
                    carid: "C3",
        modl: "i20",
            company : "Hyundai",
            category : "Hatchback",
            rent : 5000,
            fuel_type : "Diesel",
            no_of_passengers : 5,
            plan : "per Day",
            engine_type : "Manual",
            penalty : 5000,
            features : ["Airbags", "Stereo", "Fog Lamp"],
            registration_no : 546732112446,
            picture: "https://images.unsplash.com/photo-1583121274602-3e2820c69888?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=1000&q=80",
            lender_email : "jeet.s3@ahduni.edu.in",
            lender_name : "Jeet D. Shah",
            lender_add : "41-C, Green Park Soc., Nr. Axis Bank, Surendranagar, Gujarat, 356786",
            lender_phone : 5426412434,
            ref_deposit : 2145,
                },
                "lender_details": {
                    "_id": "6095984532c6712ca89596ed",
                    "name": "jeet shah",
                    "email": "jeet.s3@ahduni.edu.in",
                    "password": "$2a$10$/5QJOlieKq.yEtlNF6Kzn.YY4SPF/WCmu171GtiFCRs9f8fgWN0f6",
                    "phone_no": 6549873210,
                    "address": "ah,ahm",
                    "pincode": 380001,
                    "city": "ahm",
                    "createdAt": "2021-05-07T19:43:01.948Z",
                    "updatedAt": "2021-05-07T19:43:01.948Z",
                    "__v": 0
                }
            },
        ],
    }
}