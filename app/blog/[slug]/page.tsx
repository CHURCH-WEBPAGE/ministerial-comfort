'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useRouter, useParams } from 'next/navigation';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ScrollDownArrow from '@/components/ScrollDownArrow';
import { BlogPost } from '../page';

// Sample blog data - replace with API call later
const blogPosts: BlogPost[] = [
  {
    id: '1',
    slug: 'proactive-emotional-health-in-ministry',
    title: 'Proactive Emotional Health in Ministry',
    description: 'Understanding the importance of maintaining emotional wellness before challenges arise in ministry work.',
    author: 'Rev. Samuel Adeyemi',
    date: '15th Jan. 2025',
    image: '/assets/blog/handling-stress.svg',
    featured: true,
    content: `Ministry is a calling that requires immense dedication, compassion, and resilience. However, the demands of pastoral care, counseling, and spiritual leadership can take a significant toll on one's emotional and mental well-being. This is why proactive emotional health in ministry is not just important—it's essential.

Proactive emotional health means taking intentional steps to maintain and strengthen your emotional wellness before challenges arise. It's about building a foundation of resilience that can support you through the inevitable difficulties of ministry work.

**The Importance of Self-Care**

Many ministers find themselves so focused on caring for others that they neglect their own needs. However, you cannot pour from an empty cup. Regular self-care practices—such as prayer, meditation, exercise, and time with family—are not luxuries but necessities for effective ministry.

**Building Support Networks**

No minister should walk alone. Building strong relationships with peers, mentors, and counselors provides a safety net when challenges arise. These relationships offer perspective, encouragement, and accountability that are crucial for emotional health.

**Recognizing Early Warning Signs**

Proactive emotional health also involves being aware of early warning signs of burnout or stress. These might include persistent fatigue, irritability, difficulty sleeping, or a sense of detachment from your calling. Recognizing these signs early allows for timely intervention and support.

**The Role of Professional Support**

Seeking professional counseling or therapy is not a sign of weakness but of wisdom. Regular check-ins with a counselor can help you process the emotional weight of ministry and develop healthy coping strategies.

By prioritizing proactive emotional health, ministers can serve more effectively, maintain their passion for ministry, and avoid burnout. Remember, taking care of yourself is not selfish—it's an essential part of your calling to serve others.`,
  },
  {
    id: '2',
    slug: 'handling-stress-in-ministry',
    title: 'Handling Stress in Ministry',
    description: 'Stress is natural in ministry. Recognizing it early and seeking guidance from mentors or counselors prevents burnout and keeps your service effective.....',
    author: 'Pastor Grace Olamide',
    date: '19th Jan. 2025',
    image: '/assets/blog/handling-stress.svg',
    content: `Stress is an inevitable part of ministry work. From managing church operations to providing pastoral care, ministers face numerous demands that can lead to significant stress. However, how we handle this stress determines whether it becomes a tool for growth or a path to burnout.

**Understanding Ministry Stress**

Ministry stress comes in many forms: the pressure to be available 24/7, the emotional weight of counseling others, administrative responsibilities, and the constant need to be "on" for your congregation. Recognizing that stress is natural and expected is the first step toward managing it effectively.

**Early Recognition and Intervention**

The key to handling stress is recognizing it early. Pay attention to physical symptoms like headaches, muscle tension, or sleep disturbances. Emotional signs might include irritability, anxiety, or feeling overwhelmed. When you notice these signs, it's time to take action.

**Practical Stress Management Strategies**

1. **Set Boundaries**: Learn to say no and protect your personal time. Your congregation will benefit more from a well-rested, healthy minister than from one who is constantly exhausted.

2. **Delegate Responsibilities**: You don't have to do everything yourself. Trust your team and delegate tasks appropriately.

3. **Regular Breaks**: Schedule regular days off and vacations. Time away is not a luxury—it's essential for long-term effectiveness.

4. **Physical Activity**: Regular exercise is one of the most effective stress relievers. Even a daily walk can make a significant difference.

5. **Seek Support**: Don't try to handle stress alone. Talk to mentors, peers, or professional counselors who understand the unique pressures of ministry.

**The Role of Mentors and Counselors**

Having someone to talk to—whether a mentor, peer, or professional counselor—provides perspective and support. They can help you identify stress patterns, develop coping strategies, and offer accountability for self-care practices.

Remember, handling stress effectively is not about eliminating it entirely but about developing healthy responses that allow you to continue serving effectively while maintaining your own well-being.`,
  },
  {
    id: '3',
    slug: 'balancing-proactive-and-reactive-care',
    title: 'Balancing Proactive and Reactive Care',
    description: 'Proactive care builds resilience; reactive care heals when challenges arise. Ministry leaders need both to serve their communities effectively....',
    author: 'Rev. Michael Chukwu',
    date: '29th Jun. 2025',
    image: '/assets/blog/balancing-care.svg',
    content: `Effective ministry requires a delicate balance between proactive and reactive care. While reactive care addresses immediate needs and crises, proactive care builds resilience and prevents problems before they arise. Both are essential for serving your community effectively.

**Understanding Proactive Care**

Proactive care involves taking intentional steps to build health, resilience, and strength before problems occur. This includes regular self-care, ongoing education, building support networks, and maintaining healthy boundaries. It's about investing in your long-term capacity to serve.

**Understanding Reactive Care**

Reactive care responds to immediate needs and crises. When someone is in crisis, when conflict arises, or when urgent pastoral care is needed, reactive care steps in to provide support, guidance, and healing. This is essential ministry work that cannot be ignored.

**The Balance**

The challenge is finding the right balance. Too much focus on reactive care can lead to burnout and exhaustion. Too much focus on proactive care might mean missing urgent needs. The key is maintaining both simultaneously.

**Practical Strategies for Balance**

1. **Schedule Proactive Time**: Block out regular time for self-care, learning, and relationship building. Treat this time as non-negotiable.

2. **Build Systems**: Create systems and processes that allow you to respond quickly to crises while protecting your proactive care time.

3. **Delegate Reactively**: When crises arise, delegate what you can so you can focus on what truly requires your attention.

4. **Regular Assessment**: Periodically assess whether you're maintaining balance. Are you spending too much time in reactive mode? Are you neglecting urgent needs in favor of proactive care?

**The Ministry Leader's Responsibility**

As a ministry leader, you have a responsibility to both your congregation and yourself. Balancing proactive and reactive care allows you to serve effectively while maintaining your own health and passion for ministry.

Remember, you cannot serve others well if you are not well yourself. Investing in proactive care makes you more effective in reactive situations, while reactive care reminds you of the importance of ongoing proactive investment.`,
  },
  {
    id: '4',
    slug: 'the-role-of-hospitality-in-emotional-wellness',
    title: 'The Role of Hospitality in Emotional Wellness',
    description: 'Welcoming and supporting others strengthens both the giver and receiver. Hospitality in ministry fosters emotional health for the whole community....',
    author: 'Pastor Naomi Eze',
    date: '30th Sept. 2025',
    image: '/assets/blog/hospitality.png',
    content: `Hospitality is more than just welcoming guests or hosting events. In ministry, hospitality is a powerful tool for fostering emotional wellness—both for those who receive it and those who give it. When practiced intentionally, hospitality creates spaces of safety, belonging, and healing.

**Hospitality as Emotional Care**

True hospitality creates an environment where people feel seen, valued, and safe. This emotional safety is foundational to wellness. When people feel welcomed and accepted, they are more likely to open up, share their struggles, and receive the support they need.

**The Reciprocal Nature of Hospitality**

Interestingly, hospitality benefits both the giver and receiver. When ministers practice hospitality, they often find their own emotional wellness improved. The act of welcoming, serving, and caring for others can be deeply fulfilling and meaningful.

**Creating Hospitable Spaces**

Hospitality in ministry isn't just about physical spaces—though comfortable, welcoming environments help. It's about creating emotional spaces where people feel safe to be authentic, vulnerable, and real. This requires intentionality, presence, and genuine care.

**Practical Applications**

1. **Welcome Everyone**: Make a conscious effort to welcome everyone, especially those who might feel marginalized or overlooked.

2. **Listen Well**: True hospitality involves listening—really listening—to people's stories, struggles, and joys.

3. **Create Safe Spaces**: Foster environments where people can share openly without fear of judgment.

4. **Follow Up**: Hospitality doesn't end when someone leaves. Follow up, check in, and show continued care.

**Building Community Through Hospitality**

When hospitality is practiced consistently, it builds a strong sense of community. People feel connected, supported, and part of something larger than themselves. This sense of belonging is crucial for emotional wellness.

**The Minister's Role**

As a minister, you set the tone for hospitality in your community. Your example of welcoming, caring, and creating safe spaces encourages others to do the same. This creates a culture of hospitality that benefits everyone.

Remember, hospitality in ministry is not about perfection or elaborate events. It's about creating spaces—both physical and emotional—where people feel welcomed, valued, and cared for. This simple but powerful practice can transform both individual lives and entire communities.`,
  },
];

export default function BlogDetailPage() {
  const router = useRouter();
  const params = useParams();
  const slug = params?.slug as string;
  const post = blogPosts.find(p => p.slug === slug);
  const relatedPosts = blogPosts.filter(p => p.slug !== params.slug).slice(0, 3);

  if (!post) {
    return (
      <main className="min-h-screen bg-white">
        <Header />
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <p className="text-center text-gray-600">Blog post not found.</p>
        </div>
        <Footer />
      </main>
    );
  }

  const handleBack = () => {
    router.back();
  };

  return (
    <main className="min-h-screen bg-white">
      <Header />
      
      {/* Hero Section */}
      <section className="relative h-[400px] md:h-[500px] mb-12">
        <Image
          src={post.image}
          alt={post.title}
          fill
          className="object-cover"
          style={{ objectPosition: 'center' }}
          sizes="100vw"
          quality={90}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/60 to-black/40" />
        
        <div className="relative z-10 h-full flex items-end">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 pb-12">
            <div className="flex items-center mb-4">
              <button
                onClick={handleBack}
                className="mr-3 p-1 hover:bg-white/10 rounded transition-colors"
                aria-label="Go back"
              >
                <svg 
                  className="w-6 h-6 text-white" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d="M15 19l-7-7 7-7" 
                  />
                </svg>
              </button>
            </div>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
              {post.title}
            </h1>
            <p className="text-white/90 text-base md:text-lg">
              {post.author} • {post.date}
            </p>
          </div>
        </div>
      </section>

      {/* Article Content */}
      <article className="container mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        <div className="max-w-4xl mx-auto">
          <div className="prose prose-lg max-w-none">
            <div className="text-gray-700 leading-relaxed whitespace-pre-line">
              {post.content || post.description}
            </div>
          </div>
        </div>
      </article>

      {/* Related Blog Posts */}
      <section className="bg-gray-50 py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-12 text-center">
            Related Blog Posts
          </h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            {relatedPosts.map((relatedPost) => (
              <Link 
                key={relatedPost.id} 
                href={`/blog/${relatedPost.slug}`}
                className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 group cursor-pointer"
              >
                <div className="relative h-64 overflow-hidden">
                  <Image
                    src={relatedPost.image}
                    alt={relatedPost.title}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                    sizes="(max-width: 768px) 100vw, 33vw"
                    quality={90}
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-[#2867AE] transition-colors">
                    {relatedPost.title}
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed mb-4 line-clamp-3">
                    {relatedPost.description}
                  </p>
                  <p className="text-gray-500 text-xs">
                    {relatedPost.author} {relatedPost.date}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <Footer />
      <ScrollDownArrow />
    </main>
  );
}

