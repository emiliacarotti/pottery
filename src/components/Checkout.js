import React, { useState } from 'react';
import '../style/pay.css';
import StripeContainer from './StripeContainer'

function Checkout() {
	const [showItem, setShowItem] = useState(false);
	return (<div className='spacer'>
		<div className='App'>
			<h3>The Beast Bazaar Store</h3>
			<center><h1><i class="fa-solid fa-poo-storm"></i></h1></center>
			{showItem ? (
				<StripeContainer />
			) : (
				<>
					<form>
						<center><h3> Purchase Total</h3></center>
						<h3>$1299.98</h3>
						<div>
							<label for="fname"><i class="fa fa-user"></i> Full Name </label>
							<br />
							<input type="text" id="fname" name="firstname" placeholder="Moby Bukhari" />
							<br />
							<label for="email"><i class="fa fa-envelope"></i> Email </label>
							<br />
							<input type="text" id="email" name="email" placeholder="mobybukhari@beastbazzaar.com"></input>
							<br />
							<label for="adr"><i class="fa fa-address-card"></i> Address </label>
							<br />
							<input type="text" id="adr" name="address" placeholder="542 W. 15th Street" />
							<br />
							<label for="city"><i class="fa fa-institution"></i> City </label>
							<br />
							<input type="text" id="city" name="city" placeholder="Washington" />
							<br />
							<label for="state">State </label>
							<br />
							<input type="text" id="state" name="state" placeholder="DC" />
							<br />
							<label for="zip">Zip </label>
							<br />
							<input type="text" id="zip" name="zip" placeholder="20016" />
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