import React, { useState, useEffect } from "react";
import { Navbar, Nav, Container, Form } from "react-bootstrap";
import { Sun, Moon } from "lucide-react";

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [theme, setTheme] = useState<"light" | "dark">(() => {
    const saved = localStorage.getItem("theme");
    return (saved as "light" | "dark") || "dark";
  });

  useEffect(() => {
    document.documentElement.setAttribute("data-bs-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  return (
    <div className="min-vh-100">
      <Navbar bg="body-tertiary" expand="lg" className="mb-4 shadow-sm">
        <Container>
          <Navbar.Brand href="/" className="fw-bold fs-3">
            Movie Review
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto align-items-center">
              <div className="d-flex align-items-center">
                {theme === "light" ? (
                  <Sun size={20} className="me-2 text-warning" />
                ) : (
                  <Moon size={20} className="me-2 text-primary" />
                )}
                <Form.Check
                  type="switch"
                  id="theme-switch"
                  label=""
                  checked={theme === "dark"}
                  onChange={toggleTheme}
                  className="theme-switch"
                />
              </div>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <main>{children}</main>
    </div>
  );
};
