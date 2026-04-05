import { defineConfig } from 'cypress';

export default defineConfig({
  e2e: {
    baseUrl: 'https://automationintesting.online',
    specPattern: 'cypress/e2e/**/*.cy.ts',
    supportFile: 'cypress/support/e2e.ts',
    viewportWidth: 1280,
    viewportHeight: 720,
    defaultCommandTimeout: 10000,
    requestTimeout: 10000,
    responseTimeout: 15000,
    video: false,
    screenshotOnRunFailure: true,
    retries: {
      runMode: 1,
      openMode: 0,
    },
    setupNodeEvents(on, config) {
      // eslint-disable-next-line @typescript-eslint/no-require-imports
      require('cypress-mochawesome-reporter/plugin')(on);
      // eslint-disable-next-line @typescript-eslint/no-require-imports
      require('@cypress/grep/src/plugin')(config);
      return config;
    },
    env: {
      grepFilterSpecs: true,
      grepOmitFiltered: true,
    },
  },
  reporter: 'cypress-mochawesome-reporter',
  reporterOptions: {
    reportDir: 'cypress/reports',
    charts: true,
    reportPageTitle: 'BookHaven Test Report',
    embeddedScreenshots: true,
    inlineAssets: true,
    overwrite: true,
    html: true,
    json: true,
  },
});
