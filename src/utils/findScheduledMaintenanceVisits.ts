import { ScheduledMaintenanceVisitsResponseData } from '../types/scheduledMaintenanceVisits.types';

const findScheduledMaintenanceVisit = (scheduledMaintenanceVisits: Array<ScheduledMaintenanceVisitsResponseData>, visitNumber: number) => {
    return scheduledMaintenanceVisits.find(visit => visit.data.visit_number === visitNumber)
}

export default findScheduledMaintenanceVisit