# Pozivnice — Copilot Instructions

This is a Next.js (App Router) + TypeScript + Tailwind CSS project for creating and managing beautiful digital invitations.

## Project Structure
- `src/app/` — App Router pages and layouts
- Each invitation design lives in its own route, e.g. `src/app/invitations/[slug]/`
- Shared UI components go in `src/components/`

## Conventions
- Use TypeScript for all files
- Use Tailwind CSS for styling; avoid inline styles
- Keep pages in `src/app/` and reusable UI in `src/components/`
- Each invitation template is a self-contained page component
- Use `next/font` for custom fonts

## Current Status
- `src/app/page.tsx` — Coming Soon landing page
