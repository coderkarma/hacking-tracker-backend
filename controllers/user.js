const bcrypt = require('bcrypt'),
	db = require('../models'),
	jwt = require('jsonwebtoken');

module.exports = {
	signup: (req, res) => {
		// console.log(req.body);
		// Check to see if email is already in db
		db.User
			.find({
				email: req.body.email
			})
			.exec()
			.then(user => {
				// if a user is found with that email
				if (user.length >= 1) {
					// send an error and let the user know that the email already exists
					return res.status(409).json({
						message: 'email already exists'
					});
					// if we don't have this user's email in our db, lets get them set up!
				} else {
					// lets hash our plaintext password
					bcrypt.hash(req.body.password, 10, (err, hash) => {
						if (err) {
							console.log('hashing error:', err);
							res.status(200).json({
								error: err
							});
							// we now have a successful hashed password
						} else {
							// we are creating a User object with their email address and OUR hashed password
							console.log('**************');
							// console.log(req.body.displayname)
							db.User.create(
								{
									email: req.body.email,
									password: hash,
									displayname: req.body.displayname,
									dateJoined: Date()
								},
								(err, newUser) => {
									if (err) {
										return res.status(500).json({
											err
										});
									}

									console.log('here is the result', newUser);
									// we send our new data back to user or whatever you want to do.
									let user = {
										email: newUser.email,
										_id: newUser._id,
										dateJoined: newUser.dataJoined,
										displayname: newUser.displayname,
										// this piece was missing goddamn
										trails: newUser.trails
									};

									jwt.sign(
										user,
										'waffles',
										{
											// its good practice to have an expiration amount for jwt tokens.
											expiresIn: '1h'
										},
										(err, signedJwt) => {
											res.status(200).json({
												message: 'User Created',
												user,
												signedJwt
											});
										}
									);
									// send success back to user, along with a token.
								}
							);
						}
					});
				}
			})
			.catch(err => {
				//console.log(err);
				res.status(500).json({
					err
				});
			});
	},
	login: (req, res) => {
		// console.log(res.locals.userData);
		//console.log('LOGIN CALLED');

		// find the user in our user db
		//console.log('body', req.body);
		db.User
			.find({
				email: req.body.email
			})
			.select('+password')
			.exec()
			// if we have found a user
			.then(users => {
				// if there is not email in our db
				console.log('USERS: ', users);
				if (users.length < 1) {
					return res.status(401).json({
						message: 'Email/Password incorrect'
					});
				}
				// we have an email in our db that matches what they gave us
				// now we have to compare their hashed password to what we have in our db
				console.log('body', req.body);
				console.log('hash', users[0].password);
				bcrypt.compare(req.body.password, users[0].password, (err, match) => {
					console.log(match);
					// If the compare function breaks, let them know
					if (err) {
						console.log(err);
						return res.status(500).json({
							err
						});
					}
					// If match is true (their password matches our db password)
					if (match) {
						console.log('MATCH: ', match);
						// create a json web token

						let user = {
							email: users[0].email,
							_id: users[0]._id
						};

						jwt.sign(
							user,
							'waffles',
							{
								// its good practice to have an expiration amount for jwt tokens.
								expiresIn: '1h'
							},
							(err, signedJwt) => {
								console;
								res.status(200).json({
									message: 'Auth successful',
									user: users[0],
									signedJwt
								});
							}
						);
						// the password provided does not match the password on file.
					} else {
						console.log('NOT A MATCH');
						res.status(401).json({
							message: 'Email/Password incorrect'
						});
					}
				});
			})
			.catch(err => {
				console.log('OUTSIDE ERROR_');
				console.log(err);
				res.status(500).json({
					err
				});
			});
	},
	show: (req, res) => {
		let userId = req.params.id;
		console.log('trigger Show', userId);
		if (userId) {
			db.User.findById(userId, (err, foundUser) => {
				res.json(foundUser);
			});
		} else {
			res.json('No user Id provided');
		}
	},
	// !! Get all the users
	index: (req, res) => {
		console.log('getting all users');
		db.User.find({}, (err, allUsers) => {
			if (err) return err;
			res.json(allUsers);
		});
	},

	// !! Update the user by id
	update: (req, res) => {
		let userId = req.params.id;
		console.log(req.body);
		db.User.findOneAndUpdate(
			{
				_id: userId
			},
			req.body,
			{
				new: true
			},
			(err, updatedUser) => {
				if (err) {
					console.log(err);
				}
				res.json(updatedUser);
			}
		);
	},

	delete: (req, res) => {
		console.log('hitting delete');
		let userId = req.params.id;
		db.User.deleteOne(
			{
				_id: userId
			},
			(err, result) => {
				if (err) {
					return res.status(500).json({
						err
					});
				}
				res.status(200).json({
					result
				});
			}
		);
	},
	profile: (req, res) => {
		console.log('HEREE');
		if (!res.locals.userData) {
			res.status(401).json({
				error: 'Not logged in'
			});
			return;
		}

		console.log(res.locals);
		db.User
			.findById(res.locals.userData._id)
			.then(user => {
				console.log(user);
				res.json(user);
			})
			.catch(() => {
				res.status(401).json({
					error: 'Not logged in'
				});
			});
	}
};
