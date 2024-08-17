# Homelike Test

## Features
### Backend
Built with typescript for MongoDB using MVCS architecture. Uses roles and SECRET token for Authorization and Authentication respectively.

## Requirements

- Node.JS version 18.10.0
- MongoDB

## Setup
- Run **npm install** and then **yarn** in a terminal. 
- For development the app uses a local MongoDB with PORT:**27017**

## Starting the App
- Make sure you have a local instance of MongoDB running.
- Run **yarn start** in a terminal. On initialization of the DB, an admin with email: **admin@homelike.com**  and password: **12345678**. To populate the database with dummy data for menu items, you can run:
    - On Linux:
    > **CREATE_DATA=true yarn start**. 
    - On Windows:
    > **set CREATE_DATA=true** <br> **yarn start**. 

You should receive the following messages: 
    - Server successfully running on port:  3000
    - Connection to database successful.
- If you want to configure your local instance, create a **.env**. **.env** stores important process environment variables such as **port, url, MongoDb url, environment and secret**. Example:
> SECRET="LOCAL_SECRET" <br>
NODE_ENV='development' <br>
DB_URI="mongodb://localhost:27017/homelike-test" <br>
SELF_URL="localhost:3000" <br>
CLIENT_URL="localhost:4200" <br>
PORT="3000" <br>
ADMIN_EMAIL="admin@homelike.com" <br>
ADMIN_PASS="12345678"
- The **.env** file is integral if you deploy the application on an online server. If **NODE_ENV** is set to **production**, all of these variables will be set from the **.env** file.

## Troubleshooting
If you get a **CONNECTION REFUSED** error while connecting to your local database. Try replacing 
> dbUri: "mongodb://localhost:27017/homelike-test"

with

> dbUri: "mongodb://127.0.0.1/homelike-test"


in your **back/src/config/development.ts** file, or your **.env** file.

## API
For API calls most calls require a **header**: **'access_token'** which is given as a response from a successful registration, or login. Some calls require that only a logged in user with an admin role access_token sends the request, or a user getting their own data. 
### GET
> {url}/api/users/
- **Body:** None.
- **Query Params:** None.
- **Access:** Admin only.
- **Description:** Gets all users from the database.

> {url}/api/users/user
- **Body:** { _id: string }
- **Query Params:** none.
- **Access:** User for their own data and Admin only.
- **Description:** Gets user data.

> {url}/api/users/user/favorites
- **Body:** { _id: string }
- **Query Params:** None.
- **Access:** User for their own data and Admin only.
- **Description:** Gets user's favorite list.

> {url}/api/apartments
- **Body:** (Optional and Partial) { city: string, country: string, rooms: string, userId: string }.
- **Query Params:** None.
- **Access:** All users with a valid access token.
- **Description:** Gets all apartments values from body.

>{url}/api/apartments/distance
- **Body:** {distance: number}.
- **Query Params:** None.
- **Access:** All users with a valid access token.
- **Description:** Gets all apartments within distance (km) from lat/lon of user. Closest apartemnts are first.

### POST
> {url}api/users/login/
- **Body:** { email: string, password: string }.
- **Query Params:** None.
- **Access:** All.
- **Description:** Log user in, if credentials match and returns user with **access_token**.

> {url}api/users/register/
- **Body:** {email: string, password: string, username: string, geolocation: {lat: number, lon: number}}.
- **Query Params:** None.
- **Access:** All.
- **Description:** Registers new user and returns user with **access_token**. User with the same email must not exist in the database.

> {url}api/users/user/favorites
- **Body:** { _id: string, apartmentId: string}.
- **Query Params:** None.
- **Access:** User for their own data and Admin only.
- **Description:** Add apartment with apartmentId as id to favorites of user with _id as id.

### PUT
> {url}/api/users/user
- **Body:** { _id: string, data: (Partial){ email: string, username: string, password: string, geolocation: { lat: number, lon: number } } }.
- **Query Params:** None.
- **Access:** User for their own data and Admin only.
- **Description:** Updates user's profile. Id and role cannot be changed. Returns user with **access_token**.

> {url}/api/apartments
- **Body:** { _id: string, data: { name: string, description: string, city, country, rooms, address, geolocation: { lat, lon: number } } }.
- **Query Params:** None.
- **Access:** User for their own apartments and Admin only.
- **Description:** Updates apartment. User id and id cannot be changed.

### Delete
> {url}/api/users/user/
- **Body:** { _id: string }.
- **Query Params:** None.
- **Access:** Admin only.
- **Description:** Deletes a user.

> {url}/api/apartments
- **Body:** { _id: string }.
- **Query Params:** None.
- **Access:** User for their own apartments and Admin only.
- **Description:** Deletes an apartment.

> {url}/api/users/user/favorites
- **Body:** {_id: string, apartmentId: string}.
- **Query Params:** None.
- **Access:** User for their own data and Admin only.
- **Description:** Removes apartment with id apartmentId from the favorties of user with id _id.
