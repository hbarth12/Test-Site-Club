# NSLS × Syria Direct HTML blocks

This folder contains one shared, self-contained club page:

- `club-embed.html` — use this same block on the NSLS and Syria Direct sites.

The page retains NSLS’s dark teal and serif typography, then introduces a warmer club palette of cream, tobacco, burgundy, faded red, and mustard. Events are designed as cultural posters rather than database cards. The layout is responsive and requires no JavaScript or external font.

## Before publishing

Search the chosen file for `[[`. Replace every double-bracket placeholder, including:

- club name and membership URL;
- hero, event, room, table, arrival, and library photographs;
- concise image descriptions for accessibility;
- second and third event details and RSVP URLs;
- all-events and library URLs.

Delete the opening HTML comment if desired. Then paste the entire block into a WordPress “Custom HTML” block or the site’s equivalent HTML-capable field.

## Important CMS note

Some CMS configurations remove `<style>` elements from article bodies. If that happens, move the contents of the `<style>` element into the site’s custom CSS area and paste only the `<section>…</section>` markup into the page.

## Recommended use

Place the block on a permanent club page on both sites. Update the “Coming up” section as the calendar changes while keeping the club, membership, and lending-library sections evergreen.

Do not publish until all `[[PLACEHOLDERS]]` have been replaced. A quick final check is to search the rendered page for `[[`.
