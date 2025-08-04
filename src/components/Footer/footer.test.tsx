import { renderWithRedux } from "@/utils/testUtils";
import { screen } from "@testing-library/react";
import Footer from ".";

describe("Footer", () => {
  describe("renders contents", () => {
    test("renders the logo", () => {
      renderWithRedux(<Footer />);
      expect(screen.getByAltText(/rimacLogo/i)).toBeInTheDocument();
    });
    test("renders the text", () => {
      renderWithRedux(<Footer />);
      expect(
        screen.getByText(/© 2023 RIMAC Seguros y Reaseguros./i)
      ).toBeInTheDocument();
    });
  });
});
