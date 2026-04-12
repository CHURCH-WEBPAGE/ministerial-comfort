/**
 * Generates data/blog/articles.json from embedded markdown in this script.
 * Usage: node scripts/build-blog-articles.cjs
 */
const fs = require('fs');
const path = require('path');

const post1 = `## The Emotional Health of the Leader

**Date:** Thursday, 30th October 2025  
**Facilitator:** Rev. Paul Kuzma, Director, Center for Spiritual Renewal, Christiansburg, VA, USA  
**Audience:** National Board of Directors, FGCN

What does it truly mean to lead well? For many pastors and church leaders, leadership is defined almost entirely in spiritual terms, prayer, preaching, presence. But Rev. Paul Kuzma, in this thought-provoking MCR webinar, challenged that framing with a simple, powerful question: *Can you be spiritually mature while remaining emotionally immature?*

His answer was no.

### Emotional Health Is Not Optional

Rev. Kuzma opened the session by drawing a distinction many in the church often blur: emotional health and mental health are not the same thing, but they are deeply intertwined. In many church contexts, there is a lingering stigma around mental health conversations, an unspoken belief that faith should be sufficient. But this stigma, Kuzma argued, is dangerous. Leaders must learn to recognise when pastoral care and counselling are sufficient, and when clinical intervention is necessary.

The bottom line: spiritual maturity and emotional maturity must grow together. One cannot flourish without the other.

### Pastors Are Human Beings First

One of the most striking themes of the session was vulnerability. Pastors, Kuzma reminded the board, often forget their own humanity. They carry congregations, counsel the broken, and preach strength, sometimes while quietly falling apart themselves. His call was clear: *embrace weakness as a channel for God's strength* (2 Corinthians 12:9).

Testimony and openness, he said, are not signs of failure, they are powerful leadership tools. When a leader models recovery, they give their congregation permission to seek help too.

### Three Guiding Principles for Healthy Leadership

Rev. Kuzma offered three foundational principles every ministry leader should carry:

1. **Who you are matters more than what you do.** Identity precedes function.
2. **You cannot give what you do not possess.** A depleted leader offers depleted ministry.
3. **The state you are in is the state you give to others.** Your emotional climate becomes your congregation's emotional climate.

He also introduced the concept of **Functional Atheism**, the subtle trap of living and leading as though everything depends solely on you, rather than trusting God with outcomes.

Interestingly, Kuzma offered a reframe of distress: seasons of difficulty, when navigated with God, can make leaders *more alive, more sensitive, more reverent, and more human* (2 Corinthians 7:10–13 MSG).

### Rest Is a Leadership Responsibility

Rev. Kuzma was practical when it came to renewal rhythms. He outlined a sustainable rest framework for ministry leaders:

- **7–8 hours of sleep** every night
- **One full Sabbath day** each week
- **Daily "mini-Sabbaths"**, intentional moments of silence and stillness
- **A sabbatical every 5–7 years**

Rest, he emphasised, is not laziness. It is stewardship of the person God called to lead.

### What Healthy Pastors Look Like

Healthy pastors, Kuzma concluded, are characterised by **joy, vulnerability, teachability, and intentional self-care**. They don't just care for others, they care for themselves, so they can continue caring for others well.

### Key Takeaways

- Pastors are humans with real emotions and limitations, vulnerability is not weakness.
- Spiritual and emotional health are connected; both require intentional care.
- Stay focused on your God-given calling; avoid what drains and distracts.
- Rest is not optional, plan for it deliberately.
- Normalise emotional and mental health conversations within your church community.

### Action Points

- Integrate emotional health into discipleship practices.
- Destigmatise mental health discussions within the church.
- Encourage pastors to adopt rhythms of rest and sabbatical.
- Promote vulnerability and testimony as leadership strengths.
- Model recovery and emotional health as part of spiritual leadership.`;

const post2 = `## Spiritual Renewal and Emotionally Healthy Discipleship

**Date:** Friday, 21st November 2025  
**Facilitator:** Rev. Paul Kuzma, Director, Center for Spiritual Renewal, Christiansburg, VA, USA  
**Audience:** National Executive Council, FGCN

Following his session with the National Board of Directors in October, Rev. Paul Kuzma returned for a second MCR webinar, this time speaking with the National Executive Council of FGCN. The message built on familiar ground but went deeper: if emotional health matters for leaders, then it must also be woven into the very fabric of how we make disciples.

### The Purpose: Integrating Two Things We've Kept Separate

For too long, discipleship has been understood almost entirely in spiritual terms, Bible study, prayer, accountability, mission. Emotional wellbeing has often been treated as secondary or even irrelevant to the discipleship journey. Rev. Kuzma's session was a direct challenge to that separation.

His purpose was clear: to show that **spiritual renewal and emotional health are not parallel tracks, they are the same road**.

### Pastors Forget They Are Human

It sounds simple, but it carries enormous weight. Ministers pour themselves into others, sometimes to the point of exhaustion, and slowly forget that they, too, are finite human beings. Burnout, Kuzma reminded the council, is not a spiritual failure. It is a human reality. And recovery is possible, but only with the right support, the right structures, and the courage to ask for help.

Rev. Kuzma drew on his own personal journey through burnout and recovery, making the point that no testimony is as powerful as a lived one. Sharing that experience was itself an act of pastoral leadership.

### Emotional Health Is Inseparable from Discipleship

Effective discipleship, Kuzma argued, must include emotional wellbeing. You cannot walk someone toward spiritual maturity while ignoring their emotional wounds, patterns, or unhealed pain. The two must move together.

This means discipleship programmes, small groups, mentorship structures, and pastoral care models must all ask a broader question: *Are we helping people become not just more spiritually knowledgeable, but more emotionally whole?*

### Rest and Sabbaticals Are Not Luxuries

One of the most countercultural messages of the session was this: rest is not a reward for hard work, it is a prerequisite for sustainable ministry. Breaks, counselling, and sabbaticals are not signs of weakness or spiritual failure. They are necessary rhythms of a healthy calling.

Ministers who resist rest eventually reach a point where they have nothing left to give. The MCR program exists precisely to help ministers before they reach that point.

### MCR: A Lifeline, Not a Last Resort

Rev. Kuzma highlighted the MCR initiative as a structured, accessible framework designed to ensure that no minister suffers in isolation. The program offers access to counselling, renewal facilities, and practical support across Nigeria. Community support, he said, is not optional, it is vital. Shared experiences and collaborative care create the conditions for real healing.

### Key Takeaways

- Burnout is common among ministers, but recovery is possible with the right support.
- Emotional health must be prioritised alongside spiritual growth.
- Counselling and therapy are valuable tools, not signs of weakness.
- Sabbaticals and intentional rest can prevent long-term damage to ministers' health and calling.
- The MCR initiative provides a structured framework so no minister suffers in isolation.
- Testimonies of recovery can inspire and encourage others to seek help.

### Action Points

- Expand awareness, continue educating ministers about emotional health and the MCR program's vision.
- Encourage counselling and sabbaticals, promote their use among ministers as normal, healthy practice.
- Follow-up engagements, maintain ongoing support and communication with ministers who connect with MCR.
- Future webinars, organise more sessions to deepen discussions on pastoral health, leadership renewal, and emotional wellbeing.`;

const post3 = `## Service Excellence in a Spiritual Renewal Ministry

**Date:** Friday, 12th December 2025  
**Facilitator:** Ginny Drews, Guest Services Team Lead, Cross Pointe Conference Centre, Center for Spiritual Renewal, Christiansburg, VA, USA  
**Audience:** MCR Team, FGCN

The first two MCR webinars asked leaders to look inward, at their emotional health, their rest rhythms, their vulnerability. This third session took a different but equally important angle: *What does it look like to care for someone who has come to be restored?*

Ginny Drews, Guest Services Team Lead at the Center for Spiritual Renewal in Virginia, led the MCR team through a masterclass in hospitality, not hotel hospitality, but the kind rooted in intentional, spirit-led service.

### Hospitality as a Ministry of Its Own

The session opened with a foundational idea that reframes how we think about guest services in a renewal context: **hospitality and intentional service can create an atmosphere conducive to spiritual renewal**. Ministry effectiveness, Drews argued, is not only measured by spiritual depth but also by the quality of service rendered to ministers and visitors.

When a pastor arrives at a renewal centre exhausted and depleted, the environment they step into either opens the door to healing, or keeps it closed. Service excellence is not a nice-to-have. It is ministry.

### Three Pillars of Service Excellence

Ginny outlined three core principles that guide the team at Cross Pointe:

1. **Attentiveness to needs**, anticipating what a guest might need, often before they ask.
2. **Consistency in delivery**, excellence is not occasional; it is the standard every time.
3. **A spirit-led approach to interactions**, every interaction is an opportunity to communicate care and dignity.

The team's goal, she noted, was simple but profound: treat every pastor as royalty, and render service with "immaculate perfection."

### The Details of Care

What makes this kind of hospitality remarkable is its depth of thought. Ginny walked the MCR team through the facility features at Cross Pointe, each one chosen with intentionality:

- **Individual electronic keypads** for each guest, ensuring privacy and safety from the moment of arrival.
- **Living spaces prepared to feel welcoming**, brightened rooms, fluffed cushions, baskets of clean throw blankets.
- **Smart TVs with guest mode**, practical coffee tables, and thoughtfully arranged bedrooms with fresh linens, USB-port lamps, tissue boxes, Bibles, luggage racks, and mirrors.
- **Laundry facilities with complimentary detergent**, removing even small burdens from guests.
- **Bathrooms designed for accessibility**, step-in bathtubs or walk-in showers, stocked with soaps, lotions, mending kits, hair dryers, towels, and first-aid supplies.
- **Office and library spaces** equipped with desks, stationery, and a curated collection of books addressing pastoral burnout, Sabbath rhythms, and emotional health.
- **Fully stocked kitchens**, refrigerators prepared for late arrivals, coffee options, cookware, and basic seasonings.
- **Family provisions**, including a pack-and-play crib for ministers who arrive with infants.

### Why the Details Matter

Each of these touches communicates something deeper than comfort. They say: *You are seen. Your needs were anticipated. You matter.* For a minister who has spent months, perhaps years, pouring out without being poured into, that message can itself be a form of healing.

The inclusion of Bibles and pastoral books in the bedrooms signals that spiritual renewal is never far away, even in the restful spaces. The accessibility features ensure that every minister, regardless of physical ability, can experience the same quality of care. The family provisions acknowledge that a pastor's renewal often involves their whole household.

### Service as Spiritual Formation

The session left the MCR team with a broadened vision of what their work means. To prepare a room, stock a kitchen, or welcome a tired minister at the door, these are not administrative tasks. They are acts of ministry. Service excellence, in this context, becomes a form of spiritual formation, both for the guests who receive it and the team members who offer it.

### Key Takeaways

- Hospitality creates an atmosphere that makes spiritual renewal possible.
- Ministry effectiveness includes the quality of service offered to ministers.
- Attentiveness, consistency, and a spirit-led posture are the pillars of excellent guest services.
- Every detail, from keypads to Bibles to laundry facilities, communicates dignity and care.
- Serving ministers well is itself a form of ministry.

*These summaries are based on the MCR webinar series hosted by the Ministerial Comfort and Renewal initiative of the Foursquare Gospel Church in Nigeria.*`;

const articles = [
  { slug: 'mcr-webinar-2025-10-30', content: post1 },
  { slug: 'mcr-webinar-2025-11-21', content: post2 },
  { slug: 'mcr-webinar-2025-12-12', content: post3 },
];

const out = path.join(__dirname, '..', 'data', 'blog', 'articles.json');
fs.mkdirSync(path.dirname(out), { recursive: true });
fs.writeFileSync(out, JSON.stringify(articles, null, 2), 'utf-8');
console.log('Wrote', out);
