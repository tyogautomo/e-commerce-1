# CUBES (PC Case sample E-Commerce)

## API Documentation

All APIs using base URL:
```javascript
http://localhost:3000
```

Deployed Web URL:
[http://cubes.yogautomo.com](http://cubes.yogautomo.com)

## Index of Reference:
* [Users]()
* [Products]()
* [Carts]()

## Users API
|  HTTP  | Endpoint | Headers | Body | Description | Reference |
|---|---|---|:-:|---|---|
| POST | /users/signup | none | <div style="text-align: left">name: string <b>(required)</b><br>email: string <b>(required)</b><br>password: string <b>(required)</b></div> | Register new user |[SignUp]()|
| POST | /users/signin | none | <div style="text-align: left">email: string <b>(required)</b><br>password: string <b>(required)</b></div> | Login user |[SignIn]()|
| GET | /users/transactions | {JWT Token} | none | get authenticated user transactions |[Get User Transactions]()|
| PUT | /users/transactions/verify/:cartId | {JWT Token} | none | verify authenticated user transactions arrival |[Verify User Transactions Arrival]()|

## Products API
|  HTTP  | Endpoint | Headers | Body | Description | Reference |
|---|---|---|:-:|---|---|
| GET | /products | {token: JWT token} | none | get all products |[Get All Products]()|
| POST | /products | {token: JWT token} | <div style="text-align: left">name: string <b>(required)</b><br>description: string <b>(required)</b><br>price: number <b>(required)</b><br>quantity: number <b>(required)</b><br>featured_image: string <b>(required)</b></div> | get all products |[Add Product]()|
| GET | /products/:productId | {token: JWT token} | none | get one products |[Get One Product]()|
| PUT | /products/:productId | {token: JWT token} | <div style="text-align: left">name: string <b>(optional)</b><br>description: string <b>(optional)</b><br>price: number <b>(optional)</b><br>quantity: number <b>(optional)</b><br>featured_image: string <b>(optional)</b></div> | update a product |[Update A Product]()|
| DELETE | /products/:productId | {token: JWT token} | none | delete one products |[Delete A Product]()|

## Carts API
|  HTTP  | Endpoint | Headers | Body | Description | Reference |
|---|---|---|:-:|---|---|
| GET | /carts | {token: JWT token} | none | get one user cart<br>(unpaid transaction) |[Get One Cart]()|
| GET | /carts/allusers | {token: JWT token} | none | get all users paid transactions |[Get All Users Paid Transactions]()|
| GET | /carts/allusers/arrived | {token: JWT token} | none | get all users arrived transactions |[Get All Users Arrived Transactions]()|
| GET | /carts/allusers/ongoing | {token: JWT token} | none | get all users ongoing transaction<br>(not arrived, but delivered) |[Get All Users Arrived Transactions]()|
| POST | /carts | {token: JWT token} | <div style="text-align: left">userId: ObjectId <b>(required)</b><br>products: [ObjectId] <b>(required)</b><br>paymentStatus: boolean <b>(required)</b><br>deliveryStatus: boolean <b>(required)</b></div> | add / create product to cart<br>(add if cart already exist) |[Get All Users Paid Transactions]()|
| PUT | /carts/:cartId | {token: JWT token} | none | increase/decrease product in cart |[Increase/Decrease Product in Cart]()|
| PUT | /carts/checkout/:cartId | {token: JWT token} | none | checkout cart |[Checkout Cart]()|

# Request & Response Details

## Users
+ ### SignUp
  method: `POST`<br>
  endpoint: `/users/signup`
  
  #### _Request_ :
  * body: 
    ```javascript
    username: String, required
    email: String, required
    password: String, required
    ```
    
  #### _Response_ :
  - 201
    ```javascript
    {
        token: JWT Token,
        user: Object
    }
    ```
  - 400
    ```javascript
    {
      "code": 400,
      "message": [
          "notNull Violation: Please input your username",
          "\nnotNull Violation: Please input your email"
      ]
    }
    ```

+ ### SignIn
  method: `POST`<br>
  endpoint: `/users/signin`
  
  #### _Request_ :
  * body: 
    ```javascript
    email: String, required
    password: String, required
    ```
    
  #### _Response_ :
  - 200
    ```javascript
    {
        token: JWT Token,
        user: Object
    }
    ```
  - 404
    ```javascript
    {
      "code": 404,
      "message": "Wrong email / password"
    }
    ```

+ ### Get User Transactions
  method: `GET`<br>
  endpoint: `/users/transactions`
  
  #### _Request_ :
  * headers: 
    ```javascript
    {
        token: JWT Token
    }
    ```
    
  #### _Response_ :
  - 200
    ```javascript
    [ 
        {
            products: [ [Object] ],
            _id: ObjectId,
            userId: ObjectId,
            paymentStatus: true,
            deliveryStatus: true,
            createdAt: 2019-08-25T13:59:13.986Z,
            updatedAt: 2019-08-25T14:36:37.378Z
        },
        ....
    ]

    ```
  - 401
    ```javascript
    {
      "code": 401,
      "message": "Unauthorized Process."
    }
    ```

+ ### Verify User Transactions Arrival
  method: `PUT`<br>
  endpoint: `/users/transactions/verify/:cartId`
  
  #### _Request_ :
  * params: 
    ```javascript
    {
        cartId: ObjectId
    }
    ```
  * headers: 
    ```javascript
    {
        token: JWT Token
    }
    ```
    
  #### _Response_ :
  - 200
    ```javascript
    [ 
        {
            products: [ [Object] ],
            _id: ObjectId,
            userId: ObjectId,
            paymentStatus: true,
            deliveryStatus: false,
            createdAt: 2019-08-25T13:59:13.986Z,
            updatedAt: 2019-08-25T14:36:37.378Z
        }
    ]

    ```
  - 401
    ```javascript
    {
      "code": 401,
      "message": "Unauthorized Process."
    }
    ```

## Products
All the products API need token headers
```javascript
{
    token: JWT Token
}
```
+ ### Get All Products
  method: `GET`<br>
  endpoint: `/products`
  
  #### _Request_ :
  * body: 
    ```javascript
    none
    ```
    
  #### _Response_ :
  - 200
    ```javascript
    [ 
        {
            _id: ObjectId,
            name: 'BEAST',
            description: 'Run your machine in beast mode.',
            price: 350,
            quantity: 99,
            featured_image:'https://storage.googleapis.com/ecommerce-cubes/1566637317863beast.png',
            createdAt: 2019-08-24T09:02:00.080Z,
            updatedAt: 2019-08-25T14:27:58.017Z
        },
        ....
    ]
    ```
  - 401
    ```javascript
    {
      "code": 401,
      "message": "Unauthorized Process."
    }
    ```

+ ### Add Product
  method: `POST`<br>
  endpoint: `/products`
  
  #### _Request_ :
  * body: 
    ```javascript
    {
        name: String, // required
        description: String, // required
        price: Number, // required
        quantity: Number, // required
        featured_image: String // required
    }
    ```
    
  #### _Response_ :
  - 201
    ```javascript
    [ 
        {
            _id: ObjectId,
            name: 'BEAST',
            description: 'Run your machine in beast mode.',
            price: 350,
            quantity: 99,
            featured_image:'https://storage.googleapis.com/ecommerce-cubes/1566637317863beast.png',
            createdAt: 2019-08-24T09:02:00.080Z,
            updatedAt: 2019-08-25T14:27:58.017Z
        }
    ]
    ```
  - 401
    ```javascript
    {
      "code": 401,
      "message": "Unauthorized Process."
    }
    ```
  - 400
    ```javascript
    {
      "code": 400,
      "message": [
          "name: Path 'name' is required",
          "description: Path 'description' is required",
          ...
      ]
    }
    ```








+ ### Get One Product
  method: `GET`<br>
  endpoint: `/products/:productId`
  
  #### _Request_ :
  * params: 
    ```javascript
    {
        productId: ObjectId
    }
    ```
    
  #### _Response_ :
  - 200
    ```javascript
    [ 
        {
            _id: ObjectId,
            name: 'BEAST',
            description: 'Run your machine in beast mode.',
            price: 350,
            quantity: 99,
            featured_image:'https://storage.googleapis.com/ecommerce-cubes/1566637317863beast.png',
            createdAt: 2019-08-24T09:02:00.080Z,
            updatedAt: 2019-08-25T14:27:58.017Z
        }
    ]
    ```
  - 401
    ```javascript
    {
      "code": 401,
      "message": "Unauthorized Process."
    }
    ```
  - 404
    ```javascript
    {
      "code": 404,
      "message": "Not found."
    }
    ```

+ ### Update A Product
  method: `PUT`<br>
  endpoint: `/products/:productId`
  
  #### _Request_ :
  * params: 
    ```javascript
    {
        productId: ObjectId
    }
    ```
  * body:
    ```javascript
    {
        name: String, // optional
        description: String, // optional
        price: Number, // optional
        quantity: Number, // optional
        featured_image: String // optional
    }
    ```
    
  #### _Response_ :
  - 200
    ```javascript
    [ 
        {
            _id: ObjectId,
            name: 'BEAST',
            description: 'Run your machine in beast mode.',
            price: 350,
            quantity: 99,
            featured_image:'https://storage.googleapis.com/ecommerce-cubes/1566637317863beast.png',
            createdAt: 2019-08-24T09:02:00.080Z,
            updatedAt: 2019-08-25T14:27:58.017Z
        }
    ]
    ```
  - 401
    ```javascript
    {
      "code": 401,
      "message": "Unauthorized Process."
    }
    ```

+ ### Delete A Product
  method: `DELETE`<br>
  endpoint: `/products/:productId`
  
  #### _Request_ :
  * params: 
    ```javascript
    {
        productId: ObjectId
    }
    ```
    
  #### _Response_ :
  - 200
    ```javascript
    "Return deleted product"
    [ 
        {
            _id: ObjectId,
            name: 'BEAST',
            description: 'Run your machine in beast mode.',
            price: 350,
            quantity: 99,
            featured_image:'https://storage.googleapis.com/ecommerce-cubes/1566637317863beast.png',
            createdAt: 2019-08-24T09:02:00.080Z,
            updatedAt: 2019-08-25T14:27:58.017Z
        }
    ]
    ```
  - 401
    ```javascript
    {
      "code": 401,
      "message": "Unauthorized Process."
    }
    ```
  - 404
    ```javascript
    {
      "code": 404,
      "message": "Not found."
    }
    ```

## Carts
+ ### Get Authenticated User Cart (Unpaid)
  method: `GET`<br>
  endpoint: `/carts`
  
  #### _Request_ :
  * headers: 
    ```javascript
    {
        token: <JWT Token>
    }
    ```
    
  #### _Response_ :
  - 200
    ```javascript
    "Return unpaid authenticated user cart"
    {
        _id: ObjectId,
        userId: ObjectId,
        products: [ObjectId],
        paymentStatus: false,
        deliveryStatus: false,
        createdAt: Date,
        updatedAt: Date
    }
    ```
  - 401
    ```javascript
    {
      "code": 401,
      "message": "Unauthorized Process."
    }
    ```
  - 404
    ```javascript
    {
      "code": 404,
      "message": "Not found."
    }
    ```

+ ### Get All Users Transaction (Paid)
  method: `GET`<br>
  endpoint: `/carts/allusers`
  
  #### _Request_ :
  * headers: 
    ```javascript
    {
        token: <JWT Token>
    }
    ```
    
  #### _Response_ :
  - 200
    ```javascript
    "Return paid users transactions"
    [
      {
          _id: ObjectId,
          userId: ObjectId,
          products: [ObjectId],
          paymentStatus: true,
          deliveryStatus: false,
          createdAt: Date,
          updatedAt: Date
      },
      ....
    ]
    ```
  - 401
    ```javascript
    {
      "code": 401,
      "message": "Unauthorized Process."
    }
    ```
  - 404
    ```javascript
    {
      "code": 404,
      "message": "Not found."
    }
    ```

+ ### Get Arrived Users Transactions (Arrived User Transactions)
  method: `GET`<br>
  endpoint: `/carts/arrived`
  
  #### _Request_ :
  * headers: 
    ```javascript
    {
        token: <JWT Token>
    }
    ```
    
  #### _Response_ :
  - 200
    ```javascript
    "Return arrived users transactions"
    [
      {
          _id: ObjectId,
          userId: ObjectId,
          products: [ObjectId],
          paymentStatus: true,
          deliveryStatus: true,
          createdAt: Date,
          updatedAt: Date
      },
      ....
    ]
    ```
  - 401
    ```javascript
    {
      "code": 401,
      "message": "Unauthorized Process."
    }
    ```
  - 404
    ```javascript
    {
      "code": 404,
      "message": "Not found."
    }
    ```

+ ### Get Ongoing Users Transactions (Not Arrived User Transactions)
  method: `GET`<br>
  endpoint: `/carts/ongoing`
  
  #### _Request_ :
  * headers: 
    ```javascript
    {
        token: <JWT Token>
    }
    ```
    
  #### _Response_ :
  - 200
    ```javascript
    "Return ongoing users transactions"
    [
      {
          _id: ObjectId,
          userId: ObjectId,
          products: [ObjectId],
          paymentStatus: true,
          deliveryStatus: false,
          createdAt: Date,
          updatedAt: Date
      },
      ....
    ]
    ```
  - 401
    ```javascript
    {
      "code": 401,
      "message": "Unauthorized Process."
    }
    ```
  - 404
    ```javascript
    {
      "code": 404,
      "message": "Not found."
    }
    ```

+ ### Create Cart
  method: `POST`<br>
  endpoint: `/carts`
  
  #### _Request_ :
  * headers: 
    ```javascript
    {
        token: <JWT Token>
    }
    ```
  * body:
    ```javascript
    {
      products: [ObjectId]
    }
    ```
    
  #### _Response_ :
  - 200
    ```javascript
    "Return new user cart"
    {
        _id: ObjectId,
        userId: ObjectId,
        products: [ObjectId],
        paymentStatus: false,
        deliveryStatus: false,
        createdAt: Date,
        updatedAt: Date
    }
    ```
  - 401
    ```javascript
    {
      "code": 401,
      "message": "Unauthorized Process."
    }
    ```
  - 400
    ```javascript
    {
      "code": 400,
      "message": "Products required."
    }
    ```

+ ### Increase/ Decrease Authenticated User Cart
  method: `PUT`<br>
  endpoint: `/carts/:cartId`
  
  #### _Request_ :
  * headers: 
    ```javascript
    {
        token: <JWT Token>
    }
    ```
  * params:
    ```javascript
    {
      cartId: ObjectId
    }
    ```
  * body
    ```javascript
    {
      type: <"increase" || "decrease">
    }
    ```
    
  #### _Response_ :
  - 200
    ```javascript
    "Return updated users cart"
    {
        _id: ObjectId,
        userId: ObjectId,
        products: [ObjectId],
        paymentStatus: false,
        deliveryStatus: false,
        createdAt: Date,
        updatedAt: Date
    }
    ```
  - 401
    ```javascript
    {
      "code": 401,
      "message": "Unauthorized Process."
    }
    ```
  - 404
    ```javascript
    {
      "code": 404,
      "message": "Not found."
    }
    ```

+ ### Checkout User Cart
  method: `PUT`<br>
  endpoint: `/carts/checkout/:cartId`
  
  #### _Request_ :
  * headers: 
    ```javascript
    {
        token: <JWT Token>
    }
    ```
  * params:
    ```javascript
    {
      cartId: ObjectId
    }
    ```
  * body
    ```javascript
    {
      products: [ObjectId]
    }
    ```
    
  #### _Response_ :
  - 200
    ```javascript
    "Return updated users cart (paid)"
    {
        _id: ObjectId,
        userId: ObjectId,
        products: [ObjectId],
        paymentStatus: true,
        deliveryStatus: false,
        createdAt: Date,
        updatedAt: Date
    }
    ```
  - 401
    ```javascript
    {
      "code": 401,
      "message": "Unauthorized Process."
    }
    ```
  - 404
    ```javascript
    {
      "code": 404,
      "message": "Not found."
    }
    ```