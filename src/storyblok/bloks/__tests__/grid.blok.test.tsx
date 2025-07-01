import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { GridBlok } from "../grid.blok";
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

describe("GridBlok", () => {
  const mockBlok = {
    _uid: "grid-uid-123",
    component: Blok.Grid,
    columns: [
      {
        _uid: "feature-uid-456",
        component: Blok.Feature,
        name: "Feature 1",
      },
      {
        _uid: "teaser-uid-789",
        component: Blok.Teaser,
        headline: "Teaser 1",
      },
    ],
  } as any;

  it("renders the grid container with storyblok editable attributes", () => {
    const { container } = render(<GridBlok blok={mockBlok} />);

    const gridContainer = container.querySelector("[data-blok-c]");
    expect(gridContainer).toBeInTheDocument();
    expect(gridContainer).toHaveAttribute("data-blok-c");
    expect(gridContainer).toHaveAttribute("data-blok-uid");
  });

  it("applies correct CSS grid classes", () => {
    render(<GridBlok blok={mockBlok} />);

    const container = screen.getByRole("generic");
    expect(container).toHaveClass("grid");
    expect(container).toHaveClass(
      "grid-cols-[repeat(auto-fit,minmax(300px,1fr))]"
    );
    expect(container).toHaveClass("gap-6");
  });

  it("renders all columns", () => {
    render(<GridBlok blok={mockBlok} />);

    expect(screen.getByTestId("blok-feature")).toBeInTheDocument();
    expect(screen.getByTestId("blok-teaser")).toBeInTheDocument();
    expect(screen.getByText("Component: feature")).toBeInTheDocument();
    expect(screen.getByText("Component: teaser")).toBeInTheDocument();
  });

  it("handles empty columns array", () => {
    const emptyBlok = {
      ...mockBlok,
      columns: [],
    };

    render(<GridBlok blok={emptyBlok} />);

    const container = screen.getByRole("generic");
    expect(container).toBeInTheDocument();
    expect(container).toBeEmptyDOMElement();
  });

  it("renders columns with correct keys", () => {
    const { container } = render(<GridBlok blok={mockBlok} />);

    // Check that each column has been rendered (mocked components have testids)
    const renderedColumns = container.querySelectorAll(
      '[data-testid^="blok-"]'
    );
    expect(renderedColumns).toHaveLength(2);
  });

  it("handles single column", () => {
    const singleColumnBlok = {
      ...mockBlok,
      columns: [
        {
          _uid: "single-uid-123",
          component: Blok.Feature,
          name: "Single Feature",
        },
      ],
    } as any;

    const { container } = render(<GridBlok blok={singleColumnBlok} />);

    expect(screen.getByTestId("blok-feature")).toBeInTheDocument();
    const renderedColumns = container.querySelectorAll(
      '[data-testid^="blok-"]'
    );
    expect(renderedColumns).toHaveLength(1);
  });
});
