import { RequisitionLineResponseData } from './../../../types/requisitionLines.types';

const reduceRequisitionLinesCharge = (requisitionLines: Array<RequisitionLineResponseData>): number => {
    return requisitionLines.reduce((totalCost, currentLine) => totalCost + (currentLine.data.adjusted_price * currentLine.data.quantity), 0);
}

export default reduceRequisitionLinesCharge