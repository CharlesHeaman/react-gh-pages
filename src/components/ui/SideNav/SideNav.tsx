import { useLocation } from "react-router-dom";
import SideNavItem from "./components/SideNavItem/SideNavItem";
import styles from "./SideNav.module.css";

const SideNav = (props: {
    isOpen: boolean,
}) => {
    const location = useLocation();
    const splitPath = location.pathname.split('/');
    var currentLocation = splitPath[1].toLowerCase();
        
    return (
        <aside 
            className={`
                ${styles['side-nav']}
                ${props.isOpen ? styles['open'] : ''}
            `}
        >
            <nav>
                {/* Dashboard */}
                <SideNavItem
                    title="Dashboard"
                    iconFont="dashboard"
                    location=""
                    navIsOpen={props.isOpen}
                />
                <hr/>
                {/* Tickets */}
                <SideNavItem
                    title="Bookings"
                    iconFont="confirmation_number"
                    location="Bookings"
                    selected={currentLocation === `bookings`}
                    navIsOpen={props.isOpen}
                />
                {/* Customers */}
                <hr/>
                <SideNavItem
                    title="Customers"
                    iconFont="groups"
                    location="customers"
                    selected={currentLocation === "customers"}
                    navIsOpen={props.isOpen}
                />
                <SideNavItem
                    title="Sites"
                    iconFont="business"
                    location="sites"
                    selected={currentLocation === "sites"}
                    navIsOpen={props.isOpen}
                />
                <SideNavItem
                    title="Equipment"
                    iconFont="local_laundry_service"
                    location="equipment"
                    selected={currentLocation === "equipment"}
                    navIsOpen={props.isOpen}
                />
                <SideNavItem
                    title="Contracts"
                    iconFont="history_edu"
                    location="contracts"
                    selected={currentLocation === "contracts"}
                    navIsOpen={props.isOpen}
                />
                <SideNavItem
                    title="Contacts"
                    iconFont="contact_phone"
                    location="contacts"
                    selected={currentLocation === "contacts"}
                    navIsOpen={props.isOpen}
                />
                {/* Stock */}
                <hr/>
                <SideNavItem
                    title="Products"
                    iconFont="inventory_2"
                    location="products"
                    selected={currentLocation === "products"}
                    navIsOpen={props.isOpen}
                />
                <SideNavItem
                    title="Requisitions"
                    iconFont="all_inbox"
                    location="requisitions"
                    selected={currentLocation === "requisitions"}
                    navIsOpen={props.isOpen}
                />
                <SideNavItem
                    title="Purchase Orders"
                    iconFont="receipt_long"
                    location="purchase_orders"
                    selected={currentLocation === "purchase_orders"}
                    navIsOpen={props.isOpen}
                />
                <SideNavItem
                    title="Suppliers/Manufacturers"
                    iconFont="warehouse"
                    location="suppliers_manufacturers"
                    selected={currentLocation === "suppliers_manufacturers" || currentLocation === "supplier_contacts"}
                    navIsOpen={props.isOpen}
                />
                {/* Accounts */}
                <hr/>
                <SideNavItem
                    title="Invoice Requests"
                    iconFont="credit_card"
                    location="ticket_invoice_requests"
                    selected={currentLocation === "ticket_invoice_requests"}
                    navIsOpen={props.isOpen}
                />

                {/* System */}
                <hr/>
                <SideNavItem
                    title="Reports"
                    iconFont="summarize"
                    location="test"
                    selected={currentLocation === "test"}
                    navIsOpen={props.isOpen}
                />
                <SideNavItem
                    title="System Administration"
                    iconFont="settings"
                    location="system"
                    selected={currentLocation === "system"}
                    navIsOpen={props.isOpen}
                />
            </nav>
        </aside>
    )
}

export default SideNav