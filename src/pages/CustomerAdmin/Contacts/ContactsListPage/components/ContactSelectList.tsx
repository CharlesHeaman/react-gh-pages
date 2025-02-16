import PaginationNavigation from "../../../../../components/ui/PaginationNavigation/PaginationNavigation"
import SearchHelperText from "../../../../../components/ui/SearchHelperText/SearchHelperText"
import SearchTable from "../../../../../components/ui/SearchTable/SearchTable"
import { ContactCollectionResponse } from "../../../../../types/contact.types"
import ContactRowSkeleton from "./ContactRowSkeleton"
import ContactSelectRow from "./ContactSelectRow"

const ContactSelectList = (props: {
    hasSearched: boolean,
    isContactsLoading: boolean,
    contacts: ContactCollectionResponse | undefined,
    selectedIDs: Array<number>,
    updateSelection: (siteID: number) => void,
    perPage: number,
    totalCount?: number,
    showAdvancedSearch?: () => void
}) => {
    // Resource Constants
    const resourceName = "contacts";
    const resourceIcon = "contact_phone";

    const isLoading = (
        props.isContactsLoading
    )

    return (
        <div>
            {props.hasSearched ?
                <SearchTable
                    headers={['', 'Name', 'Email', 'Telephone', 'Mobile']}
                    isLoading={!(!isLoading && props.contacts)}
                    skeletonRow={<ContactRowSkeleton/>}
                    skeletonCount={Math.min(props.perPage, props.totalCount ? props.totalCount : Infinity)}
                    count={props.contacts ? props.contacts.data.length : 0}
                    resourceName={resourceName}
                    resourceIconFont={resourceIcon}
                    body={props.contacts && props.contacts.data.map((contact, index) => 
                        <ContactSelectRow 
                            contact={contact}
                            selected={props.selectedIDs.includes(contact.id)}
                            updateSelection={props.updateSelection}
                            key={index}
                        />  
                    )}
                    selectTable
                />
                :
                props.showAdvancedSearch ? <SearchHelperText
                    iconFont={resourceIcon}
                    text="Search contacts by name"
                    showAdvanced={props.showAdvancedSearch}
                /> : null
            }
        </div>
    )
}

export default ContactSelectList