import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ThemeToggle } from "@/components/ThemeToggle";
import { THEME_KEY } from "@/lib/theme";

describe("ThemeToggle", () => {
  beforeEach(() => {
    localStorage.clear();
    document.documentElement.dataset.theme = "dark";
  });

  it("switches between dark and light and remembers the choice", async () => {
    render(<ThemeToggle label="toggle" />);
    const button = screen.getByRole("button", { name: "toggle" });
    await userEvent.click(button);
    expect(document.documentElement.dataset.theme).toBe("light");
    expect(localStorage.getItem(THEME_KEY)).toBe("light");
    await userEvent.click(button);
    expect(document.documentElement.dataset.theme).toBe("dark");
  });
});
