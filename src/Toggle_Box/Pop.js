import { render } from '@testing-library/react'
import React from 'react';
import "./pop.css";

const Pop = () => {
    function popup() {
        render(
            <div className="container-1">
                <div className="container-2">
                    <div className="Radio-btn">
                    <input type="radio" id="html" name="fav_language" value="HTML" />
                    <label for="html">Pay Using Debit Card</label><br />
                    <input type="radio" id="html" name="fav_language" value="HTML" />
                    <label for="html">Pay via Online Banking</label><br />
                    <input type="radio" id="html" name="fav_language" value="HTML" />
                    <label for="html">Pay using API</label><br />
                    <input type="radio" id="html" name="fav_language" value="HTML" />
                    <label for="html">Pay directly to the Ambulance Driver</label><br />
                    </div>
                    <button className="payment-btn-cancel" onClick={popup_cancel}>Cancel</button>

                </div>
            </div>
        )
    }
    function popup_cancel(){
        window.location.reload()
    }
    return (
        <>
        {/* <div className="payment-btn-container">
        
            <button className="payment-btn" onClick={popup}>Click Here</button>
            
        </div> */}
        </>
    )
}

export default Pop
