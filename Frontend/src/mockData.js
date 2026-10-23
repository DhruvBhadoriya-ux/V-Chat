// Pre-configured lecture conversations for V-CHAT demonstration
export const INITIAL_CONVERSATIONS = [
  {
    id: 'html-basics',
    title: 'HTML Basics',
    course: 'Web Development 101',
    messages: [
      {
        id: 'msg-1',
        sender: 'user',
        text: 'Can you explain the difference between semantic HTML and regular div tags for our upcoming midterm?',
        time: '10:14 AM'
      },
      {
        id: 'msg-2',
        sender: 'ai',
        text: 'In web architecture, semantic HTML elements (such as <header>, <main>, <article>, and <footer>) clearly describe their meaning to both the browser and developer, whereas <div> is a generic, non-semantic container.\n\nKey takeaways for your exam:\n1. Accessibility (a11y): Screen readers use semantic landmarks to navigate sections quickly.\n2. SEO: Search crawlers index semantic structures with higher contextual priority.\n3. Maintainability: Cleaner DOM hierarchy compared to "div soup".',
        source: 'Lecture 02: HTML Semantics & Document Structure (Slides 14–19)',
        time: '10:15 AM'
      }
    ]
  },
  {
    id: 'seo-lecture',
    title: 'SEO Lecture',
    course: 'Digital Marketing & Web Tech',
    messages: [
      {
        id: 'msg-3',
        sender: 'user',
        text: 'What are the three most critical on-page SEO factors covered in Professor Davis\'s lecture?',
        time: 'Yesterday'
      },
      {
        id: 'msg-4',
        sender: 'ai',
        text: 'Based on the slide deck for Lecture 05, the top 3 on-page factors are:\n\n1. Title Tags & Meta Descriptions: Must be concise (<60 characters) and include primary keywords naturally.\n2. Semantic Heading Hierarchy (H1–H6): Ensure a single H1 per page with logical hierarchical sub-sections.\n3. Optimized Image Assets & Alt Text: Essential for accessibility and image search indexing.',
        source: 'Lecture 05: Modern On-Page Search Optimization (Slides 8–12)',
        time: 'Yesterday'
      }
    ]
  },
  {
    id: 'web-vitals',
    title: 'Web Vitals',
    course: 'Advanced Web Engineering',
    messages: [
      {
        id: 'msg-5',
        sender: 'user',
        text: 'What is the target threshold for LCP (Largest Contentful Paint) according to Google Web Vitals?',
        time: 'Sep 24'
      },
      {
        id: 'msg-6',
        sender: 'ai',
        text: 'According to Lecture 08, to provide a good user experience, your Largest Contentful Paint (LCP) should occur within 2.5 seconds or less from when the page first begins loading.\n\nMetrics thresholds:\n• Good: ≤ 2.5s\n• Needs Improvement: between 2.5s and 4.0s\n• Poor: > 4.0s',
        source: 'Lecture 08: Frontend Performance & Core Web Vitals (Slide 22)',
        time: 'Sep 24'
      }
    ]
  }
];

export const WELCOME_MESSAGE = {
  title: 'Welcome to V-CHAT',
  subtitle: 'Your RAG-Powered University AI Assistant',
  description: 'Ask questions about your enrolled courses, lecture slide decks, syllabus, and audio transcripts. Answers are grounded with direct lecture citations.',
  suggestions: [
    'Explain the box model from Lecture 3',
    'What are the core differences between CSS Grid and Flexbox?',
    'Summarize key concepts from the SEO lecture',
    'How does Google measure Cumulative Layout Shift (CLS)?'
  ]
};
