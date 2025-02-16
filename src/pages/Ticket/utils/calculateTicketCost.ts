import { DepartmentResponseData } from '../../../types/department.types';
import { InvoiceTicketTimeResponseData } from "../../../types/invoiceTicketTime.types";
import { InvoiceTypeResponseData } from "../../../types/invoiceTypes.types";
import { RequisitionLineResponseData } from "../../../types/requisitionLines.types";
import { UserResponseData } from "../../../types/user.types";
import reduceRequisitionLinesCharge from '../../Requisitions/utils/reduceRequisitionLinesCharge';
import reduceRequisitionLinesCost from "../../Requisitions/utils/reduceRequisitionLinesCost";
import { ContractResponseData } from './../../../types/contract.types';
import getChargeRates from './getChargeRates';
import getTicketTotalLabourCost from "./getTicketLabourCost";
import getTicketTotalMileageCost from "./getTicketTotalMileageCost";
import reduceEngineerTimeEngineerLabour from "./reduceEngineerTimeEngineerLabour";
import reduceEngineerTimeEngineerOvertimeLabour from './reduceEngineerTimeEngineerOvertimeLabour';
import reduceEngineerTimeExpenses from "./reduceEngineerTimeExpenses";
import reduceEngineerTimeMateLabour from "./reduceEngineerTimeMateLabour";
import reduceMateTimeEngineerOvertimeLabour from './reduceMateTimeEngineerOvertimeLabour';

export interface TicketCost {
    labourCost: number,
    labourCharge: number,
    mileageCost: number,
    mileageCharge: number,
    expensesCost: number,
    expensesCharge: number,
    materialCost: number,
    materialCharge: number,
    subcontractCost: number,
    subcontractCharge: number,
    hireCost: number,
    hireCharge: number,
    totalCost: number,
    totalCharge: number,
}

const calculateTicketCost = (
    invoiceType: InvoiceTypeResponseData,
    userData: Array<UserResponseData>,
    ticketInvoiceTimeData: Array<InvoiceTicketTimeResponseData>,
    requisitionLinesData: Array<RequisitionLineResponseData>,
    contract: ContractResponseData | undefined,
    department: DepartmentResponseData,
    mileageCostRate: number,
): TicketCost => {
    const chargeRates = getChargeRates(invoiceType, department, contract);

    // Labour Cost
    const labourCost = getTicketTotalLabourCost(userData, ticketInvoiceTimeData);

    // Total Hours
    const totalEngineerHours = reduceEngineerTimeEngineerLabour(ticketInvoiceTimeData);
    const totalEngineerOvertimeHours = reduceEngineerTimeEngineerOvertimeLabour(ticketInvoiceTimeData);
    const totalMateHours = reduceEngineerTimeMateLabour(ticketInvoiceTimeData);
    const totalMateOvertimeHours = reduceMateTimeEngineerOvertimeLabour(ticketInvoiceTimeData);

    // Engineer Normal Hours * EngineerRate 
    const engineerCharge = totalEngineerHours * chargeRates.engineerRate;
    // Engineer Out-of-hours * EngineerRate * 1.5
    const engineerOverTimeCharge = totalEngineerOvertimeHours * chargeRates.engineerRate * 1.5;
    // Mate Normal Hours * MateRate 
    const mateCharge = totalMateHours * chargeRates.mateRate;
    // Mate Out-of-hours * MateRate * 1.5
    const mateOverTimeCharge = totalMateOvertimeHours * chargeRates.mateRate * 1.5;

    const labourCharge = engineerCharge + mateCharge + engineerOverTimeCharge + mateOverTimeCharge;

    // Mileage 
    const mileageCost = getTicketTotalMileageCost(ticketInvoiceTimeData, mileageCostRate);
    const mileageCharge = invoiceType.data.charge_mileage ? getTicketTotalMileageCost(ticketInvoiceTimeData, chargeRates.mileageRate) : 0;

    // Expenses
    const expensesCost = reduceEngineerTimeExpenses(ticketInvoiceTimeData);
    const expensesCharge = invoiceType.data.charge_expenses ? expensesCost : 0;

    // MaterialCost + (MaterialCost * MaterialMarkup / 100)
    const materialCost = reduceRequisitionLinesCost(requisitionLinesData.filter(requisitionLine => requisitionLine.data.item_type === 0));
    const reducedMaterialCharge = reduceRequisitionLinesCharge(requisitionLinesData.filter(requisitionLine => requisitionLine.data.item_type === 0));
    const materialCharge = invoiceType.data.charge_materials ? reducedMaterialCharge + (reducedMaterialCharge * chargeRates.materialMarkup / 100) : 0;

    // SubcontractCost + (SubcontractCost * SubcontractMarkup / 100)
    const subcontractCost = reduceRequisitionLinesCost(requisitionLinesData.filter(requisitionLine => requisitionLine.data.item_type === 1));
    const reducedSubcontractCharge = reduceRequisitionLinesCharge(requisitionLinesData.filter(requisitionLine => requisitionLine.data.item_type === 1));
    const subcontractCharge = invoiceType.data.charge_subcontract ? reducedSubcontractCharge + (reducedSubcontractCharge * chargeRates.subcontractMarkup / 100) : 0;

    // HireCost + (HireCost * HireMarkup / 100)
    const hireCost = reduceRequisitionLinesCost(requisitionLinesData.filter(requisitionLine => requisitionLine.data.item_type === 2));
    const reduceHireCharge = reduceRequisitionLinesCost(requisitionLinesData.filter(requisitionLine => requisitionLine.data.item_type === 2));
    const hireCharge = invoiceType.data.charge_hire ? reduceHireCharge + (reduceHireCharge * chargeRates.hireMarkup / 100) : 0;

    // Total 
    const totalCost = labourCost + mileageCost + expensesCost + materialCost + subcontractCost + hireCost;
    const totalCharge = labourCharge + mileageCharge + expensesCharge + reducedMaterialCharge + subcontractCharge + hireCharge;

    return {
        labourCost: labourCost,
        labourCharge: labourCharge,
        mileageCost: mileageCost,
        mileageCharge: mileageCharge,
        expensesCost: expensesCost,
        expensesCharge: expensesCharge,
        materialCost: materialCost,
        materialCharge: materialCharge,
        subcontractCost: subcontractCost,
        subcontractCharge: subcontractCharge,
        hireCost: hireCost,
        hireCharge: hireCharge,
        totalCost: totalCost,
        totalCharge: totalCharge,
    }
}

export default calculateTicketCost