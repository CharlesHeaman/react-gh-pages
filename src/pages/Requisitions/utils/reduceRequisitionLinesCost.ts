import { RequisitionLineResponseData } from './../../../types/requisitionLines.types';

const reduceRequisitionLinesCost = (requisitionLines: Array<RequisitionLineResponseData>): number => {
    return requisitionLines.reduce((totalCost, currentLine) => totalCost + (currentLine.data.nett_price * currentLine.data.quantity), 0);
}

export default reduceRequisitionLinesCost