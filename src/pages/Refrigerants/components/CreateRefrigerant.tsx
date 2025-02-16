import { ChangeEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import SubmitButton from "../../../components/form/SubmitButton/SubmitButton";
import WindowOverlay from "../../../components/ui/Containers/WindowOverlay/WindowOverlay";
import { FilterSelection } from "../../../components/ui/FilterSelect/FilterSelect";
import { CreateRefrigerantAttributes, RefrigerantResponseData } from "../../../types/refrigerant.types";
import postAPI from "../../../utils/postAPI";
import updateStateParams from "../../../utils/updateStateParams/updateStateParams";
import RefrigerantDetailsForm from "../CreateRefrigerant/components/RefrigerantDetailsForm";
import isRefrigerantDetailsFormValid from "../CreateRefrigerant/utils/isRefrigerantDetailsFormValid";


const CreateRefrigerant = (props: {
    show: boolean,
    hideFunc: () => void
}) => {
    const navigate = useNavigate();

    const [hasSubmitted, setHasSubmitted] = useState(false);
    const [isCreating, setIsCreating] = useState(false);
    const [createRefrigerantDetails, setCreateRefrigerantDetails] = useState<CreateRefrigerantAttributes>({
        name: '',
        common_name: '',
        global_warming_potential: '',
        notes: ''
    });
    const [selectOptions, setSelectOptions] = useState<Array<FilterSelection>>([
        {
            text: 'Refrigerant',
            value: false,
            iconFont: 'propane',
            selected: true
        },
        {
            text: 'Gas/Air',
            value: true,
            iconFont: 'co2',
        }
    ]);
    const selectValue = selectOptions.find(selection => selection.selected)?.value;
    
    const updateRefrigerantParams = (event: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement> | ChangeEvent<HTMLTextAreaElement>) => {
        updateStateParams(event, setCreateRefrigerantDetails)
    }

    const createRefrigerant = () => {
        postAPI('refrigerants/create', {}, {
            ...createRefrigerantDetails,
            is_consumable: selectValue
        }, (response: any) => {
            const refrigerantData: RefrigerantResponseData = response.data;
            navigate(`${refrigerantData.id}`, { relative: 'path' })
        }, setIsCreating)
    }

    const formComplete = isRefrigerantDetailsFormValid(createRefrigerantDetails);

    return (
        <WindowOverlay 
            title={"Create Refrigerant, Gas/Air"} 
            maxWidth={500} 
            show={props.show} 
            hideFunc={props.hideFunc}
            footer={<SubmitButton
                text="Create Refrigerant, Gas/Air"
                iconFont="add"
                color="dark-blue"
                clickFunc={createRefrigerant}
                submitting={isCreating}
                submittingText="Creating..."
                disabled={hasSubmitted && !formComplete}
            />}
        >
            <RefrigerantDetailsForm 
                refrigerantDetails={createRefrigerantDetails} 
                selectOptions={selectOptions}
                setSelectOptions={setSelectOptions}
                updateParams={updateRefrigerantParams} 
                showErrors={hasSubmitted}            
            />
        </WindowOverlay>
    )
}

export default CreateRefrigerant