import DateInput from "../../../../../components/form/DateInput/DateInput"

const ScheduledMaintenanceVisitEditRow = (props: {
    visitNumber: number,
    date: Date,
    updateScheduledVisits: (date: Date, index: number) => void,
}) => {
    return (
        <tr>
            <td>Visit No. {props.visitNumber}</td>
            <td>
                <DateInput 
                    name={`visit_no_${props.visitNumber}`} 
                    value={props.date} 
                    updateFunc={(date: Date) => props.updateScheduledVisits(date, props.visitNumber - 1)}
                />
            </td>
        </tr>
    )
}

export default ScheduledMaintenanceVisitEditRow