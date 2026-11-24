# Wedding invitation website

A mobile-first, animated wedding invitation built with Next.js (App Router), Tailwind CSS, Motion and Embla.
Sections: envelope intro, hero, invitation card, events, gallery, RSVP, countdown with wish lanterns, footer, music toggle.

## Run it

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
```

## Change the content

Every word lives in two files: **`src/content/invite.ts`** (English) and **`src/content/invite.hi.ts`** (Hindi): names, parents, dates, venues, event cards, gallery captions, RSVP and footer text.
Both follow the same typed shape, so a missing translation is a build error. A **हिन्दी / English** switch sits at the top right of the page; the choice is remembered, and a link ending in `?lang=hi` opens the Hindi version directly.
In Hindi mode these stay in English by the family's choice: "Save the date", "View on map", AM / PM, "RSVP", and the "Counting down to Forever" heading.

| To change | Where |
|---|---|
| Photos in the gallery | Put files in `public/gallery/` (portrait 2:3, about 800 px wide) and list them in `invite.gallery.items` with `src` and an optional small `thumb`. |
| Placeholder illustrations | `src/components/art/` (SVG components). Swap for real artwork when you have it. |
| Background music | Add `public/audio/invite.mp3`. The music button appears automatically once the file exists. Music starts when the guest taps the envelope seal. |
| Colours and fonts | CSS variables at the top of `src/app/globals.css`; fonts in `src/app/layout.tsx`. |

## RSVPs go to a Google Sheet

1. Create a Google Sheet. In row 1 add the headers: `Timestamp`, `Name`, `Attending`, `Guests`, `Message`.
2. In the sheet choose **Extensions → Apps Script**, replace the code with the script below, and save.
3. **Deploy → New deployment → Web app**. Execute as **Me**, access **Anyone**. Copy the web app URL.
4. Set the environment variables (see below).

```js
const SECRET = "change-me"; // must match GOOGLE_SHEET_SECRET

function doPost(e) {
  const data = JSON.parse(e.postData.contents);
  if (data.secret !== SECRET) {
    return ContentService.createTextOutput(JSON.stringify({ ok: false })).setMimeType(ContentService.MimeType.JSON);
  }
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheets()[0];
  sheet.appendRow([data.timestamp, data.name, data.attending, data.guests, data.message]);
  return ContentService.createTextOutput(JSON.stringify({ ok: true })).setMimeType(ContentService.MimeType.JSON);
}
```

Environment variables (copy `.env.example` to `.env.local` for local use, and add the same in Vercel):

```
GOOGLE_SHEET_WEBHOOK_URL=https://script.google.com/macros/s/XXXX/exec
GOOGLE_SHEET_SECRET=change-me
```

Without the webhook URL the form shows a friendly error and nothing is saved.

## Deploy on Vercel

1. Push this repository to GitHub.
2. In Vercel choose **Add New → Project**, import the repository (framework is detected as Next.js).
3. Under **Environment Variables** add `GOOGLE_SHEET_WEBHOOK_URL` and `GOOGLE_SHEET_SECRET`.
4. Deploy, then open the link on a phone and send a test RSVP.

## Notes

- Animations honour the device's "reduce motion" setting.
- The countdown target is `invite.wedding.startsAt` (India Standard Time).
- The calendar button on the hero downloads an `.ics` file with every event.
