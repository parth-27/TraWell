import React,{useState} from 'react';
import { BoxContainer, FormContainer,Input,SubmitButton,DisplayError } from '../../../styles/style';
import AuthService from "../../../services/auth";
import { useHistory } from 'react-router-dom';
import { CheckBox } from '../Checkbox/CheckBox';

const FareDetails = (props) => {

    const history = useHistory();
    const [errorState, setErrorState] = useState({
        error: false,
        statement: ""
    });

    const requestCar = (e) => {
        e.preventDefault();
        if (document.getElementById('first').checked && document.getElementById('first').checked)
        {
            history.push("/")
        }
        else
        {
            setErrorState({
                error: true,
                statement: "Please Agree to all the Conditions"
            });
        }

    }

    const eventHandler = data => console.log(data);

    return (
        <div className="right-panel">
            <div className="charges">
                <hr className="hr-text" data-content="Fare Details" />
                <table className="fare">
                    <tbody>
                        <tr>
                            <td> <p style={{ float: "left" }}>Base Fare</p><p style={{ color: "red" }}>*</p> </td>
                            <td> <i className="fas fa-rupee-sign"> </i> {props.rent} </td>
                        </tr>

                        <tr>
                            <td> <p style={{ float: "left" }}>Penalty Charges</p><p style={{ color: "red" }}>*</p> </td>
                            <td> Same as Base Fare </td>
                        </tr>

                        <tr>
                            <td> <p style={{ float: "left" }}>Insurance & GST</p><p style={{ color: "red" }}>*</p> </td>
                            <td> Included </td>
                        </tr>

                        <tr>
                            <td> <p style={{ float: "left" }}>Refundable security deposit</p><p style={{ color: "red" }}>*</p> </td>
                            <td> <i className="fas fa-rupee-sign"> </i>{props.ref_deposit} </td>
                        </tr>
                    </tbody>
                </table>
                <p className="restriction" style={{ marginTop: "1%" }}><p style={{ color: "red", float: "left", marginRight: "1%" }}>*</p> These amount are based on the per day plan </p>
            </div>
            <BoxContainer >
                <DisplayError>{errorState.error && errorState.statement}</DisplayError>
                <FormContainer style={{boxShadow:"0 0 0"}}>
                    <div style={{ display: "flex", flexDirection: "row" }}>
                        <CheckBox values={false} onChange={eventHandler} labelFor="The vehicle will be at your sole risk from the date and time of receiving the vehicle until the vehicle is returned to the user. You undertake to return the vehicle in the same condition that you received it, fair wear and tear excepted." className="T&C" />
                    </div>
                    <div style={{ display: "flex", flexDirection: "row" }}>
                        <CheckBox values={false} onChange={eventHandler} className="T&C" labelFor="You will return the vehicle, on the expiry or termination of this agreement, at your expense to the owner at the collection address recorded in the agreement. You acknowledge that failure to return the vehicle in terms of this agreement will constitute a breach of the agreement and illegal possession by you, and the owner may report the vehicle as stolen and/or repossess the vehicle wherever same may be found and from whomsoever is in possession thereof" />
                    </div>
                    {
                        !(AuthService.getCurrentUser() && AuthService.getCurrentUser().accessToken)
                            ?
                            <SubmitButton style={{ padding: "3%"}} onClick={()=>history.push("/user/signin")} >Request Car</SubmitButton>
                            :    
                            <SubmitButton
                                style={{ padding: "3%"}} onClick={(event) => requestCar(event)}
                            >Request Car</SubmitButton>
                    }
                </FormContainer>
            </BoxContainer>
        </div>
    )
}

export default React.memo(FareDetails);