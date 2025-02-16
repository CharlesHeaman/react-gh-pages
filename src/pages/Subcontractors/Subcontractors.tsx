import OuterContainer from "../../components/ui/Containers/OuterContainer/OuterContainer";
import Header from "../../components/ui/Structure/Header/Header";
import UnderDevelopment from "../../components/ui/UnderDevelopment/UnderDevelopment";

function Subcontractors() {
    return (
        <>
            <Header
                links={[
                        {
                            to: 'sub_contractors',
                            text: 'Sub-contractors'
                        }
                    ]}
            />
            <OuterContainer
                title='Sub-contractors'
                maxWidth={500}
            >
                <UnderDevelopment/>
            </OuterContainer>
        </>
    )
}

export default Subcontractors