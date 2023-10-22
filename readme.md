---
title: Sistema integral provimat v1.0.0
language_tabs:
  - shell: Shell
  - http: HTTP
  - javascript: JavaScript
  - ruby: Ruby
  - python: Python
  - php: PHP
  - java: Java
  - go: Go
toc_footers: []
includes: []
search: true
highlight_theme: darkula
headingLevel: 2

---

<!-- Generator: Widdershins v4.0.1 -->

<h1 id="sistema-integral-provimat">Sistema integral provimat v1.0.0</h1>

> Este es el BFF para el sistema provimat.

Base URLs:

* <a href="http://127.0.0.1/">http://127.0.0.1/</a>

<h1 id="sistema-integral-provimat-clientes">Clientes</h1>

## CreateClient

<a id="opIdCreateClient"></a>

`POST /client`

*Crea un nuevo Cliente*

Crea un nuevo cliente

> Body parameter

```json
{
  "name": "string",
  "lastName": "string",
  "email": "string",
  "phone": 0,
  "whatsapp": 0,
  "direction": "string"
}
```

<h3 id="createclient-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|body|body|[Client](#schemaclient)|false|none|

> Example responses

> 500 Response

```json
null
```

<h3 id="createclient-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|listado de clientes|None|
|500|[Internal Server Error](https://tools.ietf.org/html/rfc7231#section-6.6.1)|Error|Inline|

<h3 id="createclient-responseschema">Response Schema</h3>

### Response Headers

|Status|Header|Type|Format|Description|
|---|---|---|---|---|
|200|Access-Control-Allow-Origin|string||none|
|200|Access-Control-Allow-Methods|string||none|
|200|Access-Control-Allow-Headers|string||none|

<aside class="success">
This operation does not require authentication
</aside>

## getClients

<a id="opIdgetClients"></a>

`GET /client`

*Obtiene todos los clientes*

Obtiene un listado de todos los clientes activos y no activos

> Example responses

> 500 Response

```json
null
```

<h3 id="getclients-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|listado de clientes|None|
|500|[Internal Server Error](https://tools.ietf.org/html/rfc7231#section-6.6.1)|Error|Inline|

<h3 id="getclients-responseschema">Response Schema</h3>

### Response Headers

|Status|Header|Type|Format|Description|
|---|---|---|---|---|
|200|Access-Control-Allow-Origin|string||none|
|200|Access-Control-Allow-Methods|string||none|
|200|Access-Control-Allow-Headers|string||none|

<aside class="success">
This operation does not require authentication
</aside>

## GetClientById

<a id="opIdGetClientById"></a>

`GET /client/{idClient}`

*Obtiene un solo cliente a través de su ID*

Obtiene un solo cliente a través de su ID del sistema.

<h3 id="getclientbyid-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|idClient|path|any|true|el id del cliente|

> Example responses

> 500 Response

```json
null
```

<h3 id="getclientbyid-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|Un cliente|None|
|500|[Internal Server Error](https://tools.ietf.org/html/rfc7231#section-6.6.1)|Error|Inline|

<h3 id="getclientbyid-responseschema">Response Schema</h3>

### Response Headers

|Status|Header|Type|Format|Description|
|---|---|---|---|---|
|200|Access-Control-Allow-Origin|string||none|
|200|Access-Control-Allow-Methods|string||none|
|200|Access-Control-Allow-Headers|string||none|

<aside class="success">
This operation does not require authentication
</aside>

## UpdateClient

<a id="opIdUpdateClient"></a>

`PUT /client/{idClient}`

*Actualiza un Cliente*

Crea un nuevo cliente

> Body parameter

```json
null
```

<h3 id="updateclient-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|idClient|path|any|true|el id del cliente|
|client|query|any|true|El cliente con todos los datos|

> Example responses

> 500 Response

```json
null
```

<h3 id="updateclient-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|listado de clientes|None|
|500|[Internal Server Error](https://tools.ietf.org/html/rfc7231#section-6.6.1)|Error|Inline|

<h3 id="updateclient-responseschema">Response Schema</h3>

### Response Headers

|Status|Header|Type|Format|Description|
|---|---|---|---|---|
|200|Access-Control-Allow-Origin|string||none|
|200|Access-Control-Allow-Methods|string||none|
|200|Access-Control-Allow-Headers|string||none|

<aside class="success">
This operation does not require authentication
</aside>

## DeleteClient

<a id="opIdDeleteClient"></a>

`DELETE /client/{idClient}`

*Da de baja un Cliente*

Da de baja un cliente del sistema.

<h3 id="deleteclient-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|idClient|path|any|true|el id del cliente|

> Example responses

> 500 Response

```json
null
```

<h3 id="deleteclient-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|listado de clientes|None|
|500|[Internal Server Error](https://tools.ietf.org/html/rfc7231#section-6.6.1)|Error|Inline|

<h3 id="deleteclient-responseschema">Response Schema</h3>

### Response Headers

|Status|Header|Type|Format|Description|
|---|---|---|---|---|
|200|Access-Control-Allow-Origin|string||none|
|200|Access-Control-Allow-Methods|string||none|
|200|Access-Control-Allow-Headers|string||none|

<aside class="success">
This operation does not require authentication
</aside>

## GetClientsList

<a id="opIdGetClientsList"></a>

`GET /clients`

*Obtiene los clientes con datos.*

Obtiene los clientes con los campos correspondientes para renderizar la tabla

> Example responses

> 500 Response

```json
null
```

<h3 id="getclientslist-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|Un array de clientes|None|
|500|[Internal Server Error](https://tools.ietf.org/html/rfc7231#section-6.6.1)|Error|Inline|

<h3 id="getclientslist-responseschema">Response Schema</h3>

### Response Headers

|Status|Header|Type|Format|Description|
|---|---|---|---|---|
|200|Access-Control-Allow-Origin|string||none|
|200|Access-Control-Allow-Methods|string||none|
|200|Access-Control-Allow-Headers|string||none|

<aside class="success">
This operation does not require authentication
</aside>

<h1 id="sistema-integral-provimat-presupuestos">Presupuestos</h1>

## CreateBudget

<a id="opIdCreateBudget"></a>

`POST /budget`

*Crea un nuevo Presupuesto*

Crea un nuevo Presupuesto

> Body parameter

```json
{
  "creationDate": "2023/01/01 00:00:00",
  "clientId": 1,
  "state": "initiated",
  "total": 10000,
  "products": [
    {
      "id": 1,
      "quantity": 2
    }
  ]
}
```

<h3 id="createbudget-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|body|body|[NewBudget](#schemanewbudget)|false|none|

> Example responses

> 500 Response

```json
null
```

<h3 id="createbudget-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|Devuelve el id del presupuesto creado|None|
|500|[Internal Server Error](https://tools.ietf.org/html/rfc7231#section-6.6.1)|Error|Inline|

<h3 id="createbudget-responseschema">Response Schema</h3>

### Response Headers

|Status|Header|Type|Format|Description|
|---|---|---|---|---|
|200|Access-Control-Allow-Origin|string||none|
|200|Access-Control-Allow-Methods|string||none|
|200|Access-Control-Allow-Headers|string||none|

<aside class="success">
This operation does not require authentication
</aside>

## GetBudgets

<a id="opIdGetBudgets"></a>

`GET /budget`

*Obtiene todos los presupuestos*

Obtiene un listado de todos los presupuestos

> Example responses

> 500 Response

```json
null
```

<h3 id="getbudgets-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|estos son todos los presupuestos|None|
|500|[Internal Server Error](https://tools.ietf.org/html/rfc7231#section-6.6.1)|Error|Inline|

<h3 id="getbudgets-responseschema">Response Schema</h3>

### Response Headers

|Status|Header|Type|Format|Description|
|---|---|---|---|---|
|200|Access-Control-Allow-Origin|string||none|
|200|Access-Control-Allow-Methods|string||none|
|200|Access-Control-Allow-Headers|string||none|

<aside class="success">
This operation does not require authentication
</aside>

## DeleteBudget

<a id="opIdDeleteBudget"></a>

`DELETE /budget/{idBudget}`

*Da de baja un Presupuesto*

Da de baja logica un presupuesto que estaba en estado pendiente

<h3 id="deletebudget-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|idBudget|path|any|true|el id del presupuesto|

> Example responses

> 500 Response

```json
null
```

<h3 id="deletebudget-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|listado de clientes|None|
|500|[Internal Server Error](https://tools.ietf.org/html/rfc7231#section-6.6.1)|Error|Inline|

<h3 id="deletebudget-responseschema">Response Schema</h3>

### Response Headers

|Status|Header|Type|Format|Description|
|---|---|---|---|---|
|200|Access-Control-Allow-Origin|string||none|
|200|Access-Control-Allow-Methods|string||none|
|200|Access-Control-Allow-Headers|string||none|

<aside class="success">
This operation does not require authentication
</aside>

## UpdateBudget

<a id="opIdUpdateBudget"></a>

`PUT /budget/{idBudget}`

*Actualiza un Presupuesto*

Actualiza un presupuesto

> Body parameter

```json
{
  "id": 0,
  "date": "2023/01/01 00:00:00",
  "clientId": 0,
  "status": "iniciated",
  "deleted": true
}
```

<h3 id="updatebudget-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|idBudget|path|any|true|el id del presupuesto|
|body|body|[Budget](#schemabudget)|false|none|

> Example responses

> 500 Response

```json
null
```

<h3 id="updatebudget-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|resultado|None|
|500|[Internal Server Error](https://tools.ietf.org/html/rfc7231#section-6.6.1)|Error|Inline|

<h3 id="updatebudget-responseschema">Response Schema</h3>

### Response Headers

|Status|Header|Type|Format|Description|
|---|---|---|---|---|
|200|Access-Control-Allow-Origin|string||none|
|200|Access-Control-Allow-Methods|string||none|
|200|Access-Control-Allow-Headers|string||none|

<aside class="success">
This operation does not require authentication
</aside>

## GetClientBudget

<a id="opIdGetClientBudget"></a>

`GET /budgets/{idClient}`

*Obtiene todos los presupuestos de un cliente*

Obtiene los presupuestos de un cliente en concreto

<h3 id="getclientbudget-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|idClient|path|any|true|el id del cliente|
|idBudget|query|integer(int64)|false|el id del presupuesto en particular|
|status|query|string|false|el estatus|

> Example responses

> 500 Response

```json
null
```

<h3 id="getclientbudget-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|listado de clientes|None|
|500|[Internal Server Error](https://tools.ietf.org/html/rfc7231#section-6.6.1)|Error|Inline|

<h3 id="getclientbudget-responseschema">Response Schema</h3>

### Response Headers

|Status|Header|Type|Format|Description|
|---|---|---|---|---|
|200|Access-Control-Allow-Origin|string||none|
|200|Access-Control-Allow-Methods|string||none|
|200|Access-Control-Allow-Headers|string||none|

<aside class="success">
This operation does not require authentication
</aside>

<h1 id="sistema-integral-provimat-agrega-productos">agrega productos</h1>

## agregar productos

<a id="opIdagregar productos"></a>

`POST /budget/{idBudget}/addProducts`

*agrega,quita,actualiza productos de un presupuesto*

agrega,quita,actualiza productos de un presupuesto

> Body parameter

```json
[
  {
    "id": 1,
    "quantity": 2
  }
]
```

<h3 id="agregar-productos-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|idBudget|path|any|true|el id del presupuesto|
|body|body|[addProducts](#schemaaddproducts)|false|none|

> Example responses

> 500 Response

```json
null
```

<h3 id="agregar-productos-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|crea productos|None|
|500|[Internal Server Error](https://tools.ietf.org/html/rfc7231#section-6.6.1)|Error|Inline|

<h3 id="agregar-productos-responseschema">Response Schema</h3>

### Response Headers

|Status|Header|Type|Format|Description|
|---|---|---|---|---|
|200|Access-Control-Allow-Origin|string||none|
|200|Access-Control-Allow-Methods|string||none|
|200|Access-Control-Allow-Headers|string||none|

<aside class="success">
This operation does not require authentication
</aside>

<h1 id="sistema-integral-provimat-productos">Productos</h1>

## CreateProduct

<a id="opIdCreateProduct"></a>

`POST /product`

*Crea un nuevo Producto*

Crea un nuevo Producto

> Body parameter

```json
{
  "id": 0,
  "name": "string",
  "salePrice": 0,
  "purchasePrice": 0,
  "provider": 0,
  "img": "string",
  "daysDelay": 0
}
```

<h3 id="createproduct-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|body|body|[Product](#schemaproduct)|false|none|

> Example responses

> 500 Response

```json
null
```

<h3 id="createproduct-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|Devuelve el id del Producto creado|None|
|500|[Internal Server Error](https://tools.ietf.org/html/rfc7231#section-6.6.1)|Error|Inline|

<h3 id="createproduct-responseschema">Response Schema</h3>

### Response Headers

|Status|Header|Type|Format|Description|
|---|---|---|---|---|
|200|Access-Control-Allow-Origin|string||none|
|200|Access-Control-Allow-Methods|string||none|
|200|Access-Control-Allow-Headers|string||none|

<aside class="success">
This operation does not require authentication
</aside>

## GetProducts

<a id="opIdGetProducts"></a>

`GET /product`

*Te devuelve todos los productos*

Te devuelve todos los productos

> Example responses

> 500 Response

```json
null
```

<h3 id="getproducts-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|listado de productos|None|
|500|[Internal Server Error](https://tools.ietf.org/html/rfc7231#section-6.6.1)|Error|Inline|

<h3 id="getproducts-responseschema">Response Schema</h3>

### Response Headers

|Status|Header|Type|Format|Description|
|---|---|---|---|---|
|200|Access-Control-Allow-Origin|string||none|
|200|Access-Control-Allow-Methods|string||none|
|200|Access-Control-Allow-Headers|string||none|

<aside class="success">
This operation does not require authentication
</aside>

## GetProductById

<a id="opIdGetProductById"></a>

`GET /product/{idProduct}`

*Obtiene un producto*

Obtiene un producto en particular basado en su id

<h3 id="getproductbyid-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|idProduct|path|any|true|el id del producto|

> Example responses

> 500 Response

```json
null
```

<h3 id="getproductbyid-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|Un producto|None|
|500|[Internal Server Error](https://tools.ietf.org/html/rfc7231#section-6.6.1)|Error|Inline|

<h3 id="getproductbyid-responseschema">Response Schema</h3>

### Response Headers

|Status|Header|Type|Format|Description|
|---|---|---|---|---|
|200|Access-Control-Allow-Origin|string||none|
|200|Access-Control-Allow-Methods|string||none|
|200|Access-Control-Allow-Headers|string||none|

<aside class="success">
This operation does not require authentication
</aside>

## DeleteProduct

<a id="opIdDeleteProduct"></a>

`DELETE /product/{idProduct}`

*Da de baja un producto*

Da de baja logica un producto que estaba en estado pendiente

<h3 id="deleteproduct-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|idProduct|path|any|true|el id del producto|

> Example responses

> 500 Response

```json
null
```

<h3 id="deleteproduct-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|listado de clientes|None|
|500|[Internal Server Error](https://tools.ietf.org/html/rfc7231#section-6.6.1)|Error|Inline|

<h3 id="deleteproduct-responseschema">Response Schema</h3>

### Response Headers

|Status|Header|Type|Format|Description|
|---|---|---|---|---|
|200|Access-Control-Allow-Origin|string||none|
|200|Access-Control-Allow-Methods|string||none|
|200|Access-Control-Allow-Headers|string||none|

<aside class="success">
This operation does not require authentication
</aside>

## UpdateProduct

<a id="opIdUpdateProduct"></a>

`PUT /product/{idProduct}`

*Crea un nuevo Producto*

Crea un nuevo Producto

> Body parameter

```json
{
  "id": 0,
  "name": "string",
  "salePrice": 0,
  "purchasePrice": 0,
  "provider": 0,
  "img": "string",
  "daysDelay": 0
}
```

<h3 id="updateproduct-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|idProduct|path|any|true|el id del Producto|
|body|body|[Product](#schemaproduct)|false|none|

> Example responses

> 500 Response

```json
null
```

<h3 id="updateproduct-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|Devuelve el id del presupuesto creado|None|
|500|[Internal Server Error](https://tools.ietf.org/html/rfc7231#section-6.6.1)|Error|Inline|

<h3 id="updateproduct-responseschema">Response Schema</h3>

### Response Headers

|Status|Header|Type|Format|Description|
|---|---|---|---|---|
|200|Access-Control-Allow-Origin|string||none|
|200|Access-Control-Allow-Methods|string||none|
|200|Access-Control-Allow-Headers|string||none|

<aside class="success">
This operation does not require authentication
</aside>

## GetProductWithProvider

<a id="opIdGetProductWithProvider"></a>

`GET /products`

*Obtiene los productos con datos.*

Obtiene los productos con sus respectivos proveedores.

> Example responses

> 500 Response

```json
null
```

<h3 id="getproductwithprovider-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|Productos con proveedores|None|
|500|[Internal Server Error](https://tools.ietf.org/html/rfc7231#section-6.6.1)|Error|Inline|

<h3 id="getproductwithprovider-responseschema">Response Schema</h3>

### Response Headers

|Status|Header|Type|Format|Description|
|---|---|---|---|---|
|200|Access-Control-Allow-Origin|string||none|
|200|Access-Control-Allow-Methods|string||none|
|200|Access-Control-Allow-Headers|string||none|

<aside class="success">
This operation does not require authentication
</aside>

<h1 id="sistema-integral-provimat-proveedores">Proveedores</h1>

## CreateProvider

<a id="opIdCreateProvider"></a>

`POST /provider`

*Crea un nuevo Proveedor*

Crea un nuevo Proveedor

> Body parameter

```json
{
  "id": 0,
  "name": "string",
  "daysDelay": 0
}
```

<h3 id="createprovider-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|body|body|[Provider](#schemaprovider)|false|none|

> Example responses

> 500 Response

```json
null
```

<h3 id="createprovider-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|Devuelve el id del proveedor creado|None|
|500|[Internal Server Error](https://tools.ietf.org/html/rfc7231#section-6.6.1)|Error|Inline|

<h3 id="createprovider-responseschema">Response Schema</h3>

### Response Headers

|Status|Header|Type|Format|Description|
|---|---|---|---|---|
|200|Access-Control-Allow-Origin|string||none|
|200|Access-Control-Allow-Methods|string||none|
|200|Access-Control-Allow-Headers|string||none|

<aside class="success">
This operation does not require authentication
</aside>

## GetProviders

<a id="opIdGetProviders"></a>

`GET /provider`

*Te devuelve todos los Proveedores*

Te devuelve todos los Proveedores

> Example responses

> 500 Response

```json
null
```

<h3 id="getproviders-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|listado de clientes|None|
|500|[Internal Server Error](https://tools.ietf.org/html/rfc7231#section-6.6.1)|Error|Inline|

<h3 id="getproviders-responseschema">Response Schema</h3>

### Response Headers

|Status|Header|Type|Format|Description|
|---|---|---|---|---|
|200|Access-Control-Allow-Origin|string||none|
|200|Access-Control-Allow-Methods|string||none|
|200|Access-Control-Allow-Headers|string||none|

<aside class="success">
This operation does not require authentication
</aside>

## DeleteProvider

<a id="opIdDeleteProvider"></a>

`DELETE /provider/{idProvider}`

*Da de baja un Proveedor*

Da de baja logica un Proveedor

<h3 id="deleteprovider-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|idProvider|path|any|true|el id del Proveedores|

> Example responses

> 500 Response

```json
null
```

<h3 id="deleteprovider-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|listado de clientes|None|
|500|[Internal Server Error](https://tools.ietf.org/html/rfc7231#section-6.6.1)|Error|Inline|

<h3 id="deleteprovider-responseschema">Response Schema</h3>

### Response Headers

|Status|Header|Type|Format|Description|
|---|---|---|---|---|
|200|Access-Control-Allow-Origin|string||none|
|200|Access-Control-Allow-Methods|string||none|
|200|Access-Control-Allow-Headers|string||none|

<aside class="success">
This operation does not require authentication
</aside>

## GetProviderById

<a id="opIdGetProviderById"></a>

`GET /provider/{idProvider}`

*Te devuelve el Proveedor*

Te devuelve el Proveedores con el id proporcionado

<h3 id="getproviderbyid-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|idProvider|path|any|true|el id del proveedor|

> Example responses

> 500 Response

```json
null
```

<h3 id="getproviderbyid-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|listado de clientes|None|
|500|[Internal Server Error](https://tools.ietf.org/html/rfc7231#section-6.6.1)|Error|Inline|

<h3 id="getproviderbyid-responseschema">Response Schema</h3>

### Response Headers

|Status|Header|Type|Format|Description|
|---|---|---|---|---|
|200|Access-Control-Allow-Origin|string||none|
|200|Access-Control-Allow-Methods|string||none|
|200|Access-Control-Allow-Headers|string||none|

<aside class="success">
This operation does not require authentication
</aside>

## UpdateProvider

<a id="opIdUpdateProvider"></a>

`PUT /provider/{idProvider}`

*Actualiza un Proveedor*

Actualiza un Proveedor

> Body parameter

```json
{
  "id": 0,
  "name": "string",
  "daysDelay": 0
}
```

<h3 id="updateprovider-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|idProvider|path|any|true|el id del presupuesto|
|body|body|[Provider](#schemaprovider)|false|none|

> Example responses

> 500 Response

```json
null
```

<h3 id="updateprovider-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|Devuelve el id del presupuesto creado|None|
|500|[Internal Server Error](https://tools.ietf.org/html/rfc7231#section-6.6.1)|Error|Inline|

<h3 id="updateprovider-responseschema">Response Schema</h3>

### Response Headers

|Status|Header|Type|Format|Description|
|---|---|---|---|---|
|200|Access-Control-Allow-Origin|string||none|
|200|Access-Control-Allow-Methods|string||none|
|200|Access-Control-Allow-Headers|string||none|

<aside class="success">
This operation does not require authentication
</aside>

## updateProductPricesFromBudget

<a id="opIdupdateProductPricesFromBudget"></a>

`POST /provider/{idProvider}`

*Actualiza precios basado en un porcentaje*

El porcentaje de actualización de los precios de un proveedor

> Body parameter

```json
{
  "percent": 10
}
```

<h3 id="updateproductpricesfrombudget-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|idProvider|path|any|true|el id del proveedor|
|body|body|[percentPrice](#schemapercentprice)|false|none|

> Example responses

> 500 Response

```json
null
```

<h3 id="updateproductpricesfrombudget-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|listado de productos actualizados|None|
|500|[Internal Server Error](https://tools.ietf.org/html/rfc7231#section-6.6.1)|Error|Inline|

<h3 id="updateproductpricesfrombudget-responseschema">Response Schema</h3>

### Response Headers

|Status|Header|Type|Format|Description|
|---|---|---|---|---|
|200|Access-Control-Allow-Origin|string||none|
|200|Access-Control-Allow-Methods|string||none|
|200|Access-Control-Allow-Headers|string||none|

<aside class="success">
This operation does not require authentication
</aside>

<h1 id="sistema-integral-provimat-search">Search</h1>

## SearchClient

<a id="opIdSearchClient"></a>

`POST /search/client`

*Busca clientes*

Te devuelve clientes que coincidan con la consulta

> Body parameter

```json
{
  "q": "string"
}
```

<h3 id="searchclient-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|body|body|[Search](#schemasearch)|false|none|

> Example responses

> 500 Response

```json
null
```

<h3 id="searchclient-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|listado de clientes|None|
|500|[Internal Server Error](https://tools.ietf.org/html/rfc7231#section-6.6.1)|Error|Inline|

<h3 id="searchclient-responseschema">Response Schema</h3>

### Response Headers

|Status|Header|Type|Format|Description|
|---|---|---|---|---|
|200|Access-Control-Allow-Origin|string||none|
|200|Access-Control-Allow-Methods|string||none|
|200|Access-Control-Allow-Headers|string||none|

<aside class="success">
This operation does not require authentication
</aside>

## SearchBudget

<a id="opIdSearchBudget"></a>

`POST /search/budget`

*Busca el Presupuesto*

Te devuelve el presupuesto que coincidan con la consulta

> Body parameter

```json
{
  "q": "string"
}
```

<h3 id="searchbudget-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|body|body|[Search](#schemasearch)|false|none|

> Example responses

> 500 Response

```json
null
```

<h3 id="searchbudget-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|listado de presupuestos|None|
|500|[Internal Server Error](https://tools.ietf.org/html/rfc7231#section-6.6.1)|Error|Inline|

<h3 id="searchbudget-responseschema">Response Schema</h3>

### Response Headers

|Status|Header|Type|Format|Description|
|---|---|---|---|---|
|200|Access-Control-Allow-Origin|string||none|
|200|Access-Control-Allow-Methods|string||none|
|200|Access-Control-Allow-Headers|string||none|

<aside class="success">
This operation does not require authentication
</aside>

## SearchProduct

<a id="opIdSearchProduct"></a>

`POST /search/product`

*Busca productos*

Te devuelve productos que coincidan con la consulta

> Body parameter

```json
{
  "q": "string"
}
```

<h3 id="searchproduct-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|body|body|[Search](#schemasearch)|false|none|

> Example responses

> 500 Response

```json
null
```

<h3 id="searchproduct-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|listado de productos|None|
|500|[Internal Server Error](https://tools.ietf.org/html/rfc7231#section-6.6.1)|Error|Inline|

<h3 id="searchproduct-responseschema">Response Schema</h3>

### Response Headers

|Status|Header|Type|Format|Description|
|---|---|---|---|---|
|200|Access-Control-Allow-Origin|string||none|
|200|Access-Control-Allow-Methods|string||none|
|200|Access-Control-Allow-Headers|string||none|

<aside class="success">
This operation does not require authentication
</aside>

## SearchProvider

<a id="opIdSearchProvider"></a>

`POST /search/provider`

*Busca Provedores*

Te devuelve provedores que coincidan con la consulta

> Body parameter

```json
{
  "q": "string"
}
```

<h3 id="searchprovider-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|body|body|[Search](#schemasearch)|false|none|

> Example responses

> 500 Response

```json
null
```

<h3 id="searchprovider-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|listado de provedores|None|
|500|[Internal Server Error](https://tools.ietf.org/html/rfc7231#section-6.6.1)|Error|Inline|

<h3 id="searchprovider-responseschema">Response Schema</h3>

### Response Headers

|Status|Header|Type|Format|Description|
|---|---|---|---|---|
|200|Access-Control-Allow-Origin|string||none|
|200|Access-Control-Allow-Methods|string||none|
|200|Access-Control-Allow-Headers|string||none|

<aside class="success">
This operation does not require authentication
</aside>

# Schemas

<h2 id="tocS_Search">Search</h2>
<!-- backwards compatibility -->
<a id="schemasearch"></a>
<a id="schema_Search"></a>
<a id="tocSsearch"></a>
<a id="tocssearch"></a>

```json
{
  "q": "string"
}

```

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|q|string|true|none|none|

<h2 id="tocS_Client">Client</h2>
<!-- backwards compatibility -->
<a id="schemaclient"></a>
<a id="schema_Client"></a>
<a id="tocSclient"></a>
<a id="tocsclient"></a>

```json
{
  "name": "string",
  "lastName": "string",
  "email": "string",
  "phone": 0,
  "whatsapp": 0,
  "direction": "string"
}

```

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|name|string|true|none|none|
|lastName|string|true|none|none|
|email|string|false|none|none|
|phone|integer|false|none|none|
|whatsapp|integer|true|none|none|
|direction|string|false|none|none|

<h2 id="tocS_Budget">Budget</h2>
<!-- backwards compatibility -->
<a id="schemabudget"></a>
<a id="schema_Budget"></a>
<a id="tocSbudget"></a>
<a id="tocsbudget"></a>

```json
{
  "id": 0,
  "date": "2023/01/01 00:00:00",
  "clientId": 0,
  "status": "iniciated",
  "deleted": true
}

```

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|id|integer|false|none|none|
|date|string|false|none|none|
|clientId|integer|false|none|none|
|status|string|false|none|none|
|deleted|boolean|false|none|none|

#### Enumerated Values

|Property|Value|
|---|---|
|status|iniciated|
|status|waiting_shipping|
|status|to_confirm|
|status|out_of_stock|
|status|in_tansit|
|status|finished|

<h2 id="tocS_Product">Product</h2>
<!-- backwards compatibility -->
<a id="schemaproduct"></a>
<a id="schema_Product"></a>
<a id="tocSproduct"></a>
<a id="tocsproduct"></a>

```json
{
  "id": 0,
  "name": "string",
  "salePrice": 0,
  "purchasePrice": 0,
  "provider": 0,
  "img": "string",
  "daysDelay": 0
}

```

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|id|integer|false|none|none|
|name|string|false|none|none|
|salePrice|integer|false|none|none|
|purchasePrice|integer|false|none|none|
|provider|integer|false|none|none|
|img|string|false|none|none|
|daysDelay|integer|false|none|none|

<h2 id="tocS_Provider">Provider</h2>
<!-- backwards compatibility -->
<a id="schemaprovider"></a>
<a id="schema_Provider"></a>
<a id="tocSprovider"></a>
<a id="tocsprovider"></a>

```json
{
  "id": 0,
  "name": "string",
  "daysDelay": 0
}

```

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|id|integer|false|none|none|
|name|string|false|none|none|
|daysDelay|integer|false|none|none|

<h2 id="tocS_NewBudget">NewBudget</h2>
<!-- backwards compatibility -->
<a id="schemanewbudget"></a>
<a id="schema_NewBudget"></a>
<a id="tocSnewbudget"></a>
<a id="tocsnewbudget"></a>

```json
{
  "creationDate": "2023/01/01 00:00:00",
  "clientId": 1,
  "state": "initiated",
  "total": 10000,
  "products": [
    {
      "id": 1,
      "quantity": 2
    }
  ]
}

```

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|creationDate|string|false|none|none|
|clientId|integer|false|none|none|
|state|string|false|none|none|
|total|integer|false|none|none|
|products|[addProducts](#schemaaddproducts)|false|none|none|

#### Enumerated Values

|Property|Value|
|---|---|
|state|iniciated|
|state|waiting_shipping|
|state|to_confirm|
|state|out_of_stock|
|state|in_tansit|
|state|finished|

<h2 id="tocS_addProducts">addProducts</h2>
<!-- backwards compatibility -->
<a id="schemaaddproducts"></a>
<a id="schema_addProducts"></a>
<a id="tocSaddproducts"></a>
<a id="tocsaddproducts"></a>

```json
[
  {
    "id": 1,
    "quantity": 2
  }
]

```

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|id|integer|false|none|none|
|quantity|integer|false|none|none|

<h2 id="tocS_percentPrice">percentPrice</h2>
<!-- backwards compatibility -->
<a id="schemapercentprice"></a>
<a id="schema_percentPrice"></a>
<a id="tocSpercentprice"></a>
<a id="tocspercentprice"></a>

```json
{
  "percent": 10
}

```

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|percent|number|true|none|none|

