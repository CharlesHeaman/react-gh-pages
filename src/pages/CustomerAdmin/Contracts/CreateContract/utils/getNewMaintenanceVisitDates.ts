import getMonthRelativeDate from "../../../../../utils/getMonthRelativeDate";

const getNewMaintenanceVisitDates = (startDate: Date, endDate: Date, maintenancePerYear: number): Array<Date> => {
    const numberOfMonths = (endDate.getFullYear() - startDate.getFullYear()) * 12 + (endDate.getMonth() - startDate.getMonth());
    const monthsBetweenVisits = numberOfMonths / maintenancePerYear;
    const visitDates = [];
    for (let visitIndex = 0; visitIndex < maintenancePerYear; visitIndex++) {
        visitDates.push(getMonthRelativeDate(startDate, monthsBetweenVisits * (visitIndex + 1)));
    }
    return visitDates;
}

export default getNewMaintenanceVisitDates;