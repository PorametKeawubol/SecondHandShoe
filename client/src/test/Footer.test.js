import { render, screen } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import Footer from "../Component/Footer";

test("Should Display Page Correctly On First Entry", () => {
    render(
        <Router>
            <Footer />
        </Router>
    );

    const titletext = screen.getByText(
        /We want you to have a good experience with us/
    );
    expect(titletext).toBeInTheDocument();

    const botton = screen.getByText(/© SecondhandShoe we here for you/);
    expect(botton).toBeInTheDocument();

    const SocialMedia = screen.getByText(/Social Media/);
    expect(SocialMedia).toBeInTheDocument();

    const Twitter = screen.getByText(/Twitter/);
    expect(Twitter).toBeInTheDocument();

    const Instagram = screen.getByText(/Instagram/);
    expect(Instagram).toBeInTheDocument();

    const Facebook = screen.getByText(/Facebook/);
    expect(Facebook).toBeInTheDocument();
});
