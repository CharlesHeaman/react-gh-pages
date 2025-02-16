import { useSearchParams } from "react-router-dom";
import SubmitButton from "../../../../../../components/form/SubmitButton/SubmitButton";

const Navigation = () => {
    const [searchParams, setSearchParams] = useSearchParams();

    return (
        <div className="flex" style={{ marginTop: 'var(--large-gap)'}}>
            <SubmitButton
                text="Next Step" 
                clickFunc={ () => setSearchParams({
                    ...searchParams,
                    step: 'review_submit_data'
                }) }   
                color="dark-blue"
            />
        </div>
    )
}

export default Navigation