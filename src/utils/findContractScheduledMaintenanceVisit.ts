import { ScheduledMaintenanceVisitsResponseData } from '../types/scheduledMaintenanceVisits.types';

const findContractScheduledMaintenanceVisit = (scheduledMaintenanceVisits: Array<ScheduledMaintenanceVisitsResponseData>, contractID: number) => {
    return scheduledMaintenanceVisits.find(visit => visit.data.contract_id === contractID);
}

export default findContractScheduledMaintenanceVisit