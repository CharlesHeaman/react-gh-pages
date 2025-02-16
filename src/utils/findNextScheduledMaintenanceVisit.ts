import { ScheduledMaintenanceVisitsResponseData } from '../types/scheduledMaintenanceVisits.types';

const findNextScheduledMaintenanceVisit = (scheduledMaintenanceVisits: Array<ScheduledMaintenanceVisitsResponseData>): ScheduledMaintenanceVisitsResponseData | undefined => {
    return scheduledMaintenanceVisits.find(visit => !visit.data.is_created);
}

export default findNextScheduledMaintenanceVisit