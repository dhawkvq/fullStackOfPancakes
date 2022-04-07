The company stakeholders want to create an online storefront to showcase their great product ideas. Users need to be able to browse an index of all products, see the specifics of a single product, and add products to an order that they can view in a cart page. You have been tasked with building the API that will support this application, and your coworker is building the frontend.

These are the notes from a meeting with the frontend developer that describe what endpoints the API needs to supply, as well as data shapes the frontend and backend have agreed meet the requirements of the application.

## API Endpoints

#### Products

- Index
- Show
- Create [token required]
- [OPTIONAL] Top 5 most popular products
- [OPTIONAL] Products by category (args: product category)

#### Users

- Index [token required]
- Show [token required]
- Create N[token required]

#### Orders

- Current Order by user (args: user id)[token required]
- [OPTIONAL] Completed Orders by user (args: user id)[token required]

## Data Shapes

#### Product

- id
- name
- price
- [OPTIONAL] category

#### User

- id
- firstName
- lastName
- password

#### Orders

- id
- id of each product in the order
- quantity of each product in the order
- user_id
- status of order (active or complete)

<br>
<br>

# API

<br>

## Products

---

<br>

Retrieve all products

```
GET /products
```

Retrieve a single product by id

```
GET /products/<productId>
```

| Attribute       | Type   | Required | Description                             |
| :-------------- | :----- | :------- | :-------------------------------------- |
| **_productId_** | number | Yes      | id of product you want to fetch from db |

<br>

Create a product

```
POST /products
```

| Attribute           | Type   | Required | Description                                                               |
| :------------------ | :----- | :------- | :------------------------------------------------------------------------ |
| **_name_**          | string | Yes      | name of product                                                           |
| **_price_**         | number | Yes      | price of product in cents                                                 |
| **_Authorization_** | string | Yes      | This header will need to be sent with the request to create a new product |

<br>

## Users

---

<br>

Retrieve all users

```
GET /users
```

| Attribute           | Type   | Required | Description                                                             |
| :------------------ | :----- | :------- | :---------------------------------------------------------------------- |
| **_Authorization_** | string | Yes      | This header will need to be sent with the request to retrieve all users |

<br>
Retrieve a user by id

```
GET /users/<userId>
```

| Attribute           | Type   | Required | Description                                                                 |
| :------------------ | :----- | :------- | :-------------------------------------------------------------------------- |
| **_userId_**        | number | Yes      | The id of the user you want to fetch                                        |
| **_Authorization_** | string | Yes      | This header will need to be sent with the request to retrieve a single user |

<br>
Create a new user

```
POST /users
```

| Attribute           | Type   | Required | Description                                                        |
| :------------------ | :----- | :------- | :----------------------------------------------------------------- |
| **_firstName_**     | string | Yes      | The users first name                                               |
| **_lastName_**      | string | Yes      | The users last name                                                |
| **_password_**      | string | Yes      | The users password                                                 |
| **_Authorization_** | string | Yes      | This header will need to be sent with the request to create a user |

<br>

- Returns a JWT token

```
{ token: 38923rhehfsdfnwewhefw9efhskdbsjd }
```

<br>

User sign in

```
POST /users/signIn
```

| Attribute       | Type   | Required | Description          |
| :-------------- | :----- | :------- | :------------------- |
| **_firstName_** | string | Yes      | The users first name |
| **_lastName_**  | string | Yes      | The users last name  |
| **_password_**  | string | Yes      | The users password   |

<br>

- Returns a JWT token

```
{ token: 38923rhehfsdfnwewhefw9efhskdbsjd }
```

<br>

## Orders

---

<br>

Users current order

```
GET /orders/<userId>
```

| Attribute           | Type   | Required | Description                                                                 |
| :------------------ | :----- | :------- | :-------------------------------------------------------------------------- |
| **_userId_**        | number | Yes      | id of user                                                                  |
| **_Authorization_** | string | Yes      | This header will need to be sent with the request to retrieve a users order |

<br>
<br>

# Schema

## Users table

---

- id ---> **int4**
- first_name ---> **varchar**
- last_name ---> **varchar**
- password ---> **varchar**

<br>

## Products table

---

- id ---> **int4**
- name ---> **varchar**
- price ---> **int4**

<br>

## Orders table

---

- id ---> **int4**
- status ---> **varchar**
- user_id ---> **int4** - Foreign Key references Users.id

<br>

## Order items table

---

- id ---> **int4**
- quantity ---> **int4**
- product_id ---> **int4** - Foreign Key references Products.id
- order_id ---> **int4** - Foreign Key references Orders.id
