import { InvoiceTicketTimeResponseData } from "../../../../../../../types/invoiceTicketTime.types";
import { RequisitionLineResponseData } from "../../../../../../../types/requisitionLines.types";
import { UserResponseData } from "../../../../../../../types/user.types";
import reduceRequisitionLinesCost from "../../../../../../Requisitions/utils/reduceRequisitionLinesCost";
import getTicketTotalLabourCost from "../../../../../../Ticket/utils/getTicketLabourCost";
import getTicketTotalMileageCost from "../../../../../../Ticket/utils/getTicketTotalMileageCost";
import reduceEngineerTimeExpenses from "../../../../../../Ticket/utils/reduceEngineerTimeExpenses";

export interface JobCost {
    labourCost: number,
    mileageCost: number,
    expensesCost: number,
    materialCost: number,
    subcontractCost: number,
    hireCost: number,
    totalCost: number,
}

const calculateJobCost = (
    userData: Array<UserResponseData>,
    ticketInvoiceTimeData: Array<InvoiceTicketTimeResponseData>,
    requisitionLinesData: Array<RequisitionLineResponseData>,
    mileageCostRate: number,
): JobCost => {
    // Labour Cost
    const labourCost = getTicketTotalLabourCost(userData, ticketInvoiceTimeData);

    // Mileage 
    const mileageCost = getTicketTotalMileageCost(ticketInvoiceTimeData, mileageCostRate);

    // Expenses
    const expensesCost = reduceEngineerTimeExpenses(ticketInvoiceTimeData);

    // MaterialCost + (MaterialCost * MaterialMarkup / 100)
    const materialCost = reduceRequisitionLinesCost(requisitionLinesData.filter(requisitionLine => requisitionLine.data.item_type === 0));

    // SubcontractCost + (SubcontractCost * SubcontractMarkup / 100)
    const subcontractCost = reduceRequisitionLinesCost(requisitionLinesData.filter(requisitionLine => requisitionLine.data.item_type === 1));

    // HireCost + (HireCost * HireMarkup / 100)
    const hireCost = reduceRequisitionLinesCost(requisitionLinesData.filter(requisitionLine => requisitionLine.data.item_type === 2));

    // Total 
    const totalCost = labourCost + mileageCost + expensesCost + materialCost + subcontractCost + hireCost;

    return {
        labourCost: labourCost,
        mileageCost: mileageCost,
        expensesCost: expensesCost,
        materialCost: materialCost,
        subcontractCost: subcontractCost,
        hireCost: hireCost,
        totalCost: totalCost,
    }
}

export default calculateJobCost