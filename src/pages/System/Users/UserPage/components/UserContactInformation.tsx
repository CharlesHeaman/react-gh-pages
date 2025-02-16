import GridItem from "../../../../../components/ui/Containers/GridItem/GridItem"
import InfoGrid from "../../../../../components/ui/Containers/InfoGrid/InfoGrid"
import EmailLink from "../../../../../components/ui/EmailLink/EmailLink"
import TelephoneLink from "../../../../../components/ui/TelephoneLink/TelephoneLink"
import { User } from "../../../../../types/user.types"

const UserContactInformation = (props: {
    userData: User
}) => {
    return (
        <section>
            <h2>Contact Details</h2>
            <InfoGrid>
                <GridItem title='Email' span={4}>
                    <p><EmailLink email={props.userData.email}/></p>
                </GridItem>
                <GridItem title='Mobile' span={2}>
                    <p><TelephoneLink number={props.userData.mobile}/></p>
                </GridItem>
            </InfoGrid>
        </section>
    )
}

export default UserContactInformation