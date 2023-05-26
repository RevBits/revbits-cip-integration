## RevBits - CIP Integration

> CIP Integration made easy

<!-- [![npm version](https://img.shields.io/npm/v/@revbits/cip-integration.svg?style=flat-square)](https://www.npmjs.org/package/@revbits/cip-integration)  
[![Downloads](https://badgen.net/npm/dt/@revbits/cip-integration)](https://www.npmjs.com/package/@revbits/cip-integration)  
[![install size](https://img.shields.io/badge/dynamic/json?url=https://packagephobia.com/v2/api.json?p=@revbits/cip-integration&query=$.install.pretty&label=install%20size&style=flat-square)](https://packagephobia.now.sh/result?p=@revbits/cip-integration)  
[![Known Vulnerabilities](https://snyk.io/test/npm/@revbits/cip-integration/badge.svg)](https://snyk.io/test/npm/@revbits/cip-integration) -->

## Description

`@revbits/cip-integration` is an npm package that provides integration with the CIP (Cyber Intelligence Platform) API. It allows you to interact with user, role, permissions and notifications data in the CIP system.

## Table of Contents

*   [Requirements](#requirements)
*   [Installation](#installation)
*   [Usage](#usage)
    *   [Available Methods](#available-methods)
    *   [Users](#users-usage)
    *   [Roles](#roles-usage)
    *   [Permissions](#permissions-usage)
    *   [Notifications](#notifications-usage)
*   [Example](#example)
	*	[CIP](#cip-example)
    *   [Users](#users-example)
    *   [Roles](#roles-example)
    *   [Permissions](#permissions-example)
    *   [Notifications](#notifications-example)
*   [License](#license)

## Requirements

*   It requires [Node.js](https://nodejs.org/) v16+ to run.
*   You must have CIP Product.

## Installation

<!-- ```plaintext
npm install @revbits/cip-integration
``` -->

```plaintext
npm install revbits-cip-integration
```

Once the package is installed, you can import the `CIP` library by using

```javascript
const { CIP } = require('@revbits/cip-integration');
```

## Usage

To use `@revbits/cip-integration`, follow these steps:

1.  Import the `CIP` class from the package:

```javascript
const { CIP } = require('@revbits/cip-integration');
```

1.  Create a new instance of `CIP` by providing the necessary configuration options:

```javascript
const privKey = fs.readFileSync(PRIVATE_KEY_PATH, { encoding: 'utf-8' });

// Create a new instance of CIP with the specified parameters
const cip = new CIP(CIP_BASE_URL, SOCKET_POSTFIX, PLATFORM, privKey, {
    tlsRejectUnauthorized: false, // Set to `false` if you need to use self-signed certificates on CIP
    timeout: 5000 // Specify the API timeout in milliseconds
}, (event) => {
    console.log(event); // This will log Socket Events triggered when there are data changes on CIP
});
```

2. CIP Library prints some logs, like socket connection & reconnection, If you don't want to see Library logs
> set `HIDE_CIP_LOGS=true` in .env
```plaintext
HIDE_CIP_LOGS=true
```
> or in your code before using library
```javascript
process.env.HIDE_CIP_LOGS = 'true'
```

### Available Methods
**Available Methods for** `cip` **instance**
> You don't need to pass platform in every request, CIP Library passes the platform automatically.

| Method | Description | Definition |
| --- | --- | --- |
| getUsers | To Get Paginated Users | cip.getUsers(?OPTIONS) |
| getUser | To Get Single User | cip.getUser(USER\_ID) |
| createUser | To Create a User on CIP | cip.createUser({ user: USER\_ATTRIBUTES }, ?ACTOR) |
| updateUser | To Update a User on CIP | cip.updateUser({ user: { id: USER\_ID, ...UPDATED\_ATTRIBUTES } }, ?ACTOR) |
| deleteUser | To Delete User | cip.deleteUser(USER\_ID, ?ACTOR) |
| restoreUser | To Restore User | cip.restoreUser(USER\_ID, ?ACTOR) |
| getRoles | To Get Paginated Roles | cip.getRoles(?OPTIONS) |
| getRole | To Get a Single Role | cip.getRole(ROLE\_ID) |
| createRole | To Create a Role on CIP | cip.createRole({ role: ROLE\_ATTRIBUTES }, ?ACTOR) |
| updateRole | To Update Role on CIP | cip.updateRole({ role: { id: ROLE\_ID, ...UPDATED\_ATTRIBUTES } }, ?ACTOR) |
| deleteRole | To Delete Role from CIP | cip.deleteRole(ROLE\_ID, ?ACTOR) |
| getPermissions | To Get Permissions | cip.getPermissions() |
| getPermission | To Get a Single Permission | cip.getPermission(PERMISSION\_KEY) |
| syncPermissions | To Sync Permissions on CIP | cip.syncPermissions({ permissions: PERMISSIONS\_ATTRIBUTES }, ?ACTOR) |
| deletePermission | To Delete Permission from CIP | cip.deletePermission(PERMISSION\_KEY, ?ACTOR) |
| deletePlatformPermissions | To Delete All Platform Permissions from CIP | cip.deletePlatformPermissions(?ACTOR) |
| getNotifications | To Get Paginated Notifications | cip.getNotifications(?OPTIONS) |
| getNotification | To Get Single Notifications | cip.getNotification(PLATFORM\_NOTIFICATION\_ID) |
| createNotification | To Create Notification | cip.createNotification({ notification: NOTIFICATION\_ATTRIBUTES }, ?ACTOR) |
| readNotification | To Read Notification | cip.readNotification(PLATFORM\_NOTIFICATION\_ID, ACTOR) |
| deleteNotification | To Delete Notifications | cip.deleteNotification(PLATFORM\_NOTIFICATION\_ID, ?ACTOR) |

> You can pass an Actor as an Argument to all methods (which needs `Audit Logs`). If not passed, then `CIP BOT` will be used as an Actor in `Audit Logs` on `CIP`.

Sample Actor (it must contain `id` and `username`)
```javascript
const actor = {
	id: "3b6d6a1e-cbb2-4599-8ccf-972128393a9b",
	username: "username@org.com"
};
```

### Users Usage

To Retrieve a list of users (Paginated Results)

```javascript
cip.getUsers(?OPTIONS)
.then(result => console.log(result))
.catch(err => console.error(err));
```

To Retrieve single User

```javascript
cip.getUser(USER_ID)
.then(result => console.log(result))
.catch(err => console.error(err));
```

To Create User

```javascript
cip.createUser({ user: USER_ATTRIBUTES }, ?ACTOR)
.then(result => console.log(result))
.catch(err => console.error(err));
```

To Update User

```javascript
cip.updateUser({ user: { id: USER_ID, ...UPDATED_ATTRIBUTES } }, ?ACTOR)
.then(result => console.log(result))
.catch(err => console.error(err));
```

To Delete User

```javascript
cip.deleteUser(USER_ID, ?ACTOR)
.then(result => console.log(result))
.catch(err => console.error(err));
```

To Restore User

```javascript
cip.restoreUser(USER_ID, ?ACTOR)
.then(result => console.log(result))
.catch(err => console.error(err));
```

### Roles Usage
To Retrieve a list of roles (Paginated Results)

```javascript
cip.getRoles(?OPTIONS)
.then(result => console.log(result))
.catch(err => console.error(err));
```

To Retrieve single Role

```javascript
cip.getRole(ROLE_ID)
.then(result => console.log(result))
.catch(err => console.error(err));
```

To Create Role

```javascript
cip.createRole({ role: ROLE_ATTRIBUTES }, ?ACTOR)
.then(result => console.log(result))
.catch(err => console.error(err));
```

To Update Role

```javascript
cip.updateRole({ role: { id: ROLE_ID, ...UPDATED_ATTRIBUTES } }, ?ACTOR)
.then(result => console.log(result))
.catch(err => console.error(err));
```

To Delete Role

```javascript
cip.deleteRole(ROLE_ID, ?ACTOR)
.then(result => console.log(result))
.catch(err => console.error(err));
```

### Permissions Usage
To Retrieve a list of permissions

```javascript
cip.getPermissions()
.then(result => console.log(result))
.catch(err => console.error(err));
```

To Retrieve single Permission

```javascript
cip.getPermission(PERMISSION_KEY)
.then(result => console.log(result))
.catch(err => console.error(err));
```

To sync permissions

```javascript
cip.syncPermissions({ permissions: PERMISSIONS }, ?ACTOR)
.then(result => console.log(result))
.catch(err => console.error(err));
```

To delete Permission

```javascript
cip.deletePermission(PERMISSION_KEY, ?ACTOR)
.then(result => console.log(result))
.catch(err => console.error(err));
```

To delete all platform Permissions

```javascript
cip.deletePlatformPermissions(?ACTOR)
.then(result => console.log(result))
.catch(err => console.error(err));
```

### Notifications Usage
To Retrieve a list of notifications (Paginated Results)

```javascript
cip.getNotifications(?OPTIONS)
.then(result => console.log(result))
.catch(err => console.error(err));
```

To retrieve single Notification
```javascript
cip.getNotification(PLATFORM_NOTIFICATION_ID)
.then(result => console.log(result))
.catch(err => console.error(err));
```

To create Notification
```javascript
cip.createNotification({ notification: NOTIFICATION_ATTRIBUTES }, ?ACTOR)
.then(result => console.log(result))
.catch(err => console.error(err));
```

To read Notification
> NOTE: Actor is required to Read Notification
```javascript
cip.readNotification(PLATFORM_NOTIFICATION_ID, ACTOR)
.then(result => console.log(result))
.catch(err => console.error(err));
```

To delete notification
```javascript
cip.deleteNotification(PLATFORM_NOTIFICATION_ID, ?ACTOR)
.then(result => console.log(result))
.catch(err => console.error(err));
```

## Example
> Below are the sample requests, you can check more yourself by consoling the responses (if needed). You can also check the interfaces to determine the request and responses.

### CIP Example
You can create an instance of CIP by passing necessary configurations options:

> NOTE: You need to create instance of CIP class `asynchronously` on your server side as this operation will be blocking to listen `socket events` in `callback`, so if you use `await` when initializing `cip` instance, your code will be blocked there.
```javascript
const baseUrl = 'https://revbits-cip-server.net'; // The base URL of the CIP platform (excluding api/v2)
const socketPostfix = ':8889'; // The postfix for the socket connection (e.g., '/pws' for Cloud CIP)
const platform = 'pam'; // The platform identifier (e.g., pam, eps, ztn, es, dt, pp or any other CIP registered Platform)
const privKey = fs.readFileSync('jwt-keys/cip/private.key', { encoding: 'utf-8' }); // CIP Provided Platform Private Key for JWT Signing

// Create a new instance of CIP with the specified parameters
const cip = new CIP(baseUrl, socketPostfix, platform, privKey, {
    tlsRejectUnauthorized: false, // Set to `true` if you want to reject self-signed certificates (default: false)
    timeout: 20000 // The API timeout in milliseconds (default: 10000)
}, (_event) => { // this callback is optional, if you don't want to listen socket events on data changes, then you should not pass this callback function
	console.log(_event); // Log Socket Events triggered when there are data changes on CIP
	// Sample Event
	// {
	// 	cipEvent: {
	// 		action: 'created',
	// 		model: 'user',
	//      id: '3b6d6a1e-cbb2-4599-8ccf-972128393a9b',
	// 		...
	// 	},
	// 	event: 'updated-user',
	// 	data: User | Role | Permission | Notification
	// }

	// You can apply conditions here when event is received
	// for example, an event receives, `updated-user`, then you will update that user in your database
	if(_event.event === 'updated-user') {
		const latestUser = _event.data; // When event Triggers, CIP Library will call CIP Server automatically to fetch latest data against that event
		// Update latest user in DB
		UserModel.findAndUpdate(latestUser, {
			where: { id: latestUser.id }
		});
	}
});

```

> In all below APIs, Please must catch errors, if you don't, your server may crash
### Users Example

To retrieve list of users
```javascript
// You can use below options in getUsers (These are optional)
const options = {
  page?: number; // You will need to pass page to get paginated results (Default: 1)
  sort?: string; // if you want to sort by some column like username
  direction?: string; // Specify direction asc, desc for sorting
  perPage?: number;  // Specifiy how many records you need per page (Default: 250)
  query?: { // You can use this if you need advance search
    username?: string;
    firstname?: string;
    lastname?: string;
    verified?: boolean;
    active?: boolean;
  };
};
cip.getUsers(options)
.then(result => console.log(result))
.catch(err => console.error(err));
```

To retrieve single user
```javascript
const user_id = 'ef7a4a52-83c3-4a13-8a18-130fa23ea821';
cip.getUser(user_id)
.then(result => console.log(result))
.catch(err => console.error(err));
```

To create user
```javascript
const UserPlatformAccess = {
  dt_enabled: boolean;
  es_enabled: boolean;
  pp_enabled: boolean;
  up_enabled: boolean;
  eps_enabled: boolean;
  pam_enabled: boolean;
};

const data = {
  user: {
    id: string;
    firstname: string;
    lastname: string;
    username: string;
    password: string;
    usersalt: string;
    roles: UserRoles;
    logonname?: string;
    is_active?: boolean;
    is_verified?: boolean;
    platform_access?: UserPlatformAccess;
    deviceId?: string;
    deviceType?: string;
    phoneNumber?: string;
    smsEnabled?: boolean;
    azureAdUserId?: string;
    verification_random?: string;
    forgotpass_token?: string;
    twofactor_stat?: number;
    twofactor_secret?: string;
    notes?: string;
    key_stack?: string;
    activation_time?: Date;
    verification_time?: Date;
    activatedAt?: Date;
    verifiedAt?: Date;
    smsSecret?: string;
    twoFactorPriority?: Array<string>;
    otpEnabled?: boolean;
    otpSecret?: string;
    securityKeyData?: Array<any>;
    securityKeyChallenge?: string;
    mblEnabled?: boolean;
    smsOtpRetries?: number;
    isSamlEnabled?: boolean;
  };
};
const actor = { // The User who is performing action, it's optional (Default: CIP BOT)
	id: "3b6d6a1e-cbb2-4599-8ccf-972128393a9b",
	username: "username@org.com"
};
cip.createUser(data, actor)
.then(result => console.log(result))
.catch(err => console.error(err));
```

To update user
```javascript
const UserPlatformAccess = {
  dt_enabled: boolean;
  es_enabled: boolean;
  pp_enabled: boolean;
  up_enabled: boolean;
  eps_enabled: boolean;
  pam_enabled: boolean;
};

const data = {
  user: {
    id: string; // required
    firstname?: string;
    lastname?: string;
    username?: string;
    password?: string;
    usersalt?: string;
    roles?: UserRoles;
    logonname?: string;
    is_active?: boolean;
    is_verified?: boolean;
    platform_access?: UserPlatformAccess;
    deviceId?: string;
    deviceType?: string;
    phoneNumber?: string;
    smsEnabled?: boolean;
    azureAdUserId?: string;
    verification_random?: string;
    forgotpass_token?: string;
    twofactor_stat?: number;
    twofactor_secret?: string;
    notes?: string;
    key_stack?: string;
    activation_time?: Date;
    verification_time?: Date;
    activatedAt?: Date;
    verifiedAt?: Date;
    smsSecret?: string;
    twoFactorPriority?: Array<string>;
    otpEnabled?: boolean;
    otpSecret?: string;
    securityKeyData?: Array<any>;
    securityKeyChallenge?: string;
    mblEnabled?: boolean;
    smsOtpRetries?: number;
    isSamlEnabled?: boolean;
  };
};
const actor = { // The User who is performing action, it's optional (Default: CIP BOT)
	id: "3b6d6a1e-cbb2-4599-8ccf-972128393a9b",
	username: "username@org.com"
};
cip.updateUser(data, actor)
.then(result => console.log(result))
.catch(err => console.error(err));
```

To Delete User

```javascript
const actor = { // The User who is performing action, it's optional (Default: CIP BOT)
	id: "3b6d6a1e-cbb2-4599-8ccf-972128393a9b",
	username: "username@org.com"
};
const user_id = 'ef7a4a52-83c3-4a13-8a18-130fa23ea821';
cip.deleteUser(user_id, actor)
.then(result => console.log(result))
.catch(err => console.error(err));
```

To Restore User

```javascript
const actor = { // The User who is performing action, it's optional (Default: CIP BOT)
	id: "3b6d6a1e-cbb2-4599-8ccf-972128393a9b",
	username: "username@org.com"
};
const user_id = 'ef7a4a52-83c3-4a13-8a18-130fa23ea821';
cip.restoreUser(user_id, actor)
.then(result => console.log(result))
.catch(err => console.error(err));
```

### Roles Example
To retrieve list of roles
```javascript
// You can use below options in getRoles (These are optional)
const options = {
  page?: number; // You will need to page to get paginated results (Default: 1)
  sort?: string; // if you want to sort by some column like username
  direction?: string; // Specify direction asc, desc for sorting
  perPage?: number;  // Specifiy how many records you need per page (Default: 250)
  query?: { // You can use this if you need advance search
	name?: string;
	descripion?: string;
  };
};
cip.getRoles(options)
.then(result => console.log(result))
.catch(err => console.error(err));
```

To retrieve single role
```javascript
const role_id = 'ef7a4a52-83c3-4a13-8a18-130fa23ea821';
cip.getRole(role_id)
.then(result => console.log(result))
.catch(err => console.error(err));
```

To create role
```javascript
const data = {
  role: {
    id: string;
    name: string;
    description?: string | null;
    permissions: {
      [key: string]: boolean;
    };
    isDeletable?: boolean;
  };
};
const actor = { // The User who is performing action, it's optional (Default: CIP BOT)
	id: "3b6d6a1e-cbb2-4599-8ccf-972128393a9b",
	username: "username@org.com"
};
cip.createRole(data, actor)
.then(result => console.log(result))
.catch(err => console.error(err));
```

To update role
```javascript
const data = {
  role: {
    id: string; // required
    name?: string;
    description?: string | null;
    permissions?: {
      [key: string]: boolean;
    };
    isDeletable?: boolean;
  };
};
const actor = { // The User who is performing action, it's optional (Default: CIP BOT)
	id: "3b6d6a1e-cbb2-4599-8ccf-972128393a9b",
	username: "username@org.com"
};
cip.updateRole(data, actor)
.then(result => console.log(result))
.catch(err => console.error(err));
```

To delete role
```javascript
const role_id = "3b6d6a1e-cbb2-4599-8ccf-972128393a9b";
const actor = { // The User who is performing action, it's optional (Default: CIP BOT)
	id: "3b6d6a1e-cbb2-4599-8ccf-972128393a9b",
	username: "username@org.com"
};
cip.deleteRole(role_id, actor)
.then(result => console.log(result))
.catch(err => console.error(err));
```

### Permissions Example
To retrieve list of permissions
```javascript
cip.getPermissions()
.then(result => console.log(result))
.catch(err => console.error(err));
```

To retrieve single permission
```javascript
const permission_key = 'pam-view-personal-session-logs';
cip.getPermission(permission_key)
.then(result => console.log(result))
.catch(err => console.error(err));
```

To sync permissions
> NOTE: You need to pass all permissions which you want to keep, the permissions which are missing in this request will be deleted from CIP.

```javascript
const permissions = [
    {
        "type": "user",
        "key": "audit-log",
        "level": 30,
        "name": "Audit Log 2",
        "module": "user"
    },
    {
        "type": "pam",
        "key": "credman-personal-containers",
        "level": 1,
        "name": "Credentials Management Personal Containers",
        "module": "enpast"
    },
    ...
    // all other permissions
];
const actor = { // The User who is performing action, it's optional (Default: CIP BOT)
	id: "3b6d6a1e-cbb2-4599-8ccf-972128393a9b",
	username: "username@org.com"
};
cip.syncPermissions({ permissions: permissions }, actor)
.then(result => console.log(result))
.catch(err => console.error(err));
```

To delete Permission

```javascript
const actor = { // The User who is performing action, it's optional (Default: CIP BOT)
	id: "3b6d6a1e-cbb2-4599-8ccf-972128393a9b",
	username: "username@org.com"
};
const permission_key = 'pam-view-personal-session-logs';
cip.deletePermission(permission_key, actor)
.then(result => console.log(result))
.catch(err => console.error(err));
```

To delete all platform Permissions
> NOTE: Be Careful doing this action, it will delete all permissions of the platform from CIP

```javascript
const actor = { // The User who is performing action, it's optional (Default: CIP BOT)
	id: "3b6d6a1e-cbb2-4599-8ccf-972128393a9b",
	username: "username@org.com"
};
cip.deletePlatformPermissions(actor)
.then(result => console.log(result))
.catch(err => console.error(err));
```

### Notifications Example
To retrieve list of notifications
```javascript
// You can use below options in getNotifications (These are optional)
const options = {
  page?: number; // You will need to pass page to get paginated results (Default: 1)
  sort?: string; // if you want to sort by some column like username
  direction?: string; // Specify direction asc, desc for sorting
  perPage?: number;  // Specifiy how many records you need per page (Default: 250)
  query?: {
    startDate?: Date; // Filter to get notification after specified date
    endDate?: Date; // Filter to get notification before specified date
    severity?: ['critical', 'medium', 'high', 'low', 'note']; // Filter to get notification against specified severity (can be multiple using array syntax)
    platformType?: PLATFORM_UPPER_CASE; // Filter to get notification against specified platform (e.g., PAM)
    type?: 'read' | 'unread'; // Filter to get notification against specified type (e.g., read)
    userIds?: Array<string>; // Filter to get Notifications against only specified user IDs (e.g., ["5da09c6a-7d1d-4562-b9cc-69a8eccc98ad", "ef7a4a52-83c3-4a13-8a18-130fa23ea823"])
    filterText?: string; // Filter to get notification against specified text
  };
};
cip.getNotifications(options)
.then(result => console.log(result))
.catch(err => console.error(err));
```

To retrieve single notification
```javascript
const platform_notification_id = 'dbdb7813-a9c8-4128-834a-09f4980676d4';
cip.getNotification(platform_notification_id)
.then(result => console.log(result))
.catch(err => console.error(err));
```

To create Notification
```javascript
const data = {
  notification: {
    id: string;
    event: string;
    entityId: string;
    sourceId: string | null | undefined;
    entityName: string;
    entityType: string;
    severity: string;
    notificationType: string;
    notification: string;
    actionBy: string;
    deletedAt: Date | null | undefined;
    receivers: Array<string>;
    pageUrl: string;
    platform: 'PAM' | 'EPS' | ...;
    createdAt: Date | null | undefined;
  };
};
const actor = { // The User who is performing action, it's optional (Default: CIP BOT)
	id: "3b6d6a1e-cbb2-4599-8ccf-972128393a9b",
	username: "username@org.com"
};
cip.createNotification({ notification: NOTIFICATION_ATTRIBUTES }, ?ACTOR)
.then(result => console.log(result))
.catch(err => console.error(err));
```

To read Notification
> NOTE: Actor is required to Read Notification

> REMEMBER: Actor should be the person who received notification so that he can read it 
```javascript
const platform_notification_id = 'dbdb7813-a9c8-4128-834a-09f4980676d4';
const actor = { // The User who is reading notification, it's required
	id: "3b6d6a1e-cbb2-4599-8ccf-972128393a9b",
	username: "username@org.com"
};
cip.readNotification(platform_notification_id, actor)
.then(result => console.log(result))
.catch(err => console.error(err));
```

To delete notification
```javascript
const actor = { // The User who is performing action, it's optional (Default: CIP BOT)
	id: "3b6d6a1e-cbb2-4599-8ccf-972128393a9b",
	username: "username@org.com"
};
const platform_notification_id = 'dbdb7813-a9c8-4128-834a-09f4980676d4';
cip.deleteNotification(platform_notification_id, actor)
.then(result => console.log(result))
.catch(err => console.error(err));
```

## License

[MIT](LICENSE)
