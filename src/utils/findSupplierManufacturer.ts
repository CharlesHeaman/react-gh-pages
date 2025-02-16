import { SupplierManufacturerResponseData } from '../types/supplierManufacturer.types';

const findSupplierManufacturer = (supplierManufacturers: Array<SupplierManufacturerResponseData>, supplierManufacturerID: number) => {
    return supplierManufacturers.find(supplierManufacturer => supplierManufacturer.id === supplierManufacturerID)
}

export default findSupplierManufacturer