import { useState, useEffect } from "react"
import MapsMap from "../../../../../components/maps/MapsMap"
import MapsMarker from "../../../../../components/maps/MapsMarker"
import BooleanLabel from "../../../../../components/ui/BooleanLabel/BooleanLabel"
import GridItem from "../../../../../components/ui/Containers/GridItem/GridItem"
import InfoGrid from "../../../../../components/ui/Containers/InfoGrid/InfoGrid"
import DepartmentLabel from "../../../../../components/ui/Department/DepartmentLabel"
import EmailLink from "../../../../../components/ui/EmailLink/EmailLink"
import Label from "../../../../../components/ui/General/Label/Label"
import TelephoneLink from "../../../../../components/ui/TelephoneLink/TelephoneLink"
import { DepartmentResponseData } from "../../../../../types/department.types"
import { UserResponseData } from "../../../../../types/user.types"
import formatMoney from "../../../../../utils/formatMoney"
import UserPermissions from "./UserPermissions"
import InactiveStatus from "../../../../Vehicles/VehiclePage/components/InactiveStatus"
import UserInformationDetails from "./UserInformationDetails"
import UserHomeInformation from "./UserHomeInformation"
import UserContactInformation from "./UserContactInformation"

const UserInformation = (props: {
    user: UserResponseData,
    department: DepartmentResponseData | undefined
}) => {
    return (
        <>
            {!props.user.data.is_active ? <InactiveStatus resourceName='User' inactiveDate={null}/> : null}
            <UserInformationDetails
                userData={props.user.data}
                department={props.department}
            />
            <hr/>
            <UserContactInformation
                userData={props.user.data}
            />
            <hr/>
            <UserHomeInformation
                userData={props.user.data}
            />
            {props.user.data.is_engineer ? <>
                <hr/>
                <section>
                    <h2>Engineer Information</h2>
                    <InfoGrid>
                        <GridItem title='Engineer Code' span={2}>
                            <p>{props.user.data.user_code}</p>
                        </GridItem>
                        <GridItem title='Show In Diary' span={2}>
                            <BooleanLabel true={props.user.data.is_diary_engineer}/>
                        </GridItem>
                        <GridItem title='Submits Timegrid ' span={2}>
                            <BooleanLabel true/>
                        </GridItem>
                    </InfoGrid>
                </section>
                <hr/>
                <section>
                    <h2>Net Charge-out Costs</h2>
                    <InfoGrid>
                        <GridItem title='Rate' span={2}>
                            <p>{formatMoney(props.user.data.rate)}</p>
                        </GridItem>
                        <GridItem title='Overtime Rate' span={2}>
                            <p>{formatMoney(props.user.data.over_time_rate)}</p>
                        </GridItem>
                        <GridItem title='Mileage Rate' span={2}>
                            <p>{formatMoney(props.user.data.mileage_rate)}</p>
                        </GridItem>
                        <GridItem title='Intercompany Rate 1' span={2}>
                            <p>{props.user.data.intercompany_rate_1}%</p>
                        </GridItem>
                        <GridItem title='Intercompany Rate 2' span={2}>
                            <p>{props.user.data.intercompany_rate_2}%</p>
                        </GridItem>
                    </InfoGrid>
                </section>
            </> : null}
            <hr/>
            <UserPermissions
                permissions={props.user.data.permissions}
            />
        </>
    )
}

export default UserInformation