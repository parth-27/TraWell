import React from 'react'
import { dummyCarData, colorz, fuel, engine } from './CarsData'
import './LendCar.css'
import AvatarEditor from 'react-avatar-editor';
import { Icon, Avatar } from '@material-ui/core';
import { FormContainer, SubmitButton, Input } from '../../../styles/style'
import axios from 'axios';

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
      features: [],
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
    labelcat.innerHTML = "-";
    labelseat.innerHTML = "-";
    inputRent.value = "";
    //console.log(this.state.company)
  }

  setModelandOthers = (e) => {
    this.state.model = e.target.value
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
          }
        })
      }
    })
  }

  setColor = (e) => {
    this.state.color = e.target.value;
    this.setState({})
  }

  setEngine =(e) =>{
    this.state.eng_type = e.target.value;
    this.setState({})
  }

  setFuel = (e) => {
    this.state.fuel_type = e.target.value;
    this.setState({})
  }

  setRegNum =(e) =>{
    let ele = document.getElementById('registration');
    let errorele = document.getElementById('error-regnum');
    errorele.style.visibility = 'hidden';
    let val = ele.value;
    //console.log(val)
    if (val.match(/^-?\d+$/)){
      if (val.length == 12){
        this.state.registration = parseInt(val);
        this.setState({})
      }else{
        errorele.innerHTML = "Registration number should have exactly 12 digits !!"
        errorele.style.visibility = 'visible';
      }
    }else{
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
    if (val.match(/^-?\d+$/)){
      let intval = parseInt(val)
      if (intval >= 500 && intval <= 15000){
        this.state.rentAmount = parseInt(val);
        this.setState({})
      }else{
        errorele.innerHTML = "Rent should be between 499 to 15001 Rs. only"
        errorele.style.visibility = 'visible';
      }
    }else{
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

  setCroppedImage = (e) => {
    console.log(this.editor);
    
    if (this.editor) {
      this.editor.getImageScaledToCanvas().toBlob(blob => {
        let imageUrl = URL.createObjectURL(blob);
        console.log(imageUrl);
        this.state.croppedpicture = imageUrl;
        this.setState({});
      });
    }
    e.preventDefault();
  }

  sendToServer = (e) => {

    this.setCroppedImage(e);  
    
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
    // axios.post("http://localhost:8000/user/lendCar", payload).then((res) => {
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
          <h2> Lend Car Form </h2>
          <h5> Please fill the following form to lend your car on our website </h5>
          <label className="lend-label"> Company Name </label>
          <select required className="dropdown-inputs" id="company-selection" onChange={this.loadModels}>
            <option disabled selected>Select a Car Company</option>
            {dummyCarData.map((option) => (
              <option>{option.company}</option>
            ))}
          </select>
          <br />
          <label className="lend-label"> Model Name </label>
          <select required className="dropdown-inputs" id="model-selection" disabled onChange={this.setModelandOthers}>
            <option disabled selected>Select a Car Model</option>
            {dummyCarData.map((option) => {
              if (option.company == this.state.company) {
                //console.log(option.company);
                return option.cars_by_company.map((models) => (
                  <option>{models.model}</option>)
                )
              }
            })}
          </select>
          <br />
          <label className="lend-label"> Category Name </label>
          <label id="category-display">- </label>
          <br />

          <label className="lend-label"> No. of Seats </label>
          <label id="seats-display"> - </label>
          <br />

          <label className="lend-label"> Registration Number </label>
          <input required id="registration" onChange={this.setRegNum}/>
          <label disabled id="error-regnum" className="errorLogs"></label>
          <br />

          <label className="lend-label"> Select Color </label>
          <select required className="dropdown-inputs" id="color-selection" disabled onChange={this.setColor}>
            <option value="" disabled selected>Select the Car Color</option>
            {colorz.map((option) => (
              <option>{option}</option>
            ))}
          </select>
          <br />

          <label className="lend-label"> Fuel Type </label>
          <select required className="dropdown-inputs" id="fuel-selection" disabled onChange={this.setFuel}>
            <option value="" disabled selected>Fuel Type</option>
            {fuel.map((option) => (
              <option>{option}</option>
            ))}
          </select>
          <br />

          <label className="lend-label"> Engine Type </label>
          <select required className="dropdown-inputs" id="engine-selection" disabled onChange={this.setEngine}>
            <option value="" disabled selected>Engine Type</option>
            {engine.map((option) => (
              <option>{option}</option>
            ))}
          </select>
          <br />

          <label className="lend-label">Add Features</label>

          {this.state.features.map((el, i) => (
            <div key={i}>
              <input type="text" value={el.feature || ""} onChange={e => this.handleChange(i, e)} />
              <input type="button" value="remove" onClick={() => this.removeClick(i)} />
            </div>
          ))}

          <input type="button" value="add more" onClick={() => this.addClick()} />
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

          <label className="lend-label"> Rent </label>
          <Input required id="rent" placeholder="eg. 5000" onChange={this.setRent} />
          <label id="error-rent" className="errorLogs"></label>
          <br />
          <SubmitButton onClick={this.sendToServer}>Add Your Car</SubmitButton>
        </form>
      </div>
    )
  }
}

export default LendCar;