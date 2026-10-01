// abhiramkolal.com page scripts. Kept in a file (not inline) so the site's CSP can stay script-src 'self'.

(() => {
  const LINKEDIN = '<a href="https://www.linkedin.com/in/abhiram-kolal/" target="_blank" rel="noopener">LinkedIn</a>';
  const EMAIL = '<a href="mailto:abhi.kolal@gmail.com">abhi.kolal@gmail.com</a>';
  const CHIPS = ["experience", "education", "MBA", "hobbies", "contact", "LinkedIn"];
  // first match wins; answers are fixed html, typed text is only ever shown via textContent
  const INTENTS = [
    [/linked\s*in/i, `Here's his ${LINKEDIN}.`],
    [/mba|mccombs|\but\b|austin|grad(uate)? school|business school/i,
      `He's currently getting his MBA at UT Austin's McCombs School of Business, class of 2028. More on ${LINKEDIN}.`],
    [/educat|school|college|rutgers|undergrad|degree|stud(y|ied)|graduat/i,
      `Rutgers University, class of 2021. Now working on an MBA at UT McCombs (class of 2028). Full background on ${LINKEDIN}.`],
    [/doing now|currently|these days|up to\b/i,
      `Right now he's a product manager in payments and getting his MBA at UT McCombs (class of 2028). Details on ${LINKEDIN}.`],
    [/experience|job|work|role|career|resume|résumé|\bcv\b|product|\bpm\b|for a living|does he do|what he does|occupation|skill|background|company|employer|recruit|professional|industry|fintech|payments/i,
      `Abhi's a product manager working in payments. The full work history is on ${LINKEDIN}.`],
    [/hobb|fun|music|free time|interest|weekend|basketball|hoop|nba|sneaker|shoe|food|eat|restaurant|tech|travel|trip|hike|hiking|walk|friends|like to do/i,
      "Outside of work: music (making it and listening to it), basketball, tech, food, sneakers, hanging out with friends, walks and hikes, and traveling whenever he can afford to lol."],
    [/contact|email|mail|reach|hire|connect|talk/i, `Best way to reach him is ${EMAIL}, or connect on ${LINKEDIN}.`],
    [/^(hi|hey|yo|hello|sup)\b|who (is|'s)|about (him|abhi)|tell me/i,
      `Abhi (Abhiram Kolal) is a product manager in payments, a Rutgers '21 grad, and an MBA candidate at UT McCombs ('28). Here's his ${LINKEDIN}.`],
  ];
  const FALLBACK = `Not sure about that one. Try one of these, or email him at ${EMAIL}.`;

  const chat = document.getElementById("chat"), log = document.getElementById("log"), ask = document.getElementById("ask"),
        form = document.getElementById("form"), q = document.getElementById("q");
  let started = false;

  function bot(html, withChips) {
    const m = document.createElement("div"); m.className = "msg bot"; m.innerHTML = html; log.appendChild(m);
    if (withChips) {
      const c = document.createElement("div"); c.className = "chips";
      CHIPS.forEach(t => { const b = document.createElement("button"); b.type = "button"; b.textContent = t; b.onclick = () => send(t); c.appendChild(b); });
      log.appendChild(c);
    }
    log.scrollTop = log.scrollHeight;
  }
  function send(text) {
    text = text.trim(); if (!text) return;
    const m = document.createElement("div"); m.className = "msg me"; m.textContent = text; log.appendChild(m);
    const t = document.createElement("div"); t.className = "msg bot typing"; t.textContent = "typing…"; log.appendChild(t);
    log.scrollTop = log.scrollHeight;
    const hit = INTENTS.find(([re]) => re.test(text));
    setTimeout(() => { t.remove(); bot(hit ? hit[1] : FALLBACK, !hit); }, 420);
  }
  function open() {
    chat.classList.add("open"); ask.style.display = "none";
    if (!started) { started = true; bot("what would you like to know about abhi?", true); }
    q.focus();
  }
  function close() { chat.classList.remove("open"); ask.style.display = ""; }
  ask.onclick = open;
  document.getElementById("close").onclick = close;
  addEventListener("keydown", e => { if (e.key === "Escape" && chat.classList.contains("open")) close(); });
  form.onsubmit = e => { e.preventDefault(); send(q.value); q.value = ""; };
})();

(() => {
  if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  const colors = ["#ff5c38", "#ffd23f", "#3bceac", "#5b8cff", "#ee4dff", "#7cff4d", "#ff3d7f"];
  const pick = not => { let c; do c = colors[Math.random() * colors.length | 0]; while (c === not); return c; };
  const BOUNCE = 15000, REST = 15000;
  let os = [], bouncing = false, last = 0;

  // each o breaks out of "yooooo" and bounces around like the DVD logo
  function breakLoose() {
    const cs = getComputedStyle(document.querySelector("h1"));
    document.querySelectorAll("h1 span").forEach((span, i) => {
      const r = span.getBoundingClientRect();
      const el = document.createElement("div");
      el.className = "dvd"; el.textContent = "o";
      el.style.fontSize = cs.fontSize; el.style.letterSpacing = cs.letterSpacing; el.style.fontFamily = cs.fontFamily;
      el.style.color = colors[0];
      el.style.transform = `translate(${r.left}px, ${r.top}px)`;
      document.body.appendChild(el);
      span.style.opacity = ".12"; span.style.animation = "none";  // ghost o left behind
      const speed = 2.2 + Math.random() * 1.6, ang = (Math.random() * 0.8 + 0.35) + (i % 2 ? Math.PI / 2 : 0);
      os.push({ el, span, x: r.left, y: r.top, w: r.width, h: r.height,
                vx: Math.cos(ang) * speed * (i % 2 ? 1 : -1), vy: -Math.abs(Math.sin(ang) * speed), color: colors[0] });
    });
    bouncing = true; last = performance.now();
    requestAnimationFrame(tick);
    setTimeout(goHome, BOUNCE);
  }

  // every o flies back into "yooooo" and the page is back to normal until the next round
  function goHome() {
    bouncing = false;
    for (const o of os) {
      const r = o.span.getBoundingClientRect();
      o.el.classList.remove("corner");
      o.el.style.transition = "transform .9s cubic-bezier(.5,-0.3,.3,1.3), color .9s";
      o.el.style.color = colors[0];
      o.el.style.transform = `translate(${r.left}px, ${r.top}px)`;
    }
    setTimeout(() => {
      for (const o of os) { o.span.style.opacity = ""; o.span.style.animation = ""; o.el.remove(); }
      os = [];
      setTimeout(breakLoose, REST - 950);
    }, 950);
  }

  function tick(now) {
    if (!bouncing) return;
    const dt = Math.min((now - last) / 16.67, 3); last = now;
    const W = innerWidth, H = innerHeight;
    for (const o of os) {
      o.x += o.vx * dt; o.y += o.vy * dt;
      let hitX = false, hitY = false;
      if (o.x <= 0) { o.x = 0; o.vx = Math.abs(o.vx); hitX = true; }
      if (o.x + o.w >= W) { o.x = W - o.w; o.vx = -Math.abs(o.vx); hitX = true; }
      if (o.y <= 0) { o.y = 0; o.vy = Math.abs(o.vy); hitY = true; }
      if (o.y + o.h >= H) { o.y = H - o.h; o.vy = -Math.abs(o.vy); hitY = true; }
      if (hitX || hitY) { o.color = pick(o.color); o.el.style.color = o.color; }
      if (hitX && hitY) {                      // the legendary corner hit
        o.el.classList.add("corner"); setTimeout(() => o.el.classList.remove("corner"), 900);
      }
      o.el.style.transform = `translate(${o.x}px, ${o.y}px)`;
    }
    requestAnimationFrame(tick);
  }

  setTimeout(breakLoose, 2200);  // short wave first, then 15s bounce / 15s rest on repeat
})();
