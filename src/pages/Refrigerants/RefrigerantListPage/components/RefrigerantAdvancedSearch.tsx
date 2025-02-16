import SubmitButton from "../../../../components/form/SubmitButton/SubmitButton";
import ContainerFooter from "../../../../components/ui/Containers/ContainerFooter/ContainerFooter";
import GridItem from "../../../../components/ui/Containers/GridItem/GridItem";
import InfoGrid from "../../../../components/ui/Containers/InfoGrid/InfoGrid";

export interface AdvancedCustomerSearchParams {
    code_like?: string,
    name_like?: string,
    is_contracted?: string,
    email_like?: string,
    telephone_like?: string,
    address_like?: string,
    postcode_like?: string,
    sage_name_like?: string,
    accounts_email_like?: string,
    accounts_status?: string
}

const RefrigerantAdvancedSearch = () => {
    return (
        <form>
            <section>
                <h2>Refrigerant Details</h2>
                <InfoGrid>
                    <GridItem title='Name' span={3}>
                        <input type="text"/>
                    </GridItem>
                    <GridItem title='Common Name' span={3}>
                        <input type="text"/>
                    </GridItem>
                </InfoGrid>
            </section>
            <ContainerFooter>
                <SubmitButton 
                    text='Search Gas Bottles'
                    clickFunc={() => null}
                />
            </ContainerFooter>
        </form>
    )
}

export default RefrigerantAdvancedSearch