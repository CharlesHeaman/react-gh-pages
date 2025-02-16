import OuterContainer from "../../components/ui/Containers/OuterContainer/OuterContainer";
import UnderDevelopment from "../../components/ui/UnderDevelopment/UnderDevelopment";

const HomePage = ()  => {
    return (
        <OuterContainer
            title="Home"
            maxWidth={600}
        >
            <UnderDevelopment/>
        </OuterContainer>
    )
}

export default HomePage