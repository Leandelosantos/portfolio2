# PostHog post-wizard report

The wizard has completed a deep integration of PostHog into the portfolio project. `posthog-js` (v1.407.2) was installed via pnpm and initialized in `src/main.jsx` with `capture_pageview: 'history_change'` for accurate SPA route tracking via React Router. Nine custom events were instrumented across six files, covering every meaningful user interaction: contact form outcomes, WhatsApp channel clicks, navigation, project exploration, and case study views.

| Event name | Description | File |
|---|---|---|
| `contact_form_submitted` | User successfully submitted the contact form | `src/components/sections/Contact.jsx` |
| `contact_form_failed` | Contact form submission returned a server error | `src/components/sections/Contact.jsx` |
| `whatsapp_clicked` | User clicked the WhatsApp deeplink in the Contact section | `src/components/sections/Contact.jsx` |
| `whatsapp_button_clicked` | User tapped the sticky WhatsApp floating button (mobile only) | `src/components/ui/WhatsAppButton.jsx` |
| `nav_link_clicked` | User clicked a navigation link (desktop or mobile overlay) | `src/components/layout/Navbar.jsx` |
| `mobile_menu_opened` | User opened the hamburger menu on mobile | `src/components/layout/Navbar.jsx` |
| `project_card_clicked` | User clicked a project card to view its case study | `src/components/ui/ProjectGridCard.jsx` |
| `view_all_projects_clicked` | User clicked "Ver todos los proyectos" on the home page | `src/components/sections/ProjectGridHome.jsx` |
| `case_study_viewed` | User landed on a case study page (top of conversion funnel) | `src/pages/CaseStudy.jsx` |

## Next steps

We've built some insights and a dashboard for you to keep an eye on user behavior, based on the events we just instrumented:

- [Analytics basics (wizard) — Dashboard](https://us.posthog.com/project/529744/dashboard/1909157)
- [Contact form conversions (wizard)](https://us.posthog.com/project/529744/insights/iHJTiMaZ) — submitted vs. failed over time
- [Contact channel preference (wizard)](https://us.posthog.com/project/529744/insights/OMIDBEh7) — form vs. WhatsApp channel usage
- [Portfolio to contact funnel (wizard)](https://us.posthog.com/project/529744/insights/2IfiVYPZ) — case study → contact form conversion funnel
- [Most clicked projects (wizard)](https://us.posthog.com/project/529744/insights/QzerWwoK) — project card clicks broken down by project
- [Navigation patterns (wizard)](https://us.posthog.com/project/529744/insights/i3P0XpIb) — nav link clicks broken down by destination

## Verify before merging

- [ ] Run a full production build (`pnpm build`) and fix any lint or type errors introduced by the generated code.
- [ ] Run the test suite — call sites that were rewritten or instrumented may need updated mocks or fixtures.
- [ ] Add `VITE_POSTHOG_KEY` and `VITE_POSTHOG_HOST` to `.env.example` (and any deploy/bootstrap scripts such as Vercel environment settings) so collaborators and CI know what to configure.
- [ ] Wire source-map upload (`posthog-cli sourcemap` or the Vite upload plugin) into CI so production stack traces de-minify in PostHog error tracking.
- [ ] **Data warehouse:** This project uses **Resend** for its contact form. Run `npx @posthog/wizard warehouse` to connect Resend to PostHog's data warehouse and correlate email delivery data with contact form events.

### Agent skill

We've left an agent skill folder in your project at `.claude/skills/integration-react-vite/`. You can use this context for further agent development when using Claude Code. This will help ensure the model provides the most up-to-date approaches for integrating PostHog.
