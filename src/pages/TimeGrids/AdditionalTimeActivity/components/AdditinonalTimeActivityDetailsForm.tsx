import { ChangeEvent } from "react"
import TextInput from "../../../../components/form/TextInput/TextInput"
import TextareaInput from "../../../../components/form/TextareaInput/TextareaInput"
import GridItem from "../../../../components/ui/Containers/GridItem/GridItem"
import InfoGrid from "../../../../components/ui/Containers/InfoGrid/InfoGrid"
import { CreateAdditionalTimeActivityAttributes } from "../../../../types/additionalTimeActivity.types"

const AdditionalTimeActivityDetailsForm = (props: {
    activityDetails: CreateAdditionalTimeActivityAttributes,
    updateParams: (event: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement> | ChangeEvent<HTMLTextAreaElement>) => void,
    showErrors: boolean,
    isEdit?: boolean
}) => {
    return (
        <section>
            {props.isEdit && <h2>Additional Time Activity Details</h2>}
            <InfoGrid>
                <GridItem title='Name'>
                    <TextInput
                        name="name"
                        label="Name"
                        value={props.activityDetails.name}
                        updateFunc={props.updateParams}
                        hasSubmitted={props.showErrors}
                        required
                        autoFocus
                    />
                </GridItem>
                <GridItem title='Description' secondaryTitle="(optional)">
                    <TextareaInput
                        name="description"
                        value={props.activityDetails.description}
                        label="Description"
                        updateFunc={props.updateParams}
                        hasSubmitted={props.showErrors}
                    />
                </GridItem>
            </InfoGrid>
        </section>
    )
}

export default AdditionalTimeActivityDetailsForm 