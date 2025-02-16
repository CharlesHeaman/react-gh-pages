import { Dispatch, SetStateAction } from "react";
import FormErrorMessage from "../../../../../components/form/FormErrorMessage/FormErrorMessage";
import NewSelectMenu, { NewSelectItem } from "../../../../../components/form/NewSelectMenu/NewSelectMenu";
import Label from "../../../../../components/ui/General/Label/Label";

const ContractTypeSelect = (props: {
    selectedContractType: number,
    setSelectedContractType: Dispatch<SetStateAction<number>>,
    required?: boolean,
    hasSubmitted: boolean
}) => {

    const selectItems: Array<NewSelectItem> = [
        {
            icon: <Label 
                iconFont="history_edu"
                noBackground
            />,
            text: "A-Type",
            clickFunc: () => props.setSelectedContractType(2),
            selected: props.selectedContractType === 2
        },
        {
            icon: <Label 
                iconFont="history_edu"
                noBackground
            />,
            text: "B-Type",
            clickFunc: () => props.setSelectedContractType(4),
            selected: props.selectedContractType === 4
        }
    ];

    const showRequired = props.selectedContractType === 0 && props.hasSubmitted;

    return (
        <>
            <NewSelectMenu
                iconFont="history_edu"
                selectedText={props.selectedContractType === 2 ? 'A-Type' : 'B-Type'}
                selectItems={selectItems}
            />
            {props.required && <FormErrorMessage 
                text={`Contract type is required`}
                show={showRequired}
            />}
        </>
    )
}

export default ContractTypeSelect