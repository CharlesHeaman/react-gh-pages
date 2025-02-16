import { Dispatch, SetStateAction, useState } from "react";
import SubmitButton from "../../../components/form/SubmitButton/SubmitButton";
import ContainerFooter from "../../../components/ui/Containers/ContainerFooter/ContainerFooter";
import { OnCallEngineerResponseData } from "../../../types/OnCallEngineer.types";
import { UserResponseData } from "../../../types/user.types";
import putAPI from "../../../utils/putAPI";
import AddOnCallEmployeeForm from "../../OnCallCalendar/components/AddOnCallEmployeeForm";

const EditOnCallEngineer = (props: {
    onCallEngineerData: OnCallEngineerResponseData,
    engineerData: UserResponseData,
    setOnCallEngineerData: Dispatch<SetStateAction<OnCallEngineerResponseData | undefined>>,
    disabledEdit: () => void
}) => {
    const [hasSubmitted, setHasSubmitted] = useState(false);
    const [isUpdating, setIsUpdating] = useState(false);

    const [selectedEngineer, setSelectedEngineer] = useState<UserResponseData | undefined>(props.engineerData);
    const [selectedStartTime, setSelectedStartTime] = useState<Date>(new Date(props.onCallEngineerData.data.start_date));
    const [selectedStartDate, setSelectedStartDate] = useState<Date>(new Date(props.onCallEngineerData.data.start_date));
    const [selectedEndTime, setSelectedEndTime] = useState<Date>(new Date(props.onCallEngineerData.data.end_date));
    const [selectedEndDate, setSelectedEndDate] = useState<Date>(new Date(props.onCallEngineerData.data.end_date));

    const formComplete = selectedEngineer !== undefined;

    const updateContact = () => {
        setHasSubmitted(true);
        if (!formComplete) return;
        putAPI(`on_call_engineers/${props.onCallEngineerData.id}/update`, {}, {
            department_id: selectedEngineer.data.department_id,
            user_id: selectedEngineer.id,
            start_date: new Date(selectedStartDate.setUTCHours(selectedStartTime.getUTCHours())),
            end_date: new Date(selectedEndDate.setUTCHours(selectedEndTime.getUTCHours())),
        }, (response: any) => {
            const onCallEngineerData: OnCallEngineerResponseData = response.data;
            props.setOnCallEngineerData(onCallEngineerData);
            props.disabledEdit()
        }, setIsUpdating)
    }


    return (
        <>
            <AddOnCallEmployeeForm
                selectedEngineer={selectedEngineer}
                setSelectedEngineer={setSelectedEngineer}
                selectedStartTime={selectedStartTime}
                setSelectedStartTime={setSelectedStartTime}
                selectedStartDate={selectedStartDate}
                setSelectedStartDate={setSelectedStartDate}
                selectedEndTime={selectedEndTime}
                setSelectedEndTime={setSelectedEndTime}
                selectedEndDate={selectedEndDate}
                setSelectedEndDate={setSelectedEndDate}
                isEdit
                hasSubmitted
            />
            <ContainerFooter>
                <SubmitButton 
                    text="Save Changes" 
                    iconFont="save"
                    clickFunc={updateContact}                
                    submitting={isUpdating}
                    submittingText="Saving..."
                    disabled={hasSubmitted && !formComplete}
                />
            </ContainerFooter>
        </>
    )
}

export default EditOnCallEngineer