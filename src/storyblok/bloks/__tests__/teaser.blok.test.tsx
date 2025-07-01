import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { TeaserBlok } from "../teaser.blok";
import { Blok } from "../../bloks";

describe("TeaserBlok", () => {
  const mockBlok = {
    _uid: "teaser-uid-123",
    component: Blok.Teaser,
    headline: "Test Headline",
  } as any;

  it("renders the teaser container with storyblok editable attributes", () => {
    const { container } = render(<TeaserBlok blok={mockBlok} />);

    const blokContainer = container.querySelector("[data-blok-c]");
    expect(blokContainer).toBeInTheDocument();
    expect(blokContainer).toHaveAttribute("data-blok-c");
    expect(blokContainer).toHaveAttribute("data-blok-uid");
  });

  it("displays the headline in an h2 element", () => {
    render(<TeaserBlok blok={mockBlok} />);

    const headline = screen.getByRole("heading", { level: 2 });
    expect(headline).toBeInTheDocument();
    expect(headline).toHaveTextContent("Test Headline");
  });

  it("handles empty headline gracefully", () => {
    const emptyHeadlineBlok = {
      ...mockBlok,
      headline: "",
    };

    render(<TeaserBlok blok={emptyHeadlineBlok} />);

    const headline = screen.getByRole("heading", { level: 2 });
    expect(headline).toBeInTheDocument();
    expect(headline).toHaveTextContent("");
  });

  it("preserves HTML entities in headline", () => {
    const htmlBlok = {
      ...mockBlok,
      headline: "Test &amp; Example",
    };

    render(<TeaserBlok blok={htmlBlok} />);

    const headline = screen.getByRole("heading", { level: 2 });
    expect(headline).toHaveTextContent("Test &amp; Example");
  });

  it("renders with correct structure", () => {
    const { container } = render(<TeaserBlok blok={mockBlok} />);

    // Check structure: div > h2
    const wrapper = container.firstChild as HTMLElement;
    expect(wrapper.tagName).toBe("DIV");
    expect(wrapper.children).toHaveLength(1);
    expect(wrapper.children[0].tagName).toBe("H2");
  });
});
