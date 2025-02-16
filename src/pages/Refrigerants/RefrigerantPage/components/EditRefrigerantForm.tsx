import { ChangeEvent, Dispatch, SetStateAction, useState } from "react";
import SubmitButton from "../../../../components/form/SubmitButton/SubmitButton";
import ContainerFooter from "../../../../components/ui/Containers/ContainerFooter/ContainerFooter";
import { FilterSelection } from "../../../../components/ui/FilterSelect/FilterSelect";
import { ProductResponseData } from "../../../../types/products.types";
import { CreateRefrigerantAttributes, RefrigerantResponseData } from "../../../../types/refrigerant.types";
import putAPI from "../../../../utils/putAPI";
import updateStateParams from "../../../../utils/updateStateParams/updateStateParams";
import RefrigerantDetailsForm from "../../CreateRefrigerant/components/RefrigerantDetailsForm";
import isRefrigerantDetailsFormValid from "../../CreateRefrigerant/utils/isRefrigerantDetailsFormValid";

const EditRefrigerantForm = (props: {
    refrigerant: RefrigerantResponseData,
    setRefrigerantData: Dispatch<SetStateAction<RefrigerantResponseData | undefined>>,
    productData: ProductResponseData | undefined
    disabledEdit: () => void
}) => {  
    // Form States
    const [hasSubmitted, setHasSubmitted] = useState(false);
    const [isUpdating, setIsUpdating] = useState(false);
    const [refrigerantDetails, setRefrigerantDetails] = useState<CreateRefrigerantAttributes>({
        name: props.refrigerant.data.name,
        common_name: props.refrigerant.data.common_name,
        global_warming_potential: props.refrigerant.data.global_warming_potential.toString(),
        notes: props.refrigerant.data.notes ? props.refrigerant.data.notes : '',
    });
    const [selectOptions, setSelectOptions] = useState<Array<FilterSelection>>([
        {
            text: 'Refrigerant',
            value: false,
            iconFont: 'propane',
            selected: !props.refrigerant.data.is_consumable
        },
        {
            text: 'Gas/Air',
            value: true,
            iconFont: 'co2',
            selected: props.refrigerant.data.is_consumable
        }
    ]);
    const selectValue =  selectOptions.find(selection => selection.selected)?.value;
   
    const formComplete = isRefrigerantDetailsFormValid(refrigerantDetails)

    const updateParams = (event: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement> | ChangeEvent<HTMLTextAreaElement>) => {
        updateStateParams(event, setRefrigerantDetails)
    }

    const updateRefrigerant = () => {
        setHasSubmitted(true);
        if (!formComplete) return;
        putAPI(`refrigerants/${props.refrigerant.id}/update`, {}, {
            ...refrigerantDetails,
            is_consumable: selectValue
        }, (response: any) => {
            const refrigerantData: RefrigerantResponseData = response.data;
            props.setRefrigerantData(refrigerantData);
            props.disabledEdit()
        }, setIsUpdating)
    }

    return (
        <>
            <RefrigerantDetailsForm 
                refrigerantDetails={refrigerantDetails} 
                selectOptions={selectOptions}
                setSelectOptions={setSelectOptions}
                updateParams={updateParams} 
                showErrors
                isEdit
            />
            <ContainerFooter>
                <SubmitButton 
                    text="Save Changes" 
                    iconFont="save"
                    clickFunc={updateRefrigerant}                
                    submitting={isUpdating}
                    submittingText="Saving..."
                    disabled={hasSubmitted && !formComplete}
                />
            </ContainerFooter>
        </>
    )
}

export default EditRefrigerantForm