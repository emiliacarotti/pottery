import React, { useState } from 'react';
import '../style/pay.css';
import StripeContainer from './StripeContainer'

function Checkout() {
	const [showItem, setShowItem] = useState(false);
	return (<div className='spacer'>
		<div className='App'>
			<div className='title2'>Checkout</div>
			{showItem ? (
				<StripeContainer />
			) : (
				<>
					<form>
						<center className="temp"> This page is under construction! Please check back soon.</center>
						<h3>$</h3>
						<div>
							<label for="fname"><i class="fa fa-user"></i> Full Name </label>
							<br />
							<input type="text" id="fname" name="firstname" placeholder="Name" />
							<br />
							<label for="email"><i class="fa fa-envelope"></i> Email </label>
							<br />
							<input type="text" id="email" name="email" placeholder="Email"></input>
							<br />
							<label for="adr"><i class="fa fa-address-card"></i> Address </label>
							<br />
							<input type="text" id="adr" name="address" placeholder="Street" />
							<br />
							<label for="city"><i class="fa fa-institution"></i> City </label>
							<br />
							<input type="text" id="city" name="city" placeholder="Washington" />
							<br />
							<label for="state">State </label>
							<br />
							<input type="text" id="state" name="state" placeholder="State" />
							<br />
							<label for="zip">Zip </label>
							<br />
							<input type="text" id="zip" name="zip" placeholder="Zip Code" />
							<div>
								<input type="checkbox" id="scales" name="scales"
									checked />
								<label for="scales">Shipping and Billing are the same</label>
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