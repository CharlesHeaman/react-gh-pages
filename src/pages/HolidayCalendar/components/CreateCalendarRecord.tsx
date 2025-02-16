import { ChangeEvent, useEffect, useState } from "react"
import SubmitButton from "../../../components/form/SubmitButton/SubmitButton"
import WindowOverlay from "../../../components/ui/Containers/WindowOverlay/WindowOverlay"
import { CalendarActivityResponseData } from "../../../types/calendarActivity.types"
import { CreateCalendarRecordAttributes } from "../../../types/calendarRecord.types"
import { UserResponseData } from "../../../types/user.types"
import postAPI from "../../../utils/postAPI"
import updateStateDateParams from "../../../utils/updateStateParams/updateStateDateParams"
import CalendarRecordCreateForm from "./CalendarRecordCreateForm"

const CreateCalendarRecord = (props: {
    show: boolean,
    hideFunc: () => void,
    getCalendarRecords: () => void,
    currentCreateDate: Date | undefined
}) => {
    const [submitting, setSubmitting] = useState(false);
    const [hasSubmitted, setHasSubmitted] = useState(false);
    const [selectedUser, setSelectedUser] = useState<UserResponseData>();
    const [selectedType, setSelectedType] = useState<CalendarActivityResponseData>();
    const [calendarRecordAttributes, setCalendarRecordAttributes] = useState<CreateCalendarRecordAttributes>({
        start_date: props.currentCreateDate ? new Date(props.currentCreateDate) : new Date(),
        end_date: props.currentCreateDate ? new Date(props.currentCreateDate) : new Date(),
    })

    useEffect(() => {
        setSelectedType(undefined);
        setSelectedUser(undefined);
        setHasSubmitted(false);
    }, [props.show]);

    useEffect(() => {
        setCalendarRecordAttributes({
            start_date: props.currentCreateDate ? new Date(props.currentCreateDate) : new Date(),
            end_date: props.currentCreateDate ? new Date(props.currentCreateDate) : new Date(),
        })
    }, [props.currentCreateDate]);

    const updateDateParams = (date: Date, name: string) => {
        updateStateDateParams(date, name, setCalendarRecordAttributes)
    }

    const formComplete = (
        selectedUser?.id !== undefined &&
        selectedType?.id !== undefined
    );

    const createRecord = () => {
        setHasSubmitted(true);
        if (!formComplete) return;
        postAPI('calendar_records/create', {}, {
            ...calendarRecordAttributes,
            user_id: selectedUser?.id,
            calendar_event_id: selectedType?.id
        }, () => {
            props.getCalendarRecords();
            props.hideFunc();
        }, setSubmitting)
    }
    
    return (
        <WindowOverlay 
            title="Add Calendar Record"
            maxWidth={400}
            show={props.show}
            hideFunc={props.hideFunc}
            footer={<SubmitButton
                text="Add Calendar Record"
                clickFunc={createRecord}
                submitting={submitting}
                submittingText="Creating..."
                iconFont="add"
                disabled={hasSubmitted && !formComplete}
            />}
        >
            <CalendarRecordCreateForm 
                calendarRecordAttributes={calendarRecordAttributes} 
                selectedUser={selectedUser}
                setSelectedUser={setSelectedUser}
                selectedType={selectedType}
                setSelectedType={setSelectedType}
                updateDateParams={updateDateParams} 
                showErrors={hasSubmitted}                
            />
        </WindowOverlay>
    )
}

export default CreateCalendarRecord