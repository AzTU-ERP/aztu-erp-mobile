# AzTU ERP — Mobile

Mobile companion for **erp.aztu.edu.az**, built with **Expo (SDK 57) + expo-router + TypeScript**.
It re-imagines the AzTU ERP admin dashboard (LMS, Finance/Payroll, HR, Library, Turnstile,
Security) as a modern native app with AzTU navy branding and a custom floating bottom navigation.

## Run it

```bash
cd aztu-erp-mobile
pnpm start          # then press i (iOS), a (Android), or scan the QR in Expo Go
# or
pnpm ios
pnpm android
```

## What's inside

**Bottom navigation** (custom, animated — `src/components/tab-bar.tsx`):

| Tab | Screen | Mirrors ERP module |
| --- | --- | --- |
| Əsas | Dashboard | Ana səhifə |
| Təhsil | LMS hub | LMS |
| Maliyyə | Finance hub | Finance / Payroll |
| Bildiriş | Notifications | Mesajlar / Notifications |
| Profil | Profile | Profil |

**Detail screens** pushed from the tabs:

- LMS → `Davamiyyət` (attendance with QR / face check-in), `Transkript` (GPA + grades),
  `Fənlər` (courses), `İmtahanlar` (exams)
- Finance → `Maaş vərəqi` (payslip), `Maaş hesablamaları` (payroll runs), `Premyalar` (bonuses)
- `Təhlükəsizlik` (sessions + trusted devices), `Parametrlər` (settings)
- Generic module screen (`/module/[slug]`) covering `HR`, `Kitabxana`, `Turnstile`, `İxraclar`

All copy is in Azerbaijani and the data shapes in `src/data/index.ts` mirror the web ERP domain
(attendance statuses, payroll run statuses, transcript grading), so swapping the mock data for the
real AzTU SSO/ERP API is a drop-in change.

## Architecture

```
src/
  app/                 # expo-router file-based routes
    _layout.tsx        # root Stack (tabs + pushed detail screens)
    (tabs)/            # 5 tab roots + custom tab bar layout
    lms/  finance/  module/[slug].tsx  security.tsx  settings.tsx
  components/
    tab-bar.tsx        # custom animated floating bottom navigation
    layout.tsx         # Screen / Hero / PageHeader scaffolding
    ui.tsx             # Card, Badge, ListRow, ProgressBar, Button, Avatar, IconChip…
  data/index.ts        # typed mock data (LMS, Finance, security, notifications)
  theme/index.ts       # AzTU design system (navy palette, spacing, radius, shadows)
```

## Design system

Built around the AzTU navy shield (`#1B2559`) with an indigo interaction accent and a gold
highlight. Gradient heroes, soft layered shadows, rounded cards, and a floating tab bar with an
animated active pill give it a modern first-view feel. See `src/theme/index.ts`.

> Data is mocked for demonstration. Point `src/data` at the real backend (the web ERP uses the
> AzTU auth/SSO API wrapping `{ success, data, error }`) to make it live.
