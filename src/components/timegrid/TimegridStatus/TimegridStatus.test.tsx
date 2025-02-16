import { render, screen } from '@testing-library/react';
import TimegridStatus from './TimegridStatus';

describe('The TimegridStatus component', () => {

    it("displays 'Submitted' label", async () => {
      render(<TimegridStatus
        status={0}        
        noTickets={false}
      />);

      expect(screen.getByText('Submitted')).toBeInTheDocument();
    });

    it("displays 'Returned' label", async () => {
      render(<TimegridStatus
        status={1}        
        noTickets={false}
      />);

      expect(screen.getByText('Returned')).toBeInTheDocument();
    });

    it("displays 'Validated' label", async () => {
      render(<TimegridStatus
        status={2}        
        noTickets={false}
      />);

      expect(screen.getByText('Validated')).toBeInTheDocument();
    });

    it("displays 'Processed' label", async () => {
      render(<TimegridStatus
        status={3}        
        noTickets={false}
      />);

      expect(screen.getByText('Processed')).toBeInTheDocument();
    });

    it("displays 'No Tickets' label", async () => {
      render(<TimegridStatus
        status={-1}        
        noTickets={true}
      />);

      expect(screen.getByText('No Tickets')).toBeInTheDocument();
    });


    it("displays 'Un-submitted' label", async () => {
      render(<TimegridStatus
        status={-1}        
        noTickets={false}
      />);

      expect(screen.getByText('Un-submitted')).toBeInTheDocument();
    });
});