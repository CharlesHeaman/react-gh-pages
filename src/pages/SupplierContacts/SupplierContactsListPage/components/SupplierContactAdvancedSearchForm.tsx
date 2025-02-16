import { Dispatch, SetStateAction, ChangeEvent } from "react"
import updateStateParams from "../../../../utils/updateStateParams/updateStateParams"
import TextInput from "../../../../components/form/TextInput/TextInput"
import GridItem from "../../../../components/ui/Containers/GridItem/GridItem"
import InfoGrid from "../../../../components/ui/Containers/InfoGrid/InfoGrid"

export interface AdvancedSupplierContactSearchForm {
    email_like: string,
    telephone_like: string,
    mobile_like: string,
}

const SupplierContactAdvancedSearchForm = (props: {
    advancedSearchParams: AdvancedSupplierContactSearchForm,
    setAdvancedSearchParams: Dispatch<SetStateAction<AdvancedSupplierContactSearchForm>>
}) => {

    const updateParams = (event: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement> | ChangeEvent<HTMLTextAreaElement>) => {
        updateStateParams(event, props.setAdvancedSearchParams)
    }
    
    return (
        <section>
            <InfoGrid>
                <GridItem title='Email' span={3}>
                    <TextInput
                        name="email_like"
                        value={props.advancedSearchParams.email_like}
                        updateFunc={updateParams}
                        autoFocus
                    />
                </GridItem>
                <GridItem title='Telephone' span={3}>
                    <TextInput
                        name="telephone_like"
                        value={props.advancedSearchParams.telephone_like}
                        updateFunc={updateParams}
                    />
                </GridItem>
                <GridItem title='Mobile' span={3}>
                    <TextInput
                        name="mobile_like"
                        value={props.advancedSearchParams.mobile_like}
                        updateFunc={updateParams}
                    />
                </GridItem>
            </InfoGrid>
        </section>
    )
}

export default SupplierContactAdvancedSearchForm