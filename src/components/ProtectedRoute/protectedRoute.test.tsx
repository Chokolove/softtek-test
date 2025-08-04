import { screen } from "@testing-library/react";
import { Routes, Route } from "react-router-dom";
import ProtectedRoute from ".";
import { baseState, renderWithRedux } from "@/utils/testUtils";

describe("ProtectedRoute", () => {
  const TestLogin = () => <div>Login Page</div>;
  const TestProtected = () => <div>Protected Content</div>;

  const createUi = () => (
    <Routes>
      <Route path="/login" element={<TestLogin />} />
      <Route element={<ProtectedRoute />}>
        <Route path="/" element={<TestProtected />} />
      </Route>
    </Routes>
  );

  it("redirects to /login when user is not logged in", () => {
    renderWithRedux(createUi(), {
      preloadedState: {
        ...baseState,
        user: {
          data: {
            docNumber: "",
            name: "",
            lastName: "",
            birthDay: "",
            docType: "",
            phone: "",
          },
        },
      },
    });

    expect(screen.getByText("Login Page")).toBeInTheDocument();
  });

  it("renders protected route when user is logged in", () => {
    renderWithRedux(createUi(), {
      preloadedState: {
        ...baseState,
        user: {
          data: {
            docNumber: "12345678",
            name: "",
            lastName: "",
            birthDay: "",
            docType: "DNI",
            phone: "",
          },
        },
      },
    });

    expect(screen.getByText("Protected Content")).toBeInTheDocument();
  });
});
