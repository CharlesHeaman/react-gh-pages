import { useEffect, useState } from "react";
import DashboardWidget from "../../../components/ui/DashboardWidget/DashboardWidget";
import getAPI from "../../../utils/getAPI";
import { CustomerCollectionResponse } from "../../../types/customers.types";

const CreditCheckCustomerWidget = () => {
    // Data States
    const [isCustomersLoading, setIsCustomersLoading] = useState(false);
    const [customerData, setCustomersData] = useState<CustomerCollectionResponse>();

    useEffect(() => {
        getEngineers();
    }, []);

    const getEngineers = () => {
        getAPI('customers', {
            accounts_status: 1,
            is_active: true,
            perPage: 1
        }, (response: any) => {
            const customerData: CustomerCollectionResponse = response.data;
            setCustomersData(customerData);
        }, setIsCustomersLoading);
    }

    return (
        <DashboardWidget 
            title="Customers"
            count={customerData?.total_count}
            text="Awaiting credit check."
            iconFont={"groups"} 
            to={"/customers?customers_accounts_status=1&customers_has_searched=true"}
        />
    )
}

export default CreditCheckCustomerWidget;