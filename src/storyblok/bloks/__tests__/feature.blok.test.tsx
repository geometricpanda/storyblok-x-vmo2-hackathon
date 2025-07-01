import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { FeatureBlok } from "../feature.blok";
import { Blok } from "../../bloks";

describe("FeatureBlok", () => {
  const mockBlok = {
    _uid: "feature-uid-123",
    component: Blok.Feature,
    name: "Amazing Feature",
  } as any;

  it("renders the feature container with storyblok editable attributes", () => {
    const { container } = render(<FeatureBlok blok={mockBlok} />);

    const blokContainer = container.querySelector("[data-blok-c]");
    expect(blokContainer).toBeInTheDocument();
    expect(blokContainer).toHaveAttribute("data-blok-c");
    expect(blokContainer).toHaveAttribute("data-blok-uid");
  });

  it("displays the name in an h3 element", () => {
    render(<FeatureBlok blok={mockBlok} />);

    const name = screen.getByRole("heading", { level: 3 });
    expect(name).toBeInTheDocument();
    expect(name).toHaveTextContent("Amazing Feature");
  });

  it("handles empty name gracefully", () => {
    const emptyNameBlok = {
      ...mockBlok,
      name: "",
    };

    render(<FeatureBlok blok={emptyNameBlok} />);

    const name = screen.getByRole("heading", { level: 3 });
    expect(name).toBeInTheDocument();
    expect(name).toHaveTextContent("");
  });

  it("preserves HTML entities in name", () => {
    const htmlBlok = {
      ...mockBlok,
      name: "Fast &amp; Reliable",
    };

    render(<FeatureBlok blok={htmlBlok} />);

    const name = screen.getByRole("heading", { level: 3 });
    expect(name).toHaveTextContent("Fast &amp; Reliable");
  });

  it("handles special characters and unicode", () => {
    const unicodeBlok = {
      ...mockBlok,
      name: "Secure 🔒 & Fast ⚡",
    };

    render(<FeatureBlok blok={unicodeBlok} />);

    const name = screen.getByRole("heading", { level: 3 });
    expect(name).toHaveTextContent("Secure 🔒 & Fast ⚡");
  });

  it("renders with correct structure", () => {
    const { container } = render(<FeatureBlok blok={mockBlok} />);

    // Check structure: div > h3
    const wrapper = container.firstChild as HTMLElement;
    expect(wrapper.tagName).toBe("DIV");
    expect(wrapper.children).toHaveLength(1);
    expect(wrapper.children[0].tagName).toBe("H3");
  });
});
