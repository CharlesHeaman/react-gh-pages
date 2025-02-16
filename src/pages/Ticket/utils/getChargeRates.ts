import { ContractResponseData } from "../../../types/contract.types";
import { DepartmentResponseData } from "../../../types/department.types";
import { InvoiceTypeResponseData } from "../../../types/invoiceTypes.types";

export interface ChargeRates {
    engineer_rate: number,
    mate_rate: number,
    mileage_rate: number,
    material_markup: number,
    subcontract_markup: number,
    hire_markup: number
}

const getChargeRates = (invoiceType: InvoiceTypeResponseData, department: DepartmentResponseData, contract: ContractResponseData | undefined) => {
    var engineerRate = department.data.engineer_rate;
    var mateRate = department.data.mate_rate;
    var mileageRate = department.data.mileage_rate;
    var materialMarkup = department.data.material_markup;
    var subcontractMarkup = department.data.subcontract_markup;
    var hireMarkup = department.data.hire_markup;

    if (!invoiceType.data.is_customer_rate && contract) {
        engineerRate = contract.data.engineer_rate;
        mateRate = contract.data.mate_rate;
        mileageRate = contract.data.mileage_rate;
        materialMarkup = contract.data.material_markup;
        subcontractMarkup = contract.data.subcontract_markup;
        hireMarkup = contract.data.hire_markup;
    }

    return {
        engineerRate: engineerRate,
        mateRate: mateRate,
        mileageRate: mileageRate,
        materialMarkup: materialMarkup,
        subcontractMarkup: subcontractMarkup,
        hireMarkup: hireMarkup
    }
}

export default getChargeRates