import { Dispatch, SetStateAction } from "react";
import FormErrorMessage from "../../../../components/form/FormErrorMessage/FormErrorMessage";
import NewSelectMenu, { NewSelectItem } from "../../../../components/form/NewSelectMenu/NewSelectMenu";

const RateTypeSelect = (props: {
    selectedRateType: number,
    setSelectedRateType: Dispatch<SetStateAction<number>>,
    required?: boolean,
    hasSubmitted: boolean
}) => {

    const selectItems: Array<NewSelectItem> = [
        {
            icon: <span className="material-icons">history_edu</span>,
            text: 'Contract',
            clickFunc: () => props.setSelectedRateType(0),
            selected: props.selectedRateType === 0
        },
        {
            icon: <span className="material-icons">groups</span>,
            text: 'Customer',
            clickFunc: () => props.setSelectedRateType(1),
            selected: props.selectedRateType === 1
        }
    ];

    const showRequired = props.selectedRateType === 0 && props.hasSubmitted;

    return (
        <>
            <NewSelectMenu
                iconFont={props.selectedRateType === 0 ? 'history_edu' : 'groups'}
                selectedText={selectItems[props.selectedRateType].text}
                selectItems={selectItems}
            />
            {props.required && <FormErrorMessage 
                text={`Associated resource is required`}
                show={showRequired}
            />}
        </>
    )
}

export default RateTypeSelect