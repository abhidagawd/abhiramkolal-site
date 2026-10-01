// abhiramkolal.com page scripts. Kept in a file (not inline) so the site's CSP can stay script-src 'self'.

(() => {
  const LINKEDIN = '<a href="https://www.linkedin.com/in/abhiram-kolal/" target="_blank" rel="noopener">LinkedIn</a>';
  const EMAIL = '<a href="mailto:abhi.kolal@gmail.com">abhi.kolal@gmail.com</a>';
  const CHIPS = ["experience", "education", "MBA", "hobbies", "contact", "LinkedIn", "surprise me"];
  const JOKES = [
    "why did the payment break up with the bank? it needed some space between transactions.",
    "a product manager walks into a bar. asks the bartender what problem he's actually trying to solve.",
    "why don't wire transfers ever win arguments? they always need a confirmation.",
    "how many product managers does it take to change a lightbulb? first, let's align on what 'light' means for the user.",
    "a PM's favorite exercise? stretch goals.",
    "why did the roadmap go to therapy? too many dependencies.",
    "an engineer asks a PM how long it'll take. the PM says 'it depends.' that's the whole joke. that's every meeting.",
  ];
  const FUN_FACTS = [
    "fun fact: the first general-purpose charge card, Diners Club, launched in 1950 after a guy forgot his wallet at dinner (or so the legend goes).",
    "fun fact: the first ATM opened in London in 1967. it took paper vouchers, not cards.",
    "fun fact: the last digit of your card number is a checksum from the Luhn algorithm, created by IBM scientist Hans Peter Luhn in the 1950s. it catches most typos.",
    "fun fact: SWIFT, the network banks use to message each other about cross-border payments, was founded in 1973.",
    "fun fact: the US Federal Reserve launched FedNow, its instant payments service, in July 2023. checks are still hanging on though.",
    "fun fact: a card tap usually gets approved in under two seconds, but the money actually moves (settles) later, often the next business day.",
    "fun fact: ISO 20022, the data standard modern payments are moving to, was first published in 2004. payments move slow. the standards move slower.",
  ];
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
    [/address|street|apartment|zip ?code|exact location|where exactly/i, [
      "the bot doesn't do addresses. NJ/NYC and Austin, TX is as specific as it gets 🙂",
      "nice try. he's somewhere between NJ/NYC and Austin. for anything more, EMAIL",
    ]],
    [/where (does|do) he live|where is he (from|based|located)|hometown|location|where('s| is) he at|which city|what city|based (in|out of)/i, [
      "He's based between NJ/NYC and Austin, TX, and likes them both.",
      "Split between NJ/NYC and Austin, TX. He's a fan of both.",
    ]],
    [/single|dating|date him|girlfriend|boyfriend|wife|husband|married|marry|crush|relationship|rizz|is he taken|love life/i, [
      "the bot is strictly professional. ask me about his MBA instead, it's very romantic.",
      "i only know about his career. his love life is not in my training data 💀",
      "that's above my clearance level. i can tell you he went to Rutgers though?",
    ]],
    [/roast|insult|trash talk|\bdiss\b|clown|cringe|ugly|\blame\b|\bmid\b/i, [
      "i'm contractually obligated to only say nice things. that said, he probably owns too many sneakers.",
      "roast him? he built a website where the letter o runs away from him every 15 seconds. he's roasting himself.",
      "he says 'let's circle back' unironically. sometimes to his friends.",
      "he has more browser tabs open than finished side projects. this website is the rare exception.",
      "he built a chatbot so he'd never have to answer questions about himself in person. classic PM move: automate the awkward part.",
      "his sneaker collection and his budget spreadsheet are not on speaking terms.",
      "he'd make a slide deck about whether to make a slide deck. and it'd have an appendix.",
      "he calls it 'user research' when he asks his friends which restaurant to go to.",
    ]],
    [/fuck|shit|bitch|\bwtf\b|\bstfu\b|asshole|dumbass/i, [
      "whoa. keep it PG, this is a professional website (mostly).",
      "language! the o's are watching.",
    ]],
    [/1 ?v ?1|one on one|can he (dunk|hoop|ball)|is he (good|nice) at basketball|hooper|buckets|lebron|jordan|curry/i, [
      "he'll take that 1v1. results not guaranteed.",
      "he hoops. whether he hoops well depends on who you ask and what day it is.",
    ]],
    [/is he (cool|funny|nice|smart|good|tall|hot|cute|a good)|should i (meet|talk to|follow)|worth (it|hiring|meeting)/i, [
      "yooooo. you saw the o's. you tell me.",
      "the bot is biased, but yes. obviously.",
      "he built a website with escaping vowels and a chatbot about himself. draw your own conclusions.",
      "super friendly, outgoing, and picks things up fast. so yes, very cool.",
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

    [/^(help|menu|options|commands)\b|what can (you|i) (do|ask)|what should i ask/i, [
      "here's what i'm good for:<ul><li>his experience, school and MBA</li><li>hobbies (there are many)</li><li>how to reach him</li><li>payments and product explainers (try 'how do card payments work')</li><li>jokes, fun facts, and light roasting</li></ul>",
    ]],
    [/surprise me|random|bored|entertain me/i, [...JOKES, ...FUN_FACTS]],
    [/fun fact|did you know|teach me|something (smart|interesting|cool)|interesting/i, FUN_FACTS],
    [/joke|make me laugh|something funny|tell me something fun/i, JOKES],
    [/why (should (i|we) )?hire|reasons to|convince me|sell me|pitch (him|me)|top (5|five) reasons/i, [
      "why abhi is worth the call:<ol><li><b>he learns fast. really fast.</b> he had no real coding background, then taught himself enough web dev to build this whole site (the bouncing o's, this chatbot, all of it) using the resources around him</li><li><b>he adapts.</b> new team, new domain, new tools: he gets up to speed quickly and starts contributing</li><li><b>payments product manager</b>, so he can talk engineering and business in the same meeting</li><li><b>Rutgers '21, UT McCombs MBA '28</b> in progress, always sharpening the business side</li><li><b>super friendly and outgoing</b>, the kind of person teams actually like working with</li></ol>based between NJ/NYC and Austin, TX. reach him at EMAIL or on LINKEDIN.",
      "the short pitch: give abhi something he's never done before and watch what happens. he'd never really coded, and he still built this site, animations and chatbot included, by figuring it out with the resources he had. add payments product experience, an MBA in progress at UT McCombs, and a genuinely friendly, outgoing personality, and you get someone who ramps up fast and makes the team better. EMAIL · LINKEDIN",
    ]],
    [/what (does|do) (a |an )?(pm|product manager)s? (do|actually do)|what is (a )?product manag|what('s| is) product management/i, [
      "a product manager figures out what to build and why. the job, roughly:<ul><li>find the real customer problem</li><li>decide what matters most (and what waits)</li><li>get engineering, design and business pointed the same way</li><li>ship, measure, learn, repeat</li></ul>abhi does this in payments. more on LINKEDIN.",
      "PMs own the 'what' and the 'why'. engineers own the 'how'. the PM's job is to make sure the team builds the right thing, not just builds the thing right.",
    ]],
    [/how (do|does) (card |credit card |debit card |a card )?payments? (actually )?work|what happens when (i|you) (tap|swipe|pay)|how (do|does) (a )?card (payment|transaction)/i, [
      "a card payment in about two seconds:<ol><li>you tap or swipe</li><li>the store's bank (the acquirer) sends the request over the card network</li><li>your bank (the issuer) checks your balance and fraud signals, then approves or declines</li><li>the approval comes back to the terminal</li><li>later, usually the next business day, the money actually moves between banks (clearing and settlement)</li></ol>",
    ]],
    [/iso ?20022/i, [
      "ISO 20022 is a global standard for financial messages. it's the newer, richer way banks talk to each other about payments:<ul><li>structured data (real names, addresses, purpose of payment) instead of cramped text fields</li><li>better fraud and sanctions screening because the data is cleaner</li><li>SWIFT moved cross-border payments onto it, wrapping up the transition in November 2025</li></ul>basically: payments, but with better paperwork.",
    ]],
    [/cross[- ]border|international (payment|transfer|wire)s?|why (are|is) (international|overseas) (payments?|transfers?|wires?) slow/i, [
      "why international payments are slow and pricey:<ul><li>the money often hops through several 'correspondent' banks</li><li>each hop can add fees and a delay</li><li>there's currency conversion (FX) along the way</li><li>every bank runs its own compliance and sanctions checks</li></ul>newer rails, richer data standards like ISO 20022, and stablecoins are all chipping away at it.",
    ]],
    [/stablecoin/i, [
      "a stablecoin is a crypto token designed to hold a steady value, usually pegged 1:1 to a currency like the US dollar and backed by reserves. the pitch in payments: money that moves 24/7 and settles in minutes instead of days.",
    ]],
    [/\bach\b.*\bwire|\bwire.*\bach\b|ach vs|difference between ach/i, [
      "ACH vs wire, quick version:<ul><li><b>ACH</b>: processed in batches, cheap or free, usually 1 to 2 business days (same-day exists). think paychecks and bill pay.</li><li><b>wire</b>: sent individually and settles fast, often same day, costs more, and is basically irreversible. think house down payments.</li></ul>",
    ]],
    [/framework|prioriti[sz]|\brice\b|jobs to be done|jtbd|north star metric/i, [
      "a few product frameworks worth knowing:<ul><li><b>RICE</b>: score ideas by Reach × Impact × Confidence ÷ Effort</li><li><b>jobs to be done</b>: people don't buy a drill, they hire it to make a hole</li><li><b>north star metric</b>: the one number that best captures the value users get</li></ul>frameworks help you argue less. they don't decide for you.",
    ]],
    [/(get|break|transition) into (product|pm|tech)|become a (pm|product manager)|how (do|did) (i|he) get into product|career advice|any advice|tips for/i, [
      "general advice for breaking into product:<ol><li>get close to the product you already work near (support, analytics, engineering, ops all count)</li><li>write down problems you'd fix and why. that's PM thinking</li><li>learn enough tech to ask good questions</li><li>talk to customers whenever you can</li><li>ship something, even a side project. like, say, a website with a chatbot</li></ol>for his actual path, see LINKEDIN.",
    ]],
    [/i love you|marry me|do you like me|are we friends|you('re| are) (cute|cool|funny|smart)/i, [
      "the bot is flattered, but it's a static website. it can't love. it can only link to LinkedIn.",
      "aw. i'd blush but i'm made of javascript.",
    ]],
    [/\bsing\b|rap for me|freestyle|beatbox/i, [
      "la la la. that's my entire range.",
      "the bot doesn't perform. it just answers questions about résumés, very confidently.",
    ]],
    [/what time|weather|temperature|news|stock price|score of/i, [
      "no idea, i don't have windows. well, i live in browser windows, but i can't see out of them.",
      "i only know about abhi. for everything else there's literally the rest of the internet.",
    ]],
    [/chatgpt|claude|gemini|better than you|smarter than you/i, [
      "they're smarter. i'm more focused. i know one person really well.",
      "i'm not competing with the big models. i'm a résumé with a personality.",
    ]],
    [/what('s| is) he like|personality|vibe|as a person|is he (friendly|outgoing|easy to work with|a team player)|team player|work(ing)? with him/i, [
      "super friendly and outgoing. he's the person who talks to everyone in the room and remembers what they said.",
      "easy to work with, friendly, outgoing, and quick to adapt. the kind of teammate who makes the work more fun.",
    ]],
    [/who (built|made|coded|designed) (this|the site|you)|how (did|was) (he|this|the site) (build|built|make|made)|can he code|does he code|is he (technical|a developer|an engineer|a coder)|quick learner|learn(s)? fast|adapt/i, [
      "he built this whole site himself, and he had no real coding background going in. he picked up the web dev as he went, leaned on the resources around him, and shipped it: the bouncing o's, this chatbot, all of it.",
      "fun story: he's a product manager, not an engineer, and he never really coded before this. he figured it out anyway. that's kind of his thing: drop him into something new and he picks it up fast.",
    ]],
    // --- the real stuff ---
    [/linked\s*in/i, [
      "Here's his LINKEDIN.",
      "Right here: LINKEDIN. Go connect.",
    ]],
    [/mba|mccombs|\but\b|austin|grad(uate)? school|business school/i, [
      "He's currently getting his MBA at UT Austin's McCombs School of Business, class of 2028. More on LINKEDIN.",
      "MBA at UT McCombs, class of 2028. LINKEDIN has the rest.",
    ]],
    [/educat|school|college|rutgers|undergrad|degree|stud(y|ied)|graduat/i, [
      "Rutgers University, class of 2021. Now working on an MBA at UT McCombs (class of 2028). Full background on LINKEDIN.",
      "Rutgers '21 for undergrad, UT McCombs MBA '28 in progress. The rest is on LINKEDIN.",
    ]],
    [/doing now|currently|these days|up to\b/i, [
      "Right now he's a product manager in payments and getting his MBA at UT McCombs (class of 2028). Details on LINKEDIN.",
      "Building payments products, working through his MBA at UT McCombs, and making the o's on his website bounce in between. More on LINKEDIN.",
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
