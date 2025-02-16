import { useNavigate } from "react-router-dom";
import GridItemWrapper from "../../components/ui/Containers/GridWrapper/GridItemWrapper";
import GridWrapper from "../../components/ui/Containers/GridWrapper/GridWrapper";
import OuterContainer from "../../components/ui/Containers/OuterContainer/OuterContainer";
import IconTitleText from "../../components/ui/IconTitleText/IconTitleText";

const SystemAdministrationPage = () => {
    const navigate = useNavigate();

    const description = 'Configure system settings and manage system resources.'

    return (
        <OuterContainer
            title='System Administration'
            description={description}
            maxWidth={1600}
            noBorder
        >
            <div className="page-grid no-side">
                <div className="page-main">
                    <GridWrapper>
                        <GridItemWrapper
                            clickFunc={() => navigate('departments')}
                        >
                            <IconTitleText
                                iconFont="dashboard"
                                title="Departments"
                                text="Create, edit and deactivate departments. Manage department rates. Enable and disable department specific modules."
                            />
                        </GridItemWrapper>
                        <GridItemWrapper
                            clickFunc={() => navigate('users')}
                        >
                            <IconTitleText
                                iconFont="account_circle"
                                title="Users"
                                text="Create, edit and deactivate users. Manage user permissions. View user activity."
                            />
                        </GridItemWrapper>
                        <GridItemWrapper
                            clickFunc={() => navigate('templates')}
                        >
                            <IconTitleText
                                iconFont="integration_instructions"
                                title="Templates"
                                text="Create, edit and deactivate templates."
                            />
                        </GridItemWrapper>
                        <GridItemWrapper
                            clickFunc={() => navigate('cost_centres')}
                        >
                            <IconTitleText
                                iconFont="point_of_sale"
                                title="Cost Centres"
                                text="Create, edit and deactivate cost centres. Manage cost centre associated resources and departments."
                            />
                        </GridItemWrapper>
                        <GridItemWrapper
                            clickFunc={() => navigate('equipment_types')}
                        >
                            <IconTitleText
                                iconFont="local_laundry_service"
                                title="Equipment Types"
                                text="Create, edit and deactivate equipment types. Equipment types are used to help automate maintenance quotes and predict maintenance time for equipment."
                            />
                        </GridItemWrapper>
                        <GridItemWrapper
                            clickFunc={() => navigate('additional_time_activities')}
                        >
                            <IconTitleText
                                iconFont="more_time"
                                title="Additional Time Activities"
                                text="Create, edit and deactivate additinal time activities."
                            />
                        </GridItemWrapper>
                        <GridItemWrapper
                            clickFunc={() => navigate('invoice_types')}
                        >
                            <IconTitleText
                                iconFont="credit_card"
                                title="Invoice Types"
                                text="Create, edit and deactivate invoice types. Manage how invoice charge is calculated for tickets."
                            />
                        </GridItemWrapper>
                        <GridItemWrapper
                            clickFunc={() => navigate('product_categories')}
                        >
                            <IconTitleText
                                iconFont="inventory_2"
                                title="Product Categories"
                                text="Create, edit and deactivate product categories."
                            />
                        </GridItemWrapper>
                        <GridItemWrapper
                            clickFunc={() => navigate('refrigerants')}
                        >
                            <IconTitleText
                                iconFont="propane"
                                title="Refrigerants, Gas/Air"
                                text="Create, edit and deactivate refrigerants, gas/air. Manage refrigerant, gas/air associated products."
                            />
                        </GridItemWrapper>
                        <GridItemWrapper
                            clickFunc={() => navigate('plant_equipment_types')}
                        >
                            <IconTitleText
                                iconFont="handyman"
                                title="Plant/Tools Types"
                                text="Create, edit and plant/tools types. Manage PAT, calibration, inspection and maintenance requirements and frequency."
                            />
                        </GridItemWrapper>
                        <GridItemWrapper
                            clickFunc={() => navigate('administration')}
                        >
                            <IconTitleText
                                iconFont="settings"
                                title="System Administration"
                                text="Manage system settings."
                            />
                        </GridItemWrapper>
                    </GridWrapper>
                </div>
            </div>
        </OuterContainer>
    )
}

export default SystemAdministrationPage