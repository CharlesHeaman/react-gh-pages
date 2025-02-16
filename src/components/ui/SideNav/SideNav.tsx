import Cookies from "js-cookie";
import { Dispatch, SetStateAction } from "react";
import { useLocation } from "react-router-dom";
import { DepartmentResponseData } from "../../../types/department.types";
import DepartmentSelect from "../../form/DepartmentSelect/DepartmentSelect";
import PermsProtectedComponent from "../../PermsProtectedComponent";
import SideNavItem from "./components/SideNavItem/SideNavItem";
import styles from "./SideNav.module.css";

const SideNav = (props: {
    isOpen: boolean,
    department: DepartmentResponseData | undefined,
    setDepartment: Dispatch<SetStateAction<DepartmentResponseData | undefined>>
}) => {
    const location = useLocation();
    const splitPath = location.pathname.split('/');
    var currentLocation = splitPath[1].toLowerCase();

    if (currentLocation === props.department?.data.name.toLowerCase() && splitPath.length > 2) {
        currentLocation = splitPath[2].toLocaleLowerCase();
    }
    
    return (
        <aside 
            className={`
                ${styles['side-nav']}
                ${props.isOpen ? styles['open'] : ''}
            `}
        >
            <nav>
                {props.isOpen && <div style={{ marginBottom: '8px' }}><DepartmentSelect 
                    selectedDepartment={props.department} 
                    setSelectedDepartment={props.setDepartment}
                    updateFunc={(department) => Cookies.set('department_id', department.id.toString(), { sameSite: 'lax', secure: false, expires: 365 })}
                    hasSubmitted={false}
                /></div>}
                {/* Department */}
                {props.department ? 
                    <SideNavItem
                        title={`${props.department.data.name} Dashboard`}
                        iconFont="dashboard"
                        location={`${props.department.data.name}`}
                        hex={props.department.data.label_color}
                        navIsOpen={props.isOpen}
                    /> :
                    <SideNavItem
                        title="General Dashboard"
                        iconFont="dashboard"
                        location=""
                        navIsOpen={props.isOpen}
                    />
                }
                {props.department ? 
                    <>
                        <hr/>
                        <PermsProtectedComponent requiredPerms={{ calendars: 1 }}>
                            <SideNavItem
                                title="Tickets"
                                iconFont="confirmation_number"
                                location={`${props.department.data.name}/tickets`}
                                selected={currentLocation === `tickets`}
                                navIsOpen={props.isOpen}
                            />
                        </PermsProtectedComponent>
                        <PermsProtectedComponent requiredPerms={{ calendars: 1 }}>
                            <SideNavItem
                                title="Engineer Diary"
                                iconFont="event"
                                location={`${props.department.data.name}/engineer_diary/day`}
                                selected={currentLocation === "engineer_diary"}
                                navIsOpen={props.isOpen}
                            />
                        </PermsProtectedComponent>
                        <PermsProtectedComponent requiredPerms={{ engineer_data: 1 }}>
                            <SideNavItem
                                title="Timegrids"
                                iconFont="timer"
                                location={`${props.department.data.name}/timegrids`}
                                selected={currentLocation === "timegrids"}
                                navIsOpen={props.isOpen}
                            />
                        </PermsProtectedComponent>
                        <PermsProtectedComponent requiredPerms={{ calendars: 1 }}>
                            <SideNavItem
                                title="On-call Calendar"
                                iconFont="event_note"
                                location={`${props.department.data.name}/on_call_calendar`}
                                selected={currentLocation === "on_call_calendar"}
                                navIsOpen={props.isOpen}
                            />
                        </PermsProtectedComponent>
                        <PermsProtectedComponent requiredPerms={{ quotes: 1}}>
                            <SideNavItem
                                title="Quotes"
                                iconFont="request_quote"
                                location={`${props.department.data.name}/quotes`}
                                selected={currentLocation === "quotes"}
                                navIsOpen={props.isOpen}
                            />
                            {props.department.data.uses_job_module ? <SideNavItem
                                title="Jobs"
                                iconFont="dataset_linked"
                                location={`${props.department.data.name}/jobs`}
                                selected={currentLocation === "jobs"}
                                navIsOpen={props.isOpen}
                            /> : null}
                        </PermsProtectedComponent>
                    </> : null
                }

                {/* Customers */}
                <PermsProtectedComponent requiredPerms={{ customers: 1}}>
                    <hr/>
                    <SideNavItem
                        title="Customers"
                        iconFont="groups"
                        location="customers"
                        selected={currentLocation === "customers" || currentLocation === "sites" || currentLocation === "equipment" || currentLocation === "contracts" || currentLocation === "contacts"}
                        navIsOpen={props.isOpen}
                    />
                </PermsProtectedComponent>

                {/* Calendars */}
                <PermsProtectedComponent requiredPerms={{ calendars: 1}}>
                    <hr/>
                    <SideNavItem
                        title="Employee Calendar"
                        iconFont="calendar_month"
                        location="employee_calendar"
                        selected={currentLocation === "employee_calendar"}
                        navIsOpen={props.isOpen}
                    />
                </PermsProtectedComponent>

                {/* Stock */}
                <PermsProtectedComponent requiredPerms={{ stock: 1}}>
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
                </PermsProtectedComponent>

                {/* Engineer Assets */}
                <PermsProtectedComponent requiredPerms={{ engineer_assets: 1 }}>
                    <hr/>
                    <SideNavItem
                        title="Gas Bottles"
                        iconFont="propane_tank"
                        location="refrigerant_bottles"
                        selected={currentLocation === "refrigerant_bottles" || currentLocation === "gas_air_bottles"}
                        navIsOpen={props.isOpen}
                    />
                    <SideNavItem
                        title="Plant Equipment"
                        iconFont="handyman"
                        location="plant_and_equipment"
                        selected={currentLocation === "plant_and_equipment"}
                        navIsOpen={props.isOpen}
                    />
                    <SideNavItem
                        title="Vehicles"
                        iconFont="directions_car"
                        location="vehicles"
                        selected={currentLocation === "vehicles"}
                        navIsOpen={props.isOpen}
                    />
                </PermsProtectedComponent>

                {/* Accounts */}
                <PermsProtectedComponent requiredPerms={{ accounts: 1 }}>
                    <hr/>
                    <SideNavItem
                        title="Invoice Requests"
                        iconFont="credit_card"
                        location="ticket_invoice_requests"
                        selected={currentLocation === "ticket_invoice_requests"}
                        navIsOpen={props.isOpen}
                    />
                </PermsProtectedComponent>

                {/* ISO */}
                <PermsProtectedComponent requiredPerms={{ iso: 1 }}>
                    <hr/>
                    <SideNavItem
                        title="ISO"
                        iconFont="iso"
                        location={"iso"}   
                        selected={currentLocation === "iso"}             
                        navIsOpen={props.isOpen} 
                    />
                </PermsProtectedComponent>

                {/* System */}
                <PermsProtectedComponent requiredPerms={{ system: 1 }}>
                    <hr/>
                    {/* <SideNavItem
                        title="Reports"
                        iconFont="summarize"
                        location="test"
                        selected={currentLocation === "test"}
                        navIsOpen={props.isOpen}
                    /> */}
                    <SideNavItem
                        title="System Administration"
                        iconFont="settings"
                        location="system"
                        selected={currentLocation === "system"}
                        navIsOpen={props.isOpen}
                    />
                </PermsProtectedComponent>
            </nav>
        </aside>
    )
}

export default SideNav