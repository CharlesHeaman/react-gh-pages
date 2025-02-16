import { OnCallEngineerResponseData } from './../../../types/OnCallEngineer.types';

export interface OnCallEngineerPositions {
    offSet: number,
    onCallEngineer: OnCallEngineerResponseData
}

const collides = (current: OnCallEngineerResponseData, check: OnCallEngineerResponseData): Boolean => {
    let currentEnd = new Date(current.data.end_date).getTime();
    let currentStart = new Date(current.data.start_date).getTime();
    let checkEnd = new Date(check.data.end_date).getTime();
    let checkStart = new Date(check.data.start_date).getTime();
    // End Overlaps 
    if (checkEnd > currentStart && checkEnd < currentEnd) return true
    // Start Overlaps
    if (checkStart > currentStart && checkEnd < currentEnd) return true
    // Middle Overlaps
    if (checkStart <= currentStart && checkEnd >= currentEnd) return true
    return false
}

const hasCollisions = (currentPosition: OnCallEngineerPositions, checkPositions: Array<OnCallEngineerPositions>): Boolean => {
    for (let i = 0; i < checkPositions.length; i++) {
        let currentCheck = checkPositions[i].onCallEngineer;
        if (collides(currentPosition.onCallEngineer, currentCheck)) return true 
    }
    return false
}

const iterateOnCollisions = (onCallEngineerPositions: Array<OnCallEngineerPositions>): Array<OnCallEngineerPositions> => {
    let hadCollision = false;
    for (let i = 0; i < onCallEngineerPositions.length; i++) {
        let currentOnCallEngineerPosition = onCallEngineerPositions[i];
        let inSameRow = onCallEngineerPositions.filter(onCallEngineerPosition => (
            onCallEngineerPosition.onCallEngineer.id !== currentOnCallEngineerPosition.onCallEngineer.id &&
            onCallEngineerPosition.offSet === currentOnCallEngineerPosition.offSet
        ))
        if (hasCollisions(currentOnCallEngineerPosition, inSameRow)) {
            onCallEngineerPositions[i] = {
                ...currentOnCallEngineerPosition,
                offSet: currentOnCallEngineerPosition.offSet + 1
            }
            hadCollision = true;
        }
    }
    if (hadCollision) {
        iterateOnCollisions(onCallEngineerPositions)
    }
    return onCallEngineerPositions
}

const positionOnCallEngineers = (onCallEngineers: Array<OnCallEngineerResponseData>): Array<OnCallEngineerPositions> => {
    return iterateOnCollisions(onCallEngineers.map(onCallEngineer => {
        return {
            offSet: 0,
            onCallEngineer: onCallEngineer
        }
    }))
}

export default positionOnCallEngineers