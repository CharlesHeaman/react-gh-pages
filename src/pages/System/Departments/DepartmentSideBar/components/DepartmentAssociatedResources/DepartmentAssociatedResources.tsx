import { useState } from "react";
import SideBarButton from "../../../../../../components/ui/Buttons/SideBarButton/SideBarButton";
import SideBarModule from "../../../../../../components/ui/Containers/SideBarModule/SideBarModule";
import DepartmentHistory from "./DepartmentHistory";

const DepartmentAssociatedResources = (props: {
    departmentID: number,
    activityCount: number,
}) => {
    const [showHistory, setShowHistory] = useState(false);

    return (
        <> 
            {/* <SideBarModule title="Ticket">
                <SideBarButton
                    text={`Tickets ()`}
                    iconFont="confirmation_number"
                    clickEvent={() => null}
                />
                <SideBarButton
                    text={`Engineer Equipment Details ()`}
                    iconFont="list_alt"
                    clickEvent={() => null}
                />
            </SideBarModule> */}
            {/* <SideBarModule title="Customer">
                <SideBarButton
                    text={`Sites ()`}
                    iconFont="business"
                    clickEvent={() => null}
                />
                <SideBarButton
                    text={`Equipment ()`}
                    iconFont="local_laundry_service"
                    clickEvent={() => null}
                />
                <SideBarButton
                    text={`Contracts ()`}
                    iconFont="history_edu"
                    clickEvent={() => null}
                />
            </SideBarModule> */}
            {/* <SideBarModule title="Stock">
                <SideBarButton
                    text={`Purchase Orders ()`}
                    iconFont="receipt_long"
                    clickEvent={() => null}
                />
                <SideBarButton
                    text={`Requisitions ()`}
                    iconFont="all_inbox"
                    clickEvent={() => null}
                />
                <SideBarButton
                    text={`Products ()`}
                    iconFont="inventory_2"
                    clickEvent={() => null}
                />
            </SideBarModule> */}
            {/* <SideBarModule title="Invoices">
                <SideBarButton
                    text={`Job Invoice Requests ()`}
                    iconFont="dataset_linked"
                    clickEvent={() => null}
                />
                <SideBarButton
                    text={`Ticket Invoice Requests ()`}
                    iconFont="confirmation_number"
                    clickEvent={() => null}
                />
            </SideBarModule> */}
            {/* <SideBarModule title="RAMS">
                <SideBarButton
                    text={`RAMS ()`}
                    iconFont="assignment_late"
                    clickEvent={() => null}
                />
                <SideBarButton
                    text={`Description Of Works ()`}
                    iconFont="subject"
                    clickEvent={() => null}
                />
            </SideBarModule> */}
            {/* <SideBarModule title="System Administration">
                <SideBarButton
                    text={`Equipment Types ()`}
                    iconFont="local_laundry_service"
                    clickEvent={() => null}
                />
                <SideBarButton
                    text={`Cost Centres ()`}
                    iconFont="point_of_sale"
                    clickEvent={() => null}
                />
                <SideBarButton
                    text={`Users ()`}
                    iconFont="account_circle"
                    clickEvent={() => null}
                />
            </SideBarModule> */}
            <SideBarModule title="Department">
                {/* <SideBarButton
                    text={`Assets ()`}
                    iconFont="handyman"
                    clickEvent={() => null}
                />
                <SideBarButton
                    text={`Quotes ()`}
                    iconFont="request_quote"
                    clickEvent={() => null}
                /> */}
                <SideBarButton
                    text={`History (${props.activityCount})`}
                    iconFont="history"
                    clickEvent={() => setShowHistory(true)}
                />
            </SideBarModule>

            <DepartmentHistory
                departmentID={props.departmentID}
                totalCount={props.activityCount}
                show={showHistory}
                hideFunc={() => setShowHistory(false)}
            />
        </>
    )
}

export default DepartmentAssociatedResources