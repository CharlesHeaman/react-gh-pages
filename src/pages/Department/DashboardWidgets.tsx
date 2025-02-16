import { useEffect, useState } from "react";
import PermsProtectedComponent from "../../components/PermsProtectedComponent";
import DashboardWrapper from "../../components/ui/Containers/DashboardWrapper/DashboardWrapper";
import { DescriptionOfWorksCollectionResponse } from "../../types/descriptionOfWorks.types";
import { GasBottleCollectionResponse } from "../../types/gasBottle.types";
import { PostCompletionChangeRequestCollectionResponse } from "../../types/postCompletionChangeRequets.types";
import { QuoteCollectionResponse } from "../../types/quote.types";
import { TimegridCollectionResponse } from "../../types/timegrid.types";
import { UserCollectionResponse } from "../../types/user.types";
import { VehicleCollectionResponse } from "../../types/vehicles.types";
import getAPI from "../../utils/getAPI";
import getMonthRelativeDate from "../../utils/getMonthRelativeDate";
import ApprovalTicketInvoiceRequestWidget from "./components/ApprovalTicketInvoiceRequestWidget";
import CreditCheckCustomerWidget from "./components/CreditCheckCustomerWidget";
import ExpiredContractWidget from "./components/ExpiredContractWidget";
import FurtherActionRequiredTicketWidget from "./components/FurtherActionRequiredTicketWidget";
import OutstandingJobInvoiceRequestWidget from "./components/OutstandingJobInvoiceRequestWidget";
import OutstandingTicketInvoiceRequestWidget from "./components/OutstandingTicketInvoiceRequestWidget";
import RAMSRequiredTicketWidget from "./components/RAMSRequiredTicketWidget";
import ReconciliationPurchaseOrderWidget from "./components/ReconciliationPurchaseOrdersWidget";
import UnassignedTicketWidget from "./components/UnassignedTicketWidget";

const DashboardWidgets = (props: {
    departmentID: number | null | undefined;
}) => {    
    return (
        <>
            <PermsProtectedComponent requiredPerms={{ tickets: 1 }}>
                <section>
                    <h2>Tickets</h2>
                    <DashboardWrapper>
                        <UnassignedTicketWidget departmentID={props.departmentID}/>
                        <FurtherActionRequiredTicketWidget departmentID={props.departmentID}/>
                        <RAMSRequiredTicketWidget departmentID={props.departmentID}/>
                    </DashboardWrapper>
                </section>
            </PermsProtectedComponent>
            <PermsProtectedComponent requiredPerms={{ customers: 1 }}>
                <section>
                    <h2>Customers</h2>
                    <DashboardWrapper>
                        <ExpiredContractWidget departmentID={props.departmentID}/>
                    </DashboardWrapper>
                </section>
            </PermsProtectedComponent>
            <PermsProtectedComponent requiredPerms={{ accounts: 1 }}>
                <section>
                    <h2>Accounts</h2>
                    <DashboardWrapper>
                        <CreditCheckCustomerWidget/>
                        <ReconciliationPurchaseOrderWidget/>
                        <ApprovalTicketInvoiceRequestWidget/>
                        <OutstandingTicketInvoiceRequestWidget/>
                        <OutstandingJobInvoiceRequestWidget/>
                    </DashboardWrapper>
                </section>
            </PermsProtectedComponent>
        </>
    )
}

export default DashboardWidgets;