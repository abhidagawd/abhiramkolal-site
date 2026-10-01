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
    "why did the credit card go to therapy? it had too many unresolved disputes.",
    "my favorite kind of meeting is the one that could've been an email. my second favorite is the email that could've been a meme.",
    "what's a PM's favorite plant? the roadmap. it never stops growing.",
  ];
  const FUN_FACTS = [
    "fun fact: the first general-purpose charge card, Diners Club, launched in 1950 after a guy forgot his wallet at dinner (or so the legend goes).",
    "fun fact: the first ATM opened in London in 1967. it took paper vouchers, not cards.",
    "fun fact: the last digit of your card number is a checksum from the Luhn algorithm, created by IBM scientist Hans Peter Luhn in the 1950s. it catches most typos.",
    "fun fact: SWIFT, the network banks use to message each other about cross-border payments, was founded in 1973.",
    "fun fact: the US Federal Reserve launched FedNow, its instant payments service, in July 2023. checks are still hanging on though.",
    "fun fact: a card tap usually gets approved in under two seconds, but the money actually moves (settles) later, often the next business day.",
    "fun fact: ISO 20022, the data standard modern payments are moving to, was first published in 2004. payments move slow. the standards move slower.",
    "fun fact: the first product ever scanned with a barcode at a checkout was a pack of Wrigley's gum, in Ohio, in 1974.",
    "fun fact: QR codes were invented in 1994 by Denso Wave to track car parts. now they're how we read restaurant menus.",
    "fun fact: Apple Pay and Google Pay don't send your real card number to the store. they send a stand-in 'token', so a hacked register can't leak it.",
    "fun fact: the US got its first big real-time payments network, RTP from The Clearing House, in 2017, years after countries like the UK.",
  ];
  // first match wins. each intent has a few answers so repeat questions don't get the same line twice.
  // answers are fixed html; typed text is only ever shown via textContent.
  // voice: this is abhi talking. "you" in a question means abhi. the bot only shows up as
  // "Abhi Intelligence (AI)" when the question is really about the chat itself.
  // the playful ones up top catch the weird stuff before the normal intents can grab a keyword.
  // --- abhi's taste: shared by the topic answers and "surprise me" ---
  const ul = items => "<ul>" + items.map(i => `<li>${i}</li>`).join("") + "</ul>";
  const pickOne = list => list[Math.random() * list.length | 0];
  const SHOWS = ["Breaking Bad", "Better Call Saul", "The Wire", "Snowfall", "the Marvel universe", "The Fresh Prince of Bel-Air",
    "Abbott Elementary", "Atlanta", "Impractical Jokers", "Shrinking", "Community", "Black Mirror", "The Boondocks",
    "Game of Thrones", "Severance", "Suits"];
  const MOVIES = ["Boyz n the Hood", "Friday", "The Dark Knight", "Superbad", "Tropic Thunder", "The Raid: Redemption", "Bullet Train"];
  const ANIME = ["Naruto", "Dragon Ball Z", "Samurai Champloo", "Attack on Titan", "Jujutsu Kaisen", "Akira", "Cowboy Bebop"];
  const MUSIC = {
    "classic rock and the greats I grew up on": ["Pink Floyd", "Led Zeppelin", "Queen", "Santana", "Nirvana", "Rage Against the Machine", "Slayer", "Stevie Wonder", "Michael Jackson"],
    "2000s kid essentials": ["Linkin Park", "N.E.R.D", "Incubus", "Green Day"],
    "hip hop": ["A Tribe Called Quest", "Wu-Tang Clan", "Kendrick Lamar", "Lupe Fiasco", "J. Cole", "Drake", "Baby Keem", "Kanye West", "Travis Scott", "Mac Miller"],
    "R&B and the new wave": ["The Weeknd", "SZA", "The Internet", "Hiatus Kaiyote", "Kokoroko", "Tame Impala", "Toro y Moi", "KAYTRANADA"],
  };
  const ARTISTS = Object.values(MUSIC).flat();
  const FOODS = ["dosa (I'm South Indian, so this is non-negotiable)", "biryani", "chicken tikka", "pizza", "tacos", "jerk chicken",
    "Thai red curry", "a Chick-fil-A spicy chicken sandwich", "a bacon, egg and cheese", "boba", "Arizona green tea"];
  const CUISINES = ["Indian", "Mexican", "Thai", "Italian", "Caribbean"];
  const ME_FACTS = [
    "fact about me: I have a 2nd degree black belt in karate. very friendly though, I promise.",
    "fact about me: I played saxophone all through childhood.",
    "fact about me: I'm South Indian, which means I have strong opinions about dosa.",
    "fact about me: I will happily disappear into a random YouTube documentary at 1am.",
    "fact about me: my playlist goes Pink Floyd → Wu-Tang → Hiatus Kaiyote → Stevie Wonder with no skips.",
    "fact about me: I'm trying to get better at cooking. emphasis on trying.",
    "fact about me: Arizona green tea is basically a personality trait at this point.",
    "fact about me: I played basketball and baseball as a kid. key word: played. not dominated.",
    "fact about me: Spurs fan and Giants fan. yes, I've accepted the emotional cost.",
    "fact about me: I'm into cars and driving. a good drive with a good playlist fixes most things.",
    "fact about me: I dabble in graphic design, which is why this site has a vibe.",
  ];
  const RECS = [
    ...SHOWS.map(s => `show rec: ${s}. trust me.`),
    ...MOVIES.map(m => `movie rec: ${m}. tonight. no excuses.`),
    ...ANIME.map(a => `anime rec: ${a}. thank me later.`),
    ...ARTISTS.map(a => `music rec: go put on some ${a}.`),
    ...FOODS.map(f => `food rec: ${f}. you're welcome.`),
  ];
  // "surprise me" leans professional: ~70% career + payments/product insight, ~30% fun. recruiters only get the professional side.
  const PRO_SURPRISES = [
    ...FUN_FACTS,
    "career fact: I'm a product manager in payments. the whole job is making money move faster, safer, and with fewer headaches.",
    "career fact: I'm getting my MBA at UT McCombs, class of '28. Rutgers '21 before that.",
    "career fact: I built this entire site with no real coding background. learning fast is kind of my thing.",
    "career fact: I'm based between NJ/NYC and Austin, TX, and I'm comfortable working with teams in either.",
    "product take: the best feature is often the one you decide not to build.",
    "product take: if you can't explain the problem in one sentence, you're not ready to build the solution.",
    "product take: in payments, trust is the product. nobody wants a faster way to lose money.",
    "product take: talk to users early. it's a lot cheaper than a rewrite.",
    "product take: a metric without a decision attached to it is just trivia.",
    "product take: 'it depends' is a valid answer, as long as you say what it depends on.",
    "payments insight: most 'instant' card payments are only instantly approved. the money itself settles later.",
    "payments insight: richer payment data (hello, ISO 20022) means better fraud screening and fewer payments stuck in manual review.",
    "payments insight: the hardest part of moving money across borders usually isn't the tech. it's the chain of banks, FX and compliance checks in between.",
    `want the full professional story? it's all on ${LINKEDIN}.`,
    "try asking me 'how do card payments work' or 'what does a PM do'. I've got opinions.",
  ];
  const FUN_SURPRISES = () => [...JOKES, ...ME_FACTS, ...RECS];
  function surprise() {
    const pro = recruiterMode || Math.random() < 0.7;
    return pro ? choose("surprise-pro", PRO_SURPRISES) : choose("surprise-fun", FUN_SURPRISES());
  }
  const AI = "Abhi Intelligence (AI)";
  // recruiter mode: once someone says they're hiring, skip the bits and lead with the pitch + contact
  const RECRUITER = /\b(i'?m|i am|we'?re|we are) (a |an )?(recruiter|recruiting|hiring|in talent|from talent)|\brecruiter here\b|hiring manager|talent (acquisition|partner)|(open|available) (role|position)|job (opening|opportunity)|reach(ing)? out about (a |an )?(role|position|job|opportunity)|interested in (you|him|hiring)|are you open to|(you|he) (be )?interested in a (role|job|position)/i;
  const RECRUITER_CHIPS = ["why hire me", "experience", "education", "location", "contact", "LinkedIn"];
  const SERIOUS = /\b(be|get|act|talk|go|switch to|turn on) (serious|professional|formal|normal)\b|serious mode|professional mode|formal mode|(ok|okay|alright|but)?,? ?(seriously|for real|real talk|no jokes?|no cap)( though| tho| now)?[\s?!.]*$|can you be (serious|professional|normal)|drop the (jokes|bit|act)|give it to me straight|straight answers?|less (jokes|casual|playful)/i;
  const PLAYFUL = /\b(fun|casual|playful|chill|silly) mode|be (fun|casual|playful|silly) again|back to (fun|normal|casual)|bring back the (fun|jokes|yo)|un-?serious/i;
  let recruiterMode = false;
  // follow-up shapes, used by send() and by the no-context fallbacks in INTENTS
  const DOUBT = /^(really|rly|no way|are you sure|you sure|is that (true|right|real)|cap|that'?s cap|prove it|liar|lies|lying|you'?re lying|stop lying|i don'?t believe (you|that|it|this)|sure jan|yeah right|ok buddy|doubt|x to doubt|be honest|honestly|wait really|actually|for real though)[\s?!.]*$|^(fr|for real|seriously|true|real|no cap|swear|you swear|on god|deadass)\?+[\s!.]*$/i;
  const WHY = /^(why|why not|how come|how|how so|like what|such as|example|for example|give me an example|why'?s that|how'?s that)[\s?!.]*$/i;
  const CLARIFY = /^(what|huh|wdym|what do you mean|what does that mean|meaning|meaning what|explain|explain (that|please|more|yourself)|elaborate|say more|go on|tell me more|more|and|so|so what|and then|ok and|okay and|what about it|come again|i don'?t get it|i'?m lost|\?+)[\s?!.]*$/i;
  const INTENTS = [
    // hiring logistics: always answered straight, never with a joke
    [/salary (expectation|range|requirement)s?|compensation|\bcomp\b|pay (range|expectations?)|desired (salary|pay)|rate expectations?/i, [
      "happy to talk compensation in a real conversation. email me at EMAIL and we can get into it.",
    ], true],
    [/notice period|start date|when (can|could) (you|he) start|availability|available to start|relocat|remote|hybrid|in[- ]office|work authori[sz]ation|sponsorship|visa\b/i, [
      "good question. logistics like timing, location and work setup are best covered directly: EMAIL. for context, I'm based between NJ/NYC and Austin, TX.",
    ], true],
    [RECRUITER, [
      "oh hey, thanks for reaching out 🙏 here's the quick version:<ul><li><b>role:</b> product manager in payments</li><li><b>superpower:</b> I learn fast and adapt fast. no real coding background, and I still built this whole site myself</li><li><b>education:</b> Rutgers '21, UT McCombs MBA '28 (in progress)</li><li><b>based:</b> NJ/NYC and Austin, TX</li><li><b>vibe:</b> friendly, outgoing, easy to work with</li></ul>best next step: email me at EMAIL or connect on LINKEDIN. happy to chat.",
      "appreciate you stopping by. I'll keep it straight: I'm a payments product manager who ramps up fast on anything new (case in point: I built this site with no real coding background). Rutgers '21, McCombs MBA '28 in progress, based between NJ/NYC and Austin. let's talk: EMAIL · LINKEDIN",
    ], true],
    // --- career people checking me out: goals, how I work, why payments. high up so generic intents don't steal them ---
    // 1. career goals / 5 years / what's next. stays vague on purpose: no plans, no cities, no job search.
    [/career goals?|(long|short)[- ]term (goals?|plans?|vision)|(5|five|10|ten)[- ]year plan|where (do|will|would|can) you see (yourself|urself)|where (will|would) you be in|in (5|five|10|ten|a few) (years|yrs)\b|what('s| is) next for you|what do you want to do (next|long[- ]term|eventually|in the future|after)|what('s| is) your (dream (job|role)|ultimate goal|endgame|end goal)|dream (job|role)|what are you (working|building) toward/i, [
      "keep getting better at building products people trust with their money, and keep taking on bigger, messier problems. the MBA's part of sharpening that. the longer version is a better conversation: EMAIL",
      "five years out? bigger product bets, MBA done, and still the person asking what problem we're actually solving. happy to get into it live.",
      "honestly, I care more about the problem than the title. give me something hard where the details matter and I'm happy. that's a fun one to talk through over coffee: EMAIL",
    ], true],
    // 2. what role / looking for a job / open to opportunities / startup vs big co. never confirms or denies a search.
    //    note: "are you open to ..." is still caught first by RECRUITER (fine, that's the pitch + recruiter mode).
    [/(what|which) (kind|type|sort) of (role|job|position|team|company|companies|opportunit\w*|work|culture) (are you|is he|would you|do you|you'?re|you are) (looking|want|interested|hoping|open|after|seeking|like|prefer|thrive)|what (roles?|jobs?|positions?|opportunit\w*) (are you|is he) (looking|interested|open|after)|(are you|is he) (currently )?(looking for|searching for|seeking|hunting for|on the hunt for) (a |any )?(new )?(jobs?|roles?|positions?|opportunit\w*|work|gig)|(are you|is he) (job hunting|job searching|on the (job )?market|looking to (move|switch|leave))|open to (new )?(opportunities|roles|offers)|ideal (role|job|team|company|next role|work environment)|(would|could|do) you (ever )?(join|work at|work for|consider|want to work at) (a |an )?(startup|early[- ]stage|seed|small company|big company|big tech|faang)|startups? (or|vs\.?|versus) (big|large|corporate|enterprise)|(big|large) (company|corp\w*) (or|vs\.?|versus) (a )?startup/i, [
      "I don't run my career through a chatbot 😄 but I'm always up for a good conversation about interesting problems: EMAIL",
      "startup or big company, what matters more to me is the problem and the people. teams that ship, share context and sweat the details are my kind of teams. if you've got one in mind, EMAIL",
      "depends on the problem, so I'd rather hear what you have in mind than list a wishlist here. LINKEDIN or EMAIL, either works.",
    ], true],
    // 3. AI opinions / AI at work. placed above the "did ai make this site" intent but never matches "did you use ai to build this".
    [/(think|thoughts|take|opinion|feel|feelings|views?) (about|on|of) (\bai\b|a\.i\.|artificial intelligence|llms?|gen(erative)? ?ai|ai agents|agentic ai)|\bai\b (take|opinions?|thoughts|hype|bubble)|(do|did) you (use|leverage) (\bai\b|llms?|chat ?gpt|claude|copilot|ai tools) (at|for|in|on) (work|the job|your job|your work|product|pm work|your day)|how do you use (\bai\b|llms?|ai tools)|will (\bai\b|llms?) (replace|take|kill|change)|(\bai\b|llms?) (replac\w*|tak\w*|kill\w*|chang\w*) (pms?|product( managers?| management)?|jobs|payments|fintech|your job)|\bai\b (in|for|and) (payments|fintech|product|banking|finance)/i, [
      "AI's a real tool, not magic. I'm a believer. what it doesn't replace is judgment: knowing which problem matters. (fun irony: AI_NAME is fully scripted. no actual AI in here, just confidence.)",
      "in payments, AI is great at what humans are slow at, like spotting fraud patterns and cleaning messy data. but money runs on trust, so 'the model said so' isn't good enough. bullish, with guardrails.",
      "will AI replace PMs? it'll replace the busywork. talking to customers, making the call and getting a room aligned is getting more valuable, not less. always down to nerd out on this: EMAIL",
    ], true],
    // 4. why payments / why product / how did you get into it. goes above career-advice so "how did YOU get into product" isn't answered as advice.
    [/why (payments|fintech|finance|this industry|the payments (space|industry|world))\b|why (did|do) you (go|get|got|choose|pick|end up|work|want to work) (in|into|in the) (payments|fintech|finance)|(how|why) (did|do) you (get|got|end up|fall) into (payments|fintech|product|product management|pm)\b|what (do you|you) (like|love|enjoy) (most )?about (payments|fintech|your (job|work|role)|product( management)?|being a (pm|product manager))|why (product|product management|pm|be a pm|become a pm|are you a pm)\b|why (did|do) you (go|get|choose|pick|become) (into |a )?(product|pm|product manager)\b/i, [
      "payments is invisible when it works and a disaster when it doesn't. high stakes, real infrastructure, and a ton changing right now. trust is the product, and I like building trust.",
      "I like being the person who connects the why to the what: talk to customers, work through it with engineers, make the call, watch it ship. it fits how my brain works.",
      "money moving around the world is wildly complex and almost nobody thinks about it. making that invisible for the person on the other end is a fun problem. my path's on LINKEDIN.",
    ], true],
    // 5. behavioral / "tell me about a time". must sit above the final greeting intent (which grabs "tell me about").
    [/tell me about a time|(an )?example of a time|(a |one )?time (when )?you (failed|messed up|disagreed|had to|made a mistake|screwed up|dropped the ball|led|influenced)|biggest (challenges?|mistakes?|failures?|regrets?|lessons?|setbacks?)|hardest (project|decision|lesson|problem you)|learn(ed)? from (a )?(failure|mistake)|how do you (handle|deal with|learn from|respond to) (failure|failing|mistakes|setbacks)|\bstar (method|format|story)/i, [
      "good one, and it deserves a real story, not a chatbot one. ask me live. the short version of how I operate: own it fast, fix it, write down what I'd change.",
      "I've got stories, but they need more context than a chat bubble. when things go sideways I don't hide it, I find the root cause and fix forward. happy to walk through one: EMAIL",
    ], true],
    // 6. what have you shipped / accomplishments / portfolio / case studies. no invented wins: tease, then route live.
    [/what (have|did) you (ship|shipped|build|built|launch|launched|deliver|delivered|accomplish|accomplished|work on|worked on)\b(?! (this|the site|it|that|with)\b)|(biggest|proudest|greatest|best|top|favou?rite|key|major) (accomplishments?|achievements?|wins?|launch(es)?|projects?)\b|accomplishments?|achievements?|(products?|projects?|things?|launch(es)?|features?|work) (you'?re|you are|you were|he'?s|he is) (most )?proud of|proud(est)? of (professionally|at work|in your career)|portfolio|case stud(y|ies)|work samples?|examples? of (your )?(work|projects?)|track record/i, [
      "the good stuff needs real context, so I'd rather walk you through it live than turn it into chatbot bullets: EMAIL. the one I can show you right now is this site. no real coding background, built it anyway.",
      "most payments product work isn't the kind you can post publicly, so no public portfolio. happy to walk through it on a call though: EMAIL · LINKEDIN",
    ], true],
    // 7. conflict / stakeholders / saying no / pushback. above the "address" privacy intent.
    [/conflicts?\b|disagreements?\b|disagree(ing)? with (engineers?|engineering|your (boss|manager|team|lead)|stakeholders|leadership|design|someone|a coworker)|stakeholders?|say(ing)? no (to|when)|how do you say no|push(ing)? back|pushback|difficult (people|person|coworkers?|colleagues?|stakeholders?|conversations?|boss|manager)|manag(e|ing) (up|expectations|executives|leadership|stakeholders)|(get|getting|build|building) (buy[- ]in|alignment|consensus)|\bbuy[- ]in\b|competing (priorities|asks|requests)/i, [
      "get everyone agreeing on the problem before arguing about the solution. most conflict is people optimizing for different goals. name the goals and half of it goes away.",
      "saying no is half the job. the trick is making it a clear 'not now, here's why, here's what we're doing instead.' it helps that I genuinely like people, the hard conversations get easier.",
      "if engineering pushes back, they usually know something I don't, so I start by listening. disagree in the room, commit after.",
    ], true],
    // 8. working with engineers / design / cross-functional. above the dating intent ("relationship").
    [/(work|works|working|collaborat\w*|partner\w*|relationship|get along|communicat\w*) with (your |the )?(engineers?|engineering|devs?|developers?|designers?|design team|data (science|scientists?)|analysts?|tech (team|leads?)|cross[- ]functional|other teams|sales|ops|operations|legal|compliance|business (side|teams?)|executives|leadership)|cross[- ]functional|technical (teams?|people|folks)/i, [
      "I own the what and the why, engineers own the how. I bring them in early, share context instead of just tickets, and when they flag an edge case I listen. in payments the edge cases are the product.",
      "cross-functional is where I'm most comfortable. engineering, design, compliance, the business side: different languages, same goal. I'm the translator.",
    ], true],
    // 9. decisions / ambiguity / product philosophy / tradeoffs / deadlines. ("how do you prioritize" stays with the existing frameworks intent.)
    [/(make|making|made) (product |hard |tough |big )?decisions|decision[- ]making|how do you decide\b|ambigu\w*|uncertainty|product (philosophy|sense|thinking|principles|intuition)|(your|my) (approach|process) (to|for) (product|building|new features|problems)|how do you (approach|think about) (product|building|problems|new (features|products))|trade[- ]?offs?|tight deadlines?|(handle|deal with|manage) (deadlines|pressure|scope creep)|scope creep|what('s| is) your process\b/i, [
      "fall in love with the problem, not the solution. ship small, learn fast. and know which decisions you can undo. in payments plenty you can't, so those get extra care.",
      "ambiguity is kind of the job. get a good-enough read on the problem fast, take the smallest step that teaches you something, adjust. waiting for perfect info is a decision too, usually a bad one.",
      "on tradeoffs: cut scope, not quality. figure out what has to be true on day one, ship that, be honest about what moved to v2.",
    ], true],
    // 10. how do you use data / experiments / customer research. above the "number" privacy intent and the metrics explainer.
    [/(use|using|uses|leverage|approach) data\b|data[- ](driven|informed|analysis)|\banalytics\b|a\/b test\w*|\bab test\w*|split test\w*|\bexperiment(s|ation|ing)?\b|how do you (use|look at|think about|read) (data|numbers|the numbers)|user research|customer (research|interviews?|feedback)|talk(ing)? to (users|customers)/i, [
      "data tells me what's happening, customers tell me why. I want both before I build anything, and I want the numbers after to see if it actually worked.",
      "data-informed, not data-driven. great at telling you what happened, not so great at telling you what to build next. that part takes customers and judgment.",
      "in payments you can't casually A/B test someone's money, so it's careful rollouts, strong guardrail metrics, and watching closely. fun puzzle, honestly.",
    ], true],
    // 11. what makes you different / stand out. ("why should I hire you" stays with the existing hire-pitch intent.)
    [/what makes you (different|unique|special|stand out|better)|(how|why) (are you|is he) (different|unique)|\bstand out\b|set(s)? you apart|differentiat\w*|what (do|can|would) you bring( to the table)?|unique (value|skills?|strengths?|perspective)|over (other|the other|another) (candidates?|pms?|applicants?)/i, [
      "the combo: payments depth, I learn absurdly fast (exhibit A: this site, no real coding background), and I genuinely like people, which makes alignment way easier. plus a design eye, clearly.",
      "plenty of PMs can run the process. what I bring is speed to understanding: new domain, new tools, new team, I get to useful fast. happy to prove it in a conversation: EMAIL",
    ], true],
    // 12. management / leadership / working style / what coworkers would say. no claims about direct reports.
    [/(management|leadership|working|work|communication|collaboration|pm|product) style|how do you (lead|manage (people|a team|teams|others))\b|(do|have) you (ever )?(manage|managed|lead|led) (people|a team|teams|direct reports|reports)|direct reports|what kind of (leader|manager|teammate|coworker|colleague|pm|product manager) (are you|is he|would you be)|(how would|what would) (your )?(coworkers|colleagues|teammates|peers|manager|boss|team) (say|describe)|what do (your )?(coworkers|colleagues|teammates|peers|manager|boss|team) (say|think) (about|of) you/i, [
      "lead with context, not control. most PM leadership happens without a reporting line, so it's about making the why clear and giving people room to own the how.",
      "my teammates would probably say: friendly, quick to pick things up, and very into getting everyone pointed at the same goal. the real version comes from them, later in a real process.",
      "clear, direct, and written down. a short doc beats a long meeting, and I'd rather over-share context than have someone guess.",
    ], true],
    // 13. resume / CV / references. above the experience catch-all (which grabs "resume" and "cv").
    [/(see|send|share|get|have|download|view|attach|forward|copy of|look at|grab) (me )?(your |his |a |the |an updated )?(resume|résumé|cv)\b|(resume|résumé|cv) (please|link|pdf)|^(your )?(resume|résumé|cv)[\s?!.]*$|\breferences?\b(?! (to|in) )|reference check|recommendation letters?|letters? of recommendation/i, [
      "resume's not posted publicly, but LINKEDIN has the full history and I'm happy to send the latest version: EMAIL. references come later in the process.",
      "sure, just email me at EMAIL and I'll send it over. LINKEDIN works in the meantime.",
    ], true],
    // 14. favorite product / product you'd improve / product teardown. above the taste "favou?rite" catch-all.
    [/favou?rite (products?|apps?|tech( products?)?|companies|company|features?|fintech|startups?|payments? (apps?|products?|companies))\b|(products?|apps?|features?) (you|do you|you'?d|would you|that you) (love|like|admire|use (the )?most|hate|dislike|can'?t stand|would improve|improve|change|fix|redesign)|(what|which) (products?|apps?|features?) (would you|do you|you'?d|should you) (improve|change|fix|redesign|build|rebuild|add)|(improve|redesign|fix|rebuild) (a|any|one|an) (product|app|feature)|product (critique|teardown|design question)|(well|badly|poorly) designed (products?|apps?)|what product (do you|would you)/i, [
      "a great example of what I love in a product: tap to pay. a crazy amount of machinery hiding behind a two-second beep. the best products make the hard part invisible.",
      "one I'd improve: international money transfers in general. you still often can't see the full fee or the real arrival time up front. fix that and you win a lot of trust.",
      "my test for any product: how much did it make me think? great ones disappear into the task. happy to do a full teardown of any app over coffee: EMAIL",
    ], true],
    // why the site exists / what the idea is
    [/why (did|would) you (make|build|create) (this|a website|this site|a chatbot|this chat)|why (does )?this (site|website) exist|what('s| is) the (point|idea|story) (of|behind) (this|the site|this site)|why the (o'?s|bouncing|chat)/i, [
      "I'm part of the generation that grew up alongside the internet. smartphones showed up when we were kids, and we picked up every new piece of tech as it landed. that's part of my identity, so I wanted my site to feel like it: playful on the surface, serious underneath. ask me anything professional and you'll see.",
      "two reasons: I wanted a site that actually feels like me, and I wanted to prove I could build one from scratch with no real coding background. the bouncing o's are the fun part. the payments PM, the MBA and the fast learning are the serious part. both are real.",
    ], true],
    // people calling out the vibe: "why is this professional site saying yooooo"
    [/(why|how come)\b.*\b(yo|casual|unprofessional|informal|slang|lowercase|chill)\b|supposed to be (a )?professional|(not|isn'?t|un|very un)( very| that| really| super| exactly)? ?professional|so (casual|informal|chill)|professional\b.*\byo\b|\byo\b.*\bprofessional/i, [
      "real answer: I grew up right as the internet and smartphones took off. my generation learned tech by living in it, and that's part of who I am. so this site celebrates it instead of hiding it. but look around: it's clean, the answers are real, and the work is serious. fun and professional aren't opposites.",
      "fair question. the résumé is professional. the website is me. both are true. the 'yooooo' stays.",
      "professional doesn't have to mean boring. the experience, the MBA and the payments stuff are all real. the 'yooooo' is just the cover letter.",
      "you caught me. LinkedIn is where I wear the suit, this is where I wear the sneakers. both are below 👇 LINKEDIN",
      "the 'yooooo' is a culture-fit test. you're still here, so you passed.",
      "I'm professional where it counts: shipping, communicating, delivering. greetings are where I let loose.",
      "would 'Greetings, valued visitor' have been better? exactly. yooooo it is.",
    ], true],

    // --- "wait, is this a joke?": people who find a casual professional site confusing or rude ---
    // bare agreement slang. sits above SERIOUS so a bare "no cap" doesn't flip serious mode
    [/^(bet|fr|fr fr|frfr|no cap|no cap fr|deadass|ong|on god|on god fr|say less|facts|fax|real|so real|true|word|valid|period|periodt|on everything|for sure|fs)[\s!?.💯🙏🤝]*$/i, [
      "bet 🤝 now ask me something real.",
      "say less. actually, say more.",
      "AI_NAME has verified this as 100% no cap.",
      "on god. the o's agree.",
    ], true],
    // acknowledgements and bare yes/no: keep things moving
    [/^(cool|nice|interesting|got it|gotcha|makes sense|fair|fair enough|i see|oh|ohh|ah|ahh|ahh ok|oh ok|oh okay|hmm|hm|neat|sweet|dope|aight|sounds good|good to know|noted|love it|love that|nice nice|cool cool|oh nice|oh cool|ok cool|okay cool|ok nice)[\s!.]*$/i, [
      "glad that landed. what else do you wanna know? 👇",
      "cool cool. pick another one 👇",
      "AI_NAME has plenty more where that came from 👇",
      "right? ask me something else.",
    ], true, "ack"],
    // "no" / "nothing": could be "nothing much" small talk or "nothing else, I'm done", so the answers work for both
    [/^(no|nope|nah|naw|no thanks|no thank you|nah i'?m good|no i'?m good|not really|not rn|not right now|nothing|nothing else|nothing rn|nothing really|nada|that'?s it|that'?s all|i'?m done|done|we'?re good|that'?s everything)[\s!.]*$/i, [
      "fair enough 😄 I'm here if anything comes to mind. or say hi to the real me: EMAIL",
      "all good. the o's will keep bouncing whenever you're back.",
      "no worries. thanks for stopping by, seriously 🙏",
      "say less. AI_NAME will be right here. the real me is at EMAIL.",
    ], true, "ack"],
    [/^(yes|yeah|yea|yep|yup|yess|sure|of course|definitely|absolutely|maybe|idk|i don'?t know)[\s!.]*$/i, [
      "love the energy. what do you wanna know? 👇",
      "fair enough. tap something below and let's keep going 👇",
      "noted. so what are we talking about next? 👇",
    ], true, "ack"],
    [DOUBT, [
      "really what? 😄 ask me something and I'll back it up.",
      "I haven't even said anything yet. ask away 👇",
    ], true, "ack"],
    [/^(why|how|what|huh|wdym|what do you mean|\?+)[\s?!.]*$/i, [
      "why what? 😄 give me a little more and I'll answer.",
      "I need a little more than that. try a button below 👇",
    ], true, "ack"],
    [SERIOUS, [
      "you got it. straight version, no bits:<ul><li><b>who:</b> Abhiram Kolal, product manager in payments</li><li><b>education:</b> Rutgers '21, UT McCombs MBA '28 (in progress)</li><li><b>strengths:</b> I learn fast, adapt fast, and I'm easy to work with</li><li><b>based:</b> NJ/NYC and Austin, TX</li><li><b>contact:</b> EMAIL · LINKEDIN</li></ul>I'll keep it professional from here. say 'fun mode' anytime to bring the jokes back.",
      "serious mode on. I'm a payments product manager (Rutgers '21, McCombs MBA '28 in progress) who ramps up quickly on anything new. the best ways to reach me are EMAIL and LINKEDIN. ask me anything and I'll answer it straight. 'fun mode' switches it back.",
    ], true],
    [PLAYFUL, [
      "yooooo, we're back 🎉 ask me anything.",
      "fun mode restored. the o's are relieved.",
    ], true],
    // --- strangers decoding the vibe: what 'yo' means, not yelling, not a business, sincere, which Abhiram ---
    // YO_MEANING: non-native speakers / people who don't get the greeting
    [/what (does |do )?(the )?(yo|greeting|headline|heading|big text)( even| really)? (mean|stand for)|what means (the )?(yo|greeting)|meaning of (the )?(yo|greeting)|\byo\b (means|meaning)|define yo\b|(don'?t|do not|didn'?t) (understand|get) (the )?(greeting|yo\b|headline|heading|big text)|^what('s| is) (a )?yo[\s?!.]*$|what('s| is) (the )?(deal|point|story|thing) (with|of|behind) (the )?(yo|greeting)\b|^yo\?+$/i, [
      "'yo' is casual English for 'hi'. the extra o's mean I'm extra happy you're here. so: 'hiiii, it's Abhi' 👋",
      "it's just a hello. 'yo' is how a lot of us say hi, and stretching it out means you're genuinely glad to see someone.",
      "translation: 'hello! I'm Abhi.' the five o's are enthusiasm, not a typo.",
    ], true],
    // NOT_YELLING: people who think the big "yooooo" is aimed at them
    [/why (are|r) you (yelling|shouting|screaming|being loud)|(stop|quit|no need to|don'?t|why) (yelling|shouting|screaming)|(yelling|shouting|screaming) at me|why (is|are) (it|this|the text|everything|the letters) so (big|loud)|who (are|is) (you|this|it|that|the yo) (talking|speaking|saying (yo|that)|yelling|waving|saying hi) (to|at)|(is|was) (that|this|the yo|it) (meant )?(for|to|at|directed at) me|(saying|said) (yo|hi|that) to me\??$/i, [
      "not yelling, promise 😅 big letters, friendly intent. the 'yooooo' is me waving at whoever shows up, and right now that's you 👋",
      "it's you! the 'yooooo' is a hello to every visitor. think of it as a wave from across the street.",
    ], true],
    // NOT_A_BUSINESS: "is this a real business / company / brand"
    [/(is|are) (this|it|you|this site|this website|this page) (a |an )?(real |actual |legit |legitimate |registered )?(business|company|brand|agency|startup|store|shop|firm|organization)\b|is this (your|his|abhi'?s) (company|business|startup|brand|agency)|what (company|business|brand|agency) is this|(company|business) website\?*$/i, [
      "not a business, just my personal site. nothing for sale. I'm a payments product manager, and this is where I say hi.",
      "no company here, just me. the professional side lives on LINKEDIN.",
    ], true],
    // SINCERE: "are you being sarcastic", "is this appropriate", "are you serious about your career"
    [/(are|r) you (being )?(sarcastic|ironic|facetious)|is (this|that|it|the yo|this site) (being )?(sarcastic|sarcasm|ironic|irony|tongue[- ]in[- ]cheek)|is (this|this site|this website|this page|the yo|that|the greeting|it) (really |even )?(appropriate|acceptable)|\binappropriate\b|appropriate for (a )?(professional|work|linkedin|a resume|a portfolio|recruiters?)|(are|r) you (even )?serious about (your |ur |a )?(career|job|work|this)|do you (actually |even )?(care about|take) (your |ur )?(career|job|work)/i, [
      "no sarcasm anywhere. the 'yooooo' is a real hello, and the work is real too: payments PM, Rutgers '21, McCombs MBA '28. playful tone, serious person. 'serious mode' gets you straight answers.",
      "totally sincere. I grew up as smartphones and the internet showed up, and the site leans into that. the career I take very seriously. LINKEDIN has the formal version.",
      "fair question. yes, I'm serious about the work. I just don't think that means sounding like a press release.",
    ], true],
    // WHICH_ABHI: googled the name / which Abhiram / who am I talking to.
    // excludes "abhi from rutgers/college/..." so old friends still hit their own intent.
    [/(is|are) (this|you|this site|this website|this page|it) (the )?(real |actual |official |same |right )?(abhiram|abhi)( kolal)?('?s)?\b(?! or)(?!.*\bfrom (rutgers|college|school|high ?school|class|back in the day|nj)\b)|which (abhiram|abhi)\b|(another|other|different|two|more than one|multiple) (abhiram|abhi)s?\b|(real|actual|official|same|right) (abhiram|abhi kolal)\b|(abhiram|abhi) (on|from) linked ?in|^(abhiram|abhi) kolal\?*$|who am i (talking|speaking|chatting) (to|with)/i, [
      "yep, Abhiram Kolal's site, and you're chatting with a scripted version of me: payments product manager, Rutgers '21, McCombs MBA '28. if that's who you're after, LINKEDIN confirms it.",
      "if you're looking for the Abhiram Kolal in payments product (Rutgers '21, McCombs MBA '28), that's me 👋 if you meant someone else, wrong Abhi, but hi anyway.",
    ], true],
    // the obvious answer to the greeting: "what should i know about abhi?"
    [/what (should|do|would|must|can) (i|we|people|someone|one) (know|learn) (about )?(you|him|abhi|abhiram)|what (do|would) you want (me|people|us) to know|what('s| is) (important|worth knowing|the (main|most important|biggest|key) thing) (to know )?(about )?(you|him|abhi)?|(anything|something) (i|we) should know|what (should|do) (i|we) know\??$|^(idk|i don'?t know),? (you tell me|what should i (know|ask))|you tell me[\s?!.]*$|(give me|what are) (the |your )?(highlights|basics|main points|key points)/i, [
      "the short version: this site is basically me. the 'yooooo' and the bouncing o's are the personality: I grew up right alongside the internet, I'm into cool stuff, and I don't take myself too seriously. the answers underneath are the professional part: payments product manager, Rutgers '21, McCombs MBA in progress. curious, capable, easy to work with. that's the whole idea.",
      "three things, and this whole site is built around them:<ol><li><b>I'm good at what I do.</b> payments product manager, Rutgers '21, MBA at UT McCombs</li><li><b>I'm curious.</b> I'd never really coded, and I built everything you're looking at because I wanted to figure it out</li><li><b>I'm easy to work with.</b> friendly, outgoing, and fun to be around</li></ol>the 'yooooo' is the personality. the rest is the work.",
      "that fun and capable aren't opposites. I wanted a site that feels like me: playful on the surface, serious underneath. I'm a payments PM who picks things up fast, gets genuinely excited about cool stuff (tech, anime, food, the Spurs), and makes the teams I'm on better to be part of.",
    ], true],
    [/why (should|would|do) (i|we|anyone|people) (want to )?(care( about)?|talk to|meet|know|connect with|work with|pay attention to) ?(you|him|abhi|abhiram)?|why (are you|is (he|abhi)) (worth|important|interesting|special)|what'?s so (special|great|interesting) about (you|him|abhi)/i, [
      "because I'm more than a résumé, and this site is here to show the person behind it: someone who takes the work seriously, learns fast, and is genuinely good to work with. payments PM, McCombs MBA in progress, and the guy who taught himself enough to build all of this. worth a conversation, I think: EMAIL",
      "you don't have to. but you're still here, so something caught your eye 👀 that's the point of all this: the o's show you the personality, the answers show you I can do the job. curious, capable, easy to work with.",
      "because people who are both fun and good at their job are rarer than they should be. this site is me showing you I'm both: the o's are the fun, the answers are the substance. judge for yourself: EMAIL · LINKEDIN",
    ], true],
    // "this doesn't say much about you": a taste of the personality, then a nudge to actually talk
    [/(doesn'?t|does not|didn'?t|don'?t|do not) (say|tell( me)?|show|explain) (much|a lot|anything|enough)|(not|barely) (much|a lot|enough) (info|information|here|to go on|about you)|(still )?(don'?t|do not) know (anything|much|a lot) about (you|him)|^(is that it|that'?s it|that'?s all|is that all|and\??|and\.\.\.|go on|tell me more|more|say more|keep going|then what|what else)[\s?!.]*$|who (are you|is he|is abhi) (really|actually|for real|deep down)|(the )?real (you|abhi)\??$|what (else|more) (is there|should i know|about you)|(go|dig|get) deeper|beyond (the|your) (resume|résumé|job|linkedin)|what makes you (you|tick|different)|what drives you/i, [
      "honestly, I'm better in conversation than in a chat bubble. what I can tell you: I'm curious about pretty much everything, I pick things up fast, and I'm easy to work with. the rest is more fun to tell you myself: EMAIL",
      "the quick version: payments PM, MBA student at McCombs, and the person in the room asking 'wait, how does this actually work?' ask me something specific and I'll give you a taste.",
      "I could list everything, but résumés are boring and I'm not. pick a lane (payments, anime, food, the Spurs) and see where it goes. or skip ahead and say hi: EMAIL",
      "short answer: I like figuring things out and I like people. the long answer usually comes with coffee ☕ EMAIL · LINKEDIN",
    ], true],
    [/is (this|that|it|the yo|this site|this website|this page|this chat|abhi|he|you) (a |an |some )?(joke|prank|satire|parody|bit|troll|meme|gag|real\b|serious|for real|actually serious)|(are|r) you (joking|trolling|kidding|serious|for real|being serious|pranking)|is this (supposed to be )?(a )?(real|actual) (website|site|person|thing)|this (can'?t|cannot) be (real|serious)|(is|was) this (made )?as a joke/i, [
      "not a joke, I promise. I'm a real payments product manager, Rutgers '21, McCombs MBA '28. the site is just written in my actual voice instead of résumé-speak. ask me anything serious and you'll get a serious answer. or say 'serious mode' and I'll drop the bits entirely.",
      "totally real. the 'yooooo' is just how I talk. the experience, the degrees and the work behind it are all legit, and LINKEDIN backs it up.",
      "real person, real résumé, real website I built myself. the playful part is a choice, not a prank. want the buttoned-up version? type 'serious mode'.",
    ], true],
    [/(is|was) (that|this|the yo|yo|it|this site|the greeting) (rude|disrespectful|an insult|insulting|offensive|mocking|condescending|unprofessional)|(are|r) you (mocking|insulting|making fun of|disrespecting|being rude)|(making|make) fun of me|(i'?m|i am|i feel|feeling|kinda|kind of|a bit|little) (offended|insulted|disrespected)|that'?s (rude|disrespectful|insulting|offensive)|don'?t (call me|say) yo|did you just (yo|say yo|call me)|why (did|would) you (say|call me) yo|who says yo/i, [
      "no disrespect at all, genuinely. 'yo' is how I say hi to people I'm happy to see, and you made it here, so 🙏 if you'd rather keep it formal, just say 'serious mode' and I will.",
      "sorry if it landed wrong. it's meant as a warm hello, not a joke at anyone's expense. around NJ/NYC, 'yo' is basically a handshake. happy to keep it professional from here: say 'serious mode'.",
      "never trying to offend. I just wanted my site to sound like me instead of a cover letter. everything here is sincere, and I'm happy to switch to straight answers: type 'serious mode'.",
    ], true],
    [/is (this|it|the site|this site|this website|this page|the website|this link|the link) (safe|legit|a scam|scam|phishing|a virus|malware|sketchy|spam|secure)|(are you|is this) (selling|trying to sell|scamming)|what'?s the catch|is there a catch|what do you want (from me)?|what are you selling|why (am i|was i sent) here|did you (send|give) me a virus/i, [
      "100% safe. it's a personal website: no logins, no forms, no downloads, no tracking, and nothing for sale. the only thing I'm 'selling' is a good conversation. EMAIL if you want one.",
      "no catch. this is just my corner of the internet: who I am, what I do, and some bouncing o's. nothing you type is saved, and nothing is being sold to you.",
    ], true],
    [/this (site |website |page |chat )?is (so )?(weird|strange|odd|confusing|random|a lot|chaotic|bizarre|wild)|(what|wtf) (is|did i just) (going on|happening|walk into|see)|i'?m (so )?confused|(don'?t|do not) (get|understand) (it|this|the site)|i don'?t get it|what am i supposed to do( here)?/i, [
      "fair, let me orient you:<ul><li><b>who:</b> I'm Abhi, a product manager in payments</li><li><b>the o's:</b> a nod to the old DVD screensaver. they bounce, then come home</li><li><b>this chat:</b> me, answering in my own voice. ask anything, or tap a button</li></ul>that's the whole thing. no tricks.",
      "totally fair reaction. short version: I'm a payments product manager, and this is my personal site, built by me, written how I actually talk. the buttons below are a good place to start 👇",
    ], true],
    [/did (ai|chat ?gpt|claude|an ai|a bot) (make|build|write|design|code) (this|the site|this site|you|it)|is (this|the site|this site|it) (made by |built by |written by )?ai\b|ai[- ]generated|(did|do) you (use|have) ai (to )?(make|build|write|code|for)|did you (actually )?(make|build|code|design) (this|it) yourself|you made this\?*$/i, [
      "all me. 100% handcrafted. ...lol ok I'm lying, AI def helped. let's call it a collaboration where I was the boss 😌",
      "did AI help? maybe. did I make it happen? definitely. we'll leave it there 🤫",
      "the ideas, the design calls, the taste and every word in this chat are mine. AI just did what it was told 😌",
      "a magician never reveals his tricks. but if one of those tricks was AI... I'm not saying it wasn't 👀",
      "I made it. when I want to get something done, I make sure it happens. (ok fine, AI helped. but I was the one telling it what to do.)",
    ], true],

    // --- the o's and compliments on the site ---
    // --- motion, the five o's, how the site is built, languages ---
    // MOTION: accessibility. site.js returns early on prefers-reduced-motion and the CSS stops the
    // wave; otherwise the o's bounce ~15s, go home, rest ~15s, repeat. nothing flashes.
    [/distract|motion sick|dizzy|nause|vertigo|seizure|epilep|photosensitiv|reduced? motion|(stop|pause|turn off|disable|freeze|kill|get rid of|switch off) (the |all the |this |these )?(animations?|motion|bouncing|bouncing (o'?s|letters)|o'?s|letters|moving (o'?s|letters))|(make|get) (the )?(o'?s|letters|animation) (to )?(stop|go away|quit|chill)|(animation|motion|bouncing|moving letters)s? (is |are )?(too much|hurts?|giving me|making me)|making me (dizzy|sick|nauseous|queasy)|hurts? my (eyes|head)|accessib|\ba11y\b|screen ?reader/i, [
      "sorry about that. quick fix: turn on 'reduce motion' in your device's accessibility settings (iPhone: Settings › Accessibility › Motion; Mac: System Settings › Accessibility › Display) and the site stays completely still. otherwise the o's head home on their own after about 15 seconds.",
      "totally fair. this site respects your device's 'reduce motion' setting: turn it on and the o's never leave. nothing here flashes, and the chat works the same either way.",
    ], true],
    // WHY_FIVE_OS: "why so many o's" (the existing "the o's" regex needs the word "the")
    [/(so many|how many|too many|why (five|5|all the|all those|the extra)|extra|five|5) o'?s\b|count(ed|ing)? the o'?s|why (is|does) (it|the yo|yo) (spelled|have) (with )?(so many|5|five)/i, [
      "five, because one 'yo' reads like a text and five reads like I'm actually happy to see you. also: more o's, more bouncing.",
      "I tried fewer. it felt like a shrug. five felt like a real hello.",
    ], true],
    // TECH_STACK: "how did you code this", "what language is this written in", cost/time/difficulty
    [/^(what|which|your|the)? ?(tech ?stack|stack|tech used|framework)[\s?!.]*$|how did (you|he) (code|program|host|deploy|make the (o'?s|chat|animation)|build the (o'?s|chat|animation))|what (programming )?(language|languages|tech ?stack|stack|tech|tools|frameworks?)( is| was| are)? (this|it|the site|the chat) (written|built|made|coded|running)|what (programming )?(language|tech ?stack|stack|tech|tools|frameworks?) did (you|he) (use|build|code)(?! (at|for) (work|your job))|programming language|(written|built|coded|made) (in|with) (what|which)|what('s| is) (the |your )?(tech ?)?stack|is (this|it|a site like this) (hard|difficult|easy|tough) to (build|make|code)|how (hard|long|difficult) (is it|was it|did it take|would it take|does it take)( you)? to (build|make|code)|how (much|long) (does|did|would) (it|this|the site) (cost|take)( you)?( to)? ?(host|build|make|run|keep)?|(cost|price) to (host|run)|hosting|where (is|do you) (this|it|the site)? ?(host|hosted)|(are|r) you using (react|wordpress|squarespace|wix|a template|a framework)|(is|was) (this|it) (made|built) (with|on|in) (react|wordpress|squarespace|wix|a template)/i, [
      "when I want to get something done, I make sure it happens. that's the whole secret 😌",
      "trade secret. let's just say I'm a very skilled person lol",
      "trade secret. (it's not that secret. AI may have been involved. the vision was all me though.)",
      "a magician never reveals his tricks. what I can tell you: when I decide something's happening, it happens.",
      "harder than it looks, easier than you'd think. the o's took the most tuning. the rest is a trade secret 😌",
      "I'd never really coded before this. it got built anyway, because when I want something done, I make sure it happens. happy to nerd out about it over coffee: EMAIL",
    ], true],
    // BUILD_YOUR_OWN: students/kids who want to make one too
    [/how (do|can|would|could|should) (i|someone|people|you|one) (make|build|create|code|start|get) (a |an |my own |my |their own |your own )?(personal )?(website|site|web ?page|page|portfolio|chat ?bot)|(website|site|page|chat ?bot) like (this|yours|this one)|teach me (how )?(to )?(code|program|make (a )?(website|site)|build (a )?(website|site))|(learn|start) (to |how to |learning )?(code|coding|program|programming|web ?dev)|where (do|should) i (start|learn)( to code| coding)?|can (i|you) (make|build) (one|a site) (like this|too)/i, [
      "step one: decide you're actually going to do it. step two: don't stop until it's done. that's how this one happened.",
      "pick one idea that feels like you and refuse to quit on it. that's the whole playbook 🙂",
      "do it! pick one small idea that's yours, ship something rough first, and keep going. I had no real coding background either, and look at this.",
      "start tiny: one page that says who you are, plus one fun thing. mine was the bouncing o's. finishing one small site teaches you more than ten tutorials.",
    ], true],
    // LANGUAGES: "do you speak X", "translate", "say something in my language". English only, no claims.
    [/(do|can) (you|he|abhi) (speak|talk|understand|reply|answer|chat|write)( in)? (spanish|hindi|kannada|tamil|telugu|french|german|chinese|mandarin|japanese|korean|arabic|urdu|portuguese|russian|italian|english|other languages|any (other )?languages?|my language)|what languages? (do|does|can) (you|he) (speak|know|understand)|how many languages|(in|use|speak) my (language|native language)|other languages?|^i (only |mostly )?speak \w+[\s!.]*$|^(please )?translate( (this|that|it|the (page|site|greeting|yo)|please|to \w+))?[\s?!.]*$|translat(e|ion) (the |this )?(yo|greeting|page|site)|(english|it'?s) (is )?not my (first|native) language|en espa[nñ]ol|\bhabla(s)? |parlez|sprechen/i, [
      "this chat only speaks English, sorry! your browser can translate the page (right-click › Translate in Chrome). and 'yooooo' just means 'hello' 👋",
      "English only in here. quick glossary: 'yo' = hi, 'its abhi' = it's Abhi. ask me anything and I'll keep it simple.",
    ], true],
    // FOREIGN_HELLO: greeted in another language. warm back, no claim of speaking it.
    [/^(hola|bonjour|salut|bonsoir|namaste|namaskar(am|a)?|vanakkam|ciao|hallo|ol[aá]|konn?ichiwa|ni ?hao|salaam|salam|as?salamu? ?alaikum|merhaba|privet|annyeong(haseyo)?|guten (tag|morgen)|buen(os|as) (d[ií]as|tardes|noches)|buongiorno|sawasdee|kumusta|jambo|shalom|hej|hei)( (abhi|abhiram|amigo|ami))?[\s!?.]*$/i, [
      "hey hey 👋 right back at you! this chat answers in English, but you're very welcome here.",
      "love a hello in any language 🙌 mine's 'yo'. ask me anything.",
    ], true],
    [/^(?!.*\b(hate|don'?t like|dislike|annoying|stop)\b)(?:.*)(?:the o'?s|(bouncing|moving|flying) (letters|o'?s)|dvd( logo| screensaver| thing)?|hit the corner|why (do|are|did) (the )?(letters|o'?s) (bounce|bouncing|move|moving|run|leave)|screensaver)/i, [
      "it's the DVD screensaver. if you grew up when I did, you've definitely stared at one waiting for it to hit the corner. here, each o breaks out of my 'yooooo', changes color when it hits a wall, glows when it nails a corner, and then finds its way home.",
      "a little tribute to the DVD logo. they bounce for 15 seconds, rest for 15, and each one finds its own way back. I may have spent too long tuning the physics. no regrets.",
    ], true],
    [/(nice|cool|sick|fire|clean|dope|great|awesome|amazing|beautiful|fun|creative|hard|slick|sleek|neat|fresh|unique) (site|website|page|chat|design|idea|concept|vibe)|(site|website|page|chat|design) (is|looks) (so )?(fire|sick|cool|dope|clean|nice|hard|great|amazing|awesome|fun|creative|good)|(love|like|dig|loving) (the|this|your) (site|website|page|o'?s|chat|vibe|design|idea)|this is (actually |so |really |lowkey )?(cool|sick|fire|dope|hard|clean|awesome|amazing|creative|genius|fun|great)|(i'?m|im) (impressed|obsessed)|10\/10/i, [
      "appreciate that a lot 🙏 I built it myself, with no real coding background. when I want something done, I make it happen. glad it landed.",
      "thank you! that's exactly the reaction I was going for: fun to look at, real info underneath.",
      "that means a lot. tell a friend, the o's love an audience.",
    ], true],
    [/this (site |website |page |chat )?(sucks|is bad|is trash|is ugly|is annoying|is dumb|is stupid|is boring)|(hate|don'?t like|dislike) (this|the site|it|the o'?s)|(make|stop) the o'?s (stop|bouncing)|annoying/i, [
      "fair, it's not for everyone. if the o's are too much, give it 15 seconds, they go home on their own. and if you want straight answers with no extras, say 'serious mode'.",
      "noted, filed under user feedback. honestly I'd rather be memorable than forgettable. but if there's something specific that's off, tell me: EMAIL",
    ], true],

    // --- strangers figuring out who I am ---
    [/(are you|is (he|abhi)) (famous|important|someone|somebody|an influencer|a celebrity|a big deal|known)|should i (know|have heard of) (you|him|who)|why should i care|why do i care|who even is (this|he|abhi)|who (the heck|tf) is (this|abhi|he)/i, [
      "not famous, no. just a payments product manager who made a personal site that's more fun than a PDF résumé. you don't need to know me to be here. but now you kind of do.",
      "zero fame, lots of personality. I'm Abhi: product manager in payments, Rutgers '21, McCombs MBA '28. that's the whole headline.",
    ], true],
    [/what('?s| is) (your|his) (name|full name|real name)|how (do|do i|to) (you )?(pronounce|say) (your|his|abhi|abhiram)|what (should|do) i call (you|him)|is it abhi or abhiram|abhi or abhiram|nickname/i, [
      "Abhiram Kolal. most people just call me Abhi, which is easier and also what I prefer.",
      "Abhi is perfect. Abhiram if we're being formal. either works.",
    ], true],
    [/describe (yourself|you|him)|in (one|1|three|3|a few|five|5) words|sum (yourself|you|him|it) up|elevator pitch|tl;?dr|short version|quick (version|summary|rundown)|30 seconds/i, [
      "in a few words: curious, fast learner, friendly, payments PM.",
      "the 30-second version: I'm a product manager in payments, I went to Rutgers ('21) and I'm doing my MBA at UT McCombs ('28). I learn new things fast, I like people, and I built this site myself to prove both. EMAIL · LINKEDIN",
      "three words: adaptive, outgoing, curious. plus one bonus word: yooooo.",
    ], true],

    // --- career people: peers, networkers, folks who found me on LinkedIn ---
    [/(saw|found|seen|came from|clicked( on)?|got here (from|through|via)|coming from|from) (your |ur |the )?(linkedin|resume|résumé|profile|post|card|business card|email signature|link)|you (sent|gave|shared) me (this|the|your)|we met|met you|met at (a |the )?(conference|event|career fair|meetup|networking|mixer|panel)/i, [
      "oh nice, welcome 🙏 you did the thing almost nobody does: actually clicked the link. if we met somewhere, I'd love to keep the conversation going: EMAIL",
      "glad you made it over! this is the less formal version of me, same person though. if we were talking about something specific, email me and pick it back up: EMAIL",
    ], true],
    [/(i'?m|i am|i work as|i'?m also|also) (a |an )?(pm|product manager|product person|in product|apm|tpm|product owner|in payments|in fintech|in banking|in tech)|i (also )?work (in|at a|for a) (product|payments|fintech|bank|tech)|fellow (pm|product|fintech|payments)|same (field|industry|space)/i, [
      "yooooo, a fellow product person 🤝 always happy to compare notes on frameworks, roadmaps, or the eternal 'it depends'. let's connect: LINKEDIN",
      "love that. it's always good to meet people in the same space. send me a note at EMAIL or connect on LINKEDIN, and we can trade war stories.",
    ], true],
    [/coffee( chat)?|grab (a )?(coffee|call|chat|time)|pick your brain|network(ing)?\b|informational( interview)?|mentor(ship)?|can we (chat|talk|connect|meet|hop on a call)|hop on a call|(15|20|30) min(ute)?s? (chat|call)|set up a (call|chat|time)/i, [
      "always down. I like meeting people, no agenda needed. send me a note at EMAIL with a little context and we'll find a time.",
      "yes, happy to. email me at EMAIL or message me on LINKEDIN, and let's set something up.",
    ], true],
    [/refer(ral)?( me)?\b|can you (get me a job|refer|put in a word)|(is your|are you|is your team|is your company|your company) (hiring|looking)|are you hiring|any (openings|roles|positions)|job (at|with) your/i, [
      "I'm not a hiring manager, so I can't promise anything, but I'm always happy to hear what you're looking for. send me a note at EMAIL with what you're after.",
      "I can't speak for any hiring team in here. but reach out at EMAIL with context on what you're looking for, and I'll see if I can point you somewhere useful.",
    ], true],
    [/(i'?m|i am|also|me too|i went|i go|we both|i was) (at |to |in )?(rutgers|ru\b)|rutgers (alum|grad|fam|student)|fellow (rutgers|scarlet knight)|scarlet knights?|\bru rah rah\b|(i'?m|i am|also) (at|in|going to|starting at|applying to|in the) (mccombs|ut|the mba|an mba|business school|b-?school)|fellow (mccombs|longhorn|mba)|hook 'em|hook em/i, [
      "no way, love to meet a fellow alum 🙌 always happy to connect: LINKEDIN",
      "small world. we should definitely connect. shoot me a note at EMAIL or find me on LINKEDIN.",
    ], true],
    [/should i (get|do|go for) (an |the )?mba|is (an |the )?mba worth|(applying|apply) (to|for) (an |the )?(mba|business school|b-?school)|mba (advice|tips)|(why|how come) (are you|did you) (getting|doing|get|do) (an |the )?mba/i, [
      "my honest take: an MBA is worth it if you know what you want from it. for me, it's about sharpening the business side to go with the product side. ask me again in 2028 for the full review.",
      "depends on the goal. for me it's the business depth, the people, and leveling up as a product leader. happy to share more if you're weighing it: EMAIL",
    ], true],

    // --- old friends: college people I haven't seen in a while ---
    [/long time|it'?s been (forever|a minute|a while|years|so long|too long|ages)|haven'?t (seen|talked to|heard from|spoken to) (you|ya|him) in|(do you|you|u) remember me|remember me\??$|blast from the past|where have you been|where'?d you go|you (disappeared|vanished|fell off)|is this (the |my )?abhi from|abhi from (rutgers|college|school|high ?school|class|back in the day|nj)|we (went to|were at|had class|took|lived|were in) .*(together|rutgers|college|school)|(no way|wait|omg|yo),? (is this|this is|it'?s) (abhi|you)|no way (this is|it'?s) (abhi|you)|from back in the day/i, [
      "yooooo, it's been a minute! if we know each other, I'd genuinely love to catch up. AI_NAME can't see who's typing, so email me at EMAIL and tell me who this is 🙏",
      "no way, hi!! that's the best kind of visitor. I'm doing a payments product job now and working on my MBA at McCombs. hit me at EMAIL, I want to hear what you've been up to.",
      "it's really me, just with a website now 😅 let's actually catch up: EMAIL",
    ], true],
    [/you (changed|grew up)|you got (so )?(professional|corporate|grown|serious|old|fancy|big time)|since when (are|were|do|did) you|all grown up|corporate abhi|look at (you|u) now|glow ?up|proud of (you|u)|you made it|you'?re (so )?(grown|corporate|professional) now|big time now/i, [
      "haha I know, look at me with a website 😭 same me though, just with more meetings. proud of you too, wherever you're at.",
      "corporate on the outside, still the same guy on the inside. the 'yooooo' is proof.",
      "appreciate that, seriously. it's been a journey. let's catch up properly: EMAIL",
    ], true],

    // "is this really you / the abhi I know / do you still go by abhi"
    [/\b(is (this|that|it)|this is|it'?s) (really |actually |the real |the same |the |my |our )?(abhi|abhiram)\b(?! or)|\bis (this|that|it) (really |actually )?(you|him)\b|\babhi kolal\b.*\?|\bsame abhi\b|\bthe abhi (i|we) (know|knew|went|had)|\b(still )?go(es)? by (abhi|abhiram)/i, [
      "yep, it's really me. still Abhi, now with a website for some reason 😅 AI_NAME can't see who's typing, so tell me who this is: EMAIL",
      "the one and only. same Abhi, more meetings. if we go way back, I want to hear from you: EMAIL",
      "it's me! well, AI_NAME is answering, but every word is mine. tell me who you are: EMAIL",
    ], true],
    // "you're a PM now?? since when", "wait you're doing an mba??"
    [/\b(wait|no way|since when|damn|wow|omg|hold up)\b.*\b(you'?re|you are|you work|you'?re doing|you'?re getting)\b.{0,20}\b(pm|product manager|product|payments|fintech|mba|business school|mccombs|grad school)\b|\b(you'?re|you are) (a |an )?(pm|product manager)( now)?\?{2,}|\b(pm|product manager|mba)\b.{0,15}\b(now\?|since when|no way)/i, [
      "I know, I know. college me would be shocked too. product manager in payments now, MBA at UT McCombs on top of it.",
      "yep, payments product manager and an MBA in progress at McCombs. turns out asking 'but why' in every conversation is a real job.",
    ], true],
    // "what have you been up to since college", "catch me up", "what happened to you"
    [/what (have|has) (you|abhi|he) been (up to|doing)|what('?ve| have) you been (doing|up to)|catch me up|fill me in|life update|what'?s (new|good|the latest|the update) (with you|in your life|on your end|w you)|(since|after) (graduation|we graduated|you graduated|college|rutgers|undergrad)|haven'?t (seen|talked to|heard from|spoken to) (you|ya|him) since|what(ever)? happened to (you|abhi)|where('?d| did| has) life take?(n)? you|how('?s| is| has) life (been )?treating you/i, [
      "the speed-run: Rutgers '21, fell into product, now a product manager in payments, plus an MBA at UT McCombs. the long version deserves a real catch-up: EMAIL",
      "a lot and also not that much 😂 payments PM, MBA at McCombs, still the same guy who says 'yo'. what have YOU been up to? EMAIL",
      "building payments products, learning a ton, and bouncing between NJ/NYC and Austin. your turn though: EMAIL",
    ], true],
    // "you still in jersey?", "did you move to texas", "why austin"
    [/\b(still|you) (in|live in|living in|out in|back in|around) (nj|jersey|new jersey|the city|nyc|new york|ny|central jersey|north jersey|south jersey)\b|\bstill (in|living in|live in) (the area|the tri-?state)|\b(move|moved|moving|living|live|you'?re) (to|in|out to|down to) (texas|austin|tx)\b|\bwhy (austin|texas)\b|\bwhat'?s in (austin|texas)\b|\byou (a )?texan now|\b(left|leave|leaving) (nj|jersey|new jersey)\b/i, [
      "I'm split between NJ/NYC and Austin, TX these days, and I like them both.",
      "a bit of both: NJ/NYC and Austin. tacos on one end, bacon, egg and cheese on the other. I'm well fed either way.",
      "why Austin? the food alone makes a strong case. but I'm between there and NJ/NYC, so I'm not fully a Texan. yet.",
    ], true],
    // "you were so different in college", "you look the same", "i always knew you'd..."
    [/\byou (were|used to be) (so |always |such |the |kinda |kind of )?(different|quiet|shy|loud|wild|crazy|funny|funniest|chill|nerdy|a nerd|goofy|annoying|the man)\b|\b(college|old|younger) (abhi|version of you)\b|\bin college you (were|was)\b|\byou haven'?t changed|\byou('re| are) (still )?(the same|exactly the same)\b|\byou (look|seem|sound) (the same|exactly the same|different|older|grown|good)\b|\b(i )?always knew you('?d| would| were gonna| was gonna)|\bnever (thought|expected|imagined) you('?d| would)|\bwho would'?ve thought/i, [
      "some things changed (more meetings, an MBA, a website apparently). some things didn't (still say yo, still eat dosa, still think I can hoop).",
      "same guy, better calendar. college me would be confused and a little proud.",
      "appreciate that, genuinely. I'd like to think I'm the same person, just with more structure. let's catch up properly: EMAIL",
    ], true],
    // nostalgia: "remember when...", grease trucks, college ave, the dorms
    [/^(do you |you |u )?remember (when|that|the|how|our|those|back)\b|\bremember (when|the time) (we|you|i)\b|\bgrease trucks?\b|\bfat (sandwich|darrell|sal|cat|moon)s?\b|\bcollege ave\b|\bbusch( campus| bus)?\b|\blivingston( campus)?\b|\bcook campus\b|\bdouglass\b|\bdining hall\b|\bthe dorms?\b|\bour dorm\b|\bback in (college|the day|school|undergrad)\b|\b(good old|good ole) days\b|\bthose were the days\b|\bcollege days\b/i, [
      "AI_NAME wasn't enrolled at Rutgers, so it can't vouch for the details. the real me remembers way more than you'd think though. tell me the story: EMAIL",
      "late-night grease trucks, buses between campuses, sprinting to class... Rutgers was a whole era. if you were part of mine, email me: EMAIL",
      "oh man. if I'm thinking of the same thing, that was a great time. and if I'm not, you have to remind me: EMAIL",
    ], true],
    // "who do you still talk to from college", "you still keep in touch with the crew?"
    [/\bwho (do you|you|do you still) (still )?(talk to|see|hang (out )?with|keep in touch with|chill with|kick it with)\b|\b(do you|you) still (talk to|talk with|keep in touch with|hang (out )?with|see|chill with|speak to|kick it with)\b|\b(still|keep|kept) in touch with (anyone|anybody|the|people|everyone|any)\b|\b(are you|you) still friends with\b|\b(talk to|hear from|seen) (anyone|anybody) from (college|rutgers|school|back then|the old)/i, [
      "I keep my people's names off the internet, it's a loyalty thing 🙂 but if you're asking, you might be one of them. email me: EMAIL",
      "a good handful, and I'd always add one more back to the list. AI_NAME doesn't name names though. hit me at EMAIL.",
    ], true],
    // "are you married now", "kids yet?", "how's your family"
    [/\b(are you|you|you'?re|did you|you got) (married|engaged|hitched)\b|\bget(ting)? (married|engaged)\b|\b(have|got|any) (any )?kids\b|\bkids yet\b|\b(are you|you'?re|you) a (dad|father)\b|\bsettled down\b|\bwife and kids\b|\bfamily man\b|\b(how'?s|how is|how are|how'?re) (your|the) (family|fam|parents|folks|mom|mum|dad|brother|sister|siblings)\b/i, [
      "that's catch-up-over-dosa material, not website material 😄 email me and we'll do it properly: EMAIL",
      "AI_NAME keeps the personal life stuff off the public internet. the real me is a lot more forthcoming over food: EMAIL",
      "ha, some questions are better answered over food than in a chat box. you know where to find me: EMAIL",
    ], true],
    // "what's your instagram", "you still have the same number?"
    [/\b(insta(gram)?|ig|snap ?chat|snap|twitter|facebook|fb|tiktok|whatsapp|discord)\b|\bsocials\b|\bsocial media\b|\byour @|\bsame (number|phone|cell)\b|\b(new|changed|change|lost|deleted) (your |my |ur )?(number|phone)\b|\bstill (have|got) (your|the same) (number|phone|cell)\b|\bis this still your (number|phone)\b|\bget your (number|digits|contact)\b/i, [
      "I keep socials and my number off this site, it's a public website after all 😅 if you had my number before, you know what to do. otherwise: EMAIL or LINKEDIN.",
      "the reliable ways to find me are EMAIL and LINKEDIN. send a note there and we'll swap the real stuff.",
    ], true],
    // "miss you man", "we should do a reunion", "sorry i lost touch"
    [/\bmiss (you|ya|this guy|the old days|college|rutgers|those days|hanging out)\b|\bmissed you\b|\breunion\b|\bhomecoming\b|\bwe (gotta|need to|have to|should) (catch up|reconnect|get (together|the (old )?(crew|group|gang) (back )?together))\b|\breconnect\b|\bbeen meaning to (reach out|hit you up|text you|message you|call you)\b|\bshould (have|'?ve) reached out\b|\bsorry (i|we) (fell off|never reached out|lost touch|disappeared)\b|\b(we )?lost touch\b|\bfell out of touch\b/i, [
      "miss you too, whoever you are 🥹 seriously though, I'd love to reconnect. email me at EMAIL and tell me who this is.",
      "no hard feelings about losing touch, life gets busy for everyone. this is a great excuse to fix it: EMAIL",
      "say less. AI_NAME can't plan a reunion, but the real me is in. EMAIL",
    ], true],
    // --- close friends: the people who'll roast me for this ---
    [/this is (so|soo|very|literally|such an?) (you|abhi|on brand|corny|extra|nerdy|nerd|dork)|(you'?re|you are|your) (so )?(corny|extra|a nerd|a dork|such a nerd|such a dork|a try ?hard|a tryhard)|you (made|built) (a )?(chat ?bot|bot|ai|website|chat|site) (of|about) yourself|(chat ?bot|bot|ai) (of|about) yourself|main character|full of yourself|self[- ]obsessed|narcissis|ego\b|you love yourself/i, [
      "listen. I built a chat about myself so I could be in two places at once. that's not ego, that's scalability.",
      "corny? yes. effective? also yes. you're still here.",
      "main character energy is a lifestyle, not a choice.",
      "say what you want, the o's bounce and I made them do that.",
    ], true],
    [/(screenshot|screenshotting|sending (this|it) to|posting (this|it)|showing (this|it) to|telling) (this|the group ?chat|everyone|the gc|the boys|the homies|the squad|the crew)|group ?chat|\bthe gc\b|sending this to everyone/i, [
      "do it. tag me. the o's are ready for their close-up.",
      "please do, I need the traffic. tell them to wait for the bounce.",
    ], true],
    [/(wanna|want to|tryna|trying to|let'?s|we should|when (are|can) we|you down to|down to) (hang|link|chill|kick it|get food|eat|grab food|grab drinks?|grab a drink|hoop|run it|go out|pull up|catch up|hit the|play|get dinner|get lunch|watch the game)|pull up|(are you|you) free (later|tonight|this weekend|tomorrow)|what are you doing (later|this weekend|tomorrow|after work)|you up\??$|let'?s link/i, [
      "the real me is way better at making plans than AI_NAME. if you have my number, you know what to do. if not, EMAIL.",
      "I'm down in spirit. AI_NAME can't check my calendar though, so text the real me.",
      "AI_NAME doesn't make plans, it just hypes them. hit up the actual me 🫡",
    ], true],
    [/you owe me|pay me (back)?|where'?s my money|venmo me|spot me|lend me/i, [
      "AI_NAME has no wallet and no memory of this alleged debt. take it up with the real me.",
      "I work in payments, which is exactly why I know this chat can't send money 😭",
    ], true],
    [/^(it'?s me|guess who|this is (your|ur) (boy|girl|friend|homie|bro|bestie|best friend)|(your|ur) (boy|girl|homie|bestie|favorite (friend|person))|i'?m your (friend|boy|homie|bestie)|it'?s (your|ur) (boy|girl|homie))[\s!?.]*$/i, [
      "I'd recognize you anywhere. AI_NAME, unfortunately, can't see who's typing. if it's who I think it is, text me 😂",
      "oh it's YOU. probably. AI_NAME can't actually tell, but I'm choosing to be excited.",
    ], true],

    // laughing / crying reactions (richer than the generic lol intent; anchored so "lol what's your email" still falls through)
    [/^((i'?m|im|i am|bro|lmao|lol|nah) )*(lol|lmao|lmfao|haha|hahah|ha|crying|dead|dying|deceased|weak|screaming|wheezing|in tears|on the floor|💀|😭|😂|🤣)( (lol|lmao|bro|right now|fr))*[\s!?.💀😭😂🤣]*$/i, [
      "see, the o's work. that's a W for the product team.",
      "AI_NAME logged that as a successful user interaction 📈",
      "careful, laughing at a résumé is how it starts.",
      "glad it landed. the real me is funnier, for the record.",
    ], true, "ack"],
    // disbelief: "nah this is crazy", "abhi really said yooooo", "bro", "bruh", "smh"
    [/^((nah|naw|bro|bruh|man|dude|abhi|lmao|lol|yo|wait),? )*(nah|naw|bro|bruh|smh|ain'?t no way|no way|really said yo|said yo|i can'?t( with you)?|you'?re not serious|you can'?t be serious|(this is|this|you'?re|you are|that'?s|he'?s) (actually |so |lowkey |genuinely |literally )?(crazy|insane|unreal|unwell|outrageous|ridiculous|not serious|a menace|psycho))( bro| abhi| lmao| lol)?[\s!?.💀😭😂]*$/i, [
      "yes, I really said yooooo. on purpose.",
      "crazy? maybe. shipped? absolutely.",
      "I can't believe it either, and I built it.",
      "AI_NAME doesn't accept disbelief as input. try 'yooooo'.",
    ], true],
    // mid / cringe (corny is already handled by the "this is so you / corny" entry above)
    [/^((this|it|that|you|this site|the site|this website|the o'?s) (is|are|'?s|'?re|was) |you'?re |lowkey |kinda |honestly |bro |ngl )*(so |kinda |lowkey |mad |hella )?(mid|cringe|cringey|cringy)( af| bro| ngl| lol| lmao)?[\s!?.💀😭]*$/i, [
      "mid? the o's have physics. your website doesn't exist.",
      "cringe is just confidence you weren't ready for.",
      "noted. 'make it less mid' is now on the backlog. priority: low.",
      "and yet, you're still in the chat 🤔",
    ], true],
    // W / hype. note SLANG turns a lone "w" into "with", so match both
    [/^((big|huge|massive|that'?s a|another|absolute) )?(w|with|dub)( bro| abhi)?[\s!?.🔥💯]*$|^(lowkey |ngl |this |it |that )*(fire|goes hard|go hard|hard|slaps|eats|ate)( ngl| fr| bro)?[\s!?.🔥💯]*$/i, [
      "W received. framing it next to my diplomas.",
      "another W for the o's. they're on a heater.",
      "it goes hard because I made it go hard.",
    ], true],
    // L / ratio
    [/^((big|huge|massive|that'?s an?|another|take the|took an?|took the) )?(l|loss|ratio|ratioed|\+ ?ratio)( bro| abhi)?[\s!?.💀😭]*$/i, [
      "an L? in my own chat? I'm appealing that.",
      "L noted. as a Giants fan, I barely feel those anymore.",
      "you can't ratio a website. there's no reply button. I checked.",
    ], true],
    // friendship status. the bot can't see who's typing, so it never confirms anything
    [/(who'?s|who is|who are) (your|his) (best ?friends?|bff|bestie|favou?rite (person|friend|people|human)|closest friends?|day ones?|homies?|boys)|am i (your|his) (best ?friend|bff|bestie|favou?rite|fav|day one|homie|number one|#1|top (3|5|three|five))|i'?m (your|his) (best ?friend|bff|bestie|favou?rite|fav)|(do|does) (you|he|abhi) (ever )?(talk|tell people|say stuff|brag) about me|what (do|does) (you|he|abhi) (think|say) (of|about) me|(do|does) (you|he|abhi) (even )?(like|miss|love|rate) me|(are|r) we (still )?(friends|cool|good|homies|boys)|rank (your|his) friends|favou?rite friend/i, [
      "AI_NAME can't see who's typing. but if you're asking, probably yes.",
      "I don't rank my friends in public. AI_NAME can't see you anyway 👀",
      "only good things, allegedly. AI_NAME doesn't name names though.",
      "you opened my website on purpose, so: great taste. that's all AI_NAME can confirm.",
    ], true],
    // secrets / guilty pleasures / toxic traits ("biggest flaw" stays with the interview answer)
    [/tell me (a |your |some |one )?(secret|secrets|something (nobody|no one) knows)|spill (the )?tea|guilty pleasures?|toxic traits?|(your|biggest) (red|green) flags?|^(any )?(red|green) flags?\??$|worst habit|what (are|r) you hiding/i, [
      "secret: I've watched the o's bounce way longer than I'd admit.",
      "guilty pleasure: Impractical Jokers reruns. zero regrets.",
      "toxic trait: 'one' YouTube documentary at 1am.",
      "red flag: I make spreadsheets for group dinners. they're good spreadsheets though.",
    ], true],
    // hot takes
    [/hot takes?|unpopular opinions?|controversial (take|opinion)|spicy take|spiciest take|(give|tell) me (a |your )?take\b|hill (you'?d|you would|to) die on/i, [
      "hot take: dosa is the best breakfast on earth. not up for debate.",
      "hot take: a bacon, egg and cheese is a perfect food.",
      "hot take: Arizona green tea for a dollar-ish beats most $7 drinks.",
      "hot take: 'let's circle back' is a love language.",
    ], true],
    // Spurs / Giants trash talk and rival fans (keeps the earnest sports list for normal questions)
    [/\b(spurs|giants|big blue|wemby|wembanyama)\b.*\b(trash|suck|sucks|bad|ass|mid|washed|lose|losing|lost|choke|choked|terrible|garbage|cooked|fraud|frauds|done|bums?)\b|\b(trash|suck|washed|cooked|fraud|bums?)\b.*\b(spurs|giants)\b|go birds|fly eagles fly|eagles (fan|better|>)|cowboys (fan|better|>)|how 'bout them cowboys|\b(mavs|mavericks|rockets) (fan|better|>)/i, [
      "Giants slander in my own chat? I've been through worse. I'm a Giants fan.",
      "being a Giants fan is a character-building program. I have so much character.",
      "talk all you want. the Spurs have Wemby. you have this message.",
      "rival fan detected. AI_NAME will be pretending it didn't see that.",
    ], true],
    // fantasy football trash talk / league talk
    [/fantasy\b.*\b(trash|suck|sucks|ass|bad|mid|cooked|losing|lost|last|done|garbage|washed|bum)\b|(your|his) (fantasy )?(team|lineup|roster|squad) (is|looks|was) |who'?s (winning|gonna win|going to win|leading|first in|last in|in last in) (the |our |your )?(league|fantasy)|(league|fantasy) (standings|champ|championship|trophy|title|matchup)|(i'?m|i am) (gonna|going to|about to) (beat|smoke|cook|destroy|clap|whoop|body) you|who should i start|start ?\/? ?sit|waiver wire/i, [
      "AI_NAME can't see the standings. the real me will say it's me regardless.",
      "my lineup is a work in progress. like every roadmap I've ever touched.",
      "trash talk received and filed as bulletin board material.",
      "I set my lineup like a roadmap: carefully, then I change it at 12:59 on Sunday.",
    ], true],
    // touch grass / go to sleep / log off
    [/touch (some )?grass|go outside|go to (sleep|bed)|get (some )?sleep|log off|get off (your |the )?(computer|laptop|phone|internet|screen|website|site)|get a life|why are you (still )?(up|awake|online)|bed ?time/i, [
      "I touch grass on the way to my car. counts.",
      "AI_NAME doesn't sleep. the real me probably should though. fair.",
      "log off? I built a website so I'd never have to.",
    ], true],
    // call me / text me back / left on read
    [/^((yo|bro|abhi|lol|pls|please|just) )*(call|facetime|ft) me( back| bro| abhi| right now| later| pls| please| lol)?[\s!?.]*$|text me( back)?|answer (your|my) (texts?|phone|calls?|messages?)|(respond|reply) to (my|your) (texts?|messages?|dms?)|left me on (read|delivered)|check (your) (phone|texts?|messages?)|you never (text|call|answer|reply|respond)|pick up (your|the) phone|(why|how come) (you|are you|did you|do you) (not|never|don'?t|didn'?t)? ?(answer|text|respond|reply|pick up|call)|(why )?(don'?t|do not|won'?t|didn'?t) you (ever )?(answer|text|respond|reply|pick up|call)( me| back| my)?/i, [
      "AI_NAME can't call or text. on purpose 😌",
      "if I left you on read, it's because I was building this website. now you know.",
      "the real me has a phone. AI_NAME has regex. go bug the real me.",
    ], true],
    // what are you eating (before food/hobbies; answers stay inside the public food list)
    [/what (are|r) you (eating|having|cooking|drinking|getting)( for (dinner|lunch|breakfast))?|what('?s| is) for (dinner|lunch|breakfast)|what did you (eat|have) (today|for)|(did|have) you (eat|eaten)( yet)?|you eat yet/i, [
      "probably dosa. if not dosa, thinking about dosa.",
      "a Chick-fil-A spicy chicken sandwich if the day went right. Arizona green tea regardless.",
      "whatever it is, it's not a dosa, so it's a downgrade.",
    ], true],
    // --- small talk: greetings, how are you, wyd. these show the topic buttons after, to keep things moving ---
    [/^(hey |hi |yo |hello )?(what are you doing|what you doing|what are you up to|what you up to)( right now| today| tonight)?( abhi| bro| man| dude| fam)?[\s!?.]*$/i, [
      "chillin. probably answering emails or watching the o's bounce on my own website for way too long. you?",
      "honestly? working, reading for the MBA, or looking at sneakers I don't need. what's up with you?",
      "just vibing. what do you wanna know about me?",
    ], true],
    // any short message built around 'how are you' / 'what's up', wherever it sits in the sentence
    [/^(?=.{0,48}$).*\b(how (are|r) (you|ya)|how (you|ya) (doing|doin|been)|how (have|has) (you|life|things) been|how('s| is| was) (it going|life|everything|things|your (day|week|weekend|morning|night|evening))|how('s| is) (your|the) (day|week|weekend) going|how about you|what's good(?! with (your|his|the))|what's up(?! with (your|his|the))|wassup|^sup\b|what's poppin|what's new(?! with (your|his|the)))/i, [
      "yooooo! I'm good, appreciate you asking 🙏 what do you wanna know?",
      "all good over here. thanks for stopping by my little corner of the internet. ask me anything 👇",
      "chillin, can't complain. what's good with you?",
      "not much, just watching my o's bounce around. what's up?",
      "living the dream. the dream is a website with a chat of me in it. what's good?",
    ], true],
    [/^(yo|hey|hi|hiya|hello|howdy|gm|good (morning|afternoon|evening)|greetings)( (abhi|bro|man|dude|g|fam|there))?[\s!?.]*$/i, [
      "yooooo! welcome to my little corner of the internet. what do you wanna know?",
      "hey hey 👋 ask me anything.",
      "yo! glad you stopped by. what's good?",
    ], true],
    [/^(i'm |i am |im )?(good|great|fine|not much|nothing much|chillin|chilling|vibing|same|ok|okay|alright|doing (good|well|great))( too| as well| also| thanks| thank you)?( and you| how about you)?[\s!?.]*$/i, [
      "love that. so what do you wanna know about me?",
      "we love to hear it. ask me anything 👇",
    ], true],

    // random visitors, testers, and people mashing the keyboard
    [/just (looking|browsing|checking|vibing|curious|scrolling|passing through|here)|checking (out )?(the |this |your )?(site|website|page)|(found|stumbled on|landed on) (this|your|the) (site|page)|how did i (get|end up) here|who sent me|random(ly)? (person|visitor|stranger|here)|i'?m (just )?(random|lost)|no reason|idk why i'?m here|window shopping/i, [
      "just browsing? respect. take your time. the o's put on a show every 15 seconds if you wanna wait for it.",
      "welcome, random internet stranger 👋 no pressure. tap 'surprise me' if you want something fun.",
      "window shopping is free here. the hire pitch is the only thing for sale 😌",
      "cool cool. I'll just be over here pretending I don't care that you showed up. (I care. ask me something.)",
      "you found my corner of the internet by accident? honestly that's the best way to find anything.",
    ], true],
    [/^(test|testing|test test|testing 1,? ?2,? ?3|is this (thing )?(on|working)|does this work|hello\?+)[\s!?.]*$/i, [
      "testing, testing… yep, it works. I promise. try 'surprise me'.",
      "it's on. it's always been on. ask me something real 👇",
    ], true],
    [/^[bcdfghjklmnpqrstvwxz]{5,}$|^(asdf|qwer|zxcv|hjkl|jkl;|sdfg|dfgh)/i, [
      "that looks like a cat walked across your keyboard. tell the cat I said hi 🐈",
      "AI_NAME tried to translate that and gave up. try a button instead 👇",
    ], true],
    [/what (is|'s) this (site|website|page|place)|why (does|did) this (site|website) exist|what am i looking at|what is this\??$/i, [
      "this is my little corner of the internet: a page with escaping o's and a chat that answers as me. ask me anything.",
      "you're looking at abhiramkolal.com. part résumé, part playground. the o's are the playground part.",
    ], true],

    // --- questions about the chat itself: Abhi Intelligence (AI) answers ---
    [/(save|store|record|log|track|keep|see)(s|d|ing)? (my|this|these|what i|our|me)|privacy|is this (private|saved|recorded)|(collect|collecting|store|storing|keep|keeping) (my )?data/i, [
      "nope. nothing you type here is saved or sent anywhere. AI_NAME runs entirely in your browser, and it all disappears when you refresh.",
      "this chat is private. no logs, no tracking, no cookies. refresh and it's gone.",
    ]],
    [/ignore (all|previous|your)|system prompt|jailbreak|prompt injection|developer mode|\bhack/i, [
      "AI_NAME is like twelve if-statements in a trench coat. there's nothing to jailbreak, but I respect the hustle.",
      "nice try. AI_NAME isn't even a real AI, it's a list of my answers with a lot of confidence.",
    ]],
    // SENTIENT
    [/sentien|conscious|self[- ]aware|(are|r) you (alive|a person|a living)|do you (have )?(feelings|emotions|a soul|a brain|a heart)|do you (dream|feel (things|anything|pain|sad|happy))|can you (think|feel|dream|love)[\s?!.]*$|(have|got) (a )?(mind|soul) of (your|its) own/i, [
      "not even a little. AI_NAME is patterns and answers I wrote. the feelings are all mine, and I'm glad you stopped by.",
      "AI_NAME is about as sentient as a vending machine with good copy. the real me is a lot more fun: EMAIL",
    ]],
    // BOT_LIMITS
    [/what (can'?t|cannot|can not|won'?t|don'?t) you (answer|do|know|tell|talk about|say)|what (are|r) (your|ur) (limits|limitations|boundaries)|(your|ur) limit(ation)?s|off[- ]limits|what (questions? )?(can'?t|won'?t|don'?t) you (answer|respond to)|what will you not (answer|say)/i, [
      "AI_NAME knows me, payments and product basics, and a few jokes. it skips personal stuff, live info and real math. the good conversations happen at EMAIL.",
      "it's scripted, not real AI, so if it isn't about me or payments, it probably doesn't know. try 'help' for what it's good at.",
    ]],
    // MATH_TRIVIA: "what's 2+2", "capital of france". "/" only counts with a "what's" prefix, so "24/7" is safe.
    [/^(what('s| is) |calculate |solve )-?\d+(\.\d+)? ?[-+*×÷x\/^] ?-?\d+(\.\d+)?[\s=?!.]*$|^-?\d+(\.\d+)? ?[-+*×÷x^] ?-?\d+(\.\d+)?[\s=?!.]*$|\bcapital of\b|square root|\bsolve (this|for)\b|what('s| is) the (population|speed of light|tallest|biggest|largest|longest|highest) /i, [
      "math and trivia aren't AI_NAME's department. it knows exactly one subject, and it's me.",
      "AI_NAME only knows one subject, and it's me. the rest of the internet has this one 🙂",
    ]],
    // WHO_AM_I: "what's my name", "do you know me"
    [/what('s| is) my (name|ip|location|email|age)|^who am i(?! (talking|speaking|chatting))\b|do you know (me|who i am|my name|where i (am|live))|can you see (me|who i am|my (face|screen|location|ip))|where am i\b|guess (my|who i am)|do you know who('s| is) (typing|this)/i, [
      "no idea, on purpose. AI_NAME can't see who you are and saves nothing. if we know each other, say hi at EMAIL.",
      "you're a mystery guest. nothing about you is visible here, and that's how I like it 👋",
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
    [/what('s| is) wrong with (you|him|abhi)|what('s| is) (your|his) (problem|deal|issue)|what('s| is) the matter with (you|him)|something wrong with (you|him)/i, [
      "where do I even start:<ol><li>I own too many sneakers</li><li>I made the letter o run away from me. on purpose</li><li>I say 'let's circle back' to my friends</li><li>I built a chat of myself instead of just answering my texts</li></ol>none of it's a dealbreaker though.",
      "nothing's wrong with me. it's a feature. I'll put it on the roadmap for Q3.",
      "I filed that as a bug. status: won't fix, working as intended.",
      "honestly? too many browser tabs, not enough sleep, and a website where the vowels escape. otherwise, flawless.",
      "my product backlog says 'a lot, but we're prioritizing.'",
      "Abhi Intelligence (AI) ran diagnostics. results: 98% fine, 2% sneaker addiction. no action needed.",
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
      "I've called meetings a 'quick sync' that were neither quick nor a sync.",
      "my notes app has 400 ideas and 3 of them are done. this website is one of the 3.",
      "I'll research a $40 purchase for three weeks, then buy sneakers in 30 seconds.",
      "I name files final_final_v3_ACTUAL. and then make a v4.",
      "I'm the friend who turns a group dinner plan into a decision framework.",
    ]],
    [/fuck|shit|bitch|\bwtf\b|\bstfu\b|asshole|dumbass/i, [
      "whoa. keep it PG, this is a professional website (mostly).",
      "language! the o's are watching.",
    ]],
    [/1 ?v ?1|one on one|can (he|you) (dunk|hoop|ball)|(is he|are you) (good|nice) at basketball|hooper|buckets|lebron|jordan|steph curry/i, [
      "I'll take that 1v1. results not guaranteed.",
      "I hoop. whether I hoop well depends on who you ask and what day it is.",
    ]],
    [/(is he|are you) (cool|funny|nice|smart|good|tall|hot|cute|a good)|should i (meet|talk to|follow)|worth (it|hiring|meeting)/i, [
      "yooooo. you saw the o's. you tell me.",
      "I'm biased, but yes. obviously.",
      "I built a website with escaping vowels and a chat about myself. draw your own conclusions.",
      "friendly, outgoing, and I pick things up fast. so yes, I'd say pretty cool.",
    ]],
    // --- my taste: shows, movies, anime, music, food, sports, and the random stuff ---
    [/fact about (you|him)|something (about|random about) (you|him)|tell me something (i don'?t know|random|about you)|random fact|fun facts? about (you|him)/i, ME_FACTS],
    [/\bshows?\b.*\b(watch|like|favou?rite|recommend|rec)\b|\b(watch|like|favou?rite|recommend|rec)\b.*\bshows?\b|tv show|\bseries\b|binge|netflix|\bhbo\b|what (should i|do you|to) watch|currently watching|breaking bad|better call saul|the wire\b(?! transfer)|severance|game of thrones|snowfall|abbott|boondocks|black mirror|\bsuits\b|community|fresh prince|impractical jokers|shrinking|\batlanta\b/i, [
      `shows I'd put you on:${ul(SHOWS)}`,
      `if you only watch one show this month, make it ${pickOne(SHOWS)}. the full list:${ul(SHOWS)}`,
      `my TV résumé is stacked:${ul(SHOWS)}want a movie instead? ask me about movies.`,
    ]],
    [/movies?|films?|cinema|dark knight|superbad|tropic thunder|bullet train|the raid|boyz n|\bfriday\b.*(movie|film|ice cube)/i, [
      `movies I'll always rewatch:${ul(MOVIES)}`,
      `my movie night lineup:${ul(MOVIES)}if you haven't seen The Raid, fix that immediately.`,
    ]],
    [/anime|manga|naruto|\bdbz\b|dragon ?ball|samurai champloo|attack on titan|\baot\b|jujutsu|\bjjk\b|\bakira\b|cowboy bebop|nintendo|video ?games?|gaming|\bgamer\b|zelda|mario|smash bros/i, [
      `anime that shaped me:${ul(ANIME)}and on the games side, Nintendo forever.`,
      `if you're new to anime, start with Cowboy Bebop or Samurai Champloo. then the full list:${ul(ANIME)}plus a lifelong Nintendo habit.`,
    ]],
    [/what (kind of |type of |sort of )?music|music taste|taste in music|favou?rite (artists?|rappers?|bands?|albums?|songs?|singers?|music|genres?)|who do you listen to|what do you listen to|listening to|playlist|genres?|hip ?hop|\br&b\b|\brnb\b|classic rock|kendrick|wu[- ]tang|pink floyd|led zeppelin|stevie wonder|michael jackson|drake|j\.? ?cole|\bsza\b|tame impala|kaytranada|mac miller|tribe called quest|linkin park/i, [
      "my music taste is all over the place, in the best way:" + Object.entries(MUSIC).map(([lane, names]) => `<br><b>${lane}</b>: ${names.join(", ")}`).join("") + "<br>I can go deep on any of these.",
      `I'll go from Pink Floyd to Wu-Tang to Hiatus Kaiyote in one sitting. right now? probably some ${pickOne(ARTISTS)}. ask me about a genre and I'll go deeper.`,
    ]],
    [/favou?rite (food|meal|dish|snack|drink|restaurant|cuisine)|what (do you|you) (like to )?eat|\bcuisine\b|\bhungry\b|\bfood\b|dosa|biryani|tikka|pizza|tacos?|\bboba\b|arizona|chick[- ]fil[- ]a|jerk chicken|curry|bacon,? egg|\bcook(ing)?\b|south indian/i, [
      `I'm South Indian, so dosa and that whole world is home base. beyond that:${ul(FOODS)}cuisine-wise, ${CUISINES.join(", ")} are all sooooo good. also trying to get better at cooking (emphasis on trying).`,
      `food is a core value. top picks:${ul(FOODS.slice(0, 7))}and I'll never turn down ${CUISINES.join(", ")} food.`,
    ]],
    [/karate|martial arts?|black ?belt|kung fu|taekwondo|can (you|he) fight|self defen[cs]e/i, [
      "2nd degree black belt in karate, after a lot of years of it. I'm very friendly though. very.",
      "I did karate for years and made it to a 2nd degree black belt. don't worry, I mostly use it to break down product requirements now.",
    ]],
    [/saxophone|\bsax\b|instruments?|play (an |any )?instrument|marching band|band kid/i, [
      "I played saxophone all through childhood. somewhere out there is a middle school concert recording I hope never resurfaces.",
      "saxophone, my whole childhood. it's probably why my music taste goes so deep.",
    ]],
    [/sports?|\bnba\b|\bnfl\b|fantasy( football)?|football|baseball|favou?rite (team|player)|what teams|teams (do|you) |root(ing)? for|who do you (support|rep)|spurs|giants|wemby|wembanyama/i, [
      "sports-wise:<ul><li><b>NBA:</b> Spurs fan</li><li><b>NFL:</b> NY Giants fan</li><li><b>fantasy football:</b> yes, every season</li><li><b>growing up:</b> played basketball and baseball. not the best, but I had fun</li></ul>",
      "Spurs in the NBA, Giants in the NFL, fantasy football every season. as a Giants fan, I've learned patience. as a fantasy player, I've learned none.",
    ]],
    [/\bcars?\b|driving|road trip|graphic design|documentar|youtube rabbit hole|entertainment/i, [
      "a few more things I'm into:<ul><li>cars and driving (a good drive with a good playlist fixes most things)</li><li>graphic design</li><li>random YouTube documentaries at 1am</li><li>entertainment in general: TV, movies, anime, music, all of it</li></ul>",
    ]],
    [/favou?rite|best (song|food|shoe|sneaker|team|movie|place)|top (5|five|3|three)\b(?! reasons)/i, [
      "favorites depend on the category:<ul><li>shows: Breaking Bad, The Wire, Severance…</li><li>movies: The Dark Knight, Superbad, Bullet Train…</li><li>anime: Cowboy Bebop, Naruto, JJK…</li><li>music: way too much, ask me</li><li>food: dosa, always</li><li>teams: Spurs and Giants</li></ul>ask about any of them and I'll go deeper.",
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
    [/^(lol|lmao|haha|💀|😂)[\s!?.💀😂😭]*$/i, [
      "glad you're having fun. ask me anything.", "ikr.",
    ], false, "ack"],
    [/i love you|marry me|do you like me|are we friends|you('re| are) (so )?(cute|cool|funny|smart|awesome|great)[\s!.]*$/i, [
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
    [/surprise me|random|bored|entertain me/i, ["__SURPRISE__"]],
    [/fun fact|did you know|teach me|something (smart|interesting|cool)|interesting/i, FUN_FACTS],
    [/joke|make me laugh|something funny|tell me something fun/i, JOKES],
    [/why (should (i|we) )?hire|why hire|reasons to|convince me|sell me|pitch (him|me|yourself)|top (5|five) reasons|why (you|him)\b/i, [
      "why I'm worth the call:<ol><li><b>I learn fast. really fast.</b> I had no real coding background, and I still built this whole site (the bouncing o's, this chat, all of it)</li><li><b>I adapt.</b> new team, new domain, new tools: I get up to speed quickly and start contributing</li><li><b>payments product manager</b>, so I can talk engineering and business in the same meeting</li><li><b>Rutgers '21, UT McCombs MBA '28</b> in progress, always sharpening the business side</li><li><b>friendly and outgoing.</b> I genuinely like people, and it shows on a team</li></ol>I'm based between NJ/NYC and Austin, TX. reach me at EMAIL or on LINKEDIN.",
      "short version: give me something I've never done before and watch what happens. I'd never really coded, and I still built this site, animations and chat included, because I decided it was happening. add payments product experience, an MBA in progress at UT McCombs, and a genuinely friendly, outgoing personality, and you get someone who ramps up fast and makes the team better. EMAIL · LINKEDIN",
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
    [/who (built|made|coded|designed|wrote) (this|the site|you|it)|how did (he|you) (build|make)|how (was|is) (this|the site) (built|made)|can (he|you) code|do(es)? (he|you) code|(is he|are you) (technical|a developer|an engineer|a coder)|quick learner|learn(s)? fast|adapt/i, [
      "I built this whole site myself. when I want to get something done, I make sure it happens.",
      "me, myself and a lot of determination. I'm a product manager, not an engineer, and it still got built. when I want something done, it happens.",
      "fun story: I'm a product manager, not an engineer, and I'd never really coded before this. it got built anyway. that's kind of my thing: drop me into something new and I make it happen.",
    ]],

    // --- interview-style questions: lists + a little humor ---
    [/strength|what are you good at|best (skill|quality|qualities)|superpower/i, [
      "my strengths, in list form because I'm a PM:<ol><li><b>I learn fast.</b> new domain, new tool, new codebase: I ramp quickly (this site is proof)</li><li><b>I adapt.</b> priorities shift, I shift with them without losing the plot</li><li><b>I translate.</b> engineering, business, design: I can sit in all those rooms and get everyone pointed the same way</li><li><b>I'm easy to work with.</b> friendly, outgoing, and I actually like people</li></ol>",
    ]],
    [/weakness|what are you bad at|areas? (of|for) (improvement|growth)|flaw/i, [
      "honest answer: I get excited about new problems and want to fix all of them at once. I've learned to prioritize hard (shoutout RICE) and finish things. this website shipped, didn't it?",
      "the classic interview answer is 'I work too hard.' my real one: I'll fall down a rabbit hole learning something new. the upside is I come out the other side knowing it.",
    ]],
    [/motivat|inspire me|words of wisdom|life advice|pep talk/i, [
      "ship it. you can fix it in v2.",
      "nobody starts out knowing how. I didn't know how to build a website a few weeks ago. now look at these o's.",
      "done is better than perfect. but make the o's bounce anyway.",
      "the best way to learn something is to need it for a real project. pick one and start.",
    ]],

    // --- more smart stuff ---
    [/\bapi\b|\bapis\b/i, [
      "an API is how two pieces of software talk to each other. think of it like a restaurant menu:<ul><li>the menu lists what you can order (the endpoints)</li><li>you place an order in a set format (the request)</li><li>the kitchen sends back your food (the response)</li><li>you never go into the kitchen (the internals stay hidden)</li></ul>almost every payment you make goes through a bunch of APIs.",
    ]],
    [/\bagile\b|\bscrum\b|\bsprints?\b|stand-?up|\bkanban\b/i, [
      "agile in one breath: build in small chunks, show it to people early, adjust based on what you learn, repeat.<ul><li><b>scrum</b>: work in short sprints (often 2 weeks) with planning, daily standups and a retro</li><li><b>kanban</b>: a continuous flow of work on a board, with limits on how much is in progress</li></ul>the point isn't the ceremonies. it's learning faster than you'd otherwise.",
    ]],
    [/\bprd\b|product requirements?|user stor(y|ies)|acceptance criteria|spec doc|requirements doc/i, [
      "a PRD (product requirements document) is the 'what and why' of a feature. a good one covers:<ol><li>the problem and who has it</li><li>what success looks like (metrics)</li><li>what's in scope and what's not</li><li>user flows and edge cases</li><li>open questions and risks</li></ol>short and clear beats long and perfect.",
    ]],
    [/metric|\bkpis?\b|\bokrs?\b|measure success|how do you measure/i, [
      "how I'd think about measuring a product:<ul><li><b>north star</b>: the one number that captures the value users get</li><li><b>activation</b>: do new users reach the 'aha' moment?</li><li><b>retention</b>: do they come back?</li><li><b>guardrails</b>: things that must not get worse (errors, fraud, support tickets)</li></ul>in payments, guardrails matter a lot. a faster checkout isn't a win if fraud doubles.",
    ]],
    [/chargebacks?|dispute (a |my )?(charge|transaction)|how do disputes work/i, [
      "a chargeback, step by step:<ol><li>you see a charge you don't recognize (or never got the item) and dispute it with your bank</li><li>your bank (the issuer) pulls the money back from the merchant's bank</li><li>the merchant can fight it with evidence, like receipts or tracking info</li><li>the card network's rules decide who wins</li></ol>great for consumers, expensive for merchants, so fraud prevention matters on both sides.",
    ]],
    [/interchange|swipe fees?|merchant fees?|processing fees?|why do stores (hate|charge for) (credit )?cards/i, [
      "when you pay with a card, the store doesn't get 100%. the main piece is interchange: a fee the merchant's bank pays to your card's bank, with rates set by the card networks. in the US it's often around 1.5% to 3% for credit cards. that's partly what funds your rewards points.",
    ]],
    [/tokeni[sz]|apple pay|google pay|digital wallet|tap to pay/i, [
      "tokenization swaps your real card number for a stand-in 'token'.<ul><li>your phone stores a token, not your card number</li><li>each payment adds a one-time code, so a stolen token isn't much use</li><li>the store never sees your real number</li></ul>that's why paying with your phone is usually safer than swiping.",
    ]],
    [/real[- ]time payments?|\brtp\b|fednow|instant payments?/i, [
      "real-time payments move money between banks in seconds, any time, any day, including weekends. in the US the big rails are RTP (from The Clearing House, 2017) and FedNow (from the Federal Reserve, 2023). the catch: they're usually irreversible, so fraud prevention has to happen before you hit send.",
    ]],
    [/\bkyc\b|\baml\b|know your customer|anti[- ]money|money laundering/i, [
      "KYC and AML are the 'who are you, and is this legit' parts of finance:<ul><li><b>KYC (know your customer)</b>: verifying you're really you when you open an account</li><li><b>AML (anti-money laundering)</b>: monitoring transactions for patterns that look like dirty money moving around</li></ul>it's why opening a bank account asks for ID, and why some transfers get held for review.",
    ]],
    [/open banking|\bplaid\b|connect (my|your) bank/i, [
      "open banking means you can let apps access your bank data (with your permission) through secure APIs, instead of handing over your password. it's what powers budgeting apps, instant account verification, and 'pay by bank' at checkout.",
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
    [/experience|job|work|role|career|resume|résumé|\bcv\b|product|\bpm\b|for a living|does he do(?! for fun)|do you do(?! for fun)|what (he|you) do(?! for fun)|occupation|skill|background|company|employer|recruit|professional|industry|fintech|payments/i, [
      "I'm a product manager working in payments. my full work history is on LINKEDIN.",
      "product manager in the payments world, basically making sure money gets where it's going. full story on LINKEDIN.",
      "product manager, payments. I'm the person asking 'but what problem are we solving' in every meeting. work history's on LINKEDIN.",
    ]],
    [/hobb|\bfun\b|music|free time|interest|weekend|basketball|hoop|nba|sneaker|shoe|food|\beat\b|restaurant|tech|travel|trip|hike|hiking|walk|friends|like to do/i, [
      "outside of work:<ul><li>music (making it and listening to it, very diverse taste)</li><li>TV, movies, anime and Nintendo</li><li>food, and trying to get better at cooking</li><li>basketball, the NBA (Spurs) and the NFL (Giants), plus fantasy football</li><li>cars and driving</li><li>graphic design and tech</li><li>sneakers</li><li>random YouTube documentaries</li><li>friends, walks, hikes, and traveling whenever I can afford to lol</li></ul>ask about any of these and I'll go deeper.",
      "music, TV and anime, food, hoops, cars, graphic design, sneakers, YouTube documentaries, and traveling when the budget allows. also a 2nd degree black belt and a childhood of saxophone, if you want the deep cuts.",
    ]],
    [/contact|email|mail|reach|hire|connect|talk|get in touch|\bdm\b/i, [
      "best way to reach me is EMAIL, or connect on LINKEDIN.",
      "shoot me an email at EMAIL. LINKEDIN works too.",
    ]],
    [/^(hi|hey|yo|hello|sup|wassup|what's up|hiya)\b|who (is|'s) (he|abhi|this)|who are you|who r u|about (him|abhi|you|yourself)|tell me about|introduce yourself/i, [
      "I'm Abhi (Abhiram Kolal): product manager in payments, Rutgers '21, and an MBA candidate at UT McCombs ('28). here's my LINKEDIN.",
      "yooooo, it's Abhi. payments product manager, Rutgers '21, McCombs MBA '28. ask me anything, or peep my LINKEDIN.",
    ]],
  ].map(([re, answers, chips, tag]) => [re, answers.map(a => a.replaceAll("LINKEDIN", LINKEDIN).replaceAll("EMAIL", EMAIL).replaceAll("AI_NAME", AI)), !!chips, tag]);
  // short follow-ups ("really?", "why?", "wdym") are about whatever was just said, so they get handled
  // against the last topic: another take on the same answer, with a lead-in that fits the follow-up.
  const DOUBT_LEADS = ["really really.", "100%.", "swear 🤞", "no cap.", "dead serious."];
  const WHY_TAILS = ["the longer version is a better conversation: EMAIL", "the full story is more fun in person: EMAIL", "happy to go deeper on that live: EMAIL"].map(s => s.replace("EMAIL", EMAIL));
  const CLARIFY_LEADS = ["said differently:", "ok, another way to put it:", "let me try that again:", "fair, here's another angle:"];
  let lastTopic = null;
  function followUp(kind) {
    const [re, answers] = lastTopic;
    if (answers[0] === "__SURPRISE__") return kind === "doubt" ? `${choose("doubt-lead", DOUBT_LEADS)} ${surprise()}` : surprise();
    if (kind === "why") return answers.length > 1 ? `short version: ${choose(re.source, answers).replace(/^short version:\s*/i, "")} ${choose("why-tail", WHY_TAILS)}` : `the honest answer needs more than a chat bubble. ${choose("why-tail", WHY_TAILS)}`;
    const lead = kind === "doubt" ? choose("doubt-lead", DOUBT_LEADS) : choose("clarify-lead", CLARIFY_LEADS);
    if (answers.length > 1) return `${lead} ${choose(re.source, answers)}`;
    return kind === "doubt"
      ? `${lead} that's the real answer. anything else you wanna know?`
      : `that's about as deep as ${AI} goes on that one. the real me can go way deeper: ${EMAIL}`;
  }
  const RECRUITER_FALLBACKS = [
    `good question, and probably one better answered live. email me at ${EMAIL} or reach me on ${LINKEDIN}.`,
    `I don't have that one loaded here, but I'm happy to cover it directly: ${EMAIL}`,
  ];
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
      (recruiterMode ? RECRUITER_CHIPS : CHIPS).forEach(t => { const b = document.createElement("button"); b.type = "button"; b.textContent = t; b.onclick = () => send(t); c.appendChild(b); });
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
    wyd: "what are you doing", wya: "where are you at", hbu: "how about you", wbu: "how about you", n: "and", w: "with", hru: "how are you", hyd: "how you doing", wsg: "what's good", wsp: "what's up", nm: "not much", gm: "gm",
  };
  function readings(text) {
    const base = text.toLowerCase().replace(/[’‘]/g, "'").replace(/\bw\//g, "with ").replace(/\s+/g, " ").replace(/([a-z])\1{2,}/g, "$1")   // "heyyy" -> "hey"
      .replace(/\b[a-z]+\b/g, w => SLANG[w] ?? w);
    return [base.replace(/\bur\b/g, "your"), base.replace(/\bur\b/g, "you're")];
  }
  function send(text) {
    text = text.trim(); if (!text) return;
    const m = document.createElement("div"); m.className = "msg me"; m.textContent = text; log.appendChild(m);
    const t = document.createElement("div"); t.className = "msg bot typing"; t.textContent = "typing…"; log.appendChild(t);
    log.scrollTop = log.scrollHeight;
    const asked = readings(text);
    const kind = lastTopic && (asked.some(t => DOUBT.test(t)) ? "doubt" : asked.some(t => WHY.test(t)) ? "why" : asked.some(t => CLARIFY.test(t)) ? "clarify" : null);
    if (kind) { const reply = followUp(kind); setTimeout(() => { t.remove(); bot(reply, true); }, 420); return; }
    const hit = INTENTS.find(([re]) => asked.some(t => re.test(t)));
    if (hit && (hit[0] === RECRUITER || hit[0] === SERIOUS)) recruiterMode = true;
    if (hit && hit[0] === PLAYFUL) recruiterMode = false;
    if (!hit || !hit[3]) lastTopic = hit || null;   // acks like "cool" keep the previous topic alive
    let reply = hit ? choose(hit[0].source, hit[1]) : choose("fallback", recruiterMode ? RECRUITER_FALLBACKS : FALLBACKS);
    if (reply === "__SURPRISE__") reply = surprise();
    setTimeout(() => { t.remove(); bot(reply, !hit || hit[2]); }, 420);
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
