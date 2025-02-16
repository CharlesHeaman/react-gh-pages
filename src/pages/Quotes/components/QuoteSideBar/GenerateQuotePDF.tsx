import WindowOverlay from "../../../../components/ui/Containers/WindowOverlay/WindowOverlay";
import Loading from "../../../../components/ui/Loading/Loading";

const GenerateQuotePDF = (props: {
    show: boolean,
}) => {
    return (
        <WindowOverlay
            title='Generating PDF'
            show={props.show}
            maxWidth={300}
        >
            <div style={{ minHeight: '250px' }}>
                <Loading text='Generating PDF...'/>
            </div>
        </WindowOverlay>
    )
}

export default GenerateQuotePDF