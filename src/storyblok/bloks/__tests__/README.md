# Storyblok Bloks Unit Tests

This directory contains comprehensive unit tests for all Storyblok blok components using Vitest and React Testing Library.

## Test Setup

The testing environment is configured with:

- **Vitest** - Fast unit test runner
- **React Testing Library** - Component testing utilities
- **jsdom** - DOM environment for tests
- **@testing-library/jest-dom** - Extended matchers

## Running Tests

```bash
# Run tests once
yarn test

# Run tests in watch mode
yarn test:watch

# Run tests with UI
yarn test:ui
```

## Test Structure

Each blok component has its own test file following the pattern `*.blok.test.tsx`:

- `page.blok.test.tsx` - Tests for PageBlok (container component)
- `teaser.blok.test.tsx` - Tests for TeaserBlok (content component)
- `hero.blok.test.tsx` - Tests for HeroBlok (content component)
- `grid.blok.test.tsx` - Tests for GridBlok (container component)
- `feature.blok.test.tsx` - Tests for FeatureBlok (content component)

## What's Tested

For each blok component, we test:

### Content Components (Teaser, Hero, Feature)

1. **Storyblok Integration** - Verifies `storyblokEditable` attributes are applied
2. **Content Rendering** - Ensures proper content display (headlines, titles, names)
3. **Edge Cases** - Empty content handling
4. **HTML Structure** - Correct element hierarchy and semantics
5. **Special Characters** - Unicode and HTML entity handling

### Container Components (Page, Grid)

1. **Storyblok Integration** - Verifies `storyblokEditable` attributes are applied
2. **Nested Component Rendering** - Ensures child bloks are rendered via `StoryblokServerComponent`
3. **Empty State Handling** - Behavior with empty arrays
4. **CSS Classes** - Correct styling application (Grid specific)
5. **Component Keys** - Proper React key handling for lists

## Test Utilities

### Test Setup (`src/test/setup.ts`)

- Configures global test environment
- Mocks Storyblok functions (`storyblokEditable`, `StoryblokServerComponent`)
- Provides Jest DOM matchers

### Test Utilities (`src/test/utils.tsx`)

- `createMockBlok()` - Helper for creating test blok data
- `mockBlokData` - Pre-configured mock data factory
- `expectBlokEditable()` - Common assertions for Storyblok integration

## Mock Strategy

The tests use a comprehensive mocking strategy:

1. **storyblokEditable** - Mocked to return data attributes for visual editing
2. **StoryblokServerComponent** - Mocked to render simple test components with identifiable attributes
3. **Type Safety** - Uses `as any` for test mocks to bypass strict typing while maintaining test clarity

## Test Patterns

### Basic Structure Test

```typescript
it("renders with correct structure", () => {
  const { container } = render(<ComponentBlok blok={mockBlok} />);

  const wrapper = container.firstChild as HTMLElement;
  expect(wrapper.tagName).toBe("DIV");
  expect(wrapper.children).toHaveLength(1);
});
```

### Content Rendering Test

```typescript
it("displays the content correctly", () => {
  render(<ComponentBlok blok={mockBlok} />);

  const heading = screen.getByRole("heading");
  expect(heading).toHaveTextContent("Expected Content");
});
```

### Storyblok Integration Test

```typescript
it("applies storyblok editable attributes", () => {
  const { container } = render(<ComponentBlok blok={mockBlok} />);

  const blokContainer = container.querySelector("[data-blok-c]");
  expect(blokContainer).toBeInTheDocument();
  expect(blokContainer).toHaveAttribute("data-blok-uid");
});
```

## Known Limitations

- Some tests currently have minor selector issues that need refinement
- Mock components use simplified rendering that may not match exact production behavior
- TypeScript strict mode requires `as any` for some test mocks

## Future Improvements

1. **Enhanced Mocks** - More accurate Storyblok function mocks
2. **Integration Tests** - Tests that verify component registration and Storyblok API integration
3. **Visual Testing** - Screenshot or snapshot testing for UI regression detection
4. **Performance Tests** - Rendering performance benchmarks
5. **Accessibility Tests** - Automated a11y testing integration

## Coverage

Current test coverage includes:

- ✅ All blok components have unit tests
- ✅ Basic rendering functionality
- ✅ Content display and formatting
- ✅ Storyblok editor integration points
- ✅ Edge case handling
- ✅ Component structure validation

The test suite provides a solid foundation for maintaining code quality and preventing regressions as the Storyblok integration evolves.
