# CUBES (PC Case sample E-Commerce)

## API Documentation

All APIs using base URL:
```javascript
http://localhost:3000
```

Deployed Web URL:
```javascript
http://cubes.yogautomo.com
```

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
| GET | /users/transactions/verify/:cartId | {JWT Token} | none | verify authenticated user transactions arrival |[Verify User Transactions Arrival]()|

## Products API
|  HTTP  | Endpoint | Headers | Body | Description | Reference |
|---|---|---|:-:|---|---|
| GET | /products | {token: JWT token} | none | get all products |[Get All Products]()|
| POST | /products | {token: JWT token} | <div style="text-align: left">name: string <b>(required)</b><br>description: string <b>(required)</b><br>price: number <b>(required)</b><br>quantity: number <b>(required)</b><br>featured_image: string <b>(required)</b></div> | get all products |[Get All Products]()|