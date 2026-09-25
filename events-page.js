(function () {
  const upcomingRoot = document.getElementById("events-upcoming");
  const archiveRoot = document.getElementById("events-archive");
  const events = window.THURSDAY_CLUB_EVENTS;
  if (!upcomingRoot || !archiveRoot || !Array.isArray(events)) return;

  const now = Date.now();
  const time = event => event.date ? new Date(event.date).getTime() : null;
  const hasPassed = event => {
    const start = time(event);
    const end = event.endDate ? new Date(event.endDate).getTime() : start + (6 * 60 * 60 * 1000);
    return start !== null && Number.isFinite(start) && Number.isFinite(end) && end < now;
  };
  const chronological = (a, b) => {
    const aTime = time(a);
    const bTime = time(b);
    if (aTime !== null && bTime !== null) return aTime - bTime;
    if (aTime !== null) return -1;
    if (bTime !== null) return 1;
    return a.order - b.order;
  };

  const upcoming = events.filter(event => !hasPassed(event)).sort(chronological);
  const archived = events.filter(hasPassed).sort((a, b) => time(b) - time(a));

  const fold = (event, index) => `
    <article class="event-fold" data-event-fold>
      <button class="event-fold__trigger" type="button" aria-expanded="false">
        <span class="event-fold__number">${String(index + 1).padStart(2, "0")}</span>
        <span class="event-fold__title serif">${event.title}</span>
        <span class="event-fold__date">${event.displayDate}</span>
        <span class="event-fold__mark" aria-hidden="true">+</span>
      </button>
      <div class="event-fold__drawer" aria-hidden="true">
        <div class="event-fold__drawer-inner">
          <div></div>
          <div>
            <p class="event-fold__guest">${event.guest}</p>
            <p class="event-fold__description">${event.description}</p>
            ${event.rsvpUrl && event.rsvpUrl !== "#" ? `<a class="event-fold__rsvp" href="${event.rsvpUrl}">RSVP →</a>` : '<span class="event-fold__soon">RSVP details coming soon</span>'}
          </div>
        </div>
      </div>
    </article>`;

  const archivedRow = event => `
    <article class="archive-row">
      <p class="archive-row__date">${event.displayDate}</p>
      <h3 class="serif">${event.title}</h3>
      <p>${event.guest}</p>
    </article>`;

  upcomingRoot.innerHTML = upcoming.length ? upcoming.map(fold).join("") : '<p class="quiet">New events will be announced soon.</p>';
  archiveRoot.innerHTML = archived.length ? archived.map(archivedRow).join("") : '<p class="quiet">Past events will appear here automatically after their dates pass.</p>';

  const folds = Array.from(upcomingRoot.querySelectorAll("[data-event-fold]"));
  const setOpen = (foldElement, open) => {
    foldElement.classList.toggle("is-open", open);
    const trigger = foldElement.querySelector(".event-fold__trigger");
    const drawer = foldElement.querySelector(".event-fold__drawer");
    trigger.setAttribute("aria-expanded", String(open));
    drawer.setAttribute("aria-hidden", String(!open));
    drawer.inert = !open;
  };
  const openOnly = foldElement => folds.forEach(item => setOpen(item, item === foldElement));

  folds.forEach(foldElement => {
    const trigger = foldElement.querySelector(".event-fold__trigger");
    setOpen(foldElement, false);
    foldElement.addEventListener("mouseenter", () => openOnly(foldElement));
    foldElement.addEventListener("mouseleave", () => {
      if (foldElement.dataset.pinned !== "true") setOpen(foldElement, false);
    });
    foldElement.addEventListener("focusin", () => openOnly(foldElement));
    trigger.addEventListener("click", () => {
      const willPin = foldElement.dataset.pinned !== "true";
      folds.forEach(item => { item.dataset.pinned = "false"; });
      foldElement.dataset.pinned = String(willPin);
      setOpen(foldElement, willPin);
    });
  });
})();
