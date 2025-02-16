import { fireEvent, render, screen, waitForElementToBeRemoved } from "@testing-library/react"
import { Actions } from "./PostCompletionChangeRequestActions"
import mockAxios from 'jest-mock-axios';
import mockHeaders from "../../../../../jest/mockHeaders";

describe('The Actions container', () => {
    it('displays the actions heading', () => {
        render(<Actions
            requestID={0}
            canAccept={true}
            requestUpdateResponse={() => null}
            addNotification={() => null}
        />)

        expect(screen.getByText('Actions')).toBeInTheDocument();
    });

    it(`doesn't display the accept if acceptance is locked`, () => {
        render(<Actions
            requestID={0}
            canAccept={false}
            requestUpdateResponse={() => null}
            addNotification={() => null}
        />)

        expect(screen.queryByText('Accept Request')).not.toBeInTheDocument();
    });

    it(`can show and hide accept request`, () => {
        render(<Actions
            requestID={0}
            canAccept={true}
            requestUpdateResponse={() => null}
            addNotification={() => null}
        />)

        fireEvent(
            screen.getByText('Accept Request'),
            new MouseEvent('click', {
                bubbles: true,
                cancelable: true,
            })
        )

        expect(screen.getByText('Accept Request?')).toBeInTheDocument();

        fireEvent(
            screen.getByText('close'),
            new MouseEvent('click', {
                bubbles: true,
                cancelable: true,
            })
        )

        expect(screen.queryByText('Accept Request?')).not.toBeInTheDocument();
    });

    it(`can show and hide deny request`, () => {
        render(<Actions
            requestID={1}
            canAccept={true}
            requestUpdateResponse={() => null}
            addNotification={() => null}
        />)

        fireEvent(
            screen.getByText('Deny Request'),
            new MouseEvent('click', {
                bubbles: true,
                cancelable: true,
            })
        )

        expect(screen.getByText('Deny Request?')).toBeInTheDocument();

        fireEvent(
                screen.getByText('close'),
            new MouseEvent('click', {
                bubbles: true,
                cancelable: true,
            })
        )
        
        expect(screen.queryByText('Deny Request?')).not.toBeInTheDocument();
    });

    it(`can call the accept update response function`, async () => {
        const requestUpdateResponse = jest.fn()

        render(<Actions
            requestID={1}
            canAccept={true}
            requestUpdateResponse={requestUpdateResponse}
            addNotification={() => null}
        />)

        fireEvent(
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

        expect(mockAxios.put).toHaveBeenCalledWith(`${process.env.REACT_APP_API_URL}/api/post_completion_change_requests/1/respond`, {
            "accepted": true
        }, {
            "headers": mockHeaders,
            "params": {}
        });

        mockAxios.mockResponse({
            data: {}
        });

        await waitForElementToBeRemoved(() => screen.queryByText('Accepting...'))

        expect(requestUpdateResponse).toBeCalled();
    }); 

    it(`can call the deny update response function`, async () => {
        const requestUpdateResponse = jest.fn()

        render(<Actions
            requestID={1}
            canAccept={true}
            requestUpdateResponse={requestUpdateResponse}
            addNotification={() => null}
        />)

        fireEvent(
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

        expect(mockAxios.put).toHaveBeenCalledWith(`${process.env.REACT_APP_API_URL}/api/post_completion_change_requests/1/respond`, {
            "accepted": false
        }, {
            "headers": mockHeaders,
            "params": {}
        });

        mockAxios.mockResponse({
            data: {}
        });

        await waitForElementToBeRemoved(() => screen.queryByText('Denying...'))

        expect(requestUpdateResponse).toBeCalled();
    }); 
});