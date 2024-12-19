import { BrowserContext, expect, test, Page } from "@playwright/test";
import path from 'path';
let context: BrowserContext;
let page: Page;
let newTab: Page;
const email = "vikram0812+assignment@proton.me";
const password = "Assignment@2024";

test.beforeAll(async ({ browser }) => {
  context = await browser.newContext();
  page = await context.newPage();

  await page.goto("https://www.vidyo.ai", { waitUntil: "domcontentloaded" });
  await page.getByText("Login").nth(1).waitFor({ state: "visible" });
  const popupPromise = page.waitForEvent('popup', { timeout: 30000 });
  await page.getByText("Login").nth(1).click();
  newTab = await popupPromise;
  //[newTab] = await Promise.all([page.waitForEvent("popup")]);
  await newTab.waitForSelector("#auth-email-password-btn", { state: "visible" });
  await newTab.locator("#auth-email-password-btn").click();
  await newTab.getByPlaceholder("e.g johndoe@gmail.com").waitFor({ state: "visible" });
  await newTab.getByPlaceholder("e.g johndoe@gmail.com").fill(email);
  await newTab.getByPlaceholder("Enter your password").fill(password);
  await newTab.locator("#login-with-email-btn").click();

  await newTab.waitForURL("**/home");
});

test("navigate to AI clip", async () => {
  await newTab.waitForSelector("#create-ai-clips", { state: "visible" });
  await newTab.locator("#create-ai-clips").click();
});

test("generate AI clips", async () => {
    // const filePath = path.join(__dirname, '../THE MOST SAVAGE 5 MINUTES OF YOUR LIFE .mp4');
    // const fileInputs = newTab.locator('input[type="file"]');
    // //await newTab.waitForSelector('input[type="file"]', { state: 'visible' });
    // await fileInputs.nth(0).setInputFiles(filePath);
    await newTab.waitForSelector("#import-videos-input", {state:"visible"});
    await newTab.locator("#import-videos-input").fill("https://www.youtube.com/watch?v=Fn-nf_MGaAw");
    await newTab.locator("#import-video-yt-btn").click();
    await newTab.waitForSelector("#generate-ai-clips-button", {state:"visible"});
    await newTab.locator("#generate-ai-clips-button").click();
  });

test("Navigate to the project & rename", async() => {
    await newTab.waitForSelector("[id = 'home-sidebar-nav-btn-All projects']", {state:"visible"});
    await newTab.locator("[id = 'home-sidebar-nav-btn-All projects']").click();
    await newTab.locator("[data-key = 'project-card']").first().waitFor({state:"visible"});
    await newTab.locator("[data-key = 'project-card']").first().hover();
    await newTab.locator("[id = 'project-card-three-dots-menu']").first().waitFor({state:"visible"});
    await newTab.locator("[id = 'project-card-three-dots-menu']").first().click();
    await newTab.getByText("Rename").click();
    await newTab.locator('input[value="THE MOST SAVAGE 5 MINUTES OF YOUR LIFE | David Goggins, Jocko Willink and Eric Thomas"]').first().fill("Ronak Vala");
    await newTab.locator("[data-key = 'project-card']").first().click();
})