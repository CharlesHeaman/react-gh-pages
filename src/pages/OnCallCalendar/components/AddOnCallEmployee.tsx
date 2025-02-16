
import { useEffect, useState } from "react"
import { useSearchParams } from "react-router-dom"
import SubmitButton from "../../../components/form/SubmitButton/SubmitButton"
import WindowOverlay from "../../../components/ui/Containers/WindowOverlay/WindowOverlay"
import { UserResponseData } from "../../../types/user.types"
import getDayRelativeDate from "../../../utils/getDayRelativeDate"
import postAPI from "../../../utils/postAPI"
import AddOnCallEmployeeForm from "./AddOnCallEmployeeForm"

const AddOnCallEmployee = (props: {
    departmentID?: number,
    show: boolean,
    hideFunc: () => void,
    resFunc: () => void,
    currentCreateDate: Date | undefined
}) => {
    const [searchParams] = useSearchParams();

    const [hasSubmitted, setHasSubmitted] = useState(false);
    const [isCreating, setIsCreating] = useState(false);

    const getStartDate = (): Date => {
        const paramDate = searchParams.get('date');
        return props.currentCreateDate ? props.currentCreateDate : paramDate ? new Date(paramDate) : new Date()
    }

    const [selectedEngineer, setSelectedEngineer] = useState<UserResponseData>();
    const [selectedStartTime, setSelectedStartTime] = useState<Date>(new Date(new Date().setUTCHours(8,0,0,0)));
    const [selectedStartDate, setSelectedStartDate] = useState<Date>(new Date(getStartDate()));
    const [selectedEndTime, setSelectedEndTime] = useState<Date>(new Date(new Date().setUTCHours(8,0,0,0)));
    const [selectedEndDate, setSelectedEndDate] = useState<Date>(new Date(getDayRelativeDate(getStartDate(), 1)));

    useEffect(() => {
        setSelectedEngineer(undefined);
        setHasSubmitted(false);
    }, [props.show]);

    useEffect(() => {
        setSelectedStartTime(new Date(new Date().setUTCHours(8,0,0,0)));
        setSelectedStartDate(new Date(getStartDate()));
        setSelectedEndTime(new Date(new Date().setUTCHours(8,0,0,0)));
        setSelectedEndDate(new Date(getDayRelativeDate(getStartDate(), 1)));
    }, [props.currentCreateDate]);

    const addOnCallEngineer = () => {
        setHasSubmitted(true);
        if (!formComplete) return;
        postAPI('on_call_engineers/create', {}, {
            department_id: selectedEngineer.data.department_id,
            user_id: selectedEngineer.id,
            start_date: new Date(selectedStartDate.setUTCHours(selectedStartTime.getUTCHours())),
            end_date: new Date(selectedEndDate.setUTCHours(selectedEndTime.getUTCHours())),
        }, () => {
            props.hideFunc();
            props.resFunc();
        }, setIsCreating)
    }

    const formComplete = selectedEngineer !== undefined;

    return (
        <WindowOverlay 
            title={"Add On-call Employee"} 
            maxWidth={400} 
            show={props.show} 
            hideFunc={props.hideFunc}
            footer={<SubmitButton 
                text="Add On-call Employee"
                clickFunc={addOnCallEngineer}
                submitting={isCreating}
                submittingText='Adding...'
                iconFont="add"
                disabled={hasSubmitted && !formComplete}
            />}
        >
            <AddOnCallEmployeeForm
                departmentID={props.departmentID}
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
                hasSubmitted={hasSubmitted}
            />
        </WindowOverlay>
    )
}

export default AddOnCallEmployee