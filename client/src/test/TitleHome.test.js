import { render, screen } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import TitleHome from "../Component/TitleHome";

test("Should Display title component", () => {
    render(
        <Router>
            <TitleHome />
        </Router>
    );

    const titletext = screen.getByText(
        /Explore Our Shoes/
    );
    expect(titletext).toBeInTheDocument();

    const findshoe = screen.getByText(/Find the shoes you like with us./);
    expect(findshoe).toBeInTheDocument();

    
});
