const supplierManufacturerResponseData = {
    "id":2084,
    "object":"supplier_manufacturer",
    "url":"http://localhost:4002/api/suppliers_manufacturers/2084",
    "data_updated_at": new Date("2023-12-18T17:05:22.000Z"),
    "data": {
        "code":"PLUMB21",
        "name":"Plumb/Parts Centre (W-S-M) (Wolseley)",
        "sage_name": 'sage123',
        "address":"Unit 11\r\nKiln Park\r\nWeston-Super-Mare\r\nGB",
        "postcode":"BS23 3XP",
        "email":"charlesheaman2@gmail.com",
        "telephone":"01934413777",
        "website_url":"TestWebsite.com",
        "is_active": true,
        "is_supplier":true,
        "is_manufacturer":false,
        "is_sub_contractor":false,
        "is_gas_supplier":false,
        "is_approved":false,
        "notes":null,
        "approval_updated_at":null,
        "approval_updated_by_id":123
    }
}

const supplierManufacturerCollectionResponse = {
    "object":"collection",
    "url":"http://localhost:4002/api/suppliers_manufacturers?name_like=abc&perPage=20",
    "pages":{
        "next_url":"http://localhost:4002/api/suppliers_manufacturers?name_like=abc&perPage=20",
        "previous_url":null,
        "per_page":20
    },
    "total_count":2077,
    "data_updated_at":"2023-12-18T17:05:22.000Z",
    "data": [                    
        supplierManufacturerResponseData
    ]
}

export { supplierManufacturerResponseData, supplierManufacturerCollectionResponse}