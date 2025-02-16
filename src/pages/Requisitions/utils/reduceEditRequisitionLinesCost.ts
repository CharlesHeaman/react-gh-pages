import { EditRequisitionLineData } from '../components/EditRequisitionedItemsList';

const reduceEditRequisitionLinesCost = (requisitionLines: Array<EditRequisitionLineData>): number => {
    return requisitionLines.reduce((totalCost, currentLine) => totalCost + (currentLine.nett_price * parseInt(currentLine.quantity)), 0);
}

export default reduceEditRequisitionLinesCost