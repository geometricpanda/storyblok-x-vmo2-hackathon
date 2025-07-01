import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { HeroBlok } from "../hero.blok";
import { Blok } from "../../bloks";

describe("HeroBlok", () => {
  const mockBlok = {
    _uid: "hero-uid-123",
    component: Blok.Hero,
    title: "Hero Title",
  } as any;

  it("renders the hero section with storyblok editable attributes", () => {
    const { container } = render(<HeroBlok blok={mockBlok} />);

    const section = container.querySelector("section[data-blok-c]");
    expect(section).toBeInTheDocument();
    expect(section).toHaveAttribute("data-blok-c");
    expect(section).toHaveAttribute("data-blok-uid");
  });

  it("displays the title in an h1 element", () => {
    render(<HeroBlok blok={mockBlok} />);

    const title = screen.getByRole("heading", { level: 1 });
    expect(title).toBeInTheDocument();
    expect(title).toHaveTextContent("Hero Title");
  });

  it("handles empty title gracefully", () => {
    const emptyTitleBlok = {
      ...mockBlok,
      title: "",
    };

    render(<HeroBlok blok={emptyTitleBlok} />);

    const title = screen.getByRole("heading", { level: 1 });
    expect(title).toBeInTheDocument();
    expect(title).toHaveTextContent("");
  });

  it("renders as a section element", () => {
    const { container } = render(<HeroBlok blok={mockBlok} />);

    const section = container.firstChild as HTMLElement;
    expect(section.tagName).toBe("SECTION");
  });

  it("preserves special characters in title", () => {
    const specialTitleBlok = {
      ...mockBlok,
      title: "Welcome to Our Site! 🎉",
    };

    render(<HeroBlok blok={specialTitleBlok} />);

    const title = screen.getByRole("heading", { level: 1 });
    expect(title).toHaveTextContent("Welcome to Our Site! 🎉");
  });

  it("renders with correct structure", () => {
    const { container } = render(<HeroBlok blok={mockBlok} />);

    // Check structure: section > h1
    const section = container.firstChild as HTMLElement;
    expect(section.tagName).toBe("SECTION");
    expect(section.children).toHaveLength(1);
    expect(section.children[0].tagName).toBe("H1");
  });
});
