import React from 'react'
import dummyCarData from './CarsData'
import './LendCar.css'

class LendCar extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      company: "",
      model:"",
      category:"",
      registration : "",
      seats:"",
      fuel_type : "",
      eng_type : "",
      color : "",
      pictures : "",
      rentAmount : "",
      features : [{feature : null}]
    };

    this.loadModels= this.loadModels.bind(this);
  }

  
  loadModels = (e) => {
    //console.log("Company Selected!!");
    //console.log(this.state.company)
    this.state.company = e.target.value;
    this.state.model = "";
    this.state.category = "";
    this.state.seats = "";
    this.state.fuel_type = "";
    this.state.eng_type = "";
    this.state.rentAmount = "";
    this.setState({});

    const dropmodel = document.getElementById("model-selection");
    const labelcat = document.getElementById("category-display");
    const labelseat = document.getElementById("seats-display");
    const dropfuel = document.getElementById("fuel-selection");
    const dropeng = document.getElementById("engine-selection");
    const inputRent = document.getElementById("rent");

    dropmodel.disabled = false;
    dropmodel.selectedIndex=null;
    dropfuel.disabled = false;
    dropfuel.selectedIndex=null;
    dropeng.disabled = false;
    dropeng.selectedIndex=null;
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

  setCategorySeats = () =>{
    dummyCarData.map((option) => {
      // (option.company == this.state.company) ? <option value={option.cars_by_company.model}>{option.cars_by_company.model}</option> : null
      if (option.company == this.state.company){
        option.cars_by_company.map((models) =>{
          if (models.model == this.state.model){
            const labl = document.getElementById("category-display");
            const labl2 = document.getElementById("seats-display");
            this.state.category = models.category;
            this.state.seats = models.seats;
            this.setState({});
            //console.log(this.state.category)
            labl.innerHTML=this.state.category;
            labl2.innerHTML=this.state.seats;
          }
        })
      }
    })
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

  render(){
    return (
        <div>
            <form className="lend-form">
              <h2> Lend Car Form </h2>
              <h5> Please fill the following form to lend your car on our website </h5>
            <label className="lend-label"> Company Name </label>
            <select required className="dropdown-inputs" id="company-selection" onChange={this.loadModels}>
              <option value="1" disabled selected>Select a Car Company</option>
              {dummyCarData.map((option) => (
                <option value={option.company}>{option.company}</option>
              ))}
            </select>
            <br />
            <label className="lend-label"> Model Name </label>
            <select required className="dropdown-inputs" id="model-selection" disabled onChange={this.setModelandOthers}>
              <option value="" disabled selected>Select a Car Model</option>
              {dummyCarData.map((option) => {
                if (option.company == this.state.company){
                  //console.log(option.company);
                  return option.cars_by_company.map((models) =>(
                    <option value={models.model}>{models.model}</option>)
                  )}
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
            <input required id="registration-display" /> 
            <br />

            <label className="lend-label"> Select Color </label>
            <select required className="dropdown-inputs" id="color-selection" disabled onChange={this.setModelandOthers}>
              <option value="" disabled selected>Select the Car Color</option>
              {dummyCarData.map((option) => {
                if (option.company == this.state.company){
                  return option.cars_by_company.map((models) =>{
                    if (models.model == this.state.model){
                      //console.log(option.company);
                      models.color.map((color) =>{
                        console.log(color);
                        (<option value={color}>{color}</option>)
                      })}
                  })}
              })}
            </select>
            <br />

            <label className="lend-label"> Fuel Type </label>
            <select required className="dropdown-inputs" id="fuel-selection" disabled onChange={this.setModelandOthers}>
              <option value="" disabled selected>Fuel Type</option>
              {dummyCarData.map((option) => {
                if (option.company == this.state.company){
                  return option.cars_by_company.map((models) =>{
                    if (models.model == this.state.model){
                      //console.log(option.company);
                      models.color.map((fuel) =>{
                        console.log(fuel);
                        (<option value={fuel}>{fuel}</option>)
                      })}
                  })}
              })}
            </select>
            <br />

            <label className="lend-label"> Engine Type </label>
            <select required className="dropdown-inputs" id="engine-selection" disabled onChange={this.setModelandOthers}>
              <option value="" disabled selected>Engine Type</option>
              {dummyCarData.map((option) => {
                if (option.company == this.state.company){
                  return option.cars_by_company.map((models) =>{
                    if (models.model == this.state.model){
                      //console.log(option.company);
                      models.color.map((engine) =>{
                        console.log(engine);
                        (<option value={engine}>{engine}</option>)
                      })}
                  })}
              })}
            </select>
            <br />

            <label className="lend-label">Add Features</label>

            {this.state.features.map((el, i) => (
              <div key={i}>
                <input type="text" value={el.feature || ""} onChange={e => this.handleChange(i, e)} />
                <input type="button" value="remove" onClick={() => this.removeClick(i)}/>
              </div>
            ))}

            <input type="button" value="add more" onClick={() => this.addClick()} />
            <br />

            <label className="lend-label">Add Images</label>
            <input required type="file"/>
            <br />
            
            <label className="lend-label"> Rent </label>
            <input required id="registration-display" placeholder="eg. 5000" /> 
            <br />
            <button type="submit" className="lend-button">Submit</button>
            </form>
        </div>
    )
  }
}

export default LendCar;