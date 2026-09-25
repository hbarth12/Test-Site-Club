/*
  Thursday Club event schedule

  Automation depends on `date` containing a real ISO 8601 date with the
  Damascus UTC offset, for example: "2026-10-08T19:00:00+03:00".
  Add `endDate` when known. Otherwise the event archives six hours after its
  start time.
  Leave `date` as null while the date is unconfirmed. Undated events remain
  upcoming and follow the manual `order` value.
*/
window.THURSDAY_CLUB_EVENTS = [
  {
    order: 1,
    date: null,
    displayDate: "Launch date and time · Mazra'a",
    title: "Thursday Club Launch",
    guest: "An opening night in Mazra'a",
    description: "Food, refreshments, conversation, and the beginning of a new gathering place for Syria’s thinkers.",
    rsvpUrl: "#",
    type: "Launch"
  },
  {
    order: 2,
    date: null,
    displayDate: "Date and time to be announced · Mazra'a",
    title: "Syrians in the Shadow of War",
    guest: "Book talk · Edited by Alex Simon",
    description: "A conversation about everyday struggles and survival through years of war and social change.",
    rsvpUrl: "#",
    type: "Book talk"
  },
  {
    order: 3,
    date: null,
    displayDate: "Date and time to be announced · Mazra'a",
    title: "Third Event Title",
    guest: "Guest to be announced",
    description: "Details for the third event will be announced soon.",
    rsvpUrl: "#",
    type: "Event"
  },
  {
    order: 4,
    date: null,
    displayDate: "Date and time to be announced · Mazra'a",
    title: "Shadows Over Kabul",
    guest: "An interview with Tam Hussein",
    description: "A conversation about Afghanistan, conflict, power, and the making of his new book.",
    rsvpUrl: "#",
    type: "Interview"
  }
];
