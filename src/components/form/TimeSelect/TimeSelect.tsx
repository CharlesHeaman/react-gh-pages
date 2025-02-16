import formatTime from "../../../utils/formatTime";
import FormErrorMessage from "../FormErrorMessage/FormErrorMessage";
import NewSelectMenu, { NewSelectItem } from "../NewSelectMenu/NewSelectMenu";

const TimeSelect = (props: {
    value: Date | undefined,
    updateFunc: (date: Date) => void,
    minuteIntervals: number,
    required?: boolean,
    hasSubmitted?: boolean
}) => {

    const selectItems: Array<NewSelectItem> = [];

    const addTime = (time: Date) => {
        selectItems.push({
            text: `${formatTime(time)}`,
            clickFunc: () => props.updateFunc(time),
            selected: time.getTime() === props.value?.getTime()
        })
    }

    const currentDate = new Date()
    for (let hours = 0; hours < 24; hours++) {
        for (let minutes = 0; minutes < 60; minutes += props.minuteIntervals) {
            addTime(new Date(new Date(currentDate).setUTCHours(hours,minutes,0,0)));
        }
    }

    const showRequired = props.value === undefined && props.hasSubmitted === true;

    return (
        <>
            <NewSelectMenu
                iconFont="schedule"
                selectedText={props.value ? formatTime(props.value) : undefined}
                selectItems={selectItems}
            />
            {props.required && <FormErrorMessage 
                text={`Time is required`}
                show={showRequired}
            />}
        </>
    )
}

export default TimeSelect