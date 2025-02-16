import { ChangeEvent, Dispatch, SetStateAction } from "react"
import TextInput from "../../../../components/form/TextInput/TextInput"
import TextareaInput from "../../../../components/form/TextareaInput/TextareaInput"
import GridItem from "../../../../components/ui/Containers/GridItem/GridItem"
import InfoGrid from "../../../../components/ui/Containers/InfoGrid/InfoGrid"
import updateStateParams from "../../../../utils/updateStateParams/updateStateParams"
import AccountsStatusSelect from "./AccountsStatutsSelect"

export interface AdvancedCustomerSearchForm {
    email_like: string,
    telephone_like: string,
    address_like: string,
    postcode_like: string,
    sage_name_like: string,
    accounts_email_like: string,
    accounts_status: number
}

const CustomerAdvancedSearchForm = (props: {
    advancedSearchParams: AdvancedCustomerSearchForm,
    setAdvancedSearchParams: Dispatch<SetStateAction<AdvancedCustomerSearchForm>>,
    accountsStatus: number,
    setAccountsStatus: Dispatch<SetStateAction<number>>,
}) => {

    const updateParams = (event: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement> | ChangeEvent<HTMLTextAreaElement>) => {
        updateStateParams(event, props.setAdvancedSearchParams)
    }

    return (
        <>
            <section>
                <InfoGrid>
                    <GridItem title='Email' span={4}>
                        <TextInput
                            name="email_like"
                            value={props.advancedSearchParams.email_like}
                            updateFunc={updateParams}                           
                        />
                    </GridItem>
                    <GridItem title='Telephone' span={2}>
                        <TextInput
                            name="telephone_like"
                            value={props.advancedSearchParams.telephone_like}
                            updateFunc={updateParams}                           
                        />
                    </GridItem>
                    <GridItem title='Address' span={4}>
                        <TextareaInput
                            name="address_like"
                            value={props.advancedSearchParams.address_like}
                            updateFunc={updateParams}
                        />
                    </GridItem>
                    <GridItem title='Postcode' span={2}>
                        <TextInput
                            name="postcode_like"
                            value={props.advancedSearchParams.postcode_like}
                            updateFunc={updateParams}                           
                        />
                    </GridItem>
                </InfoGrid>
            </section>
            <hr/>
            <section>
                <InfoGrid>
                    <GridItem title='Accounts Status'>
                        <AccountsStatusSelect 
                            selectedAccountsStatus={props.accountsStatus}
                            setSelectedAccountsStatus={props.setAccountsStatus}  
                            showAny          
                        />
                    </GridItem>
                    <GridItem title='Sage Name' span={2}>
                        <TextInput
                            name="sage_name_like"
                            value={props.advancedSearchParams.sage_name_like}
                            updateFunc={updateParams}                           
                        />
                    </GridItem>
                    <GridItem title='Accounts Email' span={4}>
                        <TextInput
                            name="accounts_email_like"
                            value={props.advancedSearchParams.accounts_email_like}
                            updateFunc={updateParams}                           
                        />
                    </GridItem>
                </InfoGrid>
            </section>
        </>
    )
}

export default CustomerAdvancedSearchForm