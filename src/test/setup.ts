import "@testing-library/jest-dom";
import { vi } from "vitest";

// Mock Storyblok's storyblokEditable function
vi.mock("@storyblok/react/rsc", () => ({
  storyblokEditable: vi.fn(() => ({ "data-blok-c": "", "data-blok-uid": "" })),
  StoryblokServerComponent: vi.fn(({ blok }) =>
    React.createElement(
      "div",
      { "data-testid": `blok-${blok.component}` },
      "Mocked Component"
    )
  ),
}));

// Ensure React is available globally for the mock
import React from "react";
(globalThis as { React?: typeof React }).React = React;
