import InnerContainer from "../../../../../components/ui/Containers/InnerContainer/InnerContainer"
import IconTitleText from "../../../../../components/ui/IconTitleText/IconTitleText"
import { User } from "../../../../../types/user.types"
import UserPermissionLabel from "./UserPermissionsLabel"
import getPermissionsColour from "./utils/getPermissionsColour"

const UserPermissions = (props: {
    permissions: User["permissions"]
}) => {
    return (
        <>
            <section>
                <h2>User Permissions</h2>
                <section>
                    <InnerContainer color={getPermissionsColour(props.permissions.accounts)}>
                        <IconTitleText
                            iconFont="credit_card"
                            title={<div className="flex">Accounts Pages <UserPermissionLabel permissions={props.permissions.accounts}/></div>}
                            color={getPermissionsColour(props.permissions.accounts)}
                            text={<ul style={{ margin: 0, paddingLeft: 'var(--large-gap)' }}>
                                <li>Ticket Invoice Requests</li>
                                <li>Job Invoice Requests</li>
                            </ul>}
                        />
                    </InnerContainer>
                </section>
                <section>
                    <InnerContainer color={getPermissionsColour(props.permissions.calendars)}>
                        <IconTitleText
                            iconFont="event"
                            title={<div className="flex">Calendar Pages <UserPermissionLabel permissions={props.permissions.calendars}/></div>}
                            color={getPermissionsColour(props.permissions.calendars)}
                            text={<ul style={{ margin: 0, paddingLeft: 'var(--large-gap)' }}>
                                <li>Employee Calendar</li>
                                <li>Engineer Calendar</li>
                                <li>On-call Calendar</li>
                            </ul>}
                        />
                    </InnerContainer>
                </section>
                <section>
                    <InnerContainer color={getPermissionsColour(props.permissions.customers)}>
                        <IconTitleText
                            iconFont="groups"
                            title={<div className="flex">Customer Pages <UserPermissionLabel permissions={props.permissions.customers}/></div>}
                            color={getPermissionsColour(props.permissions.customers)}
                            text={<ul style={{ margin: 0, paddingLeft: 'var(--large-gap)' }}>
                                <li>Customers</li>
                                <li>Sites</li>
                                <li>Equipment</li>
                                <li>Contracts</li>
                                <li>Contacts</li>
                            </ul>}
                        />
                    </InnerContainer>
                </section>
                <section>
                    <InnerContainer color={getPermissionsColour(props.permissions.engineer_assets)}>
                        <IconTitleText
                            iconFont="propane_tank"
                            title={<div className="flex">Engineer Asset Pages <UserPermissionLabel permissions={props.permissions.engineer_assets}/></div>}
                            color={getPermissionsColour(props.permissions.engineer_assets)}
                            text={<ul style={{ margin: 0, paddingLeft: 'var(--large-gap)' }}>
                                <li>Refrigerant Bottles</li>
                                <li>Gas/Air Bottles</li>
                                <li>Plant/Tools</li>
                                <li>Vehicles</li>
                            </ul>}
                        />
                    </InnerContainer>
                </section>
                <section>
                    <InnerContainer color={getPermissionsColour(props.permissions.engineer_data)}>
                        <IconTitleText
                            iconFont="timer"
                            title={<div className="flex">Engineer Data Pages <UserPermissionLabel permissions={props.permissions.engineer_data}/></div>}
                            color={getPermissionsColour(props.permissions.engineer_data)}
                            text={<ul style={{ margin: 0, paddingLeft: 'var(--large-gap)' }}>
                                <li>Engineer Equipment Details</li>
                                <li>Engineer Resources</li>
                                <li>Post-completion Change Requests</li>
                                <li>Timegrids</li>
                                <li>Van Replenishment Requests</li>
                            </ul>}
                        />
                    </InnerContainer>
                </section>
                <section>
                    <InnerContainer color={getPermissionsColour(props.permissions.iso)}>
                        <IconTitleText
                            iconFont="iso"
                            title={<div className="flex">ISO Pages <UserPermissionLabel permissions={props.permissions.iso}/></div>}
                            color={getPermissionsColour(props.permissions.iso)}
                            text={<ul style={{ margin: 0, paddingLeft: 'var(--large-gap)' }}>
                                <li>Non-conformance Reports</li>
                                <li>RAMS Administration</li>
                            </ul>}
                        />
                    </InnerContainer>
                </section>
                <section>
                    <InnerContainer color={getPermissionsColour(props.permissions.quotes)}>
                        <IconTitleText
                            iconFont="request_quote"
                            title={<div className="flex">Quote Pages <UserPermissionLabel permissions={props.permissions.quotes}/></div>}
                            color={getPermissionsColour(props.permissions.quotes)}
                            text={<ul style={{ margin: 0, paddingLeft: 'var(--large-gap)' }}>
                                <li>Quotes</li>
                                <li>Jobs</li>
                            </ul>}
                        />
                    </InnerContainer>
                </section>
                <section>
                    <InnerContainer color={getPermissionsColour(props.permissions.rams)}>
                        <IconTitleText
                            iconFont="assignment_late"
                            title={<div className="flex">RAMS Pages <UserPermissionLabel permissions={props.permissions.rams}/></div>}
                            color={getPermissionsColour(props.permissions.rams)}
                            text={<ul style={{ margin: 0, paddingLeft: 'var(--large-gap)' }}>
                                <li>Risk Assessment Method Statement</li>
                                <li>Risk Assessments</li>
                                <li>Description of Works</li>
                            </ul>}
                        />
                    </InnerContainer>
                </section>
                <section>
                    <InnerContainer color={getPermissionsColour(props.permissions.stock)}>
                        <IconTitleText
                            iconFont="inventory_2"
                            title={<div className="flex">Stock Pages <UserPermissionLabel permissions={props.permissions.stock}/></div>}
                            color={getPermissionsColour(props.permissions.stock)}
                            text={<ul style={{ margin: 0, paddingLeft: 'var(--large-gap)' }}>
                                <li>Products</li>
                                <li>Purchase Orders</li>
                                <li>Requisitions</li>
                                <li>Suppliers/Manufacturers</li>
                                <li>Supplier Contacts</li>
                            </ul>}
                        />
                    </InnerContainer>
                </section>
                <section>
                    <InnerContainer color={getPermissionsColour(props.permissions.system)}>
                        <IconTitleText
                            iconFont="settings"
                            title={<div className="flex">System Pages <UserPermissionLabel permissions={props.permissions.system}/></div>}
                            color={getPermissionsColour(props.permissions.system)}
                            text={<ul style={{ margin: 0, paddingLeft: 'var(--large-gap)' }}>
                                <li>Departments</li>
                                <li>Users</li>
                                <li>Cost Centres</li>
                                <li>Equipment Types</li>
                                <li>Additional Time Activities</li>
                                <li>Invoice Types</li>
                                <li>Product Categories</li>
                                <li>Refrigerants, Gas/Air</li>
                                <li>Plant/Tools Types</li>
                                <li>System Administration</li>
                            </ul>}
                        />
                    </InnerContainer>
                </section>
                <section>
                    <InnerContainer color={getPermissionsColour(props.permissions.templates)}>
                        <IconTitleText
                            iconFont="integration_instructions"
                            title={<div className="flex">Template Pages <UserPermissionLabel permissions={props.permissions.templates}/></div>}
                            color={getPermissionsColour(props.permissions.templates)}
                            text={<ul style={{ margin: 0, paddingLeft: 'var(--large-gap)' }}>
                                <li>Method Statement Templates</li>
                                <li>Risk Assessment Templates</li>
                                <li>Template Headers/Footers</li>
                            </ul>}
                        />
                    </InnerContainer>
                </section>
                <section>
                    <InnerContainer color={getPermissionsColour(props.permissions.tickets)}>
                        <IconTitleText
                            iconFont="confirmation_number"
                            title={<div className="flex">Ticket Pages <UserPermissionLabel permissions={props.permissions.tickets}/></div>}
                            color={getPermissionsColour(props.permissions.tickets)}
                            text={<ul style={{ margin: 0, paddingLeft: 'var(--large-gap)' }}>
                                <li>Callout Tickets</li>
                                <li>Planned Maintenance Tickets</li>
                            </ul>}
                        />
                    </InnerContainer>
                </section>
            </section>
        </>
    )
}

export default UserPermissions