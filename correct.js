const models = require("./models");
/*
 * Pulls the first user from the user id list that can be found in the database.
 * If a particular user can't be found, ignore the id and look for the next user
 * until one can be found.
 */

async function pullFirstUser (userIds) {
		let user = await models.user.findOne({_id: userIds});
		if (user) return user;
}

pullFirstUser(["5e41c6b7de593a73d0839e96", "5f41b0a5de593a73d0839e91", "5f41c6b7de593a73d0839e96"])
.then(console.log)



/*
 * Processes the sorted array and returns the results in
 * the same order as the input documents (e.g., the 
 * result of the first element in the argument array should
 * be stored in the first element of the result array, and so on...).
 */
async function pullPaymentsForUsers(users) {
		let payments = await models.payment.find({user_id: users})
		return payments

}

pullPaymentsForUsers(["5f41c65a9b0b6e1e7c4a2df9", "5f41c65a9b0b6e1e7c4a2dfa"])
.then(console.log)


// /*
//  * Converts the number to a string (return nothing if 
//  * something other than a number is passed to the function)
//  */
function convertToStr(num) {
	if (typeof(num)==="number") return num.toString();
}

console.log(convertToStr(4))



// /*
//  * Given the _id of the payment, return the payment
//  * with the associated user. The user should be stored
//  * as "user" on the payment object.
//  *
//  * Sometimes the payment id might not match a payment.
//  */
async function getPaymentWithUser(paymentId) {
	let payment = await models.payment.findOne({_id: paymentId});
	if (payment){
		payment.user = await models.user.find({_id: payment.user_id});
		return payment
	}else{
		throw new error ("Payment ID does not match a payment")
	}
}

getPaymentWithUser("5f42b187baaa049d1e9024b3")
.then(console.log)


// /*
//  * Pulls all active payments for the users and retuns an object
//  * mapping the user id to the user's payments (string to array).
//  * Note: userIds is passed in as an array of strings
//  */
async function getGroupedUserPmts(userIds) {
	let result = {};
	let allPayments = await models.payment.find({user_id: userIds, active:true});
	userIds.forEach(userId => {
		payments = allPayments.filter(payment => userId.includes(payment.user_id));
		result[userId] = payments;
	});
	return result.user;
}

getGroupedUserPmts(["5f41b0a5de593a73d0839e91", "5f41c6b7de593a73d0839e96", "5f41b0a5de593a73d0839e93"])
.then(console.log)

module.exports = {
	getGroupedUserPmts,
	getPaymentWithUser,
	convertToStr, 
	pullPaymentsForUsers,

}