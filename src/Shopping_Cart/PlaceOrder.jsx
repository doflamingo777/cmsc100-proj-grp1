import React, { useState } from 'react';

function PlaceOrderTab() {
    const [paymentMethod, setPaymentMethod] = useState('');

    const handlePaymentChange = (event) => {
        setPaymentMethod(event.target.value);
    };

    const ColoredLine = ({ color }) => (
        <hr
            style={{
                color: color,
                backgroundColor: color,
                opacity: 0.3,
                height: 2
            }}
        />
    );

    const totalPrice = 140

    return (
        <div className="whole-order">
            <h2 className="selPayMethod">Select Payment Method</h2>
            <div className="mode-of-payment">
                <div className='mode-of-payment1'>
                    <h2>Cash on Delivery</h2>
                    <input
                        type="radio"
                        name="paymentMethod"
                        value="Cash on Delivery"
                        checked={paymentMethod === 'Cash on Delivery'}
                        onChange={handlePaymentChange}
                    />
                </div>
                <div className='mode-of-payment2'>
                    <h2>GCash e-Wallet</h2>
                    <input
                        type="radio"
                        name="paymentMethod"
                        value="GCash e-Wallet"
                        checked={paymentMethod === 'GCash e-Wallet'}
                        onChange={handlePaymentChange}
                    />
                </div>
            </div>
            <div className="orderAddress">
                <h3>Deliver to what Address</h3>
                <div className="inputAddress">
                    <input 
                        type="text" 
                        id="voucherInput" 
                        name='voucherUser' 
                        placeholder='Enter Voucher Code'/>
                        <br/>
                </div>
            </div>
            <div className='bottomSummPart'>
                <div className="orderSummary">
                    <h4 className='orderSummText'>Order Summary</h4>
                    <ColoredLine className="orderLine" color="gray" />
                    <div className='totPriceBar'>
                        <h5>Total: </h5> 
                        <h5> $ {totalPrice} </h5> 
                    </div>
                </div>
                <div className="OrderButt">
                    <button className="PlaceOrderNow" onClick={() => alert(`Order placed with ${paymentMethod} with total Price of $${totalPrice}`)}>
                        Place Order Now
                    </button>
                </div>
            </div>

        </div>
    );
}

export default PlaceOrderTab;
