import { ChangeEvent, useState } from "react";
import DateInput from "../../../../../../../components/form/DateInput/DateInput";
import HoursInput from "../../../../../../../components/form/HoursInput/HoursInput";
import MilesInput from "../../../../../../../components/form/MilesInput/MilesInput";
import MoneyInput from "../../../../../../../components/form/MoneyInput/MoneyInput";
import SubmitButton from "../../../../../../../components/form/SubmitButton/SubmitButton";
import UserSelect from "../../../../../../../components/form/UserSelect/UserSelect";
import GridItem from "../../../../../../../components/ui/Containers/GridItem/GridItem";
import InfoGrid from "../../../../../../../components/ui/Containers/InfoGrid/InfoGrid";
import WindowOverlay from "../../../../../../../components/ui/Containers/WindowOverlay/WindowOverlay";
import { UserResponseData } from "../../../../../../../types/user.types";
import postAPI from "../../../../../../../utils/postAPI";
import IntercompanyRateSelect from "./IntercompanyRateSelect";
import TimeRateSelect from "./TimeRateSelect";
import TimeTypeSelect from "./TimeTypeSelect";

const AddTicketTime = (props: {
    ticketID: number,
    ticketType: number,
    show: boolean,
    hideFunc: () => void,
    getInvoiceTicketTime: () => void
}) => {
    const [submitting, setSubmitting] = useState(false);
    const [hasSubmitted, setHasSubmitted] = useState(false);
    
    // Form Data 
    const [date, setDate] = useState<Date>(new Date());
    const [engineer, setEngineer] = useState<UserResponseData>();
    const [onSite, setOnSite] = useState(0);
    const [travel, setTravel] = useState(0);
    const [mileage, setMileage] = useState(0);
    const [expenses, setExpenses] = useState(0);
    const [labourType, setLabourType] = useState(0);
    const [timeRate, setTimeRate] = useState(0);
    const [intercompanyRate, setIntercompanyRate] = useState(0);

    const formComplete = (
        engineer?.id !== undefined
    );

    const addEngineerTime = () => {
        setHasSubmitted(true);
        if (!formComplete) return;
        postAPI(`invoice_ticket_time/create`, {}, {
            date: date,
            expenses: expenses,
            mileage: mileage,
            on_site_time: onSite,
            ticket_id: props.ticketID,
            ticket_type: props.ticketType,
            travel_time: travel,
            user_id: engineer?.id,
            is_mate_rate: labourType === 1,
            is_overtime: timeRate === 1,
            is_double_time: timeRate === 2,
            intercompany_rate: intercompanyRate
        }, () => {
            setHasSubmitted(false)
            props.hideFunc();
            props.getInvoiceTicketTime();
        }, setSubmitting)
    }
    
    return (
        <WindowOverlay 
            title="Add Ticket Time"
            maxWidth={650}
            show={props.show}
            hideFunc={props.hideFunc}
            footer={<SubmitButton
                text="Add Ticket Time"
                clickFunc={addEngineerTime}
                submitting={submitting}
                submittingText="Adding..."
                iconFont="timer"
                disabled={hasSubmitted && !formComplete}
            />}
        >
            <InfoGrid columnCount={12}>
                <GridItem>
                    <p>Overtime will be calculated automatically.</p>
                </GridItem>
                <GridItem title='Date' span={6}>
                    <DateInput
                        name="date"
                        label="Date"
                        value={date}
                        updateFunc={(date) => setDate(date)}
                        required
                        hasSubmitted={hasSubmitted}
                    />
                </GridItem>
                <GridItem title='Engineer #1' span={6}>
                    <UserSelect 
                        selectedUser={engineer} 
                        setSelectedUser={setEngineer} 
                        required
                        hasSubmitted={hasSubmitted}           
                    />
                </GridItem>
                <GridItem title='On-site' span={3}>
                    <HoursInput 
                        name={"on_site_time"} 
                        value={onSite.toString()} 
                        label={"On-site time"} 
                        updateFunc={(event: ChangeEvent<HTMLInputElement>) => setOnSite(parseFloat(event.target.value))}
                        hasSubmitted={false}
                    />
                </GridItem>
                <GridItem title='Travel' span={3}>
                    <HoursInput 
                        name={"travel_time"} 
                        value={travel.toString()} 
                        label={"Travel time"} 
                        updateFunc={(event: ChangeEvent<HTMLInputElement>) => setTravel(parseFloat(event.target.value))}
                        hasSubmitted={false}
                    />
                </GridItem>
                <GridItem title='Mileage' span={3}>
                    <MilesInput 
                        name={"mileage"} 
                        value={mileage.toString()}
                        label={"Mileage"} 
                        updateFunc={(event) => setMileage(parseFloat(event.target.value))}
                        hasSubmitted={false}
                    />
                </GridItem>
                <GridItem title='Expenses' span={3}>
                    <MoneyInput 
                        name={"expenses"} 
                        value={expenses.toString()}
                        label={"Expenses"} 
                        updateFunc={(event) => setExpenses(parseFloat(event.target.value))}
                        hasSubmitted={false}
                        maxWidth={75}
                    />
                </GridItem>
                <GridItem title='Rate' span={4}>
                    <TimeTypeSelect 
                        selectedLabourType={labourType} 
                        setSelectedLabourType={setLabourType}/>
                </GridItem>
                <GridItem title='Type' span={4}>
                    <TimeRateSelect
                        selectedLabourRate={timeRate}
                        setSelectedLabourRate={setTimeRate}
                    />
                </GridItem>
                <GridItem title='Intercompany Rate' span={4}>
                    <IntercompanyRateSelect
                        selectedIntercompanyRate={intercompanyRate}
                        setSelectedIntercompanyRate={setIntercompanyRate}
                    />
                </GridItem>
            </InfoGrid>
        </WindowOverlay>
    )
}

export default AddTicketTime