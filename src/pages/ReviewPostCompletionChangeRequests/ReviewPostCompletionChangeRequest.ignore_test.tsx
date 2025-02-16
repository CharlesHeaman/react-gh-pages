import { fireEvent, render, screen, waitFor } from "@testing-library/react"
import PostCompletionChangeRequestPage from "./PostCompletionChangeRequestPage"
import Router from 'react-router';
import { MemoryRouter } from "react-router-dom";
import mockAxios from 'jest-mock-axios';
import mockHeaders from "../../../jest/mockHeaders";
import '../../__mocks__/intersectionObserverMock';

jest.mock('react-router', () => ({
    ...jest.requireActual('react-router'),
    useParams: jest.fn(),
}));

const pendingRequestData = {
    id:	1,
    object:	"post_completion_change_request",
    url: "http://localhost:4002/api/post_completion_change_requests/8",
    data_updated_at: "2023-05-15T11:59:18.000Z",
    data: { 
        status:	0,
        ticket_id: 73609,
        ticket_type: 0,
        created_by_id: 172,
        text: "I forgot to record refrigerant decant.",
        created_at:	"2023-05-11T10:10:14.000Z",
        response_at: null,
        response_by_id:	null
    }
}

const acceptedRequestData = {
    id:	1,
    object:	"post_completion_change_request",
    url: "http://localhost:4002/api/post_completion_change_requests/8",
    data_updated_at: "2023-05-15T11:59:18.000Z",
    data: { 
        status:	1,
        ticket_id: 73609,
        ticket_type: 0,
        created_by_id: 172,
        text: "I forgot to record refrigerant decant.",
        created_at:	"2023-05-11T10:10:14.000Z",
        response_at: "2023-05-13T11:59:18.000Z",
        response_by_id:	34
    }
}

const deniedRequestData = {
    id:	1,
    object:	"post_completion_change_request",
    url: "http://localhost:4002/api/post_completion_change_requests/8",
    data_updated_at: "2023-05-15T11:59:18.000Z",
    data: { 
        status:	-1,
        ticket_id: 73609,
        ticket_type: 0,
        created_by_id: 172,
        text: "I forgot to record refrigerant decant.",
        created_at:	"2023-05-11T10:10:14.000Z",
        response_at: "2023-05-13T11:59:18.000Z",
        response_by_id:	34
    }
}

const createdByUserData = {
    id: 172,
    fullName: "Steven Marshfield",
    jobTitle: "",
    email: "charlesheaman2@gmail.com",
    emailFooter: "",
    department: 1,
    vehicleTrackerID: null,
    homeTrackerSiteID: ""
}

const responseByUserData = {
    id: 172,
    fullName: "Charles Heaman",
    jobTitle: "",
    email: "charlesheaman2@gmail.com",
    emailFooter: "",
    department: 1,
    vehicleTrackerID: null,
    homeTrackerSiteID: ""
}

const timegridData = {
    status: -1,
    tickets: [],
    engineer: {
        id: 172
    }
}

const timegridLockedData = {
    status: 2,
    tickets: [],
    engineer: {
        id: 172
    }
}

const ticketData = {
    startDate: "2023-05-10T10:10:14.000Z",
    id: 73609,
    number: 51319,
    ticketType: 0
}

beforeEach(() => {
    jest.spyOn(Router, 'useParams').mockReturnValue({ departmentName: 'service', requestID: '1' });
});

const mockGetPending = () => {
    expect(mockAxios.get).toHaveBeenCalledWith(`${process.env.REACT_APP_API_URL}/api/post_completion_change_requests/1`, {
        "headers": mockHeaders,
        "params": {}
    });

    mockAxios.mockResponseFor({ 
        url: `${process.env.REACT_APP_API_URL}/api/post_completion_change_requests/1` 
    }, {
        data: pendingRequestData
    });
}

const mockGetAccepted = () => {
    expect(mockAxios.get).toHaveBeenCalledWith(`${process.env.REACT_APP_API_URL}/api/post_completion_change_requests/1`, {
        "headers": mockHeaders,
        "params": {}
    });

    mockAxios.mockResponseFor({ 
        url: `${process.env.REACT_APP_API_URL}/api/post_completion_change_requests/1` 
    }, {
        data: acceptedRequestData
    });
}

const mockGetDenied = () => {
    expect(mockAxios.get).toHaveBeenCalledWith(`${process.env.REACT_APP_API_URL}/api/post_completion_change_requests/1`, {
        "headers": mockHeaders,
        "params": {}
    });

    mockAxios.mockResponseFor({ 
        url: `${process.env.REACT_APP_API_URL}/api/post_completion_change_requests/1` 
    }, {
        data: deniedRequestData
    });
}

const mockPutAccept = () => {
    expect(mockAxios.put).toHaveBeenCalledWith(`${process.env.REACT_APP_API_URL}/api/post_completion_change_requests/1/respond`, {
        accepted: true
    }, {
        "headers": mockHeaders,
        "params": {}
    });

    mockAxios.mockResponseFor({ 
        url: `${process.env.REACT_APP_API_URL}/api/post_completion_change_requests/1/respond`
    }, {
        data: acceptedRequestData
    });
}

const mockPutDeny = () => {
    expect(mockAxios.put).toHaveBeenCalledWith(`${process.env.REACT_APP_API_URL}/api/post_completion_change_requests/1/respond`, {
        accepted: false
    }, {
        "headers": mockHeaders,
        "params": {}
    });

    mockAxios.mockResponseFor({ 
        url: `${process.env.REACT_APP_API_URL}/api/post_completion_change_requests/1/respond`
    }, {
        data: deniedRequestData
    });
}

const mockGetCreatedBy = () => {
    expect(mockAxios.get).toHaveBeenCalledWith(`${process.env.REACT_APP_API_URL}/api/oldUsers/172`, {
        "headers": mockHeaders,
        "params": {}
    });

    mockAxios.mockResponseFor({ 
        url: `${process.env.REACT_APP_API_URL}/api/oldUsers/172`
    }, {
        data: createdByUserData
    });
}

const mockGetResponseBy = () => {
    expect(mockAxios.get).toHaveBeenCalledWith(`${process.env.REACT_APP_API_URL}/api/oldUsers/34`, {
        "headers": mockHeaders,
        "params": {}
    });

    mockAxios.mockResponseFor({ 
        url: `${process.env.REACT_APP_API_URL}/api/oldUsers/34`
    }, {
        data: responseByUserData
    });
}

const mockGetTicket = () => {
    expect(mockAxios.get).toHaveBeenCalledWith(`${process.env.REACT_APP_API_URL}/api/oldTickets/73609/0`, {
        "headers": mockHeaders,
        "params": {}
    });

    mockAxios.mockResponseFor({ 
        url: `${process.env.REACT_APP_API_URL}/api/oldTickets/73609/0`
    }, {
        data: ticketData
    });
}

const mockGetTimegrid = () => {
    expect(mockAxios.get).toHaveBeenCalledWith(`${process.env.REACT_APP_API_URL}/api/oldTimegrids/2023-05-10/172/review`, {
        "headers": mockHeaders,
        "params": {}
    });

    mockAxios.mockResponseFor({ 
        url: `${process.env.REACT_APP_API_URL}/api/oldTimegrids/2023-05-10/172/review`
    }, {
        data: timegridData
    });
}

const mockGetLockedTimegrid = () => {
    expect(mockAxios.get).toHaveBeenCalledWith(`${process.env.REACT_APP_API_URL}/api/oldTimegrids/2023-05-10/172/review`, {
        "headers": mockHeaders,
        "params": {}
    });

    mockAxios.mockResponseFor({ 
        url: `${process.env.REACT_APP_API_URL}/api/oldTimegrids/2023-05-10/172/review`
    }, {
        data: timegridLockedData
    });
}


describe('The Review post_completion_change_requests component', () => {
    it('displays the pending data', async () => {
        render(
            <MemoryRouter initialEntries={[`service/reviewPostCompletionChangeRequest/1`]}>
                <PostCompletionChangeRequestPage addNotification={() => null}/>
            </MemoryRouter>
        )

        mockGetPending();
        mockGetCreatedBy();
        mockGetTicket();
        mockGetTimegrid();

        await waitFor(() => {
            expect(screen.getByText('Request Information')).toBeInTheDocument();
        })

        expect(screen.getAllByText('Pending')[0]).toBeInTheDocument();
        expect(screen.getByText('10/05/2023')).toBeInTheDocument();
        expect(screen.getAllByText('#51319')[0]).toBeInTheDocument();
        expect(screen.getAllByText('Request by Steven Marshfield on 11/05/2023')[0]).toBeInTheDocument();
        expect(screen.getByText('No Tickets')).toBeInTheDocument();
        expect(screen.getByText('I forgot to record refrigerant decant.')).toBeInTheDocument();
    });

    it('displays the accepted data', async () => {
        render(
            <MemoryRouter initialEntries={[`service/reviewPostCompletionChangeRequest/1`]}>
                <PostCompletionChangeRequestPage addNotification={() => null}/>
            </MemoryRouter>
        )

        mockGetAccepted();
        mockGetCreatedBy();
        mockGetResponseBy();
        mockGetTicket();
        mockGetTimegrid();

        await waitFor(() => {
            expect(screen.getByText('Request Information')).toBeInTheDocument();
        })

        expect(screen.getAllByText('Accepted')[0]).toBeInTheDocument();
        expect(screen.getByText('Charles Heaman')).toBeInTheDocument();
        expect(screen.getByText('13/05/2023')).toBeInTheDocument();
    });

    it('displays the denied data', async () => {
        render(
            <MemoryRouter initialEntries={[`service/reviewPostCompletionChangeRequest/1`]}>
                <PostCompletionChangeRequestPage addNotification={() => null}/>
            </MemoryRouter>
        )

        mockGetDenied();
        mockGetCreatedBy();
        mockGetResponseBy();
        mockGetTicket();
        mockGetTimegrid();

        await waitFor(() => {
            expect(screen.getByText('Request Information')).toBeInTheDocument();
        })

        expect(screen.getAllByText('Denied')[0]).toBeInTheDocument();
        expect(screen.getByText('Charles Heaman')).toBeInTheDocument();
        expect(screen.getByText('13/05/2023')).toBeInTheDocument();
    });

    it('can accept pending request', async () => {
        render(
            <MemoryRouter initialEntries={[`service/reviewPostCompletionChangeRequest/1`]}>
                <PostCompletionChangeRequestPage addNotification={() => null}/>
            </MemoryRouter>
        )

        mockGetPending();
        mockGetCreatedBy();
        mockGetTicket();
        mockGetTimegrid();

        await waitFor(() => {
            expect(screen.getByText('Accept Request')).toBeInTheDocument();
        })

        fireEvent (
            screen.getByText('Accept Request'),
            new MouseEvent('click', {
                bubbles: true,
                cancelable: true,
            })
        )

        fireEvent(screen.getByRole('button', {
            name: 'Accept Request'
        }),
            new MouseEvent('click', {
                bubbles: true,
                cancelable: true,
            })
        )

        mockPutAccept();
        mockGetCreatedBy();
        mockGetResponseBy();
        mockGetTicket();
        mockGetTimegrid();

        await waitFor(() => {
            expect(screen.getAllByText('Accepted')[0]).toBeInTheDocument();
        })

    });

    it('can deny pending request', async () => {
        render(
            <MemoryRouter initialEntries={[`service/reviewPostCompletionChangeRequest/1`]}>
                <PostCompletionChangeRequestPage addNotification={() => null}/>
            </MemoryRouter>
        )

        mockGetPending();
        mockGetCreatedBy();
        mockGetTicket();
        mockGetTimegrid();

        await waitFor(() => {
            expect(screen.getByText('Deny Request')).toBeInTheDocument();
        })

        fireEvent (
            screen.getByText('Deny Request'),
            new MouseEvent('click', {
                bubbles: true,
                cancelable: true,
            })
        )

        fireEvent(screen.getByRole('button', {
            name: 'Deny Request'
        }),
            new MouseEvent('click', {
                bubbles: true,
                cancelable: true,
            })
        )

        mockPutDeny();
        mockGetCreatedBy();
        mockGetResponseBy();
        mockGetTicket();
        mockGetTimegrid();

        await waitFor(() => {
            expect(screen.getAllByText('Denied')[0]).toBeInTheDocument();
        })

    });

    it('displays locked by timegrid', async () => {
        render(
            <MemoryRouter initialEntries={[`service/reviewPostCompletionChangeRequest/1`]}>
                <PostCompletionChangeRequestPage addNotification={() => null}/>
            </MemoryRouter>
        )

        mockGetPending();
        mockGetCreatedBy();
        mockGetTicket();
        mockGetLockedTimegrid();

        await waitFor(() => {
            expect(screen.getByText('Acceptance locked as engineer has submitted timegrid.')).toBeInTheDocument();
        })

        expect(screen.queryByText('Accept Request')).not.toBeInTheDocument();
    })

    it('disabled response after acceptance', async () => {
        render(
            <MemoryRouter initialEntries={[`service/reviewPostCompletionChangeRequest/1`]}>
                <PostCompletionChangeRequestPage addNotification={() => null}/>
            </MemoryRouter>
        )

        mockGetAccepted();
        mockGetCreatedBy();
        mockGetResponseBy();
        mockGetTicket();
        mockGetLockedTimegrid();

        expect(screen.queryByText('Accept Request')).not.toBeInTheDocument();
        expect(screen.queryByText('Deny Request')).not.toBeInTheDocument();
    });

    it('disabled response after denied', async () => {
        render(
            <MemoryRouter initialEntries={[`service/reviewPostCompletionChangeRequest/1`]}>
                <PostCompletionChangeRequestPage addNotification={() => null}/>
            </MemoryRouter>
        )

        mockGetDenied();
        mockGetCreatedBy();
        mockGetResponseBy();
        mockGetTicket();
        mockGetLockedTimegrid();

        expect(screen.queryByText('Accept Request')).not.toBeInTheDocument();
        expect(screen.queryByText('Deny Request')).not.toBeInTheDocument();
    })
})