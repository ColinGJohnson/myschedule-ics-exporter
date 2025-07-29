# MySchedule ICS Exporter

![License](https://img.shields.io/github/license/ColinGJohnson/myschedule-ics-exporter)
![Extension build status](https://github.com/ColinGJohnson/myschedule-ics-exporter/actions/workflows/build-zip.yml/badge.svg)
![Test page build status](https://github.com/ColinGJohnson/myschedule-ics-exporter/actions/workflows/deploy-test-page.yml/badge.svg)

A browser extension for downloading calendar events from [Island Health's MySchedule website](https://myschedule.islandhealth.ca/) in [iCalendar format](https://en.wikipedia.org/wiki/ICalendar).

<p align="center">
  <img width="400" height="956" alt="image" src="https://github.com/user-attachments/assets/b137cf79-6d8f-4257-a29c-5c1136429aa1" />
</p>

## Installation

You can install the MySchedule ICS Downloader extension from *TODO: Chrome web store link coming soon!*.

1. Click the link above to navigate to the Chrome Web Store page
2. Click the "Add to Chrome" button
3. Confirm the installation when prompted

## Usage

1. Navigate to the [MySchedule website](https://myschedule.islandhealth.ca/) and log in
2. Click on the MySchedule ICS Downloader extension icon in your browser toolbar
3. The extension will load your shifts automatically
4. Select the shifts you want to export:
   - Use the checkboxes to select individual shifts
   - Use the "Select all" checkbox to select all shifts
   - Toggle "Include planned leave" to include or exclude leave events
5. Click the "Download as .ics" button to download your selected shifts as a calendar file
6. Import the downloaded .ics file into your preferred calendar application (Google Calendar, Outlook, Apple Calendar, etc.)

**Note:** Once you download events, they will not update automatically. If your schedule changes, you'll need to export and import the updated schedule again.

## Development

This project uses [pnpm workspaces](https://pnpm.io/workspaces) with two packages:

- `myschedule-api`: A library package that provides an API client and types for the MySchedule API, as well as a test page that mocks the MySchedule API.
- `extension`: The browser extension that users install.

### Prerequisites

- [Node.js](https://nodejs.org/) (see .nvmrc for version)
- [pnpm](https://pnpm.io/) (v10 or later)

### Setup

Install dependencies for all packages
```shell
pnpm install
```

Build all packages
```shell
pnpm run build
```

Package the extension for distribution
```shell
pnpm run zip # chrome
pnpm run zip:firefox
```

### Development Servers

Start the chrome extension development server
```bash
pnpm dev
```

Start the API test page development server
```bash
pnpm dev:api
```

There are additional extension-specific scripts in `extension/package.json`.

### Test Page

A test page is available to test the extension without needing access to the MySchedule website. 

It provides static mock data that mimics the structure of the MySchedule website and can be accessed at [https://ColinGJohnson.github.io/myschedule-ics-exporter/](https://ColinGJohnson.github.io/myschedule-ics-exporter/).

## Dependencies

- Framework: [WXT](https://wxt.dev/)
- Components: [shadcn/ui](https://ui.shadcn.com/)
- Icons: [Lucide](https://lucide.dev/)
- ICS: [ics](https://www.npmjs.com/package/ics)
- Storybook: [Storybook](https://storybook.js.org/)
- Package Manager: [pnpm](https://pnpm.io/)
