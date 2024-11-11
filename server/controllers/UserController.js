import mongoose from 'mongoose';
import User from '../models/UserModel.js';
import Subscription from '../models/SubscriptionsModel.js';
import Trial from '../models/TrialsModel.js';

const userController = {};

// userController middlewares

//get a user and all their subscriptions/trials based on user ID
userController.getUser = async (req, res, next) => {
	//grab userID from auth redirect
	const userID = req.params.id;

	try {
		// const foundUser = await User.findById(_id, 'name email');
		// if (!user) return next ({
		//   log: 'findOne query returned null in getUser - email not found in DB',
		//   status: 404,
		//   message: {
		//     err: `No user found in database with email ${foundUser}`
		//   }
		// });
		// res.locals.foundUser = foundUser;
		// return next();

		await User.findById({ userID }).then((result) => {
			//if no matching user was found
			console.log('🤍found user: ', result);
			if (result === null) {
				return next({
					log: 'findOne query returned null in getUser - email not found in DB',
					status: 404,
					message: {
						err: `No user found in database with email ${userID}`,
					},
				});
			}
			res.locals.foundUser = result;
		});
	} catch (error) {
		return next({
			log: error,
			status: 500,
			message: { err: 'User was unable to be retrieved from the database.' },
		});
	}

	//get all of users' subscriptions
	try {
		await Subscription.find({ userId: mongoose.Types.ObjectId(userID) }).then(
			(result) => {
				console.log('🎉found subscriptions: ', result);
				res.locals.subscriptions = result;
			}
		);
	} catch (error) {
		return next({
			log: error,
			status: 500,
			message: {
				err: "User's subscriptions were unable to be retrieved from the database.",
			},
		});
	}

	//get all of users' trials
	try {
		const trials = await Trial.find({ userId: userID });
		res.locals.trials = trials;
		return next();
	} catch (error) {
		return next({
			log: error,
			status: 500,
			message: {
				err: "User's trials were unable to be retrieved from the database.",
			},
		});
	}
};

export default userController;
