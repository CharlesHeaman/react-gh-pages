import { render, screen } from "@testing-library/react"
import PostCompletionChangeRequestLabel from "./PostCompletionChangeRequestLabel";

describe('The PostCompletionChangeRequestLabel component', () => {
    it("displays 'Accepted' label", async () => {
        render(<PostCompletionChangeRequestLabel
            status={1}
        />);
  
        expect(screen.getByText('Accepted')).toBeInTheDocument();
    });

    it("displays 'Denied' label", async () => {
        render(<PostCompletionChangeRequestLabel
            status={-1}
        />);
  
        expect(screen.getByText('Denied')).toBeInTheDocument();
    });

    it("displays 'Pending' label", async () => {
        render(<PostCompletionChangeRequestLabel
            status={0}
        />);
  
        expect(screen.getByText('Pending')).toBeInTheDocument();
    });
})