import "@testing-library/jest-dom";
import { fireEvent, render, screen } from "@testing-library/react";
import ScrollToTopButton from "./components/functions/ScrollToTopButton";

describe("ScrollToTopButton", () => {
  const setScrollY = (value) => {
    Object.defineProperty(window, "scrollY", {
      writable: true,
      configurable: true,
      value,
    });
  };

  it("shows the button only after crossing the scroll threshold", () => {
    setScrollY(0);
    render(<ScrollToTopButton />);

    const button = screen.getByRole("button", { name: /scroll back to top/i });
    expect(button).not.toHaveClass("is-visible");

    setScrollY(120);
    fireEvent.scroll(window);
    expect(button).toHaveClass("is-visible");
  });

  it("scrolls to the top with smooth behavior on click", () => {
    window.scrollTo = jest.fn();
    render(<ScrollToTopButton />);

    fireEvent.click(screen.getByRole("button", { name: /scroll back to top/i }));

    expect(window.scrollTo).toHaveBeenCalledWith({
      top: 0,
      behavior: "smooth",
    });
  });
});
