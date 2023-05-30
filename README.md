## RevBits - CIP Integration

[![Downloads](https://badgen.net/npm/dt/revbits-cip-integration)](https://www.npmjs.com/package/revbits-cip-integration)
[![npm version](https://img.shields.io/npm/v/revbits-cip-integration.svg?style=flat-square)](https://www.npmjs.org/package/revbits-cip-integration)
[![install size](https://img.shields.io/badge/dynamic/json?url=https://packagephobia.com/v2/api.json?p=revbits-cip-integration&query=$.install.pretty&label=install%20size&style=flat-square)](https://packagephobia.now.sh/result?p=revbits-cip-integration)
[![Known Vulnerabilities](https://snyk.io/test/npm/revbits-cip-integration/badge.svg)](https://snyk.io/test/npm/revbits-cip-integration)

## Description

The `revbits-cip-integration` npm package is a comprehensive toolkit designed to streamline and enhance your integration with the CIP (Cyber Intelligence Platform) API. This powerful package empowers developers by providing a range of robust functionalities to interact with user management, role-based access control, permission management, and notifications within the CIP ecosystem.

With revbits-cip-integration, you can seamlessly retrieve, create, update, and delete user data, enabling smooth synchronization between your application and the CIP system. Effortlessly manage roles and permissions, granting or revoking access rights with ease. Stay on top of crucial events and notifications by leveraging the package's capabilities to send, receive, and process notifications, ensuring timely and efficient communication within your application.

Additionally, the `revbits-cip-integration` package offers a powerful event-based mechanism that allows you to monitor data changes on the CIP side. Whenever there are changes to user data, such as updates to user profiles or role assignments, the package provides event notifications, enabling you to respond dynamically and keep your application's data in sync with the latest changes in the CIP system.

The revbits-cip-integration npm package is meticulously designed to offer a user-friendly and intuitive interface, reducing development complexity and allowing developers to focus on building exceptional integrations. It serves as a valuable tool for integrating your application with the CIP API, enabling you to leverage the full potential of the CIP platform and deliver a seamless experience to your users.

By leveraging the revbits-cip-integration npm package, you can harness the power of the CIP API effortlessly, unlocking a world of possibilities for your application while ensuring secure and efficient data management within the CIP system.

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

```plaintext
npm install revbits-cip-integration
```

Once the package is installed, you can import the `CIP` library by using

```javascript
const { CIP } = require('revbits-cip-integration');
```

## Usage

To use `revbits-cip-integration`, follow these steps:

1.  Import the `CIP` class from the package:

```javascript
const { CIP } = require('revbits-cip-integration');
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

2. CIP Library prints some logs, like socket connection & reconnection, To enhance your experience with the CIP Library, you have the flexibility to disable the generation of logs

set `HIDE_CIP_LOGS=true` in .env
```plaintext
HIDE_CIP_LOGS=true
```
or in your code before using library
```javascript
process.env.HIDE_CIP_LOGS = 'true'
```

### Available Methods
**Available Methods for** `cip` **instance**
> The CIP Library automatically includes the platform information in every request, so there is no need for you to explicitly pass the platform parameter each time.

| Method | Description | Definition |
| --- | --- | --- |
| getUsers | To Get Paginated Users | cip.getUsers(?OPTIONS) |
| getUser | To Get Single User | cip.getUser(USER\_ID) |
| getUserByUsername | To Get User by username/email | cip.getUserByUsername(USER\_NAME) |
| createUser | To Create a User on CIP | cip.createUser({ user: USER\_ATTRIBUTES }, ?ACTOR) |
| createBulkUsers | To Create Bulk Users on CIP | cip.createBulkUsers({ users: [USERS\_ATTRIBUTES] }, ?ACTOR) |
| updateUser | To Update a User on CIP | cip.updateUser({ id: USER\_ID, user: { ...UPDATED\_ATTRIBUTES } }, ?ACTOR) |
| uploadAvatar | To upload User Avatar on CIP | cip.uploadAvatar(AVATAR\_PATH, ACTOR) |
| deleteUser | To Delete User | cip.deleteUser(USER\_ID, ?ACTOR) |
| restoreUser | To Restore User | cip.restoreUser(USER\_ID, ?ACTOR) |
| checkUsersExistenceByUsernames | To Check Users Existence using usernames | cip.checkUsersExistenceByUsernames([...USERNAMES], ?ACTOR) |
| getRoles | To Get Paginated Roles | cip.getRoles(?OPTIONS) |
| getRole | To Get a Single Role | cip.getRole(ROLE\_ID) |
| createRole | To Create a Role on CIP | cip.createRole({ role: ROLE\_ATTRIBUTES }, ?ACTOR) |
| createBulkRoles | To Create Bulk Roles on CIP | cip.createBulkRoles({ users: [ROLES\_ATTRIBUTES] }, ?ACTOR) |
| updateRole | To Update Role on CIP | cip.updateRole({ id: ROLE\_ID, role: { ...UPDATED\_ATTRIBUTES } }, ?ACTOR) |
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

> For methods that require `audit logs`, you have the flexibility to pass an `actor` as an argument. In case you don't provide an `actor`, the default option is to use the `CIP BOT` as the `actor` in the audit logs on the `CIP` platform.

Sample Actor (it must contain `username`)
```javascript
const actor = { username: "username@org.com" };
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

To Retrieve single User by username/email

```javascript
cip.getUserByUsername(USER_NAME)
.then(result => console.log(result))
.catch(err => console.error(err));
```

To Create User

```javascript
cip.createUser({ user: USER_ATTRIBUTES }, ?ACTOR)
.then(result => console.log(result))
.catch(err => console.error(err));
```

To Create Bulk Users
> To adhere to the maximum limit of 50 records per request, you need to ensure that if you have more than 50 records, you split them into smaller chunks of 50. Then, you can call the createBulkUsers function for each chunk separately.
```javascript
cip.createBulkUsers({ users: [USER_ATTRIBUTES] }, ?ACTOR)
.then(result => console.log(result))
.catch(err => console.error(err));
```

To Update User

```javascript
cip.updateUser({ id: USER_ID, user: { ...UPDATED_ATTRIBUTES } }, ?ACTOR)
.then(result => console.log(result))
.catch(err => console.error(err));
```

To Upload User Avatar
> NOTE: Actor is required.

> Avatar Path should be `Absolute Path`
```javascript
cip.uploadAvatar(AVATAR_PATH, ACTOR)
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

To Check Users Existence using Usernames

```javascript
cip.checkUsersExistenceByUsernames([...USERNAMES])
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

To Create Bulk Roles
> To adhere to the maximum limit of 50 records per request, you need to ensure that if you have more than 50 records, you split them into smaller chunks of 50. Then, you can call the createBulkUsers function for each chunk separately.
```javascript
cip.createBulkRoles({ roles: [ROLES_ATTRIBUTES] }, ?ACTOR)
.then(result => console.log(result))
.catch(err => console.error(err));
```

To Update Role

```javascript
cip.updateRole({ id: ROLE_ID, role: { ...UPDATED_ATTRIBUTES } }, ?ACTOR)
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
> Here are some sample requests for you to try out. Feel free to log the responses if you want to examine them further. You can refer to the interfaces provided to understand the structure of the requests and responses.

### CIP Example
You can create an instance of CIP by passing necessary configurations options:

> NOTE: Please ensure that you create an instance of the CIP class asynchronously on your server-side. This is important because the operation can block the execution of code when listening to socket events in the callback. If you use the await keyword during the initialization of the CIP instance, your code will be blocked at that point. To avoid this, make sure to handle the initialization asynchronously using async/await or by using promises. This allows your code to continue executing other tasks while the CIP instance is being created in the background.
```javascript
const baseUrl = 'https://revbits-cip-server.net'; // The base URL of the CIP platform (excluding api/v2)
const socketPostfix = ':8889'; // The postfix for the socket connection (e.g., '/pws' for Cloud CIP)
const platform = 'pam'; // The platform identifier (e.g., pam, eps, ztn, es, dt, pp or any other CIP registered Platform)
const privKey = fs.readFileSync('jwt-keys/cip/private.key', { encoding: 'utf-8' }); // CIP Provided Platform Private Key for JWT Signing

// Create a new instance of CIP with the specified parameters
const cip = new CIP(baseUrl, socketPostfix, platform, privKey, {
    tlsRejectUnauthorized: false, // Set to `true` if you want to reject self-signed certificates (default: false)
    timeout: 20000 // The API timeout in milliseconds (default: 10000)
}, (_event) => { // The callback function for socket events on data changes is not mandatory. If you prefer not to listen to these events, you can simply omit passing this callback function.
	console.log(_event); // Log Socket Events triggered when there are data changes on CIP
	// Sample Event
	// {
	// 	cipEvent: {
	// 		action: 'created',
	// 		model: 'user',
	//    id: '3b6d6a1e-cbb2-4599-8ccf-972128393a9b',
	// 		...
	// 	},
	// 	event: 'updated-user',
	// 	data: User | Role | Permission | Notification
	// }

	// You can apply conditions here when event is received
	// for example, an event receives, `updated-user`, then you will update that user in your database
	if(_event.event === 'updated-user') {
		const latestUser = _event.data; // Upon the occurrence of an event trigger, the CIP Library will automatically make a call to the CIP Server to retrieve the latest data associated with that event.
		// Update latest user in DB
		UserModel.findAndUpdate(latestUser, {
			where: { id: latestUser.id }
		});
	}
});

```

> When using any of the APIs listed below, it is crucial to implement proper error handling. Neglecting to do so could result in server crashes.
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
    usernames?: Array<string>;
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

To Retrieve single User by username/email

```javascript
const username = 'user@org.com';
cip.getUserByUsername(username)
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
// The user performing the action is optional, with the default value being set as the "CIP BOT."
const actor = { username: "username@org.com" };
cip.createUser(data, actor)
.then(result => console.log(result))
.catch(err => console.error(err));
```

To Create Bulk Users
> To adhere to the maximum limit of 50 records per request, you need to ensure that if you have more than 50 records, you split them into smaller chunks of 50. Then, you can call the createBulkUsers function for each chunk separately.
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
  users: [
    {
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
    }
  ];
};
// The user performing the action is optional, with the default value being set as the "CIP BOT."
const actor = { username: "username@org.com" };
cip.createBulkUsers(data, actor)
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
  id: string;
  user: {
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
// The user performing the action is optional, with the default value being set as the "CIP BOT."
const actor = { username: "username@org.com" };
cip.updateUser(data, actor)
.then(result => console.log(result))
.catch(err => console.error(err));
```


To Upload User Avatar
> NOTE: Actor is required.

> Avatar Path should be `Absolute Path`
```javascript
const actor = { username: "username@org.com" }; // The actor represents the user who is uploading their avatar.
cip.uploadAvatar('/home/path/to/avatar/file.png', actor)
.then(result => console.log(result))
.catch(err => console.error(err));
```

To Delete User

```javascript
// The user performing the action is optional, with the default value being set as the "CIP BOT."
const actor = { username: "username@org.com" };
const user_id = 'ef7a4a52-83c3-4a13-8a18-130fa23ea821';
cip.deleteUser(user_id, actor)
.then(result => console.log(result))
.catch(err => console.error(err));
```

To Restore User

```javascript
// The user performing the action is optional, with the default value being set as the "CIP BOT."
const actor = { username: "username@org.com" };
const user_id = 'ef7a4a52-83c3-4a13-8a18-130fa23ea821';
cip.restoreUser(user_id, actor)
.then(result => console.log(result))
.catch(err => console.error(err));
```

To Check Users Existence using Usernames

```javascript
cip.checkUsersExistenceByUsernames(['user1@org.com', 'user2@org.com', 'user3@org.com'])
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
    names?: Array<string>;
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
    name: string;
    description?: string | null;
    permissions: {
      [key: string]: boolean;
    };
    isDeletable?: boolean;
  };
};
// The user performing the action is optional, with the default value being set as the "CIP BOT."
const actor = { username: "username@org.com" };
cip.createRole(data, actor)
.then(result => console.log(result))
.catch(err => console.error(err));
```

To Create Bulk Roles
> To adhere to the maximum limit of 50 records per request, you need to ensure that if you have more than 50 records, you split them into smaller chunks of 50. Then, you can call the createBulkUsers function for each chunk separately.
```javascript
const data = {
  roles: [
    {
      name: string;
      description?: string | null;
      permissions: {
        [key: string]: boolean;
      };
      isDeletable?: boolean;
    }
  ]
};
// The user performing the action is optional, with the default value being set as the "CIP BOT."
const actor = { username: "username@org.com" };
cip.createBulkRoles(data, actor)
.then(result => console.log(result))
.catch(err => console.error(err));
```

To update role
```javascript
const data = {
  id: string;
  role: {
    name?: string;
    description?: string | null;
    permissions?: {
      [key: string]: boolean;
    };
    isDeletable?: boolean;
  };
};
// The user performing the action is optional, with the default value being set as the "CIP BOT."
const actor = { username: "username@org.com" };
cip.updateRole(data, actor)
.then(result => console.log(result))
.catch(err => console.error(err));
```

To delete role
```javascript
const role_id =
// The user performing the action is optional, with the default value being set as the "CIP BOT." "3b6d6a1e-cbb2-4599-8ccf-972128393a9b";
const actor = { username: "username@org.com" };
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
> Please note that you should include all the permissions you want to retain when making this request. Any permissions not included in this request will be removed from CIP.

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
// The user performing the action is optional, with the default value being set as the "CIP BOT."
const actor = { username: "username@org.com" };
cip.syncPermissions({ permissions: permissions }, actor)
.then(result => console.log(result))
.catch(err => console.error(err));
```

To delete Permission

```javascript
// The user performing the action is optional, with the default value being set as the "CIP BOT."
const actor = { username: "username@org.com" };
const permission_key = 'pam-view-personal-session-logs';
cip.deletePermission(permission_key, actor)
.then(result => console.log(result))
.catch(err => console.error(err));
```

To delete all platform Permissions
> NOTE: Be Careful doing this action, it will delete all permissions of the platform from CIP

```javascript
// The user performing the action is optional, with the default value being set as the "CIP BOT."
const actor = { username: "username@org.com" };
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
// The user performing the action is optional, with the default value being set as the "CIP BOT."
const actor = { username: "username@org.com" };
cip.createNotification({ notification: NOTIFICATION_ATTRIBUTES }, ?ACTOR)
.then(result => console.log(result))
.catch(err => console.error(err));
```

To read Notification
> NOTE: Actor is required to Read Notification

> Please remember that the actor should be the person who received the notification, as they need to be able to read it.
```javascript
// It is mandatory to specify the user who is reading the notification.
const actor = { username: "username@org.com" };
const platform_notification_id = 'dbdb7813-a9c8-4128-834a-09f4980676d4';
cip.readNotification(platform_notification_id, actor)
.then(result => console.log(result))
.catch(err => console.error(err));
```

To delete notification
```javascript
// The user performing the action is optional, with the default value being set as the "CIP BOT."
const actor = { username: "username@org.com" };
const platform_notification_id = 'dbdb7813-a9c8-4128-834a-09f4980676d4';
cip.deleteNotification(platform_notification_id, actor)
.then(result => console.log(result))
.catch(err => console.error(err));
```

## License

[MIT](LICENSE)
