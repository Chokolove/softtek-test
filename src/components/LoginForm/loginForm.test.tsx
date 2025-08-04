import { renderWithRedux } from "@/utils/testUtils";
import { fireEvent, screen, waitFor } from "@testing-library/react";
import LoginForm from ".";
import { userEvent } from "@testing-library/user-event";
import { vi } from "vitest";

const mockDispatch = vi.fn();
const mockNavigate = vi.fn();

vi.mock("react-redux", async () => {
  const actual = await vi.importActual("react-redux");
  return {
    ...actual,
    useDispatch: () => mockDispatch,
  };
});

vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom");
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

vi.mock("@/redux/services/userApi", () => ({
  useLazyGetUserDataQuery: () => [
    () => ({
      unwrap: () =>
        Promise.resolve({
          name: "Test",
          lastName: "User",
          birthDay: "1990-01-01",
        }),
    }),
  ],
}));

describe("LoginForm", () => {
  describe("renders contents", () => {
    test("renders the intro text", () => {
      renderWithRedux(<LoginForm />);
      expect(
        screen.getByText(
          /Tú eliges cuánto pagar. Ingresa tus datos, cotiza y recibe nuestra asesoría. 100% online./i
        )
      ).toBeInTheDocument();
    });

    test("renders the document type select", () => {
      renderWithRedux(<LoginForm />);

      const select = screen.getByRole("combobox");
      expect(select).toBeInTheDocument();
      expect(screen.getByRole("option", { name: "DNI" })).toBeInTheDocument();
      expect(screen.getByRole("option", { name: "CE" })).toBeInTheDocument();
      expect(
        screen.getByRole("option", { name: "Pasaporte" })
      ).toBeInTheDocument();
    });

    test("renders document number input", () => {
      renderWithRedux(<LoginForm />);
      const input = screen.getByLabelText(/nro. de documento/i);
      expect(input).toBeInTheDocument();
      expect(input).toHaveAttribute("type", "text");
    });

    test("renders phone input", () => {
      renderWithRedux(<LoginForm />);
      const input = screen.getByLabelText(/celular/i);
      expect(input).toBeInTheDocument();
      expect(input).toHaveAttribute("type", "tel");
    });

    test("renders terms checkboxes", () => {
      renderWithRedux(<LoginForm />);

      const checkbox1 = screen.getByLabelText(/política de privacidad/i);
      const checkbox2 = screen.getByLabelText(/comunicaciones comerciales/i);

      expect(checkbox1).toBeInTheDocument();
      expect(checkbox1).toHaveAttribute("type", "checkbox");
      expect(checkbox2).toBeInTheDocument();
      expect(checkbox2).toHaveAttribute("type", "checkbox");
    });

    test("renders submit button", () => {
      renderWithRedux(<LoginForm />);
      const button = screen.getByRole("button");
      expect(button).toBeInTheDocument();
      expect(button).toHaveAttribute("type", "submit");
    });
  });
  describe("required fields", () => {
    test("shows validation errors when submitting empty form", async () => {
      const user = userEvent.setup();

      renderWithRedux(<LoginForm />);

      await user.click(screen.getByRole("button", { name: /cotiza gratis/i }));

      expect(
        await screen.findByText(/nro. de documento requerido/i)
      ).toBeInTheDocument();
      expect(
        await screen.findByText(/numero de celular requerido/i)
      ).toBeInTheDocument();
      expect(
        await screen.findAllByText(/ambas politicas deben ser aceptadas/i)
      ).toHaveLength(2);
    });
  });

  describe("submissions", () => {
    test("submits valid form and dispatches login, then navigates", async () => {
      const user = userEvent.setup();

      renderWithRedux(<LoginForm />);

      await user.selectOptions(screen.getByRole("combobox"), "dni");
      await user.type(screen.getByLabelText(/nro. de documento/i), "12345678");
      await user.type(screen.getByLabelText(/celular/i), "987654321");
      await user.click(screen.getByLabelText(/política de privacidad/i));
      await user.click(screen.getByLabelText(/comunicaciones comerciales/i));

      await user.click(screen.getByRole("button", { name: /cotiza gratis/i }));

      await waitFor(() => {
        expect(mockDispatch).toHaveBeenCalledWith(
          expect.objectContaining({
            type: "user/login",
            payload: expect.objectContaining({
              docType: "dni",
              docNumber: "12345678",
              phone: "987654321",
              name: "Test",
            }),
          })
        );
        expect(mockNavigate).toHaveBeenCalledWith("/plans");
      });
    });
  });

  describe("edge cases", () => {
    test("invalid phone number", async () => {
      const user = userEvent.setup();
      renderWithRedux(<LoginForm />);

      const phoneInput = screen.getByLabelText(/celular/i);

      await user.type(phoneInput, "abc123def");
      await user.click(screen.getByRole("button", { name: /cotiza gratis/i }));
      expect(
        await screen.findByText(/solo se permiten números/i)
      ).toBeInTheDocument();
    });

    test("submits valid form and disables button", async () => {
      const user = userEvent.setup();

      renderWithRedux(<LoginForm />);

      await user.selectOptions(screen.getByRole("combobox"), "dni");
      await user.type(screen.getByLabelText(/nro. de documento/i), "12345678");
      await user.type(screen.getByLabelText(/celular/i), "987654321");
      await user.click(screen.getByLabelText(/política de privacidad/i));
      await user.click(screen.getByLabelText(/comunicaciones comerciales/i));

      const submitButton = screen.getByRole("button", {
        name: /cotiza gratis/i,
      });

      fireEvent.click(submitButton);
      expect(submitButton).toBeDisabled();
      fireEvent.click(submitButton);
      fireEvent.click(submitButton);

      expect(mockDispatch).toHaveBeenCalledTimes(1);
      expect(mockNavigate).toHaveBeenCalledTimes(1);
    });
  });
});
