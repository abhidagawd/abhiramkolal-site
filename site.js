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
  // voice: this is abhi talking. "you" in a question means abhi. the bot only shows up as
  // "Abhi Intelligence (AI)" when the question is really about the chat itself.
  // the playful ones up top catch the weird stuff before the normal intents can grab a keyword.
  const AI = "Abhi Intelligence (AI)";
  const INTENTS = [
    // --- questions about the chat itself: Abhi Intelligence (AI) answers ---
    [/ignore (all|previous|your)|system prompt|jailbreak|prompt injection|developer mode|\bhack/i, [
      "AI_NAME is like twelve if-statements in a trench coat. there's nothing to jailbreak, but I respect the hustle.",
      "nice try. AI_NAME isn't even a real AI, it's a list of my answers with a lot of confidence.",
    ]],
    [/are you (a |an )?(bot|ai|robot|real|human|chatgpt|claude|automated|actually abhi)|is this (a bot|ai|real|automated|really you|really abhi)|am i (talking|chatting) (to|with) (a bot|ai|a real|abhi|you)/i, [
      "you're talking to AI_NAME. my words, my answers, just on autopilot so I don't miss you while I'm busy.",
      "half me, half automation. AI_NAME runs the chat, but everything it says came from me. want the live version? EMAIL",
    ]],
    [/what time|weather|temperature|\bnews\b|stock price|score of/i, [
      "AI_NAME doesn't have windows. well, it lives in browser windows, but it can't see out of them.",
      "AI_NAME only knows about me. for everything else there's literally the rest of the internet.",
    ]],
    [/chatgpt|claude|gemini|better than you|smarter than you/i, [
      "they're smarter. AI_NAME is more focused. it knows exactly one person really well.",
      "AI_NAME isn't competing with the big models. it's a résumé with a personality.",
    ]],

    // --- the outlandish stuff ---
    [/password|\bssn\b|social security|credit card|card number|bank (account|info)|\bpin\b|phone|cell|text (him|you)|number/i, [
      "nice try 🙂 the only number I'm giving out is the class of 2028.",
      "lol no. but my email works great: EMAIL",
    ]],
    [/salary|how much (does he|do you) (make|earn)|money|\brich\b|net worth|paid|venmo|cash ?app|bitcoin|crypto|loan|borrow/i, [
      "I don't do financials in here. ironic, since I work in payments.",
      "I move money for a living, but not to you, sorry 😭",
    ]],
    [/\bage\b|how old|birthday|born|zodiac|star sign/i, [
      "old enough to have strong opinions about sneakers, young enough to still buy them. the exact number is classified.",
      "ageless. timeless. undisclosed.",
    ]],
    [/address|street|apartment|zip ?code|exact location|where exactly/i, [
      "I don't do addresses 🙂 NJ/NYC and Austin, TX is as specific as it gets.",
      "nice try. I'm somewhere between NJ/NYC and Austin. for anything more, EMAIL",
    ]],
    [/where (does he|do you) live|where (is he|are you) (from|based|located)|hometown|location|where('s he| is he| are you) at|which city|what city|based (in|out of)|where (are you|you|is he|he) (based|from|located|stay|at)/i, [
      "I'm based between NJ/NYC and Austin, TX, and I like them both.",
      "split between NJ/NYC and Austin, TX. big fan of both.",
    ]],
    [/single|dating|date (him|you|me)|girlfriend|boyfriend|wife|husband|married|marry|crush|relationship|rizz|(is he|are you) taken|love life/i, [
      "this chat is strictly professional. ask me about my MBA instead, it's very romantic.",
      "my love life is not in AI_NAME's training data 💀",
      "that's above this chat's clearance level. I can tell you I went to Rutgers though?",
    ]],
    [/roast|insult|trash talk|\bdiss\b|clown|cringe|ugly|\blame\b|\bmid\b/i, [
      "self-roast, since you asked: I probably own too many sneakers.",
      "I built a website where the letter o runs away from me every 15 seconds. I'm already roasting myself.",
      "I say 'let's circle back' unironically. sometimes to my friends.",
      "I have more browser tabs open than finished side projects. this website is the rare exception.",
      "I built a chat about myself so I'd never have to answer questions about myself in person. classic PM move: automate the awkward part.",
      "my sneaker collection and my budget spreadsheet are not on speaking terms.",
      "I'd make a slide deck about whether to make a slide deck. and it'd have an appendix.",
      "I call it 'user research' when I ask my friends which restaurant to go to.",
    ]],
    [/fuck|shit|bitch|\bwtf\b|\bstfu\b|asshole|dumbass/i, [
      "whoa. keep it PG, this is a professional website (mostly).",
      "language! the o's are watching.",
    ]],
    [/1 ?v ?1|one on one|can (he|you) (dunk|hoop|ball)|(is he|are you) (good|nice) at basketball|hooper|buckets|lebron|jordan|curry/i, [
      "I'll take that 1v1. results not guaranteed.",
      "I hoop. whether I hoop well depends on who you ask and what day it is.",
    ]],
    [/(is he|are you) (cool|funny|nice|smart|good|tall|hot|cute|a good)|should i (meet|talk to|follow)|worth (it|hiring|meeting)/i, [
      "yooooo. you saw the o's. you tell me.",
      "I'm biased, but yes. obviously.",
      "I built a website with escaping vowels and a chat about myself. draw your own conclusions.",
      "friendly, outgoing, and I pick things up fast. so yes, I'd say pretty cool.",
    ]],
    [/favou?rite|best (song|food|shoe|sneaker|team|movie|place)|top (5|five|3|three)\b(?! reasons)/i, [
      "too many favorites to fit in a chat bubble. ask me directly: EMAIL",
      "I haven't loaded my favorites into AI_NAME yet, and it refuses to make stuff up.",
    ]],
    [/meaning of life|why are we here|what is love|is the earth flat|aliens|simulation/i, [
      "42. also, good product sense.",
      "beyond my pay grade. I'm a product manager, not a philosopher.",
    ]],
    [/thank|thx|\bty\b|appreciate/i, [
      "anytime 🫡", "you got it.", "of course. come back soon, the o's get lonely.",
    ]],
    [/^(bye|cya|see ya|later|peace|gn)\b|goodbye/i, [
      "later! ✌️", "peace. tell your friends about the o's.",
    ]],
    [/^(lol|lmao|haha|💀|😂)/i, [
      "glad you're having fun. ask me anything.", "ikr.",
    ]],
    [/i love you|marry me|do you like me|are we friends|you('re| are) (so )?(cute|cool|funny|smart|awesome|great)/i, [
      "appreciate that 🙏 let's start with LinkedIn and see where it goes: LINKEDIN",
      "stop, you're gonna make the o's blush.",
    ]],
    [/\bsing\b|rap for me|freestyle|beatbox/i, [
      "la la la. that's my entire range in here.",
      "no performances in the chat. just very confident answers about my résumé.",
    ]],

    // --- lists, explainers, and the smart stuff ---
    [/^(help|menu|options|commands)\b|what can (you|i) (do|ask)|what should i ask/i, [
      "here's what you can ask me:<ul><li>my experience, school and MBA</li><li>hobbies (there are many)</li><li>how to reach me</li><li>payments and product explainers (try 'how do card payments work')</li><li>jokes, fun facts, and a little self-roasting</li></ul>",
    ]],
    [/surprise me|random|bored|entertain me/i, [...JOKES, ...FUN_FACTS]],
    [/fun fact|did you know|teach me|something (smart|interesting|cool)|interesting/i, FUN_FACTS],
    [/joke|make me laugh|something funny|tell me something fun/i, JOKES],
    [/why (should (i|we) )?hire|reasons to|convince me|sell me|pitch (him|me|yourself)|top (5|five) reasons|why (you|him)\b/i, [
      "why I'm worth the call:<ol><li><b>I learn fast. really fast.</b> I had no real coding background, then taught myself enough web dev to build this whole site (the bouncing o's, this chat, all of it) with the resources around me</li><li><b>I adapt.</b> new team, new domain, new tools: I get up to speed quickly and start contributing</li><li><b>payments product manager</b>, so I can talk engineering and business in the same meeting</li><li><b>Rutgers '21, UT McCombs MBA '28</b> in progress, always sharpening the business side</li><li><b>friendly and outgoing.</b> I genuinely like people, and it shows on a team</li></ol>I'm based between NJ/NYC and Austin, TX. reach me at EMAIL or on LINKEDIN.",
      "short version: give me something I've never done before and watch what happens. I'd never really coded, and I still built this site, animations and chat included, by figuring it out with what I had. add payments product experience, an MBA in progress at UT McCombs, and a genuinely friendly, outgoing personality, and you get someone who ramps up fast and makes the team better. EMAIL · LINKEDIN",
    ]],
    [/what (does|do) (a |an )?(pm|product manager)s? (do|actually do)|what is (a )?product manag|what('s| is) product management/i, [
      "a product manager figures out what to build and why. the job, roughly:<ul><li>find the real customer problem</li><li>decide what matters most (and what waits)</li><li>get engineering, design and business pointed the same way</li><li>ship, measure, learn, repeat</li></ul>I do this in payments. more on LINKEDIN.",
      "PMs own the 'what' and the 'why'. engineers own the 'how'. my job is to make sure the team builds the right thing, not just builds the thing right.",
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
      "a few product frameworks I like:<ul><li><b>RICE</b>: score ideas by Reach × Impact × Confidence ÷ Effort</li><li><b>jobs to be done</b>: people don't buy a drill, they hire it to make a hole</li><li><b>north star metric</b>: the one number that best captures the value users get</li></ul>frameworks help you argue less. they don't decide for you.",
    ]],
    [/(get|break|transition) into (product|pm|tech)|become a (pm|product manager)|how (do|did) (i|he|you) get into product|career advice|any advice|tips for/i, [
      "my advice for breaking into product:<ol><li>get close to the product you already work near (support, analytics, engineering, ops all count)</li><li>write down problems you'd fix and why. that's PM thinking</li><li>learn enough tech to ask good questions</li><li>talk to customers whenever you can</li><li>ship something, even a side project. like, say, a website with a chat in it</li></ol>my actual path is on LINKEDIN.",
    ]],
    [/what('s he| are you| is he) like|personality|vibe|as a person|(is he|are you) (friendly|outgoing|easy to work with|a team player)|team player|work(ing)? with (him|you)/i, [
      "friendly and outgoing. I'm the person who talks to everyone in the room and remembers what they said.",
      "easy to work with, friendly, outgoing, and quick to adapt. I like making the work more fun for everyone around me.",
    ]],
    [/who (built|made|coded|designed) (this|the site|you|it)|how did (he|you) (build|make)|how (was|is) (this|the site) (built|made)|can (he|you) code|do(es)? (he|you) code|(is he|are you) (technical|a developer|an engineer|a coder)|quick learner|learn(s)? fast|adapt/i, [
      "I built this whole site myself, and I had no real coding background going in. I picked up the web dev as I went, leaned on the resources around me, and shipped it: the bouncing o's, this chat, all of it.",
      "fun story: I'm a product manager, not an engineer, and I'd never really coded before this. figured it out anyway. that's kind of my thing: drop me into something new and I pick it up fast.",
    ]],

    // --- the real stuff ---
    [/linked\s*in/i, [
      "here's my LINKEDIN.",
      "right here: LINKEDIN. let's connect.",
    ]],
    [/mba|mccombs|\but\b|austin|grad(uate)? school|business school/i, [
      "I'm getting my MBA at UT Austin's McCombs School of Business, class of 2028. more on LINKEDIN.",
      "MBA at UT McCombs, class of 2028. LINKEDIN has the rest.",
    ]],
    [/educat|school|college|rutgers|undergrad|degree|stud(y|ied)|graduat/i, [
      "Rutgers University, class of 2021. now working on my MBA at UT McCombs (class of 2028). full background on LINKEDIN.",
      "Rutgers '21 for undergrad, UT McCombs MBA '28 in progress. the rest is on LINKEDIN.",
    ]],
    [/doing now|currently|these days|up to\b|(are you|is he) doing/i, [
      "right now I'm a product manager in payments and getting my MBA at UT McCombs (class of 2028). details on LINKEDIN.",
      "building payments products, working through my MBA at UT McCombs, and making the o's on this website bounce in between. more on LINKEDIN.",
    ]],
    [/experience|job|work|role|career|resume|résumé|\bcv\b|product|\bpm\b|for a living|does he do|do you do|what (he|you) do|occupation|skill|background|company|employer|recruit|professional|industry|fintech|payments/i, [
      "I'm a product manager working in payments. my full work history is on LINKEDIN.",
      "product manager in the payments world, basically making sure money gets where it's going. full story on LINKEDIN.",
      "product manager, payments. I'm the person asking 'but what problem are we solving' in every meeting. work history's on LINKEDIN.",
    ]],
    [/hobb|\bfun\b|music|free time|interest|weekend|basketball|hoop|nba|sneaker|shoe|food|\beat\b|restaurant|tech|travel|trip|hike|hiking|walk|friends|like to do/i, [
      "outside of work: music (making it and listening to it), basketball, tech, food, sneakers, hanging out with friends, walks and hikes, and traveling whenever I can afford to lol.",
      "music, basketball, tech, sneakers and good food. also walks, hikes, friends, and traveling when the budget allows.",
      "off the clock it's music, hoops, sneakers, food, tech, hikes, and the occasional trip (budget permitting lol).",
    ]],
    [/contact|email|mail|reach|hire|connect|talk|get in touch|\bdm\b/i, [
      "best way to reach me is EMAIL, or connect on LINKEDIN.",
      "shoot me an email at EMAIL. LINKEDIN works too.",
    ]],
    [/^(hi|hey|yo|hello|sup|wassup|what's up|hiya)\b|who (is|'s) (he|abhi|this)|who are you|who r u|about (him|abhi|you|yourself)|tell me about|introduce yourself/i, [
      "I'm Abhi (Abhiram Kolal): product manager in payments, Rutgers '21, and an MBA candidate at UT McCombs ('28). here's my LINKEDIN.",
      "yooooo, it's Abhi. payments product manager, Rutgers '21, McCombs MBA '28. ask me anything, or peep my LINKEDIN.",
    ]],
  ].map(([re, answers]) => [re, answers.map(a => a.replaceAll("LINKEDIN", LINKEDIN).replaceAll("EMAIL", EMAIL).replaceAll("AI_NAME", AI))]);
  const FALLBACKS = [
    `not sure about that one. try one of these, or email me at ${EMAIL}.`,
    `that one's outside what ${AI} knows. try a button below, or ask me directly: ${EMAIL}`,
    `I've got nothing on that in here, but I'm great at résumé questions. pick one 👇`,
    `hmm, ${AI} has no answer for that one. try a button below 👇`,
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
  // texting shorthand -> plain english before matching, so "where r u from" works like "where are you from".
  // "ur" is ambiguous (your / you're), so we try both readings.
  const SLANG = {
    u: "you", ya: "you", yu: "you", r: "are", y: "why", yr: "your", urs: "yours",
    wat: "what", wut: "what", wht: "what", whats: "what's", wats: "what's", hows: "how's", wheres: "where's", whos: "who's",
    im: "i'm", hes: "he's", youre: "you're", ure: "you're", dont: "don't", cant: "can't", doesnt: "doesn't",
    abt: "about", bc: "because", cuz: "because", pls: "please", plz: "please", rn: "right now", tysm: "thank you",
    wyd: "what are you doing", wya: "where are you at", hbu: "how about you", wbu: "how about you", n: "and",
  };
  function readings(text) {
    const base = text.toLowerCase().replace(/[’‘]/g, "'").replace(/([a-z])\1{2,}/g, "$1")   // "heyyy" -> "hey"
      .replace(/\b[a-z]+\b/g, w => SLANG[w] ?? w);
    return [base.replace(/\bur\b/g, "your"), base.replace(/\bur\b/g, "you're")];
  }
  function send(text) {
    text = text.trim(); if (!text) return;
    const m = document.createElement("div"); m.className = "msg me"; m.textContent = text; log.appendChild(m);
    const t = document.createElement("div"); t.className = "msg bot typing"; t.textContent = "typing…"; log.appendChild(t);
    log.scrollTop = log.scrollHeight;
    const asked = readings(text);
    const hit = INTENTS.find(([re]) => asked.some(t => re.test(t)));
    setTimeout(() => { t.remove(); bot(hit ? choose(hit[0].source, hit[1]) : choose("fallback", FALLBACKS), !hit); }, 420);
  }
  function open() {
    chat.classList.add("open"); ask.style.display = "none";
    if (!started) { started = true; bot("yooooo, it's abhi. what would you like to know about me?", true); }
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
