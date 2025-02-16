import { Dispatch, SetStateAction, useState } from "react";
import SubmitButton from "../../../../components/form/SubmitButton/SubmitButton";
import ContainerFooter from "../../../../components/ui/Containers/ContainerFooter/ContainerFooter";
import GridItem from "../../../../components/ui/Containers/GridItem/GridItem";
import InfoGrid from "../../../../components/ui/Containers/InfoGrid/InfoGrid";
import { FilterSelection } from "../../../../components/ui/FilterSelect/FilterSelect";
import { RiskAssessmentResponseData } from "../../../../types/riskAssessment.types";
import putAPI from "../../../../utils/putAPI";


const EditRiskAssessment = (props: {
    riskAssessmentData: RiskAssessmentResponseData,
    setRiskAssessmentData: Dispatch<SetStateAction<RiskAssessmentResponseData | undefined>>
    setIsEditMode: Dispatch<SetStateAction<boolean>>
}) => {
    const [name, setName] = useState(props.riskAssessmentData.data.name);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [selectOptions, setSelectOptions] = useState<Array<FilterSelection>>([
        {
            text: 'Portrait',
            value: false,
            iconFont: 'crop_portrait',
            selected: !props.riskAssessmentData.data.is_landscape
        },
        {
            text: 'Landscape',
            value: true,
            iconFont: 'crop_landscape',
            selected: props.riskAssessmentData.data.is_landscape
        }
    ])

    const isDisabled = !(name.length > 0);

    const updateRiskAssessment = () => {
        putAPI(`risk_assessments/${props.riskAssessmentData.id}/update`, {}, {
            name: name,
            is_landscape: selectOptions.find(selection => selection.selected)?.value
        }, (response: any) => {
            const riskAssessmentData: RiskAssessmentResponseData = response.data;
            props.setRiskAssessmentData(riskAssessmentData)
            props.setIsEditMode(false);
        }, setIsSubmitting)
    }

    return (
        <>
            <InfoGrid>
                <GridItem title='Name'>
                    <input
                        type='text'
                        placeholder='Name...'
                        onChange={(e) => setName(e.target.value)}
                        value={name}
                        autoFocus
                    />
                </GridItem>
            </InfoGrid>
            <ContainerFooter>
                <SubmitButton
                    text='Save Changes' 
                    submitting={isSubmitting}
                    submittingText='Saving...'
                    disabled={isDisabled}
                    clickFunc={updateRiskAssessment}                            
                />
            </ContainerFooter>
        </>
    )
}

export default EditRiskAssessment