import InnerContainer from "../../../../components/ui/Containers/InnerContainer/InnerContainer"
import IconTitleText from "../../../../components/ui/IconTitleText/IconTitleText"
import { TimegridAuthorisationSignatureResponseData } from "../../../../types/timegridAuthorisationSignatures.types"
import { UserResponseData } from "../../../../types/user.types"

const Authorisation = (props: {
    timegridAuthorisationData: Array<TimegridAuthorisationSignatureResponseData>,
    requiredSignatureCount: number,
    timegridAuthorisationUserData: Array<UserResponseData>
}) => {

    const isAuthorised = props.timegridAuthorisationData.length >= props.requiredSignatureCount
    return (
        <>
            <section>
                <h2>Authorisation</h2>
                <InnerContainer color={isAuthorised ? 'purple' : 'red'}>
                    <IconTitleText
                        iconFont='badge'
                        color={isAuthorised ? 'purple' : 'red'}
                        title={`${props.timegridAuthorisationData.length}/${props.requiredSignatureCount} Authorisation Signatures Received`}
                        text={isAuthorised ? 'This timegrid has received sufficient signatures to receive authorisation.' : 'This timegrid has outstanding authorisation signatures.'}
                    />
                </InnerContainer>
            </section>
            <hr/>
        </>
    )
}

export default Authorisation