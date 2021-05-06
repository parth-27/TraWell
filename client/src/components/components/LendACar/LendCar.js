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
			registration: "",
			seats: 0,
			fuel_type: "",
			eng_type: "",
			color: "",
			picture: "",
			croppedpicture: "",
			rentAmount: 0,
			depAmount: 0,
			refDepAmount:0,
			features: [],
			error: false,
			errorState: [{ error: false, statement: "" }],
			to: "",
			from:"",
		};

		this.loadModels = this.loadModels.bind(this);
		this.setModelandOthers = this.setModelandOthers.bind(this);
		this.setCategorySeats = this.setCategorySeats.bind(this);
		this.setColor = this.setColor.bind(this);
		this.setEngine = this.setEngine.bind(this);
		this.setFuel = this.setFuel.bind(this);
		this.setRegNum = this.setRegNum.bind(this);
		this.setRent = this.setRent.bind(this);
		this.handleChange = this.handleChange.bind(this);
		this.addClick = this.addClick.bind(this);
		this.removeClick = this.removeClick.bind(this);
		this.setTo = this.setTo.bind(this);
		this.setFrom = this.setFrom.bind(this);
		this.setDep = this.setDep.bind(this);
		this.setRefDep = this.setRefDep.bind(this);
		this.sendToServer = this.sendToServer.bind(this);
		this.handleFile = this.handleFile.bind(this);
	}

	loadModels = (e) => {
		this.setState({ company: e.target.value }, () => { console.log("new state", this.state) });

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
	}

	setModelandOthers = (e) => {
	
		this.setState({
			model: e.target.value
		}, (e) => { this.setCategorySeats(e); });
		
		
		document.getElementById("color-selection").disabled = false;
	}

	setCategorySeats = (e) => {
		console.log("hello cats");
		dummyCarData.map((option) => {
			if (option.company == this.state.company) {
				option.cars_by_company.map((models) => {
					if (models.model == this.state.model) {
						const labl = document.getElementById("category-display");
						const labl2 = document.getElementById("seats-display");
						
						this.state.category = models.category;
						this.state.seats = models.seats;
						this.setState({});
						// this.setState({
						// 	category: models.category,
						// 	seats: models.seats
						// }, () => { console.log("new state", this.state) });

						console.log(this.state);
						
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
		this.setState({ color: e.target.value }, () => { console.log("new state", this.state) });
	}

	setEngine = (e) => {
		this.setState({ eng_type: e.target.value }, () => { console.log("new state", this.state) });
	}

	setFuel = (e) => {
		this.setState({ fuel_type: e.target.value }, () => { console.log("new state", this.state) });
	}

	setRegNum = (e) => {
		let ele = document.getElementById('registration');
		let errorele = document.getElementById('error-regnum');
		errorele.style.visibility = 'hidden';
		let val = ele.value;
		
		var registrationNumber = new RegExp(/^[a-zA-Z0-9.-]*$/);

		if (registrationNumber.test(val)) {
			this.setState({ registration: val }, () => { console.log("new state", this.state) });
		} else {
			errorele.innerHTML = "Please Enter Proper Registration Number"
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
		
		if (val.match(/^-?\d+$/)) {
			let intval = parseInt(val)
			if (intval >= 500 && intval <= 15000) {
				this.setState({ rentAmount: parseInt(val) }, () => { console.log("new state", this.state) });
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
		this.setState({ features }, () => { console.log("new state", this.state) });
	}

	addClick(e) {
		this.setState(prevState => ({
			features: [...prevState.features, { feature: null }]
		}), () => { console.log("new state", this.state) });
	}

	removeClick(i) {
		let features = [...this.state.features];
		features.splice(i, 1);
		this.setState({ features }, () => { console.log("new state", this.state) });
	}

	setTo(e) {
		this.setState({ to: e.target.value },() => console.log("new state",this.state));
	}

	setFrom(e) {
		this.setState({ from: e.target.value }, () => console.log("new state", this.state));
	}

	setDep(e) {
		let ele = document.getElementById('dep');
		let errorele = document.getElementById('error-dep');
		errorele.style.visibility = 'hidden';
		let val = ele.value;

		if (val.match(/^-?\d+$/)) {
			let intval = parseInt(val)
			if (intval >= 5000 && intval <= 15000) {
				this.setState({ depAmount: parseInt(val) }, () => { console.log("new state", this.state) });
			} else {
				errorele.innerHTML = "Deposit should be between 5000 to 15001 Rs. only"
				errorele.style.visibility = 'visible';
			}
		} else {
			errorele.innerHTML = "Please enter digits only !!"
			errorele.style.visibility = 'visible';
		}
	}

	setRefDep(e) {
		let ele = document.getElementById('refund-dep');
		let errorele = document.getElementById('error-ref-dep');
		errorele.style.visibility = 'hidden';
		let val = ele.value;

		if (val.match(/^-?\d+$/)) {
			let intval = parseInt(val)
			if (intval >= 5000 && intval <= 15000) {
				this.setState({ refDepAmount: parseInt(val) }, () => { console.log("new state", this.state) });
			} else {
				errorele.innerHTML = "Refund Deposit should be between 5000 to 15001 Rs. only"
				errorele.style.visibility = 'visible';
			}
		} else {
			errorele.innerHTML = "Please enter digits only !!"
			errorele.style.visibility = 'visible';
		}
	}

	sendToServer = (event) => {
		event.preventDefault();
		
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
				
			});
		}
	};

	render() {
		return (
			<>
				<form className="lend-form">
					
					<h1 style={{ textAlign: "left" }}> Lend Car Form </h1>
					<h5 style={{ marginBottom: "6%" }}> Please fill the following form to lend your car on our website </h5>
					
					<div className="selectDiv">
						<select required className="dropdown-inputs" id="company-selection" onChange={(e) => {this.loadModels(e)}}>
							<option disabled selected>Car Company</option>
							{dummyCarData.map((opts) => {
								return <option key={opts.company} >{opts.company}</option>
							})}
						</select>
					</div>
					<br />
					
					<div className="selectDiv">
						<select required className="dropdown-inputs" id="model-selection" onChange={(e) => { this.setModelandOthers(e) }} disabled >
							<option disabled selected>Car Model</option>
							{dummyCarData.map((opts) => {
								if (opts.company == this.state.company) {
									return opts.cars_by_company.map((models) => (
										<option key={models.model} >{models.model}</option>)
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
						<select required className="dropdown-inputs" id="color-selection" onChange={(e) => this.setColor(e)} disabled >
							<option value="" disabled selected>Car Color</option>
							{colorz.map((opts) => (
								<option key={opts} >{opts}</option>
							))}
						</select>
					</div>
					<br />
					<div className="selectDiv">
						<select required className="dropdown-inputs" id="fuel-selection" onChange={e=>this.setFuel(e)} disabled >
							<option value="" disabled selected>Fuel Type</option>
							{fuel.map((opts) => (
								<option key={opts} >{opts}</option>
							))}
						</select>
					</div>
					<br />

					<div className="selectDiv">
						<select required className="dropdown-inputs" id="engine-selection" onChange={ e => this.setEngine(e)} disabled >
							<option value="" disabled selected>Engine Type</option>
							{engine.map((opts) => (
								<option key={opts} >{opts}  </option>
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

					<button style={{ borderRadius: "50px", border: "0", padding: "auto", marginLeft: "2%", cursor: "pointer", backgroundColor: "white" }} onClick={(e) => this.addClick(e)}> <AddCircleIcon /></button>
					<br />

					<label className="lend-label">Add Images</label>
					{/* {this.state.picture &&
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
					} */}
					<Input
						onChange={e => this.handleFile(e)}
						fluid
						type="file"
						label="Car Image"
						name="previewImage"
					/>
					<br />

					<input required id="dep" placeholder="Deposit Amount eg. 5000" onChange={e => this.setDep(e)} />
					<label id="error-dep" className="errorLogs"></label>

					<input required id="rent" placeholder="Rent Amount eg. 5000" onChange={e => this.setRent(e)} />
					<label id="error-rent" className="errorLogs"></label>

					<input required id="refund-dep" placeholder="Refundable Deposit Amount eg. 5000" onChange={e => this.setRefDep(e)} />
					<label id="error-ref-dep" className="errorLogs"></label>
					<br />

					<div className="journeyRow">
						<div className="journeyFrom"> <input type="date" className="fromDate" required onChange={e => this.setFrom(e)} /> </div>
						<div className="toImage">
							<svg xmlns="http://www.w3.org/2000/svg" width="40" height="30"><g fill="none"><g><g><g><g transform="translate(0 1)"><path stroke="#979797" d="M.5 15h40" stroke-linecap="square" /><circle cx="20" cy="16" r="13" fill="#9B9B9B" stroke="#F7F7F7" /><text fill="#fff" font-family="Helvetica" font-size="13" font-weight="bold"><tspan x="12" y="21">TO</tspan></text></g></g></g></g></g></svg>
						</div>
						<div className="journeyTo"><input type="date" min={this.state.from} className="toDate" required onChange={e => this.setTo(e)} /></div>
					</div>

					{/*<input required id="pickup-add" placeholder="Enter Pickup Address" onChange={this.setPickAdd} />*/}
					<SubmitButton onClick={e => this.sendToServer(e)} style={{ padding: "2% 1%", margin: "8% 2% 0% 2%" }}>Add Your Car</SubmitButton>
				</form>
			</>
		)
	}
}

export default LendCar;