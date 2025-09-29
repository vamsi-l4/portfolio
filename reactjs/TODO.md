# TODO: Apply Header Light Mode Background to All Pages

## Plan Summary
- Update the light mode background in About.jsx, Services.jsx, and Work.jsx from bg-purple-50 to bg-white to match the Header's clean white background.
- Preserve dark mode backgrounds (e.g., dark:bg-violet-900/20 or dark:bg-purple-900/20).
- This ensures consistent design across all pages in light mode.

## Information Gathered
- Header.jsx uses bg-white in light mode for a clean look.
- About.jsx and Services.jsx: bg-purple-50 dark:bg-violet-900/20
- Work.jsx: bg-purple-50 dark:bg-purple-900/20
- No dependencies; simple className updates.

## Plan
- [x] About.jsx: Update main section className to "relative w-full px-[12%] py-10 scroll-mt-20 dark:text-white bg-white dark:bg-violet-900/20 overflow-hidden"
- [x] Services.jsx: Update main section className to "relative w-full px-[12%] py-10 scroll-mt-20 dark:text-white bg-white dark:bg-violet-900/20 overflow-hidden"
- [x] Work.jsx: Update main div className to "relative w-full px-[12%] py-10 scroll-mt-20 dark:text-white bg-white dark:bg-purple-900/20 overflow-hidden"

## Dependent Files to be edited
- About.jsx, Services.jsx, Work.jsx (no other files affected)

## Followup steps
- [] Verify changes by running the app and checking light mode backgrounds across pages.
- [] Test dark mode to ensure no regressions.
