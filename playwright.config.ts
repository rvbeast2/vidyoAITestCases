import { defineConfig, devices } from "@playwright/test";


export default defineConfig({
  timeout: 200000,
  testDir: "e2e",
  workers: 1,
  maxFailures: 2,
  reporter: "list",
  projects: [
    {
      name: "test cases",
      testMatch: ["e2e/test_cases.spec.ts"],
      use: {
        ...devices["Desktop Chrome"],
        //storageState: "e2e/.auth/user.json",
      },
    },
  ],
  use:{
    headless: false
  },
  retries: 0
});
