# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Stack
Delegated: Next.js (App Router) + TypeScript + Tailwind CSS, Motion for animation, Embla for the gallery, deployed on Vercel. Suggested by Claude, accepted by the user. RSVPs go to a Google Sheet through a Google Apps Script web app.

## Users
Wedding guests (family and friends, mostly in India) who receive the link in a WhatsApp chat and open it on a phone. Secondary user: the couple's family, who need to collect RSVPs in a Google Sheet.

## Product Purpose
A single-couple digital wedding invitation website. It tells guests who is getting married, when and where each event happens, lets them reply (RSVP), and makes opening the invitation feel like a small ritual. Success: a guest opens the link, understands every event time and place, and sends an RSVP.

## Positioning
Opening the invitation is an experience, not a page: a sealed envelope that opens, then a scroll through the families' invitation, each ceremony, a photo album, a reply form and a live countdown.

## Operating Context
Shared as a link in WhatsApp family groups; opened in mobile browsers on mid-range Android phones and iPhones, often on slow mobile data. Content is first written in Hindi by the user and translated into English for the site. Sound is off by default until the guest taps (browser autoplay rules).

## Capabilities and Constraints
- Sections: envelope intro, hero, invitation card, event cards (Mehendi, Haldi, Shaadi, Reception in the reference), photo gallery, RSVP form, countdown with wish lanterns, footer, music toggle.
- Content language: English only. Real names, dates, venues, parents' names, event details: not yet supplied (arrive as Hindi screenshots). Placeholders must be obviously fake and listed for replacement.
- All artwork is placeholder SVG until the user supplies photos or illustrations. No artwork or branding is copied from the reference video, which is a third party's product.
- RSVP fields: name, phone, attending yes/no, number of guests, message.
- Music file: not yet supplied; the toggle stays hidden until one exists.
- Must perform on low-end phones: animate transform and opacity first, respect reduced motion.

## Brand Commitments
The look and flow of the reference video (shown by the user) is the binding brief: dusk pink and peach sky, ornate Indian arch frames, gold and terracotta detail, serif and script type, lanterns and petals. The reference's name, artwork and wording are not reused.

## Evidence on Hand
- Reference video: `C:\Demo\WhatsApp Video 2026-11-24 at 12.35.22 AM.mp4` (37 s, vertical screen recording of the reference invite).
- No real couple details, photos, music, or Google Sheet URL yet. Do not invent real-looking facts; placeholders only.

## Product Principles
1. Every event detail a guest needs (what, when, where, dress code, map) is reachable in one scroll and never hidden behind animation.
2. The opening ritual is rehearsed and skippable; nothing blocks a guest who is in a hurry.
3. Content is data: all wording lives in one content file so translated text drops in without touching components.
4. Placeholders look finished but are clearly flagged for replacement.
5. Motion is rich on the phone but gentle on the battery and honors reduced motion.

## Accessibility & Inclusion
Readable text contrast on every background, tap targets at least 44px, keyboard and screen-reader paths for the seal, carousel and form, reduced-motion alternative for every animation.
