# Storyblok Integration Styleguide

This styleguide defines the patterns and conventions for creating and maintaining Storyblok bloks (components) in this Next.js application.

## File Structure

```
src/storyblok/
├── index.ts              # Main Storyblok configuration and initialization
├── bloks.ts              # Type definitions and component enum
├── env.ts                # Environment configuration with validation
└── bloks/
    ├── *.blok.tsx        # Individual blok components
    └── ...
```

## Naming Conventions

### Blok Enum Values

- Use lowercase strings that match the Storyblok component name
- Example: `Page = "page"`, `Teaser = "teaser"`

### Component Names

- Use PascalCase with "Blok" suffix
- Example: `PageBlok`, `TeaserBlok`, `GridBlok`

### Type Names

- Use PascalCase with "Props" suffix
- Example: `PageProps`, `TeaserProps`, `GridProps`

### File Names

- Use lowercase with `.blok.tsx` extension
- Example: `page.blok.tsx`, `teaser.blok.tsx`

## Type Patterns

### Blok Enum Registration

Add new blok types to the `Blok` enum in `src/storyblok/bloks.ts`:

```typescript
export enum Blok {
  Page = "page",
  Teaser = "teaser",
  Grid = "grid",
  // Add new bloks here
  NewComponent = "new_component",
}
```

### Component Type Definition

All blok components must follow this pattern:

```typescript
import { ISbComponentType } from "storyblok-js-client";
import { BC, Blok } from "../bloks";

type ComponentNameProps = ISbComponentType<Blok.ComponentName> & {
  // Define your specific fields here
  fieldName: string;
  optionalField?: number;
  // For nested components, use arrays:
  nestedComponents?: Array<ISbComponentType<Blok>>;
};

export const ComponentNameBlok: BC<ComponentNameProps> = ({
  blok: { fieldName, optionalField, ...blok },
}) => {
  // Component implementation
};
```

## Component Implementation Patterns

### Basic Structure

Every blok component must follow this structure:

```typescript
import { ISbComponentType } from "storyblok-js-client";
import { BC, Blok } from "../bloks";
import { storyblokEditable } from "@storyblok/react/rsc";

type YourComponentProps = ISbComponentType<Blok.YourComponent> & {
  // Your specific fields
};

export const YourComponentBlok: BC<YourComponentProps> = ({
  blok: { /* destructure specific fields */, ...blok },
}) => (
  <div {...storyblokEditable(blok)}>
    {/* Your component JSX */}
  </div>
);
```

### Required Imports

- Always import `ISbComponentType` from `"storyblok-js-client"`
- Always import `BC` and `Blok` from `"../bloks"`
- Always import `storyblokEditable` from `"@storyblok/react/rsc"`
- For container components, also import `StoryblokServerComponent`

### Props Destructuring

- Destructure specific fields from the `blok` prop
- Always spread remaining props as `...blok`
- Example: `{ headline, description, ...blok }`

### Editor Integration

- Always apply `{...storyblokEditable(blok)}` to the root element
- This enables visual editing in the Storyblok editor

### Container Components

For bloks that contain other bloks (like `page` or `grid`):

```typescript
import { StoryblokServerComponent } from "@storyblok/react/rsc";

export const ContainerBlok: BC<ContainerProps> = ({
  blok: { nestedComponents, ...blok },
}) => (
  <div {...storyblokEditable(blok)}>
    {nestedComponents.map((_blok) => (
      <StoryblokServerComponent blok={_blok} key={_blok._uid} />
    ))}
  </div>
);
```

### Leaf Components

For bloks that render content directly (like `teaser`):

```typescript
export const ContentBlok: BC<ContentProps> = ({
  blok: { headline, description, ...blok },
}) => (
  <div {...storyblokEditable(blok)}>
    <h2>{headline}</h2>
    <p>{description}</p>
  </div>
);
```

## Registration Pattern

### Component Registration

Register new bloks in `src/storyblok/index.ts`:

```typescript
import { YourNewBlok } from "./bloks/your-new.blok";

export const getStoryblokApi = storyblokInit({
  // ... existing config
  components: {
    [Blok.Page]: PageBlok,
    [Blok.Teaser]: TeaserBlok,
    [Blok.Grid]: GridBlok,
    [Blok.YourNew]: YourNewBlok, // Add here
  },
});
```

## Environment Configuration

Environment variables are handled in `src/storyblok/env.ts` with Zod validation:

```typescript
import z from "zod";

const storyblokSchema = z.object({
  STORYBLOK_ACCESS_TOKEN: z.string(),
  // Add new environment variables here
});

const { STORYBLOK_ACCESS_TOKEN } = storyblokSchema.parse(process.env);

export const STORYBLOK = {
  ACCESS_TOKEN: STORYBLOK_ACCESS_TOKEN,
  // Export parsed variables here
};
```

## Best Practices

### Type Safety

- Always extend `ISbComponentType<Blok.YourComponent>`
- Use the `BC<T>` helper type for component definitions
- Define specific field types rather than using `any`

### Component Structure

- Keep components simple and focused
- Use destructuring for better readability
- Always include the `storyblokEditable` wrapper
- Use consistent key props (`_blok._uid`) for mapped components

### File Organization

- One component per file
- Import from relative paths using `../bloks`
- Follow the established import order pattern

### Error Handling

- Environment variables are validated with Zod
- TypeScript provides compile-time type checking
- Runtime validation should be handled at the schema level

## Example: Creating a New "Hero" Blok

1. **Add to enum** (`src/storyblok/bloks.ts`):

```typescript
export enum Blok {
  // ... existing
  Hero = "hero",
}
```

2. **Create component** (`src/storyblok/bloks/hero.blok.tsx`):

```typescript
import { ISbComponentType } from "storyblok-js-client";
import { BC, Blok } from "../bloks";
import { storyblokEditable } from "@storyblok/react/rsc";

type HeroProps = ISbComponentType<Blok.Hero> & {
  title: string;
  subtitle: string;
  backgroundImage: string;
};

export const HeroBlok: BC<HeroProps> = ({
  blok: { title, subtitle, backgroundImage, ...blok },
}) => (
  <section
    {...storyblokEditable(blok)}
    style={{ backgroundImage: `url(${backgroundImage})` }}
  >
    <h1>{title}</h1>
    <h2>{subtitle}</h2>
  </section>
);
```

3. **Register component** (`src/storyblok/index.ts`):

```typescript
import { HeroBlok } from "./bloks/hero.blok";

// Add to components object:
[Blok.Hero]: HeroBlok,
```

This pattern ensures consistency, type safety, and maintainability across all Storyblok integrations in the project.
