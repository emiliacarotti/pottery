
import React, { useState } from 'react';
import '../style/pay.css';
import StripeContainer from './StripeContainer'

function Checkout() {
	const [showItem, setShowItem] = useState(false);
	return (
		<div className='App'>
			<h1>The Beast Bazzar Store</h1>
			{showItem ? (
				<StripeContainer />
			) : (
				<>
                    <center><h4> Purchase Total</h4></center>
					<h3>$1299.98</h3>
					<button onClick={() => setShowItem(true)}>Purchase Creature</button>
				</>
			)}
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



