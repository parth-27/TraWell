import React,{useState} from 'react';
import { BoxContainer, FormContainer,Input,SubmitButton,DisplayError } from '../../../styles/style';
import AuthService from "../../../services/auth";
import { useHistory } from 'react-router-dom';

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
            <BoxContainer style={{ marginTop: "25%" }}>
                <DisplayError>{errorState.error && errorState.statement}</DisplayError>
                <FormContainer style={{boxShadow:"0 0 0"}}>
                    <div style={{display:"flex",flexDirection:"row"}}>
                        <Input type="checkbox" id="first" name="first" style={{ marginRight: "4%", height: "20px", width: "28%", float: "left", boxShadow: "0 0 0" }} required />
                        <label htmlFor="first">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris dui ante, volutpat non interdum quis, gravida vitae metus. Praesent maximus lorem varius ipsum auctor semper. </label>
                    </div>
                    <div style={{ display: "flex", flexDirection: "row", marginTop: "10%" }}>
                        <Input type="checkbox" id="second" name="second" style={{ marginRight: "4%", height: "20px", width: "28%", boxShadow: "0 0 0" }} required />
                        <label htmlFor="second">Nam non erat facilisis, gravida quam at, pellentesque ex. Mauris vel felis sed magna vulputate fermentum. In hac habitasse platea dictumst. Curabitur in enim rutrum,</label>
                    </div>
                    {
                        !(AuthService.getCurrentUser() && AuthService.getCurrentUser().accessToken)
                            ?
                            <SubmitButton style={{ padding: "3%", marginTop: "10%" }} onClick={()=>history.push("/user/signin")} >Request Car</SubmitButton>
                            :    
                            <SubmitButton
                                style={{ padding: "3%", marginTop: "10%" }} onClick={(event) => requestCar(event)}
                            >Request Car</SubmitButton>
                    }
                </FormContainer>
            </BoxContainer>
        </div>
    )
}

export default React.memo(FareDetails);