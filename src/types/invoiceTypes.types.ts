import { CollectionResponse, ResponseData } from "./response.types"

export interface InvoiceType {
    name: string,
    is_customer_rate: boolean,
    charge_labour: boolean,
    charge_expenses: boolean,
    charge_mileage: boolean,
    charge_materials: boolean,
    charge_subcontract: boolean,
    charge_hire: boolean,
    is_active: boolean,
}


export interface InvoiceTypeResponseData extends ResponseData {
    id: number,
    data: InvoiceType
}

export interface  InvoiceTypeCollectionResponse extends CollectionResponse {
    data: Array<InvoiceTypeResponseData>
}

export interface CreateInvoiceTypeAttributes {
    name: string,
    rate_type: number,
    charge_labour: boolean,
    charge_expenses: boolean,
    charge_mileage: boolean,
    charge_materials: boolean,
    charge_subcontract: boolean,
    charge_hire: boolean,
}