import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import MarkdownDisplay from "../../components/form/MarkdownEditor/components/MarkdownDisplay";
import { ContactResponseData } from "../../types/contact.types";
import { CustomerResponseData } from "../../types/customers.types";
import { DescriptionOfWorksResponseData } from "../../types/descriptionOfWorks.types";
import { MethodStatementTemplateCollectionResponse, MethodStatementTemplateResponseData } from "../../types/methodStatementTemplate.types";
import { PersonnelProtectiveEquipmentCollectionResponse, PersonnelProtectiveEquipmentResponseData } from "../../types/personnelProtectiveEquipment.types";
import { RiskAssessmentCollectionResponse, RiskAssessmentResponseData } from "../../types/riskAssessment.types";
import { RiskAssessmentMethodStatementResponseData } from "../../types/riskAssessmentMethodStatements.types";
import { TicketResponseData } from "../../types/tickets.types";
import { UserCollectionResponse, UserResponseData } from "../../types/user.types";
import getAllCodeSnippets, { CodeSnippet } from "../../utils/getAllCodeSnippets";
import getAPI from "../../utils/getAPI";
import replaceCodeSnippetsWithValues from "../../utils/replaceCodeSnippetsWithValues";
import { SiteResponseData } from "../../types/sites.types";

const GenerateMethodStatementPage = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const [isMethodStatementLoading, setIsMethodStatementLoading] = useState(true);
    const [methodStatementTemplateData, setMethodStatementTemplateData] = useState<MethodStatementTemplateResponseData>();
    const [isTicketLoading, setIsTicketLoading] = useState(true);
    const [ticketData, setTicketData] = useState<TicketResponseData>();
    const [isLoadingCustomer, setIsLoadingCustomer] = useState(true);
    const [customerData, setCustomerData] = useState<CustomerResponseData>();
    const [isSiteLoading, setIsSiteLoading] = useState(false);
    const [siteData, setSiteData] = useState<SiteResponseData>();
    const [isDescriptionOfWorksLoading, setIsDescriptionOfWorksLoading] = useState(true);
    const [descriptionOfWorksData, setDescriptionOfWorksData] = useState<DescriptionOfWorksResponseData>();
    const [isEngineersLoading, setIsEngineersLoading] = useState(false);
    const [engineerData, setEngineerData] = useState<Array<UserResponseData>>([]);
    const [isRiskAssessmentAttachmentsLoading, setIsRiskAssessmentAttachmentsLoading] = useState(true);
    const [isRiskAssessmentLoading, setIsRiskAssessmentLoading] = useState(false);
    const [riskAssessmentData, setRiskAssessmentData] = useState<Array<RiskAssessmentResponseData>>([]);
    const [isRequiredPPELoading, setIsRequiredPPELoading] = useState(true);
    const [isPPELoading, setIsPPELoading] = useState(false);
    const [personnelProtectiveEquipmentData, setPersonnelProtectiveEquipmentData] = useState<Array<PersonnelProtectiveEquipmentResponseData>>([]);
    const [isContactLoading, setIsContactLoading] = useState(true);
    const [isUserLoading, setIsUserLoading] = useState(false);

    const [codeSnippets, setCodeSnippets] = useState<Array<CodeSnippet>>([]);
    const [associatedSnippetData, setAssociatedSnippetData] = useState({
        now: Date()
    });

    const ticketID = searchParams.get('ticketID');
    const ticketType = searchParams.get('ticketType');
    const endDate = searchParams.get('endDate');
    const contactID = searchParams.get('contactID');
    const descriptionOfWorksID = searchParams.get('descriptionOfWorksID');
    const riskAssessmentMethodStatementID = searchParams.get('riskAssessmentMethodStatementID');

    useEffect(() => {
        getRiskAssessmentMethodStatement();
        getMethodStatements();
        getTicket();
        getContact();
        getUser();
    }, [ticketID, ticketType, descriptionOfWorksID, contactID, riskAssessmentMethodStatementID]);

    useEffect(() => {
        methodStatementTemplateData && setCodeSnippets(getAllCodeSnippets(methodStatementTemplateData.data.content, associatedSnippetData))
    }, [methodStatementTemplateData, associatedSnippetData])

    const getRiskAssessmentMethodStatement = () => {
        getAPI(`risk_assessment_method_statements/${riskAssessmentMethodStatementID}`, {}, (response: any) => {
            const ramsData: RiskAssessmentMethodStatementResponseData = response.data;
            getDescriptionOfWorks(ramsData.data.sequence_of_operations);
            getRiskAssessments(ramsData.data.attached_risk_assessment_ids);    
            getPersonnelProtectiveEquipment(ramsData.data.required_personnel_protective_equipment_ids)
        }, setIsMethodStatementLoading)
    }

    const getMethodStatements = () => {
        getAPI(`method_statement_templates`, {
            is_default: true
        }, (response: any) => {
            const templateData: MethodStatementTemplateCollectionResponse = response.data;
            if (templateData.data.length > 0) {
                const currentTemplateData = templateData.data[0];
                setMethodStatementTemplateData(currentTemplateData);
            }
        }, setIsMethodStatementLoading)
    }

    const getContact = () => {
        getAPI(`contacts/${contactID}`, {}, (response: any) => {
            const contactData: ContactResponseData = response.data;
            setAssociatedSnippetData(associatedSnippetData => {
                return {
                   ...associatedSnippetData,
                   contact: contactData
                }
            })
        }, setIsContactLoading)
    }

    const getUser = () => {
        getAPI('users/-1', {}, (response: any) => {
            const userData: UserResponseData = response.data;
            setAssociatedSnippetData(associatedSnippetData => {
                return {
                   ...associatedSnippetData,
                   user: userData
                }
            })
        }, setIsUserLoading)
    }

    const getTicket = () => {
        getAPI(`tickets/${ticketType}/${ticketID}`, {}, (response: any) => {
            const ticketData: TicketResponseData = response.data;
            setTicketData(ticketData);
            getCustomerData(ticketData.data.customer_id);
            getSite(ticketData.data.site_id);
            if (ticketData.data.engineers.length > 0) {
                getEngineers([...new Set(ticketData.data.engineers.map(engineerData => engineerData.user_id))]);
            } else {
                setAssociatedSnippetData(associatedSnippetData => {
                    return {
                        ...associatedSnippetData,
                        engineers: []
                    }
                })
            }
            setAssociatedSnippetData(associatedSnippetData => {
                return {
                   ...associatedSnippetData,
                    ticket: {
                        ...ticketData,
                        data: {
                            ...ticketData.data,
                            end_date: new Date(endDate ? endDate : '')
                        }
                    }
                }
            })

        }, setIsTicketLoading)
    }

    const getCustomerData = (customerID: number) => {
        getAPI(`customers/${customerID}`, {}, (response: any) => {
            const customerData: CustomerResponseData = response.data;
            setCustomerData(customerData);
            setAssociatedSnippetData(associatedSnippetData => {
                return {
                   ...associatedSnippetData,
                    customer: customerData
                }
            });
        }, setIsLoadingCustomer);
    }

    const getSite = (siteID: number) => {
        getAPI(`sites/${siteID}`, {}, (response: any) => {
            const siteData: SiteResponseData = response.data;
            setSiteData(siteData);
            setAssociatedSnippetData(associatedSnippetData => {
                return {
                   ...associatedSnippetData,
                    site: siteData
                }
            });
        }, setIsSiteLoading)   
    }

    const getDescriptionOfWorks = (sequenceOfOperations: string) => {
        getAPI(`description_of_works/${descriptionOfWorksID}`, {}, (response: any) => {
            const descriptionOfWorksData: DescriptionOfWorksResponseData = response.data;
            descriptionOfWorksData.data.sequence_of_operations = sequenceOfOperations
            setDescriptionOfWorksData(descriptionOfWorksData);
            setAssociatedSnippetData(associatedSnippetData => {
                return {
                    ...associatedSnippetData,
                    descriptionOfWorks: descriptionOfWorksData
                }
            })
        }, setIsDescriptionOfWorksLoading)
    }

    const getRiskAssessments = (riskAssessmentIDs: Array<number>) => {
        getAPI('risk_assessments', {
            ids: riskAssessmentIDs
        }, (response: any) => {
            const riskAssessmentsData: RiskAssessmentCollectionResponse = response.data;
            setRiskAssessmentData(riskAssessmentsData.data);
            setAssociatedSnippetData(associatedSnippetData => {
                return {
                    ...associatedSnippetData,
                    riskAssessments: riskAssessmentsData.data
                }
            })
        }, setIsRiskAssessmentLoading)
    }

    const getPersonnelProtectiveEquipment = (requiredPPEIDs: Array<number>) => {
        getAPI(`personnel_protective_equipment`, {}, (response: any) => {
            const personnelProtectiveEquipmentData: PersonnelProtectiveEquipmentCollectionResponse = response.data;
            setPersonnelProtectiveEquipmentData(personnelProtectiveEquipmentData.data);
            const ppeData = personnelProtectiveEquipmentData.data.map(ppe => {
                return {
                    ...ppe,
                    data: {
                        ...ppe.data,
                        required: requiredPPEIDs.includes(ppe.id)
                    }
                }
            })
            setAssociatedSnippetData(associatedSnippetData => {
                return {
                    ...associatedSnippetData,
                    personnelProtectiveEquipment: ppeData
                }
            })
        }, setIsPPELoading)
    }

    const getEngineers = (userIDs: Array<number>) => {
        getAPI('users', {
            ids: userIDs
        }, (response: any) => {
            const userData: UserCollectionResponse = response.data;
            setEngineerData(userData.data);
            setAssociatedSnippetData(associatedSnippetData => {
                return {
                    ...associatedSnippetData,
                    engineers: userData.data
                }
            })
        }, setIsEngineersLoading)
    }

    const isLoading = (
        isMethodStatementLoading ||
        isDescriptionOfWorksLoading ||
        isLoadingCustomer ||
        isTicketLoading
    )

    return (
        !isLoading && methodStatementTemplateData ? <MarkdownDisplay 
            markdown={replaceCodeSnippetsWithValues(methodStatementTemplateData.data.content, codeSnippets)}
            isPrint
        /> : null        
    )
}

export default GenerateMethodStatementPage