import { ChangeEvent, Dispatch, SetStateAction } from "react"
import GridItem from "../../../../components/ui/Containers/GridItem/GridItem"
import InfoGrid from "../../../../components/ui/Containers/InfoGrid/InfoGrid"
import TextInput from "../../../../components/form/TextInput/TextInput"
import updateStateParams from "../../../../utils/updateStateParams/updateStateParams"

export interface AdvancedEquipmentSearchForm {
    code_like: string,
    location_like: string,
    description_like: string,
    model_number_like: string,
    serial_number_like: string
}

const EquipmentAdvancedSearchForm = (props: {
    advancedSearchParams: AdvancedEquipmentSearchForm,
    setAdvancedSearchParams: Dispatch<SetStateAction<AdvancedEquipmentSearchForm>>
}) => {

    const updateParams = (event: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement> | ChangeEvent<HTMLTextAreaElement>) => {
        updateStateParams(event, props.setAdvancedSearchParams)
    }

    return (
        <>
            <section>
                <InfoGrid>
                    <GridItem title='Location' span={3}>
                        <TextInput
                            name="location_like"
                            label="Location"
                            value={props.advancedSearchParams.location_like}
                            updateFunc={updateParams}
                            required
                        />
                    </GridItem>
                    <GridItem title='Description' span={3}>
                        <TextInput
                            name="description_like"
                            label="Description"
                            value={props.advancedSearchParams.description_like}
                            updateFunc={updateParams}
                            required
                        />
                    </GridItem>
                    <GridItem title='Model Number' span={3}>
                        <TextInput
                            name="model_number_like"
                            label="Model number"
                            value={props.advancedSearchParams.model_number_like}
                            updateFunc={updateParams}
                            required
                        />
                    </GridItem>
                    <GridItem title='Serial Number' span={3}>
                        <TextInput
                            name="serial_number_like"
                            label="Serial number"
                            value={props.advancedSearchParams.serial_number_like}
                            updateFunc={updateParams}
                            required
                        />
                    </GridItem>
                </InfoGrid>
            </section>
        </>
    )
}

export default EquipmentAdvancedSearchForm