import { Dispatch, SetStateAction, useState } from "react"
import ContractSelect from "../../../../../../../../../components/form/ContractSelect/ContractSelect"
import SubmitButton from "../../../../../../../../../components/form/SubmitButton/SubmitButton"
import GridItem from "../../../../../../../../../components/ui/Containers/GridItem/GridItem"
import InfoGrid from "../../../../../../../../../components/ui/Containers/InfoGrid/InfoGrid"
import WindowOverlay from "../../../../../../../../../components/ui/Containers/WindowOverlay/WindowOverlay"
import { ContractResponseData } from "../../../../../../../../../types/contract.types"
import { SiteResponseData } from "../../../../../../../../../types/sites.types"
import putAPI from "../../../../../../../../../utils/putAPI"

const SelectSiteContract = (props: {
    siteID: number,
    customerID: number,
    contract: ContractResponseData | undefined,
    setSiteData: Dispatch<SetStateAction<SiteResponseData | undefined>>,
    show: boolean,
    hideFunc: () => void
}) => {

    // Form State
    const [isUpdating, setIsUpdating] = useState(false);
    const [selectedContract, setSelectedContract] = useState<ContractResponseData | undefined>(props.contract);

    const updateSite = () => {
        putAPI(`sites/${props.siteID}/select_contract`, {}, {
            contract_id: selectedContract?.id
        }, (response: any) => {
            const siteData: SiteResponseData = response.data;
            props.setSiteData(siteData);
            props.hideFunc();
            setSelectedContract(selectedContract);
        }, setIsUpdating)
    }

    const removeContract = () => {
        putAPI(`sites/${props.siteID}/select_contract`, {}, {
            contract_id: 0
        }, (response: any) => {
            const siteData: SiteResponseData = response.data;
            props.setSiteData(siteData);
            props.hideFunc();
            setSelectedContract(undefined);
        }, setIsUpdating)
    }

    return (
        <WindowOverlay
            title='Select Site Contract'
            show={props.show}
            hideFunc={props.hideFunc}
            maxWidth={300}
            footer={<>
                {props.contract !== undefined && <SubmitButton
                    text="Remove"
                    iconFont="not_interested"
                    color="red"
                    left
                    clickFunc={removeContract}
                    submitting={isUpdating}
                    submittingText="Removing..."
                />}
                <SubmitButton
                    text="Select Contract"
                    iconFont="history_edu"
                    disabled={selectedContract === undefined}
                    clickFunc={updateSite}
                    submitting={isUpdating}
                    submittingText="Updating..."
                />
            </>}
        >
            <InfoGrid>
                <GridItem>
                    <p>Select a contract to link to this site.</p>
                </GridItem>
                <GridItem title='Contract'>
                    <ContractSelect
                        selectedContract={selectedContract}
                        setSelectedContract={setSelectedContract}
                        hasSubmitted={false}
                        customerID={props.customerID}
                        required
                    />
                </GridItem>
            </InfoGrid>
        </WindowOverlay>
    )
}

export default SelectSiteContract