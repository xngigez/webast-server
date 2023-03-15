// TODO: Module docs
// Presentation layer as Lambda functions

import type {ValidatedEventAPIGatewayProxyEvent} from '@libs/api-gateway';

import {middyfy} from '@libs/lambda';

import schema from './schema';
import UserModel from '../users/model';
import * as usersService from '../users/service';
import * as authService from './service';
import {randomString} from '../utils/common';


// TODO: Add function docs.
const registerFun: ValidatedEventAPIGatewayProxyEvent<typeof schema> = async (event) => {
	// Create user object.
	const date = new Date();

	const user: UserModel = {
		email: event.body.email,
		password: event.body.password, // TODO: Encrypt password.
		token: randomString(32),
		tokenExpiry: date.setDate(date.getDate() + 1), // Add a day from now, // TODO: Use environemnt variable for expiry duration.
		date: date.getTime()
	};

	try {
		// Save user to db.
		await usersService.createUser(user);

		return {
			statusCode: 201,
			headers: {
				'Access-Control-Allow-Origin': '*',
			},
			body: JSON.stringify({
				message: 'Registered successfully.',
				data: user.token
			})
		};
	} catch (error) {
		return {
			statusCode: 500,
			headers: {
				'Access-Control-Allow-Origin': '*',
			},
			body: JSON.stringify({
				message: error.message,
				data: ''
			})
		};
	}
};

const register = middyfy(registerFun);


// TODO: Add function docs.
export const loginFun: ValidatedEventAPIGatewayProxyEvent<typeof schema> = async (event) => {
	try {
		const token: string = await authService.getUserToken(event.body.email, event.body.password);

		return {
			statusCode: 201,
			headers: {
				'Access-Control-Allow-Origin': '*',
			},
			body: JSON.stringify({
				message: 'Logged in successfully.',
				data: token
			})
		};
	} catch (error) {
		return {
			statusCode: 500,
			headers: {
				'Access-Control-Allow-Origin': '*',
			},
			body: JSON.stringify({
				message: error.message,
				data: ''
			})
		};
	}
};

const login = middyfy(loginFun);

export {register, login};
