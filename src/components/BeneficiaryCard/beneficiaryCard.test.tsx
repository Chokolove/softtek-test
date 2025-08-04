import { screen } from "@testing-library/react";
import { baseState, renderWithRedux } from "@/utils/testUtils";
import userEvent from "@testing-library/user-event";
import BeneficiaryCard from ".";

const option = {
  id: 1,
  icon: "IcProtectionLight",
  title: "Para mi",
  text: "Cotiza tu seguro de salud y agrega familiares si asi lo deseas.",
};

describe("BeneficiaryCard", () => {
  describe("renders contents", () => {
    test("renders the title", () => {
      renderWithRedux(<BeneficiaryCard {...option} />);
      expect(screen.getByText(/para mi/i)).toBeInTheDocument();
    });
    test("renders the text", () => {
      renderWithRedux(<BeneficiaryCard {...option} />);
      expect(
        screen.getByText(/Cotiza tu seguro de salud/i)
      ).toBeInTheDocument();
    });

    test("renders the icon", () => {
      renderWithRedux(<BeneficiaryCard {...option} />);
      const img = screen.getByAltText(/IcProtectionLight/i);
      expect(img).toHaveAttribute("src", "/IcProtectionLight.png");
    });

    test("renders radio button", () => {
      renderWithRedux(<BeneficiaryCard {...option} />);
      expect(screen.getByRole("radio")).toBeInTheDocument();
    });
  });
  describe("interaction", () => {
    test("selects the radio button when clicked", async () => {
      const user = userEvent.setup();
      renderWithRedux(<BeneficiaryCard {...option} />);

      const radio = screen.getByRole("radio");
      await user.click(radio);

      expect(radio).toBeChecked();
    });

    test("adds active class to card when selected", async () => {
      const user = userEvent.setup();
      const { container } = renderWithRedux(<BeneficiaryCard {...option} />);

      const radio = screen.getByRole("radio");
      await user.click(radio);

      const card = container.firstChild;
      expect(card).toHaveClass("beneficiary-card--active");
    });
  });

  describe("with preloaded Redux state", () => {
    test("renders as active when already selected in Redux state", () => {
      const { container } = renderWithRedux(<BeneficiaryCard {...option} />, {
        preloadedState: {
          ...baseState,
          beneficiary: {
            data: option,
          },
        },
      });

      const card = container.firstChild;
      const radio = screen.getByRole("radio");

      expect(card).toHaveClass("beneficiary-card--active");
      expect(radio).toBeChecked();
    });
  });
});
