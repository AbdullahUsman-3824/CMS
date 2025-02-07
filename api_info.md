# API Documentation

### Base URL

```
http://localhost:3000/api
```

## Categories

#### Get All Categories

- **Endpoint:** ` /categories`
- **Method:** `GET`
- **Description:** Returns a list of all categories.
- **Response:**

```json
[
  {
    "_id": "category_id",
    "name": "Category Name",
    "timestamp": "2023-10-01T00:00:00.000Z"
  },
  ...
]
```

#### Create a New Category

- **Endpoint:** ` /categories`
- **Method:** `POST`
- **Description:** Creates a new category.
- **Request Body:**

```json
{
  "name": "New Category Name"
}
```

- **Response:**

```json
{
  "statusCode": 200,
  "message": "Category created",
  "id": "category_id"
}
```

#### Update a Category

- **Endpoint:** ` /categories/:id`
- **Method:** `PUT`
- **Description:** Updates a category by ID.
- **Request Body:**

```json
{
  "name": "Updated Category Name"
}
```

- **Response:**

```json
{
  "statusCode": 200,
  "message": "Category updated"
}
```

#### Get/Delete a Category by ID

- **Endpoint:** ` /categories/:id`
- **Method:** `GET`/`DELETE`
- **Description:** Retrieves or deletes a category by ID.
- **Response(GET):**

```json
{
  "_id": "category_id",
  "name": "Category Name",
  "timestamp": "2023-10-01T00:00:00.000Z"
}
```

- **Response(DELETE):**

```json
{
  "statusCode": 200,
  "message": "Category deleted"
}
```

## Products

#### Get All Products

- **Endpoint:** ` /products`
- **Method:** `GET`
- **Description:** Retrieves all products.
- **Response:**

```json
[
  {
    "_id": "product_id",
    "name": "Product Name",
    "image": "image_url",
    "category": "category_id",
    "sizes": [
      {
        "size": "Size",
        "price": 10.0,
        "stock": 100
      },
      ...
    ],
    "isFeatured": false
  },
  ...
]
```

#### Create a New Product

- **Endpoint:** ` /products`
- **Method:** `POST`
- **Description:** Creates a new product with the provided data.
- **Request Body:**

```json
{
  "name": "New Product Name",
  "category": "category_id",
  "sizes": [
    {
      "size": "Size",
      "price": 10.0,
      "stock": 100
    },
    ...
  ]
}
```

- **Response:**

```json
{
  "statusCode": 200,
  "message": "Product created",
  "id": "product_id"
}
```

#### Update a Product

- **Endpoint:** ` /products/:id`
- **Method:** `PUT`
- **Description:** Updates a product with the provided data.
- **Request Body:**

```json
{
  "name": "Updated Product Name",
  "category": "category_id",
  "sizes": [
    {
      "size": "Size",
      "price": 10.0,
      "stock": 100
    },
    ...
  ]
}
```

- **Response:**

```json
{
  "statusCode": 200,
  "message": "Product updated"
}
```

#### Get/Delete a Product by ID

- **Endpoint:** ` /products/:id`
- **Method:** `GET`/`DELETE`
- **Description:** Retrieves or deletes a product by its ID.
- **Response(GET):**

```json
{
  "_id": "product_id",
  "name": "Product Name",
  "image": "image_url",
  "category": "category_id",
  "sizes": [
    {
      "size": "Size",
      "price": 10.0,
      "stock": 100
    },
    ...
  ],
  "isFeatured": false
}
```

- **Response(DELETE):**

```json
{
  "statusCode": 200,
  "message": "Product deleted"
}
```
