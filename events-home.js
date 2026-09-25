(function () {
  const root = document.getElementById("home-events");
  const events = window.THURSDAY_CLUB_EVENTS;
  if (!root || !Array.isArray(events)) return;

  const now = Date.now();
  const time = event => event.date ? new Date(event.date).getTime() : null;
  const hasPassed = event => {
    const start = time(event);
    const end = event.endDate ? new Date(event.endDate).getTime() : start + (6 * 60 * 60 * 1000);
    return start !== null && Number.isFinite(start) && Number.isFinite(end) && end < now;
  };
  const upcoming = events
    .filter(event => !hasPassed(event))
    .sort((a, b) => {
      const aTime = time(a);
      const bTime = time(b);
      if (aTime !== null && bTime !== null) return aTime - bTime;
      if (aTime !== null) return -1;
      if (bTime !== null) return 1;
      return a.order - b.order;
    })
    .slice(0, 3);

  if (!upcoming.length) {
    root.innerHTML = '<p class="sdc-club__event-line">New events will be announced soon.</p>';
    return;
  }

  const featured = upcoming[0];
  const secondary = upcoming.slice(1);
  const eventLink = event => event.rsvpUrl && event.rsvpUrl !== "#" ? event.rsvpUrl : "events.html";

  root.innerHTML = `
    <article class="sdc-club__poster sdc-club__flip-card" data-flip-card tabindex="0" role="button" aria-pressed="false" aria-label="Flip ${featured.title} event card">
      <div class="sdc-club__flip-inner">
        <div class="sdc-club__flip-face sdc-club__flip-face--front">
          <p class="sdc-club__event-date">${featured.displayDate}</p>
          <div>
            <h3 class="sdc-club__display sdc-club__flip-front-title">${featured.title}</h3>
          </div>
        </div>
        <div class="sdc-club__flip-face sdc-club__flip-face--back">
          <p class="sdc-club__event-date">${featured.displayDate}</p>
          <div>
            <h3 class="sdc-club__display">${featured.title}</h3>
            <p class="sdc-club__guest">${featured.guest}</p>
            <p class="sdc-club__event-line">${featured.description}</p>
            <a class="sdc-club__rsvp" href="${eventLink(featured)}" target="_top">Event details</a>
          </div>
        </div>
      </div>
    </article>
    <div class="sdc-club__small-events">
      ${secondary.map(event => `
        <article class="sdc-club__small-event sdc-club__flip-card" data-flip-card tabindex="0" role="button" aria-pressed="false" aria-label="Flip ${event.title} event card">
          <div class="sdc-club__flip-inner">
            <div class="sdc-club__flip-face sdc-club__flip-face--front">
              <p class="sdc-club__event-date">${event.displayDate}</p>
              <div>
                <h3 class="sdc-club__display sdc-club__flip-front-title">${event.title}</h3>
              </div>
            </div>
            <div class="sdc-club__flip-face sdc-club__flip-face--back">
              <p class="sdc-club__event-date">${event.displayDate}</p>
              <div>
                <p class="sdc-club__guest">${event.guest}</p>
                <p class="sdc-club__event-line">${event.description}</p>
                <a class="sdc-club__rsvp" href="${eventLink(event)}" target="_top">Event details</a>
              </div>
            </div>
          </div>
        </article>`).join("")}
    </div>`;

  root.querySelectorAll("[data-flip-card]").forEach(card => {
    const toggle = () => {
      const flipped = card.classList.toggle("is-flipped");
      card.setAttribute("aria-pressed", String(flipped));
    };
    card.addEventListener("click", event => {
      if (event.target.closest("a")) return;
      toggle();
    });
    card.addEventListener("keydown", event => {
      if (event.key !== "Enter" && event.key !== " ") return;
      event.preventDefault();
      toggle();
    });
  });
})();
