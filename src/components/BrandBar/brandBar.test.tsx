import { screen } from "@testing-library/react";
import { renderWithRedux } from "@/utils/test-utils";
import BrandBar from ".";

describe("BrandBar", () => {
  describe("renders contents", () => {
    test("renders the logo", () => {
      renderWithRedux(<BrandBar />);
      expect(screen.getByAltText(/logo/i)).toBeInTheDocument();
    });
    test("renders the contact", () => {
      renderWithRedux(<BrandBar />);
      expect(screen.getByText(/¡Compra por este medio!/i)).toBeInTheDocument();
      expect(screen.getByTestId("brand-phone")).toHaveTextContent(
        "(01) 411 6001"
      );
    });
  });
});
