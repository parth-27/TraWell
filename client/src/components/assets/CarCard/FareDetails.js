import React from 'react'

const FareDetails = (props) => {
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
        </div>
    )
}

export default React.memo(FareDetails);