import { CostCentreResponseData } from './../types/costCentres.types';

const findCostCentre = (costCentres: Array<CostCentreResponseData>, costCentreID: number): CostCentreResponseData | undefined => {
    return costCentres.find(costCentre => costCentre.id === costCentreID)
}

export default findCostCentre