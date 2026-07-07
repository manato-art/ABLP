import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

test.describe("AB Creative LP", () => {
  test("hero renders with both CTAs pointing to signup/type", async ({ page }) => {
    await page.goto("/");

    const heading = page.getByRole("heading", { name: /プロ品質のバナーを/ });
    await expect(heading).toBeVisible();

    const links = page.locator(
      'a[href="https://ab.cypherone.co.jp/signup/type"]',
    );
    expect(await links.count()).toBeGreaterThanOrEqual(2);
  });

  test("pain card selection swaps the detail video (desktop)", async ({ page, viewport }) => {
    test.skip((viewport?.width ?? 0) < 768, "desktop-only behavior");

    await page.goto("/");
    await page.locator("#pain").scrollIntoViewIfNeeded();

    const card03 = page.locator("#pain").getByRole("button", { name: /03/ }).first();
    await card03.click();

    const video = page.locator("#pain video").first();
    await expect(video).toHaveAttribute("poster", /poster-pain-03\.jpg$/);
  });

  test("results section can switch tabs", async ({ page }) => {
    await page.goto("/");
    await page.locator("#features").scrollIntoViewIfNeeded();

    const corporateTab = page.getByRole("tab", { name: "法人利用" });
    await corporateTab.click();
    await expect(corporateTab).toHaveAttribute("aria-selected", "true");
  });

  test("no critical accessibility violations", async ({ page }) => {
    await page.goto("/");
    const results = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa"])
      .analyze();
    const critical = results.violations.filter((v) => v.impact === "critical");
    expect(critical, JSON.stringify(critical, null, 2)).toEqual([]);
  });
});
