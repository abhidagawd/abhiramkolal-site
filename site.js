// abhiramkolal.com page scripts. Kept in a file (not inline) so the site's CSP can stay script-src 'self'.

(() => {
  const LINKEDIN = '<a href="https://www.linkedin.com/in/abhiram-kolal/" target="_blank" rel="noopener">LinkedIn</a>';
  const EMAIL = '<a href="mailto:abhi.kolal@gmail.com">abhi.kolal@gmail.com</a>';
  const CHIPS = ["experience", "education", "MBA", "hobbies", "contact", "LinkedIn"];
  // first match wins. each intent has a few answers so repeat questions don't get the same line twice.
  // answers are fixed html; typed text is only ever shown via textContent.
  // the playful ones up top catch the weird stuff before the normal intents can grab a keyword.
  const INTENTS = [
    // --- the outlandish stuff ---
    [/ignore (all|previous|your)|system prompt|jailbreak|prompt injection|developer mode|\bhack/i, [
      "i'm like twelve if-statements in a trench coat. there's nothing to jailbreak, but i respect the hustle.",
      "nice try. i'm not even a real AI, i'm a list of answers with confidence.",
    ]],
    [/are you (a |an )?(bot|ai|robot|real|human|chatgpt|claude)|is this (a bot|ai|real)|who made you/i, [
      "i'm a very small robot with exactly one job: talking about abhi. i'm great at it and bad at everything else.",
      "not a human. not a genius. just a little bot that knows abhi's résumé and nothing about the weather.",
    ]],
    [/password|\bssn\b|social security|credit card|card number|bank (account|info)|\bpin\b|phone|cell|text him|number/i, [
      "nice try 🙂 the only number i'm giving out is the class of 2028.",
      "lol no. but his email works great: " + "EMAIL",
    ]],
    [/salary|how much (does|do) he (make|earn)|money|\brich\b|net worth|paid|venmo|cash ?app|bitcoin|crypto|loan|borrow/i, [
      "the bot doesn't do financials. ironic, since he works in payments.",
      "he moves money for a living, but not to you, sorry 😭",
    ]],
    [/\bage\b|how old|birthday|born|zodiac|star sign/i, [
      "old enough to have strong opinions about sneakers, young enough to still buy them. the exact number is classified.",
      "ageless. timeless. undisclosed.",
    ]],
    [/where (does|do) he live|address|where is he (from|based|located)|hometown|location|where('s| is) he at/i, [
      "somewhere with good wifi and decent food. for anything real, hit his email: EMAIL",
      "the bot doesn't do addresses. he's reachable on LINKEDIN though.",
    ]],
    [/single|dating|date him|girlfriend|boyfriend|wife|husband|married|marry|crush|relationship|rizz|is he taken|love life/i, [
      "the bot is strictly professional. ask me about his MBA instead, it's very romantic.",
      "i only know about his career. his love life is not in my training data 💀",
      "that's above my clearance level. i can tell you he went to Rutgers though?",
    ]],
    [/roast|insult|trash talk|\bdiss\b|clown|cringe|ugly|\blame\b|\bmid\b/i, [
      "i'm contractually obligated to only say nice things. that said, he probably owns too many sneakers.",
      "roast him? he built a website where the letter o runs away from him every 15 seconds. he's roasting himself.",
    ]],
    [/fuck|shit|bitch|\bwtf\b|\bstfu\b|asshole|dumbass/i, [
      "whoa. keep it PG, this is a professional website (mostly).",
      "language! the o's are watching.",
    ]],
    [/joke|make me laugh|something funny|tell me something fun/i, [
      "why did the payment break up with the bank? it needed some space between transactions.",
      "a product manager walks into a bar. asks the bartender what problem he's actually trying to solve.",
      "why don't wire transfers ever win arguments? they always need a confirmation.",
      "how many product managers does it take to change a lightbulb? first, let's align on what 'light' means for the user.",
    ]],
    [/1 ?v ?1|one on one|can he (dunk|hoop|ball)|is he (good|nice) at basketball|hooper|buckets|lebron|jordan|curry/i, [
      "he'll take that 1v1. results not guaranteed.",
      "he hoops. whether he hoops well depends on who you ask and what day it is.",
    ]],
    [/is he (cool|funny|nice|smart|good|tall|hot|cute|a good)|should i (hire|meet|talk to|follow)|worth (it|hiring|meeting)/i, [
      "yooooo. you saw the o's. you tell me.",
      "the bot is biased, but yes. obviously.",
      "he built a website with escaping vowels and a chatbot about himself. draw your own conclusions.",
    ]],
    [/favou?rite|best (song|food|shoe|sneaker|team|movie|place)|top (5|five|3|three)/i, [
      "too many favorites to fit in a chat bubble. ask him yourself: EMAIL",
      "the bot hasn't been told his favorites, and it refuses to make stuff up.",
    ]],
    [/meaning of life|why are we here|what is love|is the earth flat|aliens|simulation/i, [
      "42. also, good product sense.",
      "beyond my pay grade. i'm a résumé bot, not a philosopher.",
    ]],
    [/thank|thx|\bty\b|appreciate/i, [
      "anytime 🫡", "you got it.", "of course. come back soon, the o's get lonely.",
    ]],
    [/^(bye|cya|see ya|later|peace|gn)\b|goodbye/i, [
      "later! ✌️", "peace. tell your friends about the o's.",
    ]],
    [/^(lol|lmao|haha|💀|😂)/i, [
      "glad you're having fun. ask me anything about abhi.", "ikr.",
    ]],

    // --- the real stuff ---
    [/linked\s*in/i, [
      "Here's his LINKEDIN.",
      "Right here: LINKEDIN. Go connect.",
    ]],
    [/mba|mccombs|\but\b|austin|grad(uate)? school|business school/i, [
      "He's currently getting his MBA at UT Austin's McCombs School of Business, class of 2028. More on LINKEDIN.",
      "MBA at UT McCombs, class of 2028. Working full-time and doing night classes, so be nice to him. LINKEDIN has more.",
    ]],
    [/educat|school|college|rutgers|undergrad|degree|stud(y|ied)|graduat/i, [
      "Rutgers University, class of 2021. Now working on an MBA at UT McCombs (class of 2028). Full background on LINKEDIN.",
      "Rutgers '21 for undergrad, UT McCombs MBA '28 in progress. The rest is on LINKEDIN.",
    ]],
    [/doing now|currently|these days|up to\b/i, [
      "Right now he's a product manager in payments and getting his MBA at UT McCombs (class of 2028). Details on LINKEDIN.",
      "Building payments products by day, MBA classes by night, bouncing o's on his website in between. More on LINKEDIN.",
    ]],
    [/experience|job|work|role|career|resume|résumé|\bcv\b|product|\bpm\b|for a living|does he do|what he does|occupation|skill|background|company|employer|recruit|professional|industry|fintech|payments/i, [
      "Abhi's a product manager working in payments. The full work history is on LINKEDIN.",
      "He's a product manager in the payments world, basically making sure money gets where it's going. Full story on LINKEDIN.",
      "Product manager, payments. He's the person asking 'but what problem are we solving' in every meeting. Work history's on LINKEDIN.",
    ]],
    [/hobb|\bfun\b|music|free time|interest|weekend|basketball|hoop|nba|sneaker|shoe|food|\beat\b|restaurant|tech|travel|trip|hike|hiking|walk|friends|like to do/i, [
      "Outside of work: music (making it and listening to it), basketball, tech, food, sneakers, hanging out with friends, walks and hikes, and traveling whenever he can afford to lol.",
      "Music, basketball, tech, sneakers and good food. Also walks, hikes, friends, and traveling when the budget allows.",
      "Off the clock it's music, hoops, sneakers, food, tech, hikes, and the occasional trip (budget permitting lol).",
    ]],
    [/contact|email|mail|reach|hire|connect|talk|get in touch|\bdm\b/i, [
      "Best way to reach him is EMAIL, or connect on LINKEDIN.",
      "Shoot him an email at EMAIL. LINKEDIN works too.",
    ]],
    [/^(hi|hey|yo|hello|sup|wassup|what's up|hiya)\b|who (is|'s)|about (him|abhi)|tell me/i, [
      "Abhi (Abhiram Kolal) is a product manager in payments, a Rutgers '21 grad, and an MBA candidate at UT McCombs ('28). Here's his LINKEDIN.",
      "yooooo. Abhi's a payments product manager, Rutgers '21, McCombs MBA '28. Ask me about any of it, or peep his LINKEDIN.",
    ]],
  ].map(([re, answers]) => [re, answers.map(a => a.replaceAll("LINKEDIN", LINKEDIN).replaceAll("EMAIL", EMAIL))]);
  const FALLBACKS = [
    `Not sure about that one. Try one of these, or email him at ${EMAIL}.`,
    `that one's outside my very small brain. try a button below, or ask him directly: ${EMAIL}`,
    `i've got nothing on that, but i'm great at résumé questions. pick one 👇`,
    `hmm, the bot has no idea. abhi might though: ${EMAIL}`,
  ];
  const lastPick = new Map();
  function choose(key, list) {          // random answer, never the same one twice in a row
    let i; do i = Math.random() * list.length | 0; while (list.length > 1 && i === lastPick.get(key));
    lastPick.set(key, i); return list[i];
  }

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
    setTimeout(() => { t.remove(); bot(hit ? choose(hit[0].source, hit[1]) : choose("fallback", FALLBACKS), !hit); }, 420);
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
  let os = [], last = 0;

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
    for (const o of os) o.state = "bounce";
    running = true; last = performance.now();
    requestAnimationFrame(tick);
    setTimeout(goHome, BOUNCE);
  }

  // each o, one at a time and in random order, stops bouncing and swoops back into its own slot.
  // it's pulled home by a soft spring, so it curves in from wherever it was and settles with a little wobble
  function goHome() {
    const order = os.slice().sort(() => Math.random() - 0.5);
    order.forEach((o, i) => setTimeout(() => {
      o.state = "homing";
      o.el.classList.remove("corner");
      o.el.style.transition = "color .6s";
      o.el.style.color = colors[0];
    }, i * 450 + Math.random() * 250));
  }

  function land(o) {
    o.state = "home";
    o.el.remove();
    o.span.style.opacity = ""; o.span.style.animation = "";   // the real o fades back in and rejoins the wave
    if (os.every(x => x.state === "home")) {
      os = []; running = false;
      setTimeout(breakLoose, REST);
    }
  }

  const PULL = 0.006, DRAG = 0.09, MAX_SPEED = 14;   // spring toward the slot, with a bit of overshoot
  let running = false;
  function tick(now) {
    if (!running) return;
    const dt = Math.min((now - last) / 16.67, 3); last = now;
    const W = innerWidth, H = innerHeight;
    for (const o of os) {
      if (o.state === "home") continue;
      if (o.state === "homing") {
        const r = o.span.getBoundingClientRect();
        const dx = r.left - o.x, dy = r.top - o.y;
        o.vx += (dx * PULL - o.vx * DRAG) * dt;
        o.vy += (dy * PULL - o.vy * DRAG) * dt;
        const sp = Math.hypot(o.vx, o.vy);
        if (sp > MAX_SPEED) { o.vx *= MAX_SPEED / sp; o.vy *= MAX_SPEED / sp; }
        o.x += o.vx * dt; o.y += o.vy * dt;
        if (Math.hypot(dx, dy) < 0.6 && sp < 0.15) { land(o); continue; }
        o.el.style.transform = `translate(${o.x}px, ${o.y}px)`;
        continue;
      }
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

  setTimeout(breakLoose, 2200);  // short wave first, then ~15s bounce / 15s rest on repeat
})();
