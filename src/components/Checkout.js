
import React, { useState } from 'react';
import '../style/pay.css';
import StripeContainer from './StripeContainer'

function Checkout() {
	const [showItem, setShowItem] = useState(false);
	return ( <div className='spacer'>
		<div className='App'>
			<h1>The Beast Bazzar Store</h1>
			{showItem ? (
				<StripeContainer />
			) : (
				<>
				<form>
					
                    <center><h4> Purchase Total</h4></center>
					<h3>$1299.98</h3>
					<div>
					<label for="fname"><i class="fa fa-user"></i> Full Name </label>
					<br/>
            		<input type="text" id="fname" name="firstname" placeholder="Moby Bukhari"/>
					<br/>
					<label for="email"><i class="fa fa-envelope"></i> Email </label>
					<br/>
            		<input type="text" id="email" name="email" placeholder="mobybukhari@beastbazzaar.com"></input>
					<br/>
					<label for="adr"><i class="fa fa-address-card"></i> Address </label>
					<br/>
            		<input type="text" id="adr" name="address" placeholder="542 W. 15th Street"/>
					<br/>
            		<label for="city"><i class="fa fa-institution"></i> City </label>
					<br/>
            		<input type="text" id="city" name="city" placeholder="Washington"/>
                    <br/>
					<label for="state">State </label>
					<br/>
                	<input type="text" id="state" name="state" placeholder="DC"/>
					<br/>
					<label for="zip">Zip </label>
					<br/>
                	<input type="text" id="zip" name="zip" placeholder="20016"/>
					<div className='checkbox'>
					<br/>
					<label>
          <input type="checkbox" checked="checked" name="sameadr"/> Shipping address same as billing
        </label>
                    </div>
					</div>
					<center><button className="inputMOTM3" onClick={() => setShowItem(true)}>Proceed to Checkout</button></center>
				</form>
				</>
			)}
		</div>
		</div>
	);
}

export default Checkout;

//HARD CODE WORKING 
// function Checkout() {
//     return (
//         <>
//             <div className="border">
//                 <div className="shopping-cart">
//                     <div className="title">
//                         Payment
//                         <br></br>
//                     </div>
//                     <center><h2>Checkout Total<br></br>$1299.99</h2></center>
//                     <br></br>
//                     <center><label>Card Type: </label></center>
//                     <center><input type="text" placeholder="VISA"></input></center>
//                     <br></br>
//                     <center><label>Card Number: </label></center>
//                     <center><input type="text" ></input></center>
//                     <br></br>
//                     <center><label>Expiration Date: </label></center>
//                     <center><input type="text" ></input></center>
//                 </div>
//                 <center><button onClick={() => { showAlert(); }} className="checkout-btn">Submit Purchase</button></center>
//             </div>
//         </>
//     )
// }
// function showAlert() {
//     alert("PAYMENT SUCESSFUL!!! ")
//     alert("DISCLAIMER ALERT: Your Payment information may fund my next vacation, however, your creature order has been initiated and will arrive to your address soon");
// }


// export default Checkout;



