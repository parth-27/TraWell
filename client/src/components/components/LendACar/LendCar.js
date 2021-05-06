import React from 'react'
import { dummyCarData, colorz, fuel, engine } from './CarsData'
import './LendCar.css'
import AvatarEditor from 'react-avatar-editor';
import { Icon, Avatar } from '@material-ui/core';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import { FormContainer, SubmitButton, Input } from '../../../styles/style'
import axios from 'axios';
import { AddCircle } from '@material-ui/icons';

class LendCar extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      company: "",
      model: "",
      category: "",
      registration: 0,
      seats: 0,
      fuel_type: "",
      eng_type: "",
      color: "",
      picture: "",
      croppedpicture: "",
      rentAmount: 0,
      features: [""],
      error: false,
      errorState: [{ error: false, statement: "" }]
    };

    this.loadModels = this.loadModels.bind(this);
  }

  loadModels = (e) => {
    //console.log("Company Selected!!");
    //console.log(this.state.company)
    this.state.company = e.target.value;
    this.state.model = "";
    this.state.category = "";
    this.state.seats = 0;
    this.state.fuel_type = "";
    this.state.eng_type = "";
    this.state.rentAmount = 0;
    this.setState({});

    const dropmodel = document.getElementById("model-selection");
    const labelcat = document.getElementById("category-display");
    const labelseat = document.getElementById("seats-display");
    const dropfuel = document.getElementById("fuel-selection");
    const dropeng = document.getElementById("engine-selection");
    const inputRent = document.getElementById("rent");

    dropmodel.disabled = false;
    dropmodel.selectedIndex = null;
    dropfuel.disabled = false;
    dropfuel.selectedIndex = null;
    dropeng.disabled = false;
    dropeng.selectedIndex = null;
    labelcat.innerHTML = "Category Name";
    labelseat.innerHTML = "Seats";
    labelcat.style.opacity = "0.5";
    labelseat.style.opacity = "0.5";
    inputRent.value = "";
    //console.log(this.state.company)
  }

  setModelandOthers = (e) => {
    this.state.model = e.target.value;
    this.setState({});
    console.log(this.state.model);
    this.setCategorySeats(e);
    document.getElementById("color-selection").disabled = false;
    //console.log(this.state.company)
  }

  setCategorySeats = () => {
    dummyCarData.map((option) => {
      // (option.company == this.state.company) ? <option value={option.cars_by_company.model}>{option.cars_by_company.model}</option> : null
      if (option.company == this.state.company) {
        option.cars_by_company.map((models) => {
          if (models.model == this.state.model) {
            const labl = document.getElementById("category-display");
            const labl2 = document.getElementById("seats-display");
            this.state.category = models.category;
            this.state.seats = models.seats;
            this.setState({});
            //console.log(this.state.category)
            labl.innerHTML = this.state.category;
            labl2.innerHTML = this.state.seats;

            labl.style.opacity = "1";
            labl2.style.opacity = "1";
          }
        })
      }
    })
  }

  setColor = (e) => {
    this.state.color = e.target.value;
    this.setState({})
  }

  setEngine = (e) => {
    this.state.eng_type = e.target.value;
    this.setState({})
  }

  setFuel = (e) => {
    this.state.fuel_type = e.target.value;
    this.setState({})
  }

  setRegNum = (e) => {
    let ele = document.getElementById('registration');
    let errorele = document.getElementById('error-regnum');
    errorele.style.visibility = 'hidden';
    let val = ele.value;
    //console.log(val)
    if (val.match(/^-?\d+$/)) {
      if (val.length == 12) {
        this.state.registration = parseInt(val);
        this.setState({})
      } else {
        errorele.innerHTML = "Registration number should have exactly 12 digits !!"
        errorele.style.visibility = 'visible';
      }
    } else {
      errorele.innerHTML = "Please enter digits only !!"
      errorele.style.visibility = 'visible';
    }
  }

  setEditorRef = (editor) => {
    this.editor = editor
  }

  setRent = (e) => {
    let ele = document.getElementById('rent');
    let errorele = document.getElementById('error-rent');
    errorele.style.visibility = 'hidden';
    let val = ele.value;
    //console.log(val)
    if (val.match(/^-?\d+$/)) {
      let intval = parseInt(val)
      if (intval >= 500 && intval <= 15000) {
        this.state.rentAmount = parseInt(val);
        this.setState({})
      } else {
        errorele.innerHTML = "Rent should be between 499 to 15001 Rs. only"
        errorele.style.visibility = 'visible';
      }
    } else {
      errorele.innerHTML = "Please enter digits only !!"
      errorele.style.visibility = 'visible';
    }
  }

  handleChange(i, event) {
    let features = [...this.state.features];
    features[i].feature = event.target.value;
    this.setState({ features });
  }

  addClick() {
    this.setState(prevState => ({
      features: [...prevState.features, { feature: null }]
    }));
  }

  removeClick(i) {
    let features = [...this.state.features];
    features.splice(i, 1);
    this.setState({ features });
  }

  setTo(){

  }

  setFrom(){

  }

  setDep(){

  }

  setRefDep(){

  }

  sendToServer = (event) => {
    event.preventDefault();
    // console.log(this.editor);
    let imageUrl = "asnjkebfhd";
    if (this.editor) {
      this.editor.getImageScaledToCanvas().toBlob(blob => {
        imageUrl = URL.createObjectURL(blob);
        console.log("+++++++++++++++++++++++++++++")
        console.log(imageUrl);
      });
    }

    setTimeout([], 100);
    console.log("1111111111111111111111");
    console.log(imageUrl);
    this.state.croppedpicture = imageUrl;
    this.setState({});
    console.log(this.state.croppedpicture);
    const payload = {
      company: this.state.company,
      model: this.state.model,
      category: this.state.category,
      color: this.state.color,
      registration: this.state.registration,
      seats: this.state.seats,
      fuel: this.state.fuel_type,
      eng: this.state.eng_type,
      rent: this.state.rentAmount,
      croppedpicture: this.state.croppedpicture,
      features: this.state.features,
    }
    console.log("----------------------------------");
    console.log(payload);
    console.log("----------------------------------");

    // axios.post("http://localhost:8000/user/lendCar", payload)
    // .then((res) => {
    //   if (res.status == 200) {
    //     console.log(payload)
    //     this.history.push("/user/profile");
    //   }
    //   else {
    //     this.state.error = {
    //       error: true,
    //       statement: "Apologies.. due to server fault, we could not store your information!!"
    //     }
    //     this.setState({});
    //     this.history.push("/user/profile");
    //   }
    // });
  }

  handleFile = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    if (file) {
      reader.readAsDataURL(file);
      reader.addEventListener("load", () => {
        this.state.picture = reader.result;
        this.setState({});
        //console.log(this.state.picture);
      });
    }
  };

  render() {
    return (
      <div>
        <form className="lend-form">
          <h1 style={{ textAlign: "left" }}> Lend Car Form </h1>
          <h5 style={{ marginBottom: "6%" }}> Please fill the following form to lend your car on our website </h5>
          <div className="selectDiv">
            <select required className="dropdown-inputs" id="company-selection">
              <option disabled selected>Car Company</option>
              {dummyCarData.map((option) => (
                <option onClick={this.loadModels}>{option.company}</option>
              ))}
            </select>
          </div>
          <br />
          <div className="selectDiv">
            <select required className="dropdown-inputs" id="model-selection" disabled >
              <option disabled selected>Car Model</option>
              {dummyCarData.map((option) => {
                if (option.company == this.state.company) {
                  //console.log(option.company);
                  return option.cars_by_company.map((models) => (
                    <option onClick={this.setModelandOthers}>{models.model}</option>)
                  )
                }
              })}
            </select>
          </div>
          <br />
          <div style={{ display: "flex", flexDirection: "row", width: "100%", height: "50px", margin: "3% auto" }}>
            <label id="category-display"> Category Name </label>
            <label id="seats-display"> Seats </label>
          </div>


          <input required id="registration" onChange={this.setRegNum} placeholder="Registration Number" />
          <label id="error-regnum" className="errorLogs"></label>
          <br />
          <div className="selectDiv">
            <select required className="dropdown-inputs" id="color-selection" disabled >
              <option value="" disabled selected>Car Color</option>
              {colorz.map((option) => (
                <option onClick={this.setColor}>{option}</option>
              ))}
            </select>
          </div>
          <br />
          <div className="selectDiv">
            <select required className="dropdown-inputs" id="fuel-selection" disabled >
              <option value="" disabled selected>Fuel Type</option>
              {fuel.map((option) => (
                <option onClick={this.setFuel}>{option}</option>
              ))}
            </select>
          </div>
          <br />

          <div className="selectDiv">
            <select required className="dropdown-inputs" id="engine-selection" disabled >
              <option value="" disabled selected>Engine Type</option>
              {engine.map((option) => (
                <option onClick={this.setEngine}>{option}</option>
              ))}
            </select>
          </div>
          <br />

          <label className="lend-label">Add Features</label>

          {this.state.features.map((el, i) => (
            <div key={i}>
              <input type="text" value={el.feature || ""} onChange={e => this.handleChange(i, e)} />
              <button onClick={() => this.removeClick(i)} style={{ borderRadius: "50px", border: "0", padding: "auto", marginLeft: "2%", cursor: "pointer", backgroundColor: "white" }}><HighlightOffIcon /> </button>
            </div>
          ))}

          <button  style={{ borderRadius: "50px", border: "0", padding: "auto", marginLeft: "2%", cursor: "pointer", backgroundColor: "white" }} onClick={() => this.addClick()}> <AddCircleIcon/></button>
          <br />

          <label className="lend-label">Add Images</label>
          {this.state.picture &&
            <AvatarEditor
              ref={this.setEditorRef}
              image={this.state.picture}
              width={300}
              height={300}
              borderRadius={0}
              color={[0, 0, 0, 0.6]} // RGBA
              scale={1.2}
              rotate={0}
            />
          }
          <Input
            onChange={this.handleFile}
            fluid
            type="file"
            label="Car Image"
            name="previewImage"
          />
          <br />

          <input required id="dep" placeholder="Deposit Amount eg. 5000" onChange={this.setDep} />
          <label id="error-dep" className="errorLogs"></label>

          <input required id="rent" placeholder="Rent Amount eg. 5000" onChange={this.setRent} />
          <label id="error-rent" className="errorLogs"></label>

          <input required id="refund-dep" placeholder="Refundable Deposit Amount eg. 5000" onChange={this.setRefDep} />
          <label id="error-ref-dep" className="errorLogs"></label>
          <br />
        
          <div className="journeyRow">
            <div className="journeyFrom"> <input type="date" className="fromDate" required onChange={this.setFrom} /> </div>
            <div className="toImage">
              <svg xmlns="http://www.w3.org/2000/svg" width="40" height="30"><g fill="none"><g><g><g><g transform="translate(0 1)"><path stroke="#979797" d="M.5 15h40" stroke-linecap="square" /><circle cx="20" cy="16" r="13" fill="#9B9B9B" stroke="#F7F7F7" /><text fill="#fff" font-family="Helvetica" font-size="13" font-weight="bold"><tspan x="12" y="21">TO</tspan></text></g></g></g></g></g></svg>
            </div>
            <div className="journeyTo"><input type="date" className="toDate" required onChange={this.setTo} /></div>
          </div>

          {/*<input required id="pickup-add" placeholder="Enter Pickup Address" onChange={this.setPickAdd} />*/}
          <SubmitButton onClick={this.sendToServer} style={{padding:"2% 1%", margin:"8% 2% 0% 2%"}}>Add Your Car</SubmitButton>
        </form>
      </div>
    )
  }
}

export default LendCar;