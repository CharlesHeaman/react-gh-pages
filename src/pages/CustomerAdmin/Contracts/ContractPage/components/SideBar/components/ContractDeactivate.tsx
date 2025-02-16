import { Dispatch, SetStateAction, useState } from "react"
import DeactivateModule from "../../../../../../../components/ui/DeactivateModule/DeactivateModule";
import DeactivateOverlay from "../../../../../../../components/ui/DeactivateModule/DeactivateOverlay";
import { ContractResponseData } from "../../../../../../../types/contract.types";
import putAPI from "../../../../../../../utils/putAPI";
import WindowOverlay from "../../../../../../../components/ui/Containers/WindowOverlay/WindowOverlay";

const ContractDeactivate = (props: {
    contractID: number,
    reactivate: boolean,
    ticketCount: number,
    setContractData: Dispatch<SetStateAction<ContractResponseData | undefined>>
}) => {
    const [showDeactivate, setShowDeactivate] = useState(false);
    const [isDeactivating, setIsDeactivating] = useState(false);

    const deactivateCustomer = () => {
        putAPI(`contracts/${props.contractID}/deactivate`, {}, {
            reactivate: props.reactivate
        }, (response: any) => {
            const contractData: ContractResponseData = response.data;
            props.setContractData(contractData);
            setShowDeactivate(false)
        }, setIsDeactivating)
    }

    return (
        <>
            <DeactivateModule
                resourceName='Contract'
                showFunc={() => setShowDeactivate(true)}
                reactivate={props.reactivate}
            />

            {props.ticketCount > 0 ?
                <WindowOverlay 
                    title={'Deactivate Contract'} 
                    maxWidth={300} 
                    show={showDeactivate} 
                    hideFunc={() => setShowDeactivate(false)} 
                >
                    <p>Deactivate is disabled as the contract still has open {props.ticketCount > 0 ? 'tickets' : ''}.</p>
                    <p>Close all {props.ticketCount > 0 ? `${props.ticketCount} open tickets` : ''} to deactivate this equipment.</p>
                </WindowOverlay>
                :
                <DeactivateOverlay 
                    resourceName="Contract"
                    reactivate={props.reactivate} 
                    show={showDeactivate} 
                    hideFunc={() => setShowDeactivate(false)} 
                    isSubmitting={isDeactivating} 
                    submitFunc={deactivateCustomer}
                />
            }   

            
        </>

    )
}

export default ContractDeactivate