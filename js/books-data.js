// PLACEHOLDER PRICES – edit before launch
// Ratings are editorial samples, not verified customer reviews. Covers are illustrative.
// Public data exports live on window.ILO so this also works directly over file://.
(function () {
  'use strict';
  window.ILO = window.ILO || {};
  window.ILO.categories = [
    { name: 'Habits', slug: 'habits', icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M20 7a8 8 0 0 0-14-2L3 8m0-5v5h5M4 17a8 8 0 0 0 14 2l3-3m0 5v-5h-5"/></svg>', tagline: 'Small steps. Lasting change.', description: 'Build better routines, understand your patterns and make daily progress feel possible.' },
    { name: 'Productivity', slug: 'productivity', icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></svg>', tagline: 'Make room for what matters.', description: 'Protect your attention, organise your work and spend your time more intentionally.' },
    { name: 'Personal Development', slug: 'personal-development', icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 21V9m0 7c-6 0-9-4-9-9 6 0 9 3 9 9Zm0-3c0-5 3-8 9-8 0 5-3 8-9 8Z"/></svg>', tagline: 'Become a little more you.', description: 'Explore confidence, resilience and purpose with books that invite thoughtful personal growth.' },
    { name: 'Finance', slug: 'finance', icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M3 6h18v14H3zM3 6V4h15M16 11h5v5h-5a2.5 2.5 0 0 1 0-5Z"/><path d="M17 13.5h.1"/></svg>', tagline: 'Understand your money.', description: 'Find practical perspectives on budgeting, saving and investing. These books are educational, not personalised financial advice.' },
    { name: 'Wealth Creation', slug: 'wealth-creation', icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M3 21h18M6 17v-4m6 4V9m6 8V5M4 9l6-5 5 2 5-4"/></svg>', tagline: 'Think beyond the next payday.', description: 'Explore long-term wealth habits, ownership and opportunity without promises of guaranteed returns.' },
    { name: 'Business', slug: 'business', icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="3" y="7" width="18" height="14" rx="2"/><path d="M8 7V3h8v4M3 12a25 25 0 0 0 18 0M10 13h4v3h-4z"/></svg>', tagline: 'Build something that lasts.', description: 'Sharpen your strategy, communication and customer understanding with ideas for stronger businesses.' },
    { name: 'Entrepreneurs', slug: 'entrepreneurs', icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M14 4c3-2 6-1 6-1s1 3-1 6l-7 7-4-4 6-8ZM8 12H4l-2 5h7m3-1v4l5-2v-5M5 19l-2 2"/><circle cx="16" cy="7" r="1"/></svg>', tagline: 'Start small. Dream boldly.', description: 'Learn from founders, test your ideas and discover more grounded ways to start and grow a venture.' },
    { name: 'Relationships', slug: 'relationships', icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1.1-1.1a5.5 5.5 0 0 0-7.8 7.8L12 21l8.8-8.6a5.5 5.5 0 0 0 0-7.8Z"/></svg>', tagline: 'Connect with more intention.', description: 'Discover healthier communication, emotional awareness and boundaries for the people who matter to you.' },
    { name: 'Faith', slug: 'faith', icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M10 3h4v5h6v4h-6v9h-4v-9H4V8h6z"/></svg>', tagline: 'Nourish your inner life.', description: 'Reflect on Christian faith, meaning and spiritual practice through thoughtful, varied perspectives.' },
    { name: 'Leadership', slug: 'leadership', icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 3v9M12 3l8 3-8 3M4 21l8-9 8 9M8 17h8"/></svg>', tagline: 'Lead with clarity and care.', description: 'Grow your ability to earn trust, support teams and take responsibility for meaningful results.' }
  ];
  window.ILO.books = [
    {
      id: 1, slug: 'atomic-habits', title: 'Atomic Habits', author: 'James Clear', image: 'assets/covers/atomic-habits.webp', category: 'Habits', categorySlug: 'habits', price: 8500, rating: 4.9,
      description: 'Small improvements can change the direction of an ordinary day. Clear offers a practical framework for shaping your environment and repeating the behaviours that support the person you want to become.',
      learn: ['Design helpful cues', 'Make consistency easier', 'Build identity-based routines'], badge: 'Bestseller', featured: true, coverColor: 'linear-gradient(145deg, #E8F0FF, #AAC9FF)'
    },
    {
      id: 2, slug: 'the-power-of-habit', title: 'The Power of Habit', author: 'Charles Duhigg', image: 'assets/covers/power-of-habit.webp', category: 'Habits', categorySlug: 'habits', price: 8000, rating: 4.7,
      description: 'Why do some routines persist even when we want to change them? Duhigg explores the cues and rewards behind repeated behaviour, connecting everyday choices to larger patterns in organisations and communities.',
      learn: ['Recognise habit loops', 'Identify meaningful rewards', 'Understand collective routines'], badge: 'Bestseller', featured: false, coverColor: 'linear-gradient(145deg, #0A3D91, #04112B)'
    },
    {
      id: 3, slug: 'tiny-habits', title: 'Tiny Habits', author: 'BJ Fogg', image: 'assets/covers/tiny-habit.png', category: 'Habits', categorySlug: 'habits', price: 7500, rating: 4.6,
      description: 'Big ambitions do not always need big starting steps. Fogg shows how very small actions, attached to existing routines and reinforced with celebration, can make change less intimidating.',
      learn: ['Shrink a new behaviour', 'Find a reliable anchor', 'Celebrate early progress'], badge: 'New', featured: true, coverColor: 'linear-gradient(145deg, #0B5FFF, #083B9D)'
    },
    {
      id: 4, slug: 'make-your-bed', title: 'Make Your Bed', author: 'William H. McRaven', image: 'assets/covers/make-your-bed.jpg', category: 'Habits', categorySlug: 'habits', price: 5500, rating: 4.5,
      description: 'An everyday act of order becomes a starting point for a wider conversation about courage and discipline. McRaven draws lessons from naval training to encourage persistence when life feels demanding.',
      learn: ['Begin with one completed task', 'Accept help from others', 'Stay steady through setbacks'], badge: null, featured: false, coverColor: 'linear-gradient(145deg, #13345E, #256BB4)'
    },
    {
      id: 5, slug: 'the-slight-edge', title: 'The Slight Edge', author: 'Jeff Olson', image: 'assets/covers/slight.jpg', category: 'Habits', categorySlug: 'habits', price: 6500, rating: 4.4,
      description: 'The choices that seem too small to matter are often the ones we repeat most. Olson argues for patient attention to simple daily disciplines rather than waiting for a dramatic turning point.',
      learn: ['Notice small daily choices', 'Value gradual improvement', 'Commit to steady practice'], badge: null, featured: false, coverColor: 'linear-gradient(145deg, #D9E8FF, #9FBDED)'
    },
    {
      id: 6, slug: 'Sell Like Crazy', title: 'Sell Like Crazy', author: 'Sabri Suby', image: 'assets/covers/Sell.webp', category: 'Business', categorySlug: 'business', price: 6000, rating: 4.5,
      description: 'The book starts by challenging traditional sales and marketing strategies, emphasizing that most businesses are stuck in a cycle of mediocrity due to outdated methods. Suby introduces the concept of the starving crowd - a group of people with a burning problem or desire that they are willing to pay to solve or fulfill. He explains how identifying and targeting such crowds is the key to successful selling.',
      learn: ['Sales', 'Marketing', 'Selling easily'], badge: null, featured: false, coverColor: 'linear-gradient(145deg, #123B74, #071A3B)'
    },
    {
      id: 7, slug: 'the-5-am-club', title: 'The 5 AM Club', author: 'Robin Sharma', category: 'Habits', categorySlug: 'habits', price: 7000, rating: 4.3,
      description: 'Sharma uses a fictional journey to explore the value of a deliberate morning routine. The book invites you to reserve focused time for movement, reflection and learning before everyday demands take over.',
      learn: ['Plan an intentional morning', 'Balance movement and reflection', 'Protect personal learning time'], badge: null, featured: false, coverColor: 'linear-gradient(145deg, #0B5FFF, #083B9D)'
    },
    {
      id: 8, slug: 'habit-stacking', title: 'Habit Stacking', author: 'S.J. Scott', category: 'Habits', categorySlug: 'habits', price: 4500, rating: 4.2,
      description: 'Remembering several useful habits can be harder than doing them. Scott proposes linking small actions into a repeatable sequence, helping everyday improvements fit into an already busy life.',
      learn: ['Group useful small actions', 'Create a repeatable checklist', 'Attach routines to daily anchors'], badge: null, featured: false, coverColor: 'linear-gradient(145deg, #E8F0FF, #AAC9FF)'
    },
    {
      id: 9, slug: 'the-compound-effect', title: 'The Compound Effect', author: 'Darren Hardy', category: 'Habits', categorySlug: 'habits', price: 6500, rating: 4.6,
      description: 'Progress often arrives after a long stretch of apparently ordinary effort. Hardy explores how choices, habits and accountability can accumulate, making consistency more useful than occasional bursts of motivation.',
      learn: ['Track repeated choices', 'Build useful accountability', 'Think in longer time horizons'], badge: null, featured: false, coverColor: 'linear-gradient(145deg, #0A3D91, #04112B)'
    },
    {
      id: 10, slug: 'mini-habits', title: 'Mini Habits', author: 'Stephen Guise', category: 'Habits', categorySlug: 'habits', price: 5000, rating: 4.4,
      description: 'Starting can be the hardest part of a worthwhile routine. Guise suggests making the minimum action so manageable that you can practise even on days when energy and motivation are low.',
      learn: ['Lower the starting barrier', 'Practise on difficult days', 'Separate action from motivation'], badge: null, featured: false, coverColor: 'linear-gradient(145deg, #13345E, #256BB4)'
    },
    {
      id: 11, slug: 'deep-work', title: 'Deep Work', author: 'Cal Newport', image: 'assets/covers/deep-work.png', category: 'Productivity', categorySlug: 'productivity', price: 8500, rating: 4.8,
      description: 'Meaningful work needs more than a full calendar. Newport makes a case for distraction-free concentration and outlines ways to protect the attention needed for demanding, valuable tasks.',
      learn: ['Schedule focused work blocks', 'Reduce attention switching', 'Build concentration rituals'], badge: 'Bestseller', featured: true, coverColor: 'linear-gradient(145deg, #0A3D91, #04112B)'
    },
    {
      id: 12, slug: 'getting-things-done', title: 'Getting Things Done', author: 'David Allen', category: 'Productivity', categorySlug: 'productivity', price: 9500, rating: 4.6,
      description: 'A mind full of reminders leaves little space for clear thinking. Allen presents a system for capturing commitments, deciding next actions and reviewing work without relying on memory alone.',
      learn: ['Capture open commitments', 'Clarify the next action', 'Maintain a weekly review'], badge: null, featured: false, coverColor: 'linear-gradient(145deg, #E8F0FF, #AAC9FF)'
    },
    {
      id: 13, slug: 'essentialism', title: 'Essentialism', author: 'Greg McKeown', category: 'Productivity', categorySlug: 'productivity', price: 7500, rating: 4.7,
      description: 'Doing more is not always the same as doing what matters. McKeown explores how deliberate trade-offs and clearer priorities can create space for a smaller number of meaningful commitments.',
      learn: ['Distinguish vital priorities', 'Make deliberate trade-offs', 'Say no with clarity'], badge: 'Bestseller', featured: false, coverColor: 'linear-gradient(145deg, #0B5FFF, #083B9D)'
    },
    {
      id: 14, slug: 'eat-that-frog', title: 'Eat That Frog!', author: 'Brian Tracy', category: 'Productivity', categorySlug: 'productivity', price: 5000, rating: 4.4,
      description: 'The task you avoid can quietly shape your entire day. Tracy offers direct approaches to prioritisation and procrastination, encouraging readers to tackle important work before less useful activity fills the space.',
      learn: ['Identify the highest-value task', 'Break work into clear steps', 'Act before overthinking'], badge: null, featured: false, coverColor: 'linear-gradient(145deg, #13345E, #256BB4)'
    },
    {
      id: 15, slug: 'the-one-thing', title: 'The One Thing', author: 'Gary Keller', category: 'Productivity', categorySlug: 'productivity', price: 7000, rating: 4.5,
      description: 'A crowded to-do list can hide the action that would make the greatest difference. Keller invites readers to ask a focusing question and organise their time around a clear priority.',
      learn: ['Ask a focusing question', 'Protect priority time', 'Reduce competing commitments'], badge: null, featured: false, coverColor: 'linear-gradient(145deg, #D9E8FF, #9FBDED)'
    },
    {
      id: 16, slug: 'make-time', title: 'Make Time', author: 'Jake Knapp & John Zeratsky', category: 'Productivity', categorySlug: 'productivity', price: 8500, rating: 4.5,
      description: 'A better day can begin with choosing one thing worth remembering. Knapp and Zeratsky share flexible experiments for attention, energy and reflection rather than prescribing a rigid productivity system.',
      learn: ['Choose a daily highlight', 'Experiment with attention tactics', 'Review your energy patterns'], badge: 'New', featured: false, coverColor: 'linear-gradient(145deg, #E8F0FF, #AAC9FF)'
    },
    {
      id: 17, slug: 'digital-minimalism', title: 'Digital Minimalism', author: 'Cal Newport', category: 'Productivity', categorySlug: 'productivity', price: 8000, rating: 4.6,
      description: 'Useful technology can still take more attention than we intend to give it. Newport explores a more intentional digital life, asking readers to select tools around their values instead of constant availability.',
      learn: ['Evaluate digital tools', 'Create room for offline life', 'Set intentional usage rules'], badge: null, featured: false, coverColor: 'linear-gradient(145deg, #123B74, #071A3B)'
    },
    {
      id: 18, slug: 'indistractable', title: 'Indistractable', author: 'Nir Eyal', category: 'Productivity', categorySlug: 'productivity', price: 8500, rating: 4.4,
      description: 'Distraction is not only a problem caused by a buzzing phone. Eyal looks at internal triggers, planning and practical commitments that help people act more consistently with their intentions.',
      learn: ['Understand internal triggers', 'Plan time around values', 'Create helpful commitment devices'], badge: null, featured: false, coverColor: 'linear-gradient(145deg, #0B5FFF, #083B9D)'
    },
    {
      id: 19, slug: 'four-thousand-weeks', title: 'Four Thousand Weeks', author: 'Oliver Burkeman', category: 'Productivity', categorySlug: 'productivity', price: 10000, rating: 4.7,
      description: 'There may never be enough time to do everything on your list. Burkeman considers the freedom in accepting that limit and choosing a meaningful life rather than chasing perfect efficiency.',
      learn: ['Accept the limits of time', 'Choose meaningful commitments', 'Question endless optimisation'], badge: null, featured: false, coverColor: 'linear-gradient(145deg, #D9E8FF, #9FBDED)'
    },
    {
      id: 20, slug: 'smarter-faster-better', title: 'Smarter Faster Better', author: 'Charles Duhigg', category: 'Productivity', categorySlug: 'productivity', price: 8000, rating: 4.3,
      description: 'Productivity grows from how we think as well as what we do. Duhigg explores motivation, decision-making and teamwork through stories that connect better mental habits to more effective work.',
      learn: ['Strengthen useful motivation', 'Make more thoughtful decisions', 'Learn from team dynamics'], badge: null, featured: false, coverColor: 'linear-gradient(145deg, #0A3D91, #04112B)'
    },
    {
      id: 21, slug: 'the-7-habits-of-highly-effective-people', title: 'The 7 Habits of Highly Effective People', author: 'Stephen R. Covey', image: 'assets/covers/7-habits.jpg', category: 'Personal Development', categorySlug: 'personal-development', price: 10000, rating: 4.8,
      description: 'Effectiveness is presented here as a matter of character before technique. Covey connects personal responsibility, clear purpose and respectful cooperation into a framework for work and everyday life.',
      learn: ['Act within your influence', 'Begin with a clear purpose', 'Seek mutual understanding'], badge: 'Bestseller', featured: true, coverColor: 'linear-gradient(145deg, #123B74, #071A3B)'
    },
    {
      id: 22, slug: 'mindset', title: 'Mindset', author: 'Carol S. Dweck', category: 'Personal Development', categorySlug: 'personal-development', price: 8500, rating: 4.7,
      description: 'The way we interpret ability can influence how we face a challenge. Dweck explores fixed and growth mindsets, encouraging a more curious response to effort, feedback and mistakes.',
      learn: ['Notice fixed-mindset thinking', 'Treat feedback as information', 'Encourage effort and learning'], badge: 'Bestseller', featured: false, coverColor: 'linear-gradient(145deg, #E8F0FF, #AAC9FF)'
    },
    {
      id: 23, slug: 'the-subtle-art-of-not-giving-a-fck', title: 'The Subtle Art of Not Giving a F*ck', author: 'Mark Manson', category: 'Personal Development', categorySlug: 'personal-development', price: 7000, rating: 4.4,
      description: 'Not every problem deserves equal space in your life. Manson uses candid language to explore values, responsibility and the uncomfortable choices involved in caring about fewer, better things.',
      learn: ['Choose values deliberately', 'Accept useful discomfort', 'Take responsibility for responses'], badge: null, featured: false, coverColor: 'linear-gradient(145deg, #0B5FFF, #083B9D)'
    },
    {
      id: 24, slug: 'awaken-the-giant-within', title: 'Awaken the Giant Within', author: 'Tony Robbins', category: 'Personal Development', categorySlug: 'personal-development', price: 11000, rating: 4.5,
      description: 'Robbins explores the decisions and beliefs that shape a person’s direction. The book combines motivational ideas with exercises for reviewing emotional patterns, goals and everyday choices.',
      learn: ['Examine limiting beliefs', 'Define meaningful goals', 'Review recurring emotional patterns'], badge: null, featured: false, coverColor: 'linear-gradient(145deg, #13345E, #256BB4)'
    },
    {
      id: 25, slug: 'grit', title: 'Grit', author: 'Angela Duckworth', category: 'Personal Development', categorySlug: 'personal-development', price: 8000, rating: 4.6,
      description: 'Talent is only part of the explanation for sustained achievement. Duckworth examines the role of long-term interest and perseverance, inviting readers to consider how commitment can be cultivated.',
      learn: ['Develop sustained interests', 'Practise with intention', 'Connect effort to purpose'], badge: null, featured: false, coverColor: 'linear-gradient(145deg, #D9E8FF, #9FBDED)'
    },
    {
      id: 26, slug: 'the-power-of-now', title: 'The Power of Now', author: 'Eckhart Tolle', category: 'Personal Development', categorySlug: 'personal-development', price: 7500, rating: 4.3,
      description: 'A busy inner conversation can pull attention away from the moment in front of us. Tolle offers a spiritual perspective on presence, encouraging readers to observe thought rather than identify completely with it.',
      learn: ['Practise present-moment attention', 'Observe habitual thought', 'Explore mindful awareness'], badge: null, featured: false, coverColor: 'linear-gradient(145deg, #E8F0FF, #AAC9FF)'
    },
    {
      id: 27, slug: 'mans-search-for-meaning', title: "Man's Search for Meaning", author: 'Viktor E. Frankl', category: 'Personal Development', categorySlug: 'personal-development', price: 6500, rating: 4.9,
      description: 'Frankl reflects on suffering, dignity and the human search for meaning through his experiences and therapeutic thinking. This is a serious, moving invitation to consider the responsibilities and purposes that make life worth living.',
      learn: ['Reflect on personal meaning', 'Recognise freedom in your response', 'Approach suffering with compassion'], badge: null, featured: false, coverColor: 'linear-gradient(145deg, #0A3D91, #04112B)'
    },
    {
      id: 28, slug: 'you-are-a-badass', title: 'You Are a Badass', author: 'Jen Sincero', category: 'Personal Development', categorySlug: 'personal-development', price: 6000, rating: 4.2,
      description: 'Sincero offers an energetic challenge to the stories that keep people stuck. Humour and practical prompts encourage readers to examine self-doubt and take more intentional action toward their goals.',
      learn: ['Question unhelpful self-talk', 'Take a manageable first step', 'Clarify what you want'], badge: null, featured: false, coverColor: 'linear-gradient(145deg, #0B5FFF, #083B9D)'
    },
    {
      id: 29, slug: 'the-magic-of-thinking-big', title: 'The Magic of Thinking Big', author: 'David J. Schwartz', category: 'Personal Development', categorySlug: 'personal-development', price: 5500, rating: 4.4,
      description: 'Schwartz argues that the scale of our thinking affects the actions we attempt. The book offers an optimistic approach to confidence, initiative and seeing possibilities beyond familiar limitations.',
      learn: ['Challenge narrow assumptions', 'Develop practical confidence', 'Turn ambition into action'], badge: null, featured: false, coverColor: 'linear-gradient(145deg, #13345E, #256BB4)'
    },
    {
      id: 30, slug: 'daring-greatly', title: 'Daring Greatly', author: 'Brené Brown', category: 'Personal Development', categorySlug: 'personal-development', price: 9000, rating: 4.6,
      description: 'Being open with others can feel risky, yet it often makes deeper connection possible. Brown explores vulnerability, shame and courage in the ways we parent, work and participate in relationships.',
      learn: ['Recognise shame patterns', 'Practise everyday vulnerability', 'Build more courageous connections'], badge: 'New', featured: false, coverColor: 'linear-gradient(145deg, #D9E8FF, #9FBDED)'
    },
    {
      id: 31, slug: 'the-psychology-of-money', title: 'The Psychology of Money', author: 'Morgan Housel', image: 'assets/covers/psychology.jpg', category: 'Finance', categorySlug: 'finance', price: 9000, rating: 4.9,
      description: 'Money decisions are shaped by lived experience as much as spreadsheets. Housel uses short, thoughtful stories to explore patience, uncertainty and the difference between looking wealthy and building financial resilience.',
      learn: ['Recognise financial behaviour', 'Leave room for uncertainty', 'Value patience and flexibility'], badge: 'Bestseller', featured: true, coverColor: 'linear-gradient(145deg, #0B5FFF, #083B9D)'
    },
    {
      id: 32, slug: 'the-intelligent-investor', title: 'The Intelligent Investor', author: 'Benjamin Graham', category: 'Finance', categorySlug: 'finance', price: 15000, rating: 4.7,
      description: 'Graham presents investing as a discipline of analysis and temperament rather than excitement. Readers encounter foundational ideas about value, risk and protecting themselves from the noise of market prices.',
      learn: ['Understand margin of safety', 'Separate investing from speculation', 'Think critically about valuation'], badge: null, featured: false, coverColor: 'linear-gradient(145deg, #123B74, #071A3B)'
    },
    {
      id: 33, slug: 'i-will-teach-you-to-be-rich', title: 'I Will Teach You to Be Rich', author: 'Ramit Sethi', category: 'Finance', categorySlug: 'finance', price: 10000, rating: 4.5,
      description: 'Sethi proposes a practical, systems-based approach to personal money management. Some examples are specific to the United States, so readers should adapt the principles to local products, fees and regulations.',
      learn: ['Automate sensible money routines', 'Plan intentional spending', 'Evaluate financial products locally'], badge: null, featured: false, coverColor: 'linear-gradient(145deg, #E8F0FF, #AAC9FF)'
    },
    {
      id: 34, slug: 'the-total-money-makeover', title: 'The Total Money Makeover', author: 'Dave Ramsey', category: 'Finance', categorySlug: 'finance', price: 7500, rating: 4.4,
      description: 'Ramsey offers a structured approach to debt reduction and household money discipline. The book emphasises clear steps and behaviour change, with examples that should be considered alongside your own financial circumstances.',
      learn: ['Create a workable spending plan', 'Understand a debt-reduction method', 'Build an emergency buffer'], badge: null, featured: false, coverColor: 'linear-gradient(145deg, #13345E, #256BB4)'
    },
    {
      id: 35, slug: 'your-money-or-your-life', title: 'Your Money or Your Life', author: 'Vicki Robin', category: 'Finance', categorySlug: 'finance', price: 8500, rating: 4.6,
      description: 'What does your spending reveal about the life you are building? Robin connects money to time and energy, inviting a more deliberate relationship with consumption, work and financial independence.',
      learn: ['Relate spending to life energy', 'Review personal consumption', 'Define your sense of enough'], badge: null, featured: false, coverColor: 'linear-gradient(145deg, #D9E8FF, #9FBDED)'
    },
    {
      id: 36, slug: 'a-random-walk-down-wall-street', title: 'A Random Walk Down Wall Street', author: 'Burton Malkiel', category: 'Finance', categorySlug: 'finance', price: 12500, rating: 4.5,
      description: 'Malkiel examines investment markets and the challenges of reliably predicting their movements. The book offers context for diversified investing while encouraging a sceptical look at fashionable financial claims.',
      learn: ['Understand market uncertainty', 'Explore diversification', 'Question prediction-based promises'], badge: null, featured: false, coverColor: 'linear-gradient(145deg, #0A3D91, #04112B)'
    },
    {
      id: 37, slug: 'the-little-book-of-common-sense-investing', title: 'The Little Book of Common Sense Investing', author: 'John C. Bogle', category: 'Finance', categorySlug: 'finance', price: 8000, rating: 4.7,
      description: 'Bogle argues that simplicity and low costs deserve more attention in investing. His explanation of index-based approaches helps readers consider the long-term effect of fees and frequent trading.',
      learn: ['Understand index investing', 'Notice the effect of fees', 'Consider a patient approach'], badge: null, featured: false, coverColor: 'linear-gradient(145deg, #123B74, #071A3B)'
    },
    {
      id: 38, slug: 'the-simple-path-to-wealth', title: 'The Simple Path to Wealth', author: 'JL Collins', category: 'Finance', categorySlug: 'finance', price: 9500, rating: 4.6,
      description: 'Collins makes a case for keeping personal finance understandable and manageable. His investment examples use American institutions, while the broader themes of saving, costs and financial freedom invite careful local adaptation.',
      learn: ['Simplify financial decisions', 'Understand saving discipline', 'Adapt investing ideas locally'], badge: 'New', featured: false, coverColor: 'linear-gradient(145deg, #E8F0FF, #AAC9FF)'
    },
    {
      id: 39, slug: 'money-master-the-game', title: 'Money: Master the Game', author: 'Tony Robbins', category: 'Finance', categorySlug: 'finance', price: 14000, rating: 4.3,
      description: 'Robbins brings interviews and financial concepts together in a broad guide to money planning. Readers can use its questions to examine goals and risk while checking any product-specific advice against current local conditions.',
      learn: ['Clarify financial goals', 'Explore diversification concepts', 'Ask better questions about costs'], badge: null, featured: false, coverColor: 'linear-gradient(145deg, #0B5FFF, #083B9D)'
    },
    {
      id: 40, slug: 'the-millionaire-next-door', title: 'The Millionaire Next Door', author: 'Thomas J. Stanley', category: 'Finance', categorySlug: 'finance', price: 8500, rating: 4.5,
      description: 'Visible luxury and financial security are not always the same thing. Stanley examines patterns among wealthy households, drawing attention to restrained spending, planning and the habits behind accumulated wealth.',
      learn: ['Distinguish wealth from display', 'Examine lifestyle inflation', 'Value long-term planning'], badge: null, featured: false, coverColor: 'linear-gradient(145deg, #13345E, #256BB4)'
    },
    {
      id: 41, slug: 'rich-dad-poor-dad', title: 'Rich Dad Poor Dad', author: 'Robert Kiyosaki', image: 'assets/covers/rich.jpg', category: 'Wealth Creation', categorySlug: 'wealth-creation', price: 7500, rating: 4.7,
      description: 'Kiyosaki contrasts different attitudes to work, ownership and money through personal storytelling. The book introduces an entrepreneurial view of financial education, best approached as a set of ideas rather than a promise of results.',
      learn: ['Explore assets and liabilities', 'Question money assumptions', 'Consider the role of ownership'], badge: 'Bestseller', featured: true, coverColor: 'linear-gradient(145deg, #E8F0FF, #AAC9FF)'
    },
    {
      id: 42, slug: 'think-and-grow-rich', title: 'Think and Grow Rich', author: 'Napoleon Hill', category: 'Wealth Creation', categorySlug: 'wealth-creation', price: 5500, rating: 4.5,
      description: 'Hill presents a classic motivational account of ambition, persistence and organised effort. Its ideas encourage readers to examine purpose and cooperation, while its historical claims deserve thoughtful, critical reading.',
      learn: ['Define a clear intention', 'Practise persistent effort', 'Build supportive collaboration'], badge: 'Bestseller', featured: false, coverColor: 'linear-gradient(145deg, #0A3D91, #04112B)'
    },
    {
      id: 43, slug: 'the-richest-man-in-babylon', title: 'The Richest Man in Babylon', author: 'George S. Clason', category: 'Wealth Creation', categorySlug: 'wealth-creation', price: 4500, rating: 4.6,
      description: 'Short parables place familiar money lessons in an ancient setting. Clason uses accessible stories to encourage saving, sensible spending and caution before committing money to an opportunity.',
      learn: ['Save part of your income', 'Control recurring expenses', 'Seek informed guidance'], badge: null, featured: false, coverColor: 'linear-gradient(145deg, #13345E, #256BB4)'
    },
    {
      id: 44, slug: 'the-automatic-millionaire', title: 'The Automatic Millionaire', author: 'David Bach', category: 'Wealth Creation', categorySlug: 'wealth-creation', price: 6500, rating: 4.3,
      description: 'Bach explores how automatic systems can make saving less dependent on daily decisions. The title is aspirational, while the practical focus is on regular contributions and deliberate financial habits rather than guaranteed wealth.',
      learn: ['Automate regular saving', 'Pay attention to small expenses', 'Build consistent money systems'], badge: null, featured: false, coverColor: 'linear-gradient(145deg, #D9E8FF, #9FBDED)'
    },
    {
      id: 45, slug: 'secrets-of-the-millionaire-mind', title: 'Secrets of the Millionaire Mind', author: 'T. Harv Eker', category: 'Wealth Creation', categorySlug: 'wealth-creation', price: 7000, rating: 4.2,
      description: 'Eker asks readers to look at the beliefs they have inherited about money. The book combines mindset prompts with financial habits, offering material for reflection rather than evidence of assured outcomes.',
      learn: ['Examine inherited money beliefs', 'Connect intention to action', 'Review your financial habits'], badge: null, featured: false, coverColor: 'linear-gradient(145deg, #0B5FFF, #083B9D)'
    },
    {
      id: 46, slug: 'the-science-of-getting-rich', title: 'The Science of Getting Rich', author: 'Wallace D. Wattles', category: 'Wealth Creation', categorySlug: 'wealth-creation', price: 5000, rating: 4,
      description: 'This historical self-help text presents a philosophical approach to prosperity and purposeful action. Despite its title, it is not modern scientific or financial evidence and is best read as a perspective on motivation.',
      learn: ['Reflect on purposeful effort', 'Explore a historical prosperity philosophy', 'Read motivational claims critically'], badge: null, featured: false, coverColor: 'linear-gradient(145deg, #123B74, #071A3B)'
    },
    {
      id: 47, slug: 'the-almanack-of-naval-ravikant', title: 'The Almanack of Naval Ravikant', author: 'Eric Jorgenson', category: 'Wealth Creation', categorySlug: 'wealth-creation', price: 10000, rating: 4.7,
      description: 'Jorgenson gathers Naval Ravikant’s perspectives on wealth, judgement and happiness into a readable collection. The ideas invite reflection on leverage, specific knowledge and a life that is valuable beyond its financial measures.',
      learn: ['Explore specific knowledge', 'Understand forms of leverage', 'Reflect on wealth and wellbeing'], badge: 'New', featured: false, coverColor: 'linear-gradient(145deg, #E8F0FF, #AAC9FF)'
    },
    {
      id: 48, slug: 'cashflow-quadrant', title: 'Cashflow Quadrant', author: 'Robert Kiyosaki', category: 'Wealth Creation', categorySlug: 'wealth-creation', price: 8500, rating: 4.4,
      description: 'Kiyosaki organises different ways of earning into a simple conceptual model. Readers can use it to consider employment, self-employment, business ownership and investing without treating any path as risk-free.',
      learn: ['Compare ways of earning', 'Consider systems and ownership', 'Reflect on financial trade-offs'], badge: null, featured: false, coverColor: 'linear-gradient(145deg, #0A3D91, #04112B)'
    },
    {
      id: 49, slug: 'the-millionaire-fastlane', title: 'The Millionaire Fastlane', author: 'MJ DeMarco', category: 'Wealth Creation', categorySlug: 'wealth-creation', price: 9500, rating: 4.5,
      description: 'DeMarco challenges familiar assumptions about earning and retirement with an entrepreneurial argument. The book focuses on creating value and scalable systems, while the ambitious title should not be mistaken for a guarantee.',
      learn: ['Look for customer problems', 'Understand business scalability', 'Evaluate ownership and risk'], badge: null, featured: false, coverColor: 'linear-gradient(145deg, #13345E, #256BB4)'
    },
    {
      id: 50, slug: 'rich-habits', title: 'Rich Habits', author: 'Thomas C. Corley', category: 'Wealth Creation', categorySlug: 'wealth-creation', price: 6000, rating: 4.1,
      description: 'Corley discusses patterns he associates with financial achievement and personal discipline. Readers are encouraged to reflect on learning, relationships and daily routines while remembering that habits alone cannot ensure wealth.',
      learn: ['Review recurring routines', 'Prioritise ongoing learning', 'Build intentional professional relationships'], badge: null, featured: false, coverColor: 'linear-gradient(145deg, #D9E8FF, #9FBDED)'
    },
    {
      id: 51, slug: 'the-lean-startup', title: 'The Lean Startup', author: 'Eric Ries', category: 'Business', categorySlug: 'business', price: 11000, rating: 4.7,
      description: 'A new business begins with assumptions that may or may not be true. Ries offers a way to test them through small experiments, measurable learning and quicker decisions about what to change.',
      learn: ['Test business assumptions', 'Build useful small experiments', 'Measure learning before scaling'], badge: 'Bestseller', featured: false, coverColor: 'linear-gradient(145deg, #123B74, #071A3B)'
    },
    {
      id: 52, slug: 'zero-to-one', title: 'Zero to One', author: 'Peter Thiel', category: 'Business', categorySlug: 'business', price: 8500, rating: 4.5,
      description: 'Thiel asks what it takes to build something genuinely different rather than imitate what already exists. His perspective on startups invites readers to think about distinctive advantages, markets and long-term ambition.',
      learn: ['Question familiar market assumptions', 'Look for distinctive advantages', 'Think about future possibilities'], badge: null, featured: false, coverColor: 'linear-gradient(145deg, #E8F0FF, #AAC9FF)'
    },
    {
      id: 53, slug: 'the-e-myth-revisited', title: 'The E-Myth Revisited', author: 'Michael E. Gerber', category: 'Business', categorySlug: 'business', price: 12500, rating: 4.6,
      description: 'Being good at a craft is different from running a business around it. Gerber explores the roles, systems and repeatable processes that can help a small company become less dependent on its owner’s constant attention.',
      learn: ['Separate business roles', 'Create repeatable processes', 'Work on the business itself'], badge: null, featured: false, coverColor: 'linear-gradient(145deg, #0B5FFF, #083B9D)'
    },
    {
      id: 54, slug: 'good-to-great', title: 'Good to Great', author: 'Jim Collins', category: 'Business', categorySlug: 'business', price: 9000, rating: 4.8,
      description: 'Collins examines companies that achieved notable periods of improvement to ask what distinguished their approach. The book offers a framework for thinking about people, discipline and organisational focus rather than a universal business formula.',
      learn: ['Examine disciplined leadership', 'Focus on the right people', 'Build a coherent business direction'], badge: null, featured: true, coverColor: 'linear-gradient(145deg, #0A3D91, #04112B)'
    },
    {
      id: 55, slug: 'built-to-last', title: 'Built to Last', author: 'Jim Collins & Jerry I. Porras', category: 'Business', categorySlug: 'business', price: 13000, rating: 4.7,
      description: 'Collins and Porras look beyond a single charismatic founder to ask how enduring companies develop. Their research invites readers to examine core values, ambitious goals and the systems that preserve an organisation while allowing it to change.',
      learn: ['Clarify enduring core values', 'Build systems beyond one founder', 'Balance continuity with experimentation'], badge: null, featured: false, coverColor: 'linear-gradient(145deg, #13345E, #256BB4)'
    },
    {
      id: 56, slug: 'the-personal-mba', title: 'The Personal MBA', author: 'Josh Kaufman', category: 'Business', categorySlug: 'business', price: 7500, rating: 4.5,
      description: 'Kaufman brings essential business ideas together in a broad, accessible guide for independent learners. Readers can explore value creation, marketing, operations and decision-making without treating the book as a substitute for every specialised business skill.',
      learn: ['Understand core business functions', 'Connect value to customer needs', 'Ask clearer operational questions'], badge: null, featured: false, coverColor: 'linear-gradient(145deg, #D9E8FF, #9FBDED)'
    },
    {
      id: 57, slug: 'blue-ocean-strategy', title: 'Blue Ocean Strategy', author: 'W. Chan Kim & Renée Mauborgne', category: 'Business', categorySlug: 'business', price: 10500, rating: 4.6,
      description: 'Competing harder is not the only way to grow a business. Kim and Mauborgne present tools for reconsidering customer value and looking for market space beyond familiar industry boundaries.',
      learn: ['Map customer value', 'Question industry conventions', 'Explore less-contested opportunities'], badge: null, featured: false, coverColor: 'linear-gradient(145deg, #123B74, #071A3B)'
    },
    {
      id: 58, slug: 'rework', title: 'Rework', author: 'Jason Fried & David Heinemeier Hansson', category: 'Business', categorySlug: 'business', price: 6500, rating: 4.3,
      description: 'Fried and DHH offer a deliberately lean alternative to familiar business rituals. Short essays encourage simpler decisions, useful constraints and doing meaningful work without unnecessary organisational weight.',
      learn: ['Use constraints constructively', 'Challenge unnecessary processes', 'Start with a simpler offering'], badge: null, featured: false, coverColor: 'linear-gradient(145deg, #0B5FFF, #083B9D)'
    },
    {
      id: 59, slug: 'the-hard-thing-about-hard-things', title: 'The Hard Thing About Hard Things', author: 'Ben Horowitz', category: 'Business', categorySlug: 'business', price: 12000, rating: 4.4,
      description: 'Some business decisions remain difficult even with good advice. Horowitz shares candid experiences of building and running companies, focusing on the uncertainty, people problems and responsibilities behind the founder’s role.',
      learn: ['Face difficult people decisions', 'Lead through uncertainty', 'Recognise the limits of easy advice'], badge: null, featured: false, coverColor: 'linear-gradient(145deg, #E8F0FF, #AAC9FF)'
    },
    {
      id: 60, slug: 'traction', title: 'Traction', author: 'Gino Wickman', category: 'Business', categorySlug: 'business', price: 8000, rating: 4.5,
      description: 'A growing business can feel busy without moving in a shared direction. Wickman presents the Entrepreneurial Operating System as a practical framework for clarifying priorities, assigning accountability and reviewing progress with a team.',
      learn: ['Align a team around priorities', 'Establish clear accountability', 'Review progress consistently'], badge: null, featured: false, coverColor: 'linear-gradient(145deg, #13345E, #256BB4)'
    },
    {
      id: 61, slug: 'shoe-dog', title: 'Shoe Dog', author: 'Phil Knight', image: 'assets/covers/shoe.webp', category: 'Entrepreneurs', categorySlug: 'entrepreneurs', price: 10000, rating: 4.7,
      description: 'Knight tells the uncertain, human story behind the early growth of Nike. This memoir offers a view of persistence, relationships and difficult choices that is more textured than a neat startup success formula.',
      learn: ['Learn from entrepreneurial uncertainty', 'Value trusted partnerships', 'Recognise persistence behind growth'], badge: null, featured: true, coverColor: 'linear-gradient(145deg, #0B5FFF, #083B9D)'
    },
    {
      id: 62, slug: 'the-100-startup', title: 'The $100 Startup', author: 'Chris Guillebeau', category: 'Entrepreneurs', categorySlug: 'entrepreneurs', price: 8500, rating: 4.6,
      description: 'A small venture can begin by connecting a useful skill to a real customer need. Guillebeau shares accessible business stories that encourage resourcefulness, while actual startup costs will depend on your context.',
      learn: ['Connect skills to customer needs', 'Create a simple initial offer', 'Test a low-cost business idea'], badge: null, featured: false, coverColor: 'linear-gradient(145deg, #123B74, #071A3B)'
    },
    {
      id: 63, slug: 'crushing-it', title: 'Crushing It!', author: 'Gary Vaynerchuk', category: 'Entrepreneurs', categorySlug: 'entrepreneurs', price: 9500, rating: 4.2,
      description: 'Vaynerchuk explores the effort and visibility involved in building a personal brand online. The book’s examples encourage experimentation with content and audience relationships, while platform tactics need checking against current conditions.',
      learn: ['Clarify a personal brand', 'Create audience-focused content', 'Adapt tactics as platforms change'], badge: null, featured: false, coverColor: 'linear-gradient(145deg, #E8F0FF, #AAC9FF)'
    },
    {
      id: 64, slug: 'start-with-why', title: 'Start with Why', author: 'Simon Sinek', category: 'Entrepreneurs', categorySlug: 'entrepreneurs', price: 11000, rating: 4.8,
      description: 'A clear reason for existing can make an organisation’s message more coherent. Sinek explores how purpose connects leadership, communication and the way people relate to a business or idea.',
      learn: ['Clarify your underlying purpose', 'Connect message and action', 'Communicate beyond product features'], badge: null, featured: false, coverColor: 'linear-gradient(145deg, #0A3D91, #04112B)'
    },
    {
      id: 65, slug: 'the-entrepreneur-roller-coaster', title: 'The Entrepreneur Roller Coaster', author: 'Darren Hardy', category: 'Entrepreneurs', categorySlug: 'entrepreneurs', price: 7000, rating: 4.5,
      description: 'Building a venture can bring emotional swings as well as practical challenges. Hardy offers motivational perspectives on commitment, confidence and managing the pressures that come with taking responsibility for a business.',
      learn: ['Prepare for emotional uncertainty', 'Connect effort to a clear purpose', 'Develop supportive personal routines'], badge: 'New', featured: false, coverColor: 'linear-gradient(145deg, #D9E8FF, #9FBDED)'
    },
    {
      id: 66, slug: 'company-of-one', title: 'Company of One', author: 'Paul Jarvis', category: 'Entrepreneurs', categorySlug: 'entrepreneurs', price: 8500, rating: 4.3,
      description: 'Growth is not always the most useful measure of a successful business. Jarvis explores a deliberately smaller approach that values autonomy, sustainable income and serving customers well instead of expanding for its own sake.',
      learn: ['Question growth assumptions', 'Design for sustainable independence', 'Deepen existing customer relationships'], badge: null, featured: false, coverColor: 'linear-gradient(145deg, #13345E, #256BB4)'
    },
    {
      id: 67, slug: 'the-art-of-the-start-2-0', title: 'The Art of the Start 2.0', author: 'Guy Kawasaki', category: 'Entrepreneurs', categorySlug: 'entrepreneurs', price: 8000, rating: 4.1,
      description: 'Kawasaki offers a practical starting point for turning an idea into a venture that serves real people. The book explores positioning, pitching and early execution while encouraging founders to learn from action rather than wait for a perfect plan.',
      learn: ['Shape a clear initial offering', 'Communicate an idea convincingly', 'Learn through early execution'], badge: null, featured: false, coverColor: 'linear-gradient(145deg, #0B5FFF, #083B9D)'
    },
    {
      id: 68, slug: 'the-startup-owner-s-manual', title: "The Startup Owner's Manual", author: 'Steve Blank & Bob Dorf', category: 'Entrepreneurs', categorySlug: 'entrepreneurs', price: 6500, rating: 4.4,
      description: 'Blank and Dorf describe customer development as a disciplined search for a workable business model. Their detailed guide helps founders separate assumptions from evidence by talking to customers, testing offers and reviewing what those experiments reveal.',
      learn: ['Test customer assumptions', 'Compare evidence with expectations', 'Refine a business model before scaling'], badge: null, featured: false, coverColor: 'linear-gradient(145deg, #E8F0FF, #AAC9FF)'
    },
    {
      id: 69, slug: 'the-4-hour-workweek', title: 'The 4-Hour Workweek', author: 'Timothy Ferriss', category: 'Entrepreneurs', categorySlug: 'entrepreneurs', price: 9000, rating: 4.5,
      description: 'Ferriss questions the assumption that work must occupy the centre of every day. The book explores delegation, experimentation and lifestyle design, with examples that require realistic adaptation rather than literal expectations about hours.',
      learn: ['Question habitual work assumptions', 'Explore responsible delegation', 'Design small lifestyle experiments'], badge: null, featured: false, coverColor: 'linear-gradient(145deg, #123B74, #071A3B)'
    },
    {
      id: 70, slug: 'built-to-sell', title: 'Built to Sell', author: 'John Warrillow', category: 'Entrepreneurs', categorySlug: 'entrepreneurs', price: 13000, rating: 4.3,
      description: 'A business that depends on its owner for every decision can be difficult to sustain or transfer. Warrillow uses a story-based approach to explore a more repeatable offering, dependable processes and a company that can operate with greater independence.',
      learn: ['Create a repeatable core offering', 'Reduce dependence on the owner', 'Consider business transferability'], badge: null, featured: false, coverColor: 'linear-gradient(145deg, #0A3D91, #04112B)'
    },
    {
      id: 71, slug: 'the-5-love-languages', title: 'The 5 Love Languages', author: 'Gary Chapman', image: 'assets/covers/5-love.webp', category: 'Relationships', categorySlug: 'relationships', price: 6500, rating: 4.6,
      description: 'People can express affection in ways that do not immediately register with a partner. Chapman offers a familiar framework for discussing preferences and making everyday care more intentional.',
      learn: ['Discuss expressions of affection', 'Notice a partner’s preferences', 'Practise intentional everyday care'], badge: null, featured: true, coverColor: 'linear-gradient(145deg, #D9E8FF, #9FBDED)'
    },
    {
      id: 72, slug: 'how-to-win-friends-and-influence-people', title: 'How to Win Friends and Influence People', author: 'Dale Carnegie', category: 'Relationships', categorySlug: 'relationships', price: 9500, rating: 4.5,
      description: 'Carnegie’s classic centres on genuine interest, respectful conversation and the desire to feel understood. The examples encourage better social habits when approached as sincere connection rather than manipulation.',
      learn: ['Show genuine interest', 'Listen with greater attention', 'Handle disagreement respectfully'], badge: null, featured: false, coverColor: 'linear-gradient(145deg, #0B5FFF, #083B9D)'
    },
    {
      id: 73, slug: 'attached', title: 'Attached', author: 'Amir Levine & Rachel Heller', category: 'Relationships', categorySlug: 'relationships', price: 10000, rating: 4.7,
      description: 'Attachment patterns can influence how people seek closeness and respond to uncertainty. Levine and Heller introduce a framework for reflecting on relationship needs without reducing a whole person to a label.',
      learn: ['Explore attachment patterns', 'Communicate relationship needs', 'Reflect without rigid labelling'], badge: null, featured: false, coverColor: 'linear-gradient(145deg, #E8F0FF, #AAC9FF)'
    },
    {
      id: 74, slug: 'boundaries', title: 'Boundaries', author: 'Henry Cloud & John Townsend', category: 'Relationships', categorySlug: 'relationships', price: 10500, rating: 4.8,
      description: 'Caring for others does not mean taking responsibility for everything they do. Cloud and Townsend approach personal limits from a Christian perspective, helping readers consider responsibility, consent and healthier relationships.',
      learn: ['Clarify personal responsibilities', 'Communicate appropriate limits', 'Balance care with self-respect'], badge: null, featured: false, coverColor: 'linear-gradient(145deg, #13345E, #256BB4)'
    },
    {
      id: 75, slug: 'men-are-from-mars-women-are-from-venus', title: 'Men Are from Mars, Women Are from Venus', author: 'John Gray', category: 'Relationships', categorySlug: 'relationships', price: 7000, rating: 4,
      description: 'Gray offers a well-known perspective on differences in relationship communication. Its broad gender generalisations are best read critically, with attention to the individual person rather than an assumed category.',
      learn: ['Notice communication preferences', 'Question broad generalisations', 'Listen to individual needs'], badge: null, featured: false, coverColor: 'linear-gradient(145deg, #123B74, #071A3B)'
    },
    {
      id: 76, slug: 'the-seven-principles-for-making-marriage-work', title: 'The Seven Principles for Making Marriage Work', author: 'John Gottman', category: 'Relationships', categorySlug: 'relationships', price: 6000, rating: 4.7,
      description: 'Gottman draws on relationship research to explore the everyday foundations of a stronger marriage. Practical exercises invite partners to strengthen friendship, handle differences and understand each other’s worlds.',
      learn: ['Deepen knowledge of your partner', 'Practise constructive conflict', 'Strengthen everyday friendship'], badge: 'Bestseller', featured: false, coverColor: 'linear-gradient(145deg, #0A3D91, #04112B)'
    },
    {
      id: 77, slug: 'nonviolent-communication', title: 'Nonviolent Communication', author: 'Marshall B. Rosenberg', category: 'Relationships', categorySlug: 'relationships', price: 9500, rating: 4.6,
      description: 'Rosenberg offers a language of observation, feeling, need and request. The approach encourages readers to move beyond blame and listen for the human concerns behind a difficult exchange.',
      learn: ['Separate observation from judgement', 'Name feelings and needs', 'Make clear, respectful requests'], badge: null, featured: false, coverColor: 'linear-gradient(145deg, #E8F0FF, #AAC9FF)'
    },
    {
      id: 78, slug: 'crucial-conversations', title: 'Crucial Conversations', author: 'Kerry Patterson et al.', category: 'Relationships', categorySlug: 'relationships', price: 8500, rating: 4.7,
      description: 'High stakes and strong emotions can make a useful conversation difficult to begin. Patterson and colleagues offer techniques for creating safety, examining assumptions and speaking honestly without abandoning respect.',
      learn: ['Create conversational safety', 'Separate facts from assumptions', 'Speak candidly with respect'], badge: null, featured: false, coverColor: 'linear-gradient(145deg, #D9E8FF, #9FBDED)'
    },
    {
      id: 79, slug: 'the-relationship-cure', title: 'The Relationship Cure', author: 'John Gottman', category: 'Relationships', categorySlug: 'relationships', price: 8000, rating: 4.5,
      description: 'Small moments of attention can influence the quality of a relationship over time. Gottman explores emotional bids and everyday responses, inviting readers to become more aware of the chances they have to connect with others.',
      learn: ['Recognise bids for connection', 'Respond with greater attention', 'Strengthen everyday emotional awareness'], badge: null, featured: false, coverColor: 'linear-gradient(145deg, #13345E, #256BB4)'
    },
    {
      id: 80, slug: 'hold-me-tight', title: 'Hold Me Tight', author: 'Sue Johnson', category: 'Relationships', categorySlug: 'relationships', price: 11000, rating: 4.6,
      description: 'Johnson focuses on the emotional connection beneath recurring relationship conflict. The book invites couples to recognise difficult interaction patterns and make room for more open, responsive conversations.',
      learn: ['Recognise recurring conflict cycles', 'Name underlying emotional needs', 'Practise responsive conversations'], badge: null, featured: false, coverColor: 'linear-gradient(145deg, #0B5FFF, #083B9D)'
    },
    {
      id: 81, slug: 'the-purpose-driven-life', title: 'The Purpose Driven Life', author: 'Rick Warren', image: 'assets/covers/purpose.jpg', category: 'Faith', categorySlug: 'faith', price: 7500, rating: 4.6,
      description: 'Warren invites readers to reflect on life through a Christian understanding of purpose. Structured reflections connect worship, community, growth, service and mission to everyday choices.',
      learn: ['Reflect on Christian purpose', 'Connect faith and service', 'Develop a reflective reading practice'], badge: null, featured: true, coverColor: 'linear-gradient(145deg, #E8F0FF, #AAC9FF)'
    },
    {
      id: 82, slug: 'mere-christianity', title: 'Mere Christianity', author: 'C.S. Lewis', category: 'Faith', categorySlug: 'faith', price: 7000, rating: 4.8,
      description: 'Lewis presents an accessible discussion of central Christian beliefs and moral questions. His conversational arguments offer a starting point for thoughtful reflection rather than a substitute for personal study or dialogue.',
      learn: ['Explore central Christian ideas', 'Consider moral arguments', 'Practise thoughtful faith discussion'], badge: null, featured: false, coverColor: 'linear-gradient(145deg, #0A3D91, #04112B)'
    },
    {
      id: 83, slug: 'the-power-of-a-praying-woman', title: 'The Power of a Praying Woman', author: 'Stormie Omartian', category: 'Faith', categorySlug: 'faith', price: 8000, rating: 4.5,
      description: 'Omartian offers Christian reflections on bringing different areas of a woman’s life into prayer. The devotional approach encourages honest spiritual conversation and personal growth without promising that prayer guarantees a particular outcome.',
      learn: ['Develop a reflective prayer practice', 'Name personal spiritual concerns', 'Connect devotion to everyday choices'], badge: null, featured: false, coverColor: 'linear-gradient(145deg, #123B74, #071A3B)'
    },
    {
      id: 84, slug: 'the-power-of-a-praying-man', title: 'The Power of a Praying Man', author: 'Stormie Omartian', category: 'Faith', categorySlug: 'faith', price: 6500, rating: 4.4,
      description: 'Omartian considers the concerns and responsibilities of a man’s life through a Christian perspective on prayer. The book invites thoughtful devotion and reflection while leaving room for practical action, community and appropriate support.',
      learn: ['Reflect on personal responsibilities', 'Build an intentional prayer routine', 'Connect faith with practical action'], badge: null, featured: false, coverColor: 'linear-gradient(145deg, #0B5FFF, #083B9D)'
    },
    {
      id: 85, slug: 'battlefield-of-the-mind', title: 'Battlefield of the Mind', author: 'Joyce Meyer', category: 'Faith', categorySlug: 'faith', price: 6000, rating: 4.1,
      description: 'Meyer considers recurring thought patterns through a Christian devotional lens. The book encourages spiritual reflection and hopeful habits, while persistent mental-health concerns still deserve qualified professional support.',
      learn: ['Notice recurring thought patterns', 'Practise devotional reflection', 'Seek appropriate support when needed'], badge: null, featured: false, coverColor: 'linear-gradient(145deg, #D9E8FF, #9FBDED)'
    },
    {
      id: 86, slug: 'the-case-for-christ', title: 'The Case for Christ', author: 'Lee Strobel', category: 'Faith', categorySlug: 'faith', price: 5000, rating: 4.7,
      description: 'Strobel recounts an investigation into Christian claims through interviews and historical questions. The book provides one apologetic perspective that readers can engage with alongside other scholarship and viewpoints.',
      learn: ['Explore apologetic questions', 'Consider historical arguments', 'Evaluate evidence thoughtfully'], badge: null, featured: false, coverColor: 'linear-gradient(145deg, #13345E, #256BB4)'
    },
    {
      id: 87, slug: 'the-ragamuffin-gospel', title: 'The Ragamuffin Gospel', author: 'Brennan Manning', category: 'Faith', categorySlug: 'faith', price: 9500, rating: 4.8,
      description: 'Manning writes about Christian grace for people who feel inadequate or struggle to maintain a polished image. His reflections encourage readers to consider acceptance, honesty and the difference between earning approval and receiving love.',
      learn: ['Reflect on the meaning of grace', 'Bring honesty into spiritual life', 'Question performance-based acceptance'], badge: null, featured: false, coverColor: 'linear-gradient(145deg, #0A3D91, #04112B)'
    },
    {
      id: 88, slug: 'knowing-god', title: 'Knowing God', author: 'J.I. Packer', category: 'Faith', categorySlug: 'faith', price: 10000, rating: 4.7,
      description: 'Packer connects Christian theology with the personal practice of faith. The book encourages readers to think carefully about God’s character and how that understanding shapes trust, worship and daily life.',
      learn: ['Study the character of God', 'Connect belief to practice', 'Reflect on trust and worship'], badge: null, featured: false, coverColor: 'linear-gradient(145deg, #123B74, #071A3B)'
    },
    {
      id: 89, slug: 'celebration-of-discipline', title: 'Celebration of Discipline', author: 'Richard J. Foster', category: 'Faith', categorySlug: 'faith', price: 7500, rating: 4.5,
      description: 'Foster introduces Christian spiritual disciplines as practices that can support a deeper inner life. The book considers inward, outward and communal habits, inviting thoughtful participation rather than treating devotion as a checklist for achievement.',
      learn: ['Explore spiritual disciplines', 'Balance personal and communal practice', 'Approach devotion with intention'], badge: 'New', featured: false, coverColor: 'linear-gradient(145deg, #E8F0FF, #AAC9FF)'
    },
    {
      id: 90, slug: 'the-practice-of-the-presence-of-god', title: 'The Practice of the Presence of God', author: 'Brother Lawrence', category: 'Faith', categorySlug: 'faith', price: 5500, rating: 4.2,
      description: 'Conversations and letters associated with Brother Lawrence reflect on remembering God during ordinary work. This brief Christian classic invites readers to consider how attention and devotion might become part of daily life rather than remain separate activities.',
      learn: ['Practise attentive everyday devotion', 'Reflect on faith during ordinary work', 'Value simplicity in spiritual practice'], badge: null, featured: false, coverColor: 'linear-gradient(145deg, #13345E, #256BB4)'
    },
    {
      id: 91, slug: 'the-21-irrefutable-laws-of-leadership', title: 'The 21 Irrefutable Laws of Leadership', author: 'John C. Maxwell', image: 'assets/covers/21-laws.webp', category: 'Leadership', categorySlug: 'leadership', price: 8500, rating: 4.7,
      description: 'Maxwell presents leadership lessons through memorable principles and examples. Readers are invited to reflect on influence, trust and growth while treating the framework as a practical guide rather than a law of nature.',
      learn: ['Build influence through trust', 'Develop leadership intentionally', 'Reflect on the people you serve'], badge: 'Bestseller', featured: true, coverColor: 'linear-gradient(145deg, #0B5FFF, #083B9D)'
    },
    {
      id: 92, slug: 'leaders-eat-last', title: 'Leaders Eat Last', author: 'Simon Sinek', category: 'Leadership', categorySlug: 'leadership', price: 9500, rating: 4.6,
      description: 'Sinek explores how leaders help create conditions in which people feel supported and safe. The book connects trust, shared responsibility and organisational culture to the quality of a team’s working life.',
      learn: ['Create conditions for trust', 'Put team wellbeing into practice', 'Understand leadership responsibility'], badge: null, featured: false, coverColor: 'linear-gradient(145deg, #0A3D91, #04112B)'
    },
    {
      id: 93, slug: 'dare-to-lead', title: 'Dare to Lead', author: 'Brené Brown', category: 'Leadership', categorySlug: 'leadership', price: 10000, rating: 4.7,
      description: 'Brown brings her work on vulnerability and courage into the workplace. Practical reflections encourage leaders to clarify values, build trust and have the conversations they might otherwise avoid.',
      learn: ['Lead from clear values', 'Practise difficult conversations', 'Build trust through behaviour'], badge: null, featured: false, coverColor: 'linear-gradient(145deg, #D9E8FF, #9FBDED)'
    },
    {
      id: 94, slug: 'the-five-dysfunctions-of-a-team', title: 'The Five Dysfunctions of a Team', author: 'Patrick Lencioni', category: 'Leadership', categorySlug: 'leadership', price: 10500, rating: 4.6,
      description: 'Lencioni uses a business fable to examine the patterns that prevent a team from working well together. The framework connects trust, constructive conflict, commitment, accountability and a shared focus on results.',
      learn: ['Build a foundation of trust', 'Make room for constructive disagreement', 'Align accountability with shared results'], badge: null, featured: false, coverColor: 'linear-gradient(145deg, #123B74, #071A3B)'
    },
    {
      id: 95, slug: 'extreme-ownership', title: 'Extreme Ownership', author: 'Jocko Willink & Leif Babin', category: 'Leadership', categorySlug: 'leadership', price: 14000, rating: 4.5,
      description: 'Willink and Babin translate lessons from military leadership into wider team settings. The central challenge is to take responsibility for outcomes while communicating clearly and helping others understand the mission.',
      learn: ['Take responsibility for outcomes', 'Communicate a clear mission', 'Support coordinated team action'], badge: null, featured: false, coverColor: 'linear-gradient(145deg, #13345E, #256BB4)'
    },
    {
      id: 96, slug: 'the-leadership-challenge', title: 'The Leadership Challenge', author: 'James M. Kouzes & Barry Z. Posner', category: 'Leadership', categorySlug: 'leadership', price: 8000, rating: 4.4,
      description: 'Kouzes and Posner describe leadership through practices people can develop rather than a title they hold. Their framework connects example-setting, shared direction, experimentation and recognition to everyday leadership.',
      learn: ['Model the behaviour you expect', 'Build a shared direction', 'Recognise meaningful contributions'], badge: null, featured: false, coverColor: 'linear-gradient(145deg, #E8F0FF, #AAC9FF)'
    },
    {
      id: 97, slug: 'multipliers', title: 'Multipliers', author: 'Liz Wiseman', category: 'Leadership', categorySlug: 'leadership', price: 12000, rating: 4.3,
      description: 'Wiseman examines how a leader’s behaviour can either draw out or diminish the abilities of other people. The book offers practical ways to ask better questions, share responsibility and create space for a team to contribute its intelligence.',
      learn: ['Draw out existing team strengths', 'Lead through useful questions', 'Share responsibility for meaningful work'], badge: null, featured: false, coverColor: 'linear-gradient(145deg, #0A3D91, #04112B)'
    },
    {
      id: 98, slug: 'turn-the-ship-around', title: 'Turn the Ship Around!', author: 'L. David Marquet', category: 'Leadership', categorySlug: 'leadership', price: 7000, rating: 4.5,
      description: 'Marquet recounts a shift in submarine leadership from giving orders toward developing informed responsibility. The story encourages leaders to connect authority with competence and clarity so more people can think and act with purpose.',
      learn: ['Build informed local responsibility', 'Connect authority to competence', 'Communicate intent with clarity'], badge: null, featured: false, coverColor: 'linear-gradient(145deg, #0B5FFF, #083B9D)'
    },
    {
      id: 99, slug: 'the-first-90-days', title: 'The First 90 Days', author: 'Michael D. Watkins', category: 'Leadership', categorySlug: 'leadership', price: 11000, rating: 4.6,
      description: 'A new leadership role brings expectations that may not be obvious at the start. Watkins offers a framework for learning the situation, building relationships and choosing early priorities without rushing past the context that shapes success.',
      learn: ['Assess a new role thoughtfully', 'Build key working relationships', 'Choose context-sensitive early priorities'], badge: null, featured: false, coverColor: 'linear-gradient(145deg, #123B74, #071A3B)'
    },
    {
      id: 100, slug: 'the-servant', title: 'The Servant', author: 'James C. Hunter', image: 'assets/covers/servant.jpg', category: 'Leadership', categorySlug: 'leadership', price: 9500, rating: 4.7,
      description: 'Hunter uses a fictional retreat to explore leadership through service, character and responsibility. The book invites readers to distinguish authority from power and consider the daily behaviours that make care for others credible.',
      learn: ['Distinguish authority from power', 'Practise service through behaviour', 'Connect leadership with personal character'], badge: 'New', featured: true, coverColor: 'linear-gradient(145deg, #D9E8FF, #9FBDED)'
    }
  ];
})();
