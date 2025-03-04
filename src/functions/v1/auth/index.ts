import schema from './schema';
import { handlerPath } from '@libs/handler-resolver';

// TODO: Export as named modules.
// TODO: Create register endpoint.


// TODO: Add openAPI docs.
export const authRegister = {
	handler: `${handlerPath(__dirname)}/handler.register`,
	events: [
		{
			http: {
				method: 'post',
				path: 'v1/auth/register',
				request: {
					schemas: {
						'application/json': schema,
					},
				},
				cors: true,
			},
		},
	],
	iamRoleStatements: [
		{
			Effect: 'Allow',
			Action: [
				'dynamodb:GetItem',
				'dynamodb:PutItem',
			],
			Resource: 'arn:aws:dynamodb:${self:provider.region}:*:table/${self:service}-users-${self:provider.stage}',
		},
	],
};

// TODO: Add openAPI docs.
export const authLogin = {
	handler: `${handlerPath(__dirname)}/handler.login`,
	events: [
		{
			http: {
				method: 'post',
				path: 'v1/auth/login',
				request: {
					schemas: {
						'application/json': schema,
					},
				},
				cors: true,
			},
		},
	],
	iamRoleStatements: [
		{
			Effect: 'Allow',
			Action: [
				'dynamodb:GetItem',
				'dynamodb:PutItem',
			],
			Resource: 'arn:aws:dynamodb:${self:provider.region}:*:table/${self:service}-users-${self:provider.stage}',
		},
	],
};


// TODO: Add openAPI docs.
export const auth = {
	handler: `${handlerPath(__dirname)}/handler.auth`,
	// iamRoleStatements: [
	// 	{
	// 		Effect: 'Allow',
	// 		Action: [
	// 			'dynamodb:GetItem',
	// 			'dynamodb:PutItem',
	// 			'dynamodb:Scan',
	// 		],
	// 		Resource: 'arn:aws:dynamodb:${self:provider.region}:*:table/${self:service}-users-${self:provider.stage}',
	// 	},
	// ],
};


// TODO: Add openAPI docs.
export const authTest = {
	handler: `${handlerPath(__dirname)}/handler.authTest`,
	events: [
		{
			http: {
				method: 'post',
				path: 'v1/auth/test',
				cors: true,
			},
		},
	],
	iamRoleStatements: [
		{
			Effect: 'Allow',
			Action: [
				'dynamodb:GetItem',
				'dynamodb:PutItem',
				'dynamodb:Scan',
			],
			Resource: 'arn:aws:dynamodb:${self:provider.region}:*:table/${self:service}-users-${self:provider.stage}',
		},
	],
};
