import { ChangeEvent, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import FormWizardFlex, { FormStep } from "../../../../components/form/FormWizardFlex";
import OuterContainer from "../../../../components/ui/Containers/OuterContainer/OuterContainer";
import { DepartmentResponseData } from "../../../../types/department.types";
import { CreateUserAttributes, UserResponseData, } from "../../../../types/user.types";
import postAPI from "../../../../utils/postAPI";
import updateStateCheckboxParams from "../../../../utils/updateStateParams/updateStateCheckboxParams";
import updateStateParams from "../../../../utils/updateStateParams/updateStateParams";
import UserDetailsForm from "./UserDetailsForm";
import UserContactDetailsForm from "./UserContactDetailsForm";
import UserHomeForm from "./UserHomeForm";
import { Coordinates } from "../../../../types/sites.types";
import isUserHomeFormValid from "./utils/isUserHomeFormValid";
import isUserContactDetailsFormValid from "./utils/isUserContactDetailsFormValid";
import isUserDetailsFormValid from "./utils/isUserDetailsFormValid";
import checkUniqueUsername from "./utils/checkUniqueUsername";
import UserInformationDetails from "../UserPage/components/UserInformationDetails";
import UserContactInformation from "../UserPage/components/UserContactInformation";
import UserHomeInformation from "../UserPage/components/UserHomeInformation";

const CreateUserPage = () => {
    const navigate = useNavigate();

    const [isCreating, setIsCreating] = useState(false);
    const [maxStepSubmitted, setMaxStepSubmitted] = useState(0);
    const [userDetails, setUserDetails] = useState<CreateUserAttributes>({
        username: '',
        job_title: '',
        first_name: '',
        last_name: '',
        is_engineer: false,
        notes: '',
        email: '',
        mobile: '',
        address: '',
        postcode: '',
        coordinates: {
            lat: 0,
            lng: 0
        }
    });
    const [departmentData, setDepartmentData] = useState<DepartmentResponseData>();
    const [, setIsUsernameLoading] = useState(false);
    const [usernameUnique, setUsernameUnique] = useState(false);

    
    const updateParams = (event: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement> | ChangeEvent<HTMLTextAreaElement>) => {
        updateStateParams(event, setUserDetails)
    }

    const updateCheckboxParams = (event: ChangeEvent<HTMLInputElement>) => {
        updateStateCheckboxParams(event, setUserDetails)
    }

    const updateCoordinates = (coordinates: Coordinates) => {
        setUserDetails((prevState: any) => {
            return {
                ...prevState, 
                coordinates: coordinates
            }
        });
    }

    const createUser = () => {
        postAPI('users/create', {}, {
            ...userDetails,
            department_id: departmentData?.id
        }, (response: any) => {
            const userData: UserResponseData = response.data;
            navigate(`../${userData.data.username}`, { relative: 'path' })
        }, setIsCreating)
    }

    const formSteps: Array<FormStep> = [
        {
            header: 'User Details',
            form: <UserDetailsForm
                userDetails={userDetails}
                selectedDepartment={departmentData}
                setSelectedDepartment={setDepartmentData}
                updateParams={updateParams}
                updateCheckboxParams={updateCheckboxParams}
                isUsernameUnique={usernameUnique}
                checkUniqueUsername={() => checkUniqueUsername(userDetails.username, setUsernameUnique, setIsUsernameLoading)}
                showErrors={maxStepSubmitted > 0}
            />, 
            isComplete: isUserDetailsFormValid(userDetails, usernameUnique)
        },
        {
            header: 'Contact Details',
            form: <UserContactDetailsForm
                userDetails={userDetails}
                updateParams={updateParams}
                showErrors={maxStepSubmitted > 1}
            />, 
            isComplete: isUserContactDetailsFormValid(userDetails)
        },
        {
            header: 'Home',
            form: <UserHomeForm
                userDetails={userDetails}
                updateParams={updateParams}
                updateCoordinates={updateCoordinates}
                showErrors={maxStepSubmitted > 2}
            />, 
            isComplete: isUserHomeFormValid(userDetails)
        },
        {
            header: 'Review Information',
            form: <>
                <UserInformationDetails
                    userData={{
                        ...userDetails
                    }}
                    department={departmentData}
                />
                <hr/>
                <UserContactInformation
                    userData={{
                        ...userDetails
                    }}                
                />
                <hr/>
                <UserHomeInformation
                    userData={{
                        ...userDetails
                    }}                
                />
            </>,
            isComplete: true
        }, 
    ]

    return (
        <>
            <OuterContainer
                title='Create User'
                maxWidth={1000}
                description="Complete this form to create a user."
            >
                <FormWizardFlex
                    steps={formSteps}
                    maxStepSubmitted={maxStepSubmitted}
                    setMaxStepSubmitted={setMaxStepSubmitted}
                    resourceName="User"
                    isCreating={isCreating}
                    createFunc={createUser}
                />
            </OuterContainer>
        </>
    )
}

export default CreateUserPage