import { RefrigerantResponseData } from './../types/refrigerant.types';

const findRefrigerant = (refrigerants: Array<RefrigerantResponseData>, refrigerantID: number) => {
    return refrigerants.find(refrigerant => refrigerant.id === refrigerantID)
}

export default findRefrigerant