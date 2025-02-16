import { useState } from "react";
import SideBarButton from "../../../../../../components/ui/Buttons/SideBarButton/SideBarButton";
import SideBarModule from "../../../../../../components/ui/Containers/SideBarModule/SideBarModule";
import { DepartmentResponseData } from "../../../../../../types/department.types";
import { QuoteResponseData } from "../../../../../../types/quote.types";
import CreateJobInterimInvoice from "../JobActions/components/CreateJobInterimInvoice";

const JobAccounts = (props: {
    job: QuoteResponseData,
    isInvoiced: boolean,
    department: DepartmentResponseData,
    getInterimInvoices: (departmentID: number) => void
}) => {
    const [showCreateInterim, setShowCreateInterim] = useState(false);

    return (
        <>
            {!props.isInvoiced ? <SideBarModule title="Accounts">
                <SideBarButton
                    text="Create Interim Invoice"
                    iconFont="redeem"
                    color="light-blue"
                    clickEvent={() => setShowCreateInterim(true)}
                />
            </SideBarModule> : null}

            <CreateJobInterimInvoice
                job={props.job} 
                show={showCreateInterim} 
                hideFunc={() => setShowCreateInterim(false)}    
                getInterimInvoices={() => props.getInterimInvoices(props.department.id)}         
            />
        </>
    )
}

export default JobAccounts