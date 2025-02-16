import { render, screen } from "@testing-library/react"
import InfoGrid from "./InfoGrid"

describe("The InfoGrid component", () => {
    it('displays children', async () => {
        render(<InfoGrid
            columnCount={2}
        >
            <p>Test child</p>
        </InfoGrid>)

        expect(screen.getByText('Test child')).toBeInTheDocument();
    })
})