import { renderWithRedux } from "@/utils/testUtils";
import { screen } from "@testing-library/react";
import PlansHeaderSection from ".";

const props = {
  name: "Random name",
  beneficiaryOptions: [
    {
      id: 1,
      icon: "testIcon1",
      title: "test title 1",
      text: "test text 1.",
    },
    {
      id: 2,
      icon: "testIcon2",
      title: "test title 2",
      text: "test text 2.",
    },
  ],
};

describe("PlansHeaderSection", () => {
  describe("renders contents", () => {
    test("renders the title", () => {
      renderWithRedux(<PlansHeaderSection {...props} />);
      expect(
        screen.getByText(/Random name ¿Para quién deseas cotizar\?/i)
      ).toBeInTheDocument();
    });
    test("renders the subtitle", () => {
      renderWithRedux(<PlansHeaderSection {...props} />);
      expect(
        screen.getByText(
          /Selecciona la opción que se ajuste más a tus necesidades./i
        )
      ).toBeInTheDocument();
    });
  });
});
