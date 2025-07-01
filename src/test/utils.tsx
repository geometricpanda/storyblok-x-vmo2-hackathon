import { Blok } from "../storyblok/bloks";

/**
 * Creates a mock blok with default properties
 */
export function createMockBlok<T extends Blok>(
  component: T,
  uid: string = "test-uid",
  additionalProps: Record<string, any> = {}
) {
  return {
    _uid: uid,
    component,
    ...additionalProps,
  } as any;
}

/**
 * Test data factory for common blok configurations
 */
export const mockBlokData = {
  page: (body: any[] = []) => createMockBlok(Blok.Page, "page-uid", { body }),

  teaser: (headline: string = "Test Headline") =>
    createMockBlok(Blok.Teaser, "teaser-uid", { headline }),

  hero: (title: string = "Test Hero Title") =>
    createMockBlok(Blok.Hero, "hero-uid", { title }),

  feature: (name: string = "Test Feature") =>
    createMockBlok(Blok.Feature, "feature-uid", { name }),

  grid: (columns: any[] = []) =>
    createMockBlok(Blok.Grid, "grid-uid", { columns }),
};

/**
 * Common test expectations for all bloks
 */
export const expectBlokEditable = (container: HTMLElement) => {
  expect(container).toHaveAttribute("data-blok-c");
  expect(container).toHaveAttribute("data-blok-uid");
};
