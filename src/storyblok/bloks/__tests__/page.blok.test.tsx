import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { PageBlok } from "../page.blok";
import { Blok } from "../../bloks";

// Mock the StoryblokServerComponent
vi.mock("@storyblok/react/rsc", async () => {
  const actual = await vi.importActual("@storyblok/react/rsc");
  return {
    ...actual,
    StoryblokServerComponent: vi.fn(({ blok }) => (
      <div data-testid={`blok-${blok.component}`}>
        Component: {blok.component}
      </div>
    )),
  };
});

describe("PageBlok", () => {
  const mockBlok = {
    _uid: "page-uid-123",
    component: Blok.Page,
    body: [
      {
        _uid: "teaser-uid-456",
        component: Blok.Teaser,
        headline: "Test Teaser",
      },
      {
        _uid: "hero-uid-789",
        component: Blok.Hero,
        title: "Test Hero",
      },
    ],
  } as any;

  it("renders the page container with storyblok editable attributes", () => {
    const { container } = render(<PageBlok blok={mockBlok} />);

    const blokContainer = container.querySelector("[data-blok-c]");
    expect(blokContainer).toBeInTheDocument();
    expect(blokContainer).toHaveAttribute("data-blok-c");
    expect(blokContainer).toHaveAttribute("data-blok-uid");
  });

  it("renders all nested bloks in the body", () => {
    render(<PageBlok blok={mockBlok} />);

    expect(screen.getByTestId("blok-teaser")).toBeInTheDocument();
    expect(screen.getByTestId("blok-hero")).toBeInTheDocument();
    expect(screen.getByText("Component: teaser")).toBeInTheDocument();
    expect(screen.getByText("Component: hero")).toBeInTheDocument();
  });

  it("handles empty body array", () => {
    const emptyBlok = {
      ...mockBlok,
      body: [],
    };

    render(<PageBlok blok={emptyBlok} />);

    const container = screen.getByRole("generic");
    expect(container).toBeInTheDocument();
    expect(container).toBeEmptyDOMElement();
  });

  it("renders bloks with correct keys", () => {
    const { container } = render(<PageBlok blok={mockBlok} />);

    // Check that each blok has been rendered (mocked components have testids)
    const renderedBloks = container.querySelectorAll('[data-testid^="blok-"]');
    expect(renderedBloks).toHaveLength(2);
  });
});
