"""
Seed blog database with sample posts
"""
import sys
sys.path.append('/app/backend')

from routes.blog import blog_posts_db
from datetime import datetime, timezone
import uuid

# Sample posts
sample_posts = [
    {
        'id': str(uuid.uuid4()),
        'title': 'Category Is: Safe Space Realness - Creating LGBTQ+ Inclusive Workplaces',
        'slug': 'category-is-safe-space-realness-creating-lgbtq-inclusive-workplaces',
        'content': """Honey, let's talk about what it really means to create a safe space at work. And no, I'm not talking about putting a rainbow flag in the break room and calling it a day. That's giving rainbow capitalism, and we're not here for performative allyship.

## The Tea on True Inclusion

Creating an LGBTQ+ inclusive workplace isn't just about checking boxes for your ESG report (though, yes, those scores do matter). It's about creating an environment where your queer employees can show up as their full, authentic selves without fear of discrimination, microaggressions, or being the token "diversity hire."

### What Actually Works (The House Rules)

**1. Pronouns Are Non-Negotiable**  
Listen up: asking for and using correct pronouns isn't "too woke" - it's basic respect. Add them to email signatures, Zoom names, and employee directories. Make it standard practice, not a special accommodation.

**2. Benefits That Actually Serve**  
Your healthcare plan better cover gender-affirming care, PrEP, and recognize diverse family structures. If Janet from accounting can get IVF coverage, then your trans employees should get the coverage they need too. Period.

**3. Zero Tolerance Means ZERO**  
When someone reports harassment or discrimination, believe them. Investigate immediately. And for the love of Marsha P. Johnson, don't make them repeat their trauma to five different people.

**4. Leadership Representation Matters**  
If your C-suite is all straight, all cis, all the time? That's a problem. LGBTQ+ employees need to see themselves in leadership positions.

## The Business Case (Because Receipts Matter)

McKinsey found that companies with strong LGBTQ+ inclusion policies see 21% higher employee retention and 15% increase in innovation metrics. Boston Consulting Group reports inclusive companies have 2.3x higher cash flow per employee.

## The Bottom Line

Creating safe spaces for LGBTQ+ employees requires intentionality, resources, and follow-through. Your queer employees are watching. Category is: Authentic Inclusion Eleganza. Don't just talk about it, be about it. 💅""",
        'excerpt': "Let's talk about what it really means to create a safe space at work. Rainbow flags aren't enough - we need real policies, genuine commitment, and leadership that walks the walk.",
        'author': 'KIKI QI',
        'tags': ['workplace', 'lgbtq+', 'inclusion', 'safety', 'diversity'],
        'category': 'LGBTQ+ Workplace',
        'citations': ['McKinsey & Company, "Diversity Wins" (2024)', 'Boston Consulting Group, "Diverse Leadership Teams" (2023)'],
        'published': True,
        'publish_date': datetime.now(timezone.utc).isoformat(),
        'created_at': datetime.now(timezone.utc).isoformat(),
        'updated_at': datetime.now(timezone.utc).isoformat(),
        'views': 0,
        'sass_level': 10
    },
    {
        'id': str(uuid.uuid4()),
        'title': 'Lip Sync For Your Job: Why Coming Out at Work Still Takes Courage',
        'slug': 'lip-sync-for-your-job-why-coming-out-at-work-still-takes-courage',
        'content': """In 2025, coming out at work is still a whole production. And not the fun kind with glitter - the kind that keeps you up at night.

## The Reality Check

46% of LGBTQ+ workers remain closeted at work according to the Human Rights Campaign. That's almost half our community living in fear and exhausting themselves trying to hide who they are.

### The Mental Health Cost

Staying closeted at work literally damages your health. Research shows LGBTQ+ employees who aren't out report 73% higher stress levels and depression rates 2.5x higher than those who are out.

## The Coming Out Calculation

Every queer person at work does this math:
- Will I lose my job?
- Will colleagues treat me differently?
- Will I get passed over for promotions?
- Will HR have my back?

It's exhausting. Straight people never have to do this calculation.

## When the Closet is Safer

Sometimes staying closeted is the right choice. If you're in a state without protections, in an industry with known discrimination, or just not ready - your safety comes first. Always.

## For Allies: How to Help

What NOT to do:
- ❌ "I don't see sexuality"
- ❌ "Why does it matter?"
- ❌ "You're so brave!" (patronizing)

What DOES help:
- ✅ Share pronouns first
- ✅ Use inclusive language
- ✅ Call out discrimination
- ✅ Support LGBTQ+ policies

## The Bottom Line

Coming out at work shouldn't feel like lip syncing for your life, but for too many of us, it still does. To closeted colleagues: I see you. To employers: Do better. 🏳️‍🌈""",
        'excerpt': 'Coming out at work is still a calculated risk. With 46% of LGBTQ+ workers closeted, let's talk about the courage it takes and what workplaces can do to make it safer.',
        'author': 'KIKI QI',
        'tags': ['coming-out', 'workplace', 'lgbtq+', 'mental-health', 'authenticity'],
        'category': 'LGBTQ+ Workplace',
        'citations': ['Human Rights Campaign, "Workplace Climate for LGBTQ Workers" (2024)', 'UCLA Williams Institute, "Coming Out and Health" (2023)'],
        'published': True,
        'publish_date': datetime.now(timezone.utc).isoformat(),
        'created_at': datetime.now(timezone.utc).isoformat(),
        'updated_at': datetime.now(timezone.utc).isoformat(),
        'views': 0,
        'sass_level': 10
    },
    {
        'id': str(uuid.uuid4()),
        'title': 'Category Is: ESG Eleganza - Why Queer Safety Metrics Matter',
        'slug': 'category-is-esg-eleganza-why-queer-safety-metrics-matter',
        'content': """Let's talk ESG and why you can't afford to sleep on Queer Safety Intelligence. This isn't just good vibes - this is your bottom line and competitive advantage.

## What Is ESG

Environmental, Social, and Governance metrics determine if your company is sustainable and ethical. The "Social" part includes LGBTQ+ inclusion, and investors are watching.

In 2024, $35 trillion in global assets were managed under ESG principles. That's real money from real investors.

## The QSI Framework

Queer Safety Intelligence metrics measure:

**1. Legal Protections Score** - Anti-discrimination policies, healthcare, parental leave

**2. Cultural Safety Index** - Employee surveys, retention rates, promotion equity

**3. External Impact Rating** - Supplier diversity, community investment, industry leadership

**4. Risk Assessment** - Operating risks, legal compliance, reputational vulnerabilities

## Why Investors Care

**Risk Mitigation**: Poor LGBTQ+ policies mean higher turnover (costs 50-200% of salary), lawsuits (average $160K), and reputation damage.

**Performance**: Research shows companies with high diversity scores outperform by 5.8% annually and have 23% lower turnover.

**Future-Proofing**: Gen Z won't work for or buy from discriminatory companies.

## Case Studies

**Salesforce**: After implementing LGBTQ+ policies, employee satisfaction jumped 22% and stock price growth outpaced competitors by 3.2x.

**Microsoft**: Strong QSI scores led to 94% LGBTQ+ employee retention and top ESG ratings.

## How to Improve

**Level 1 - Basic**: Non-discrimination policies, basic healthcare, public commitment

**Level 2 - Intermediate**: Comprehensive benefits, active ERG, leadership training

**Level 3 - Advanced**: Leadership representation, supplier diversity, advocacy

**Level 4 - Legendary**: Industry-leading practices, community impact, innovation

## The Bottom Line

QSI metrics are essential to ESG ratings, capital attraction, and competitive positioning. Investors are betting billions on companies that get this right.

Are you serving ESG Eleganza or giving lawsuit waiting to happen? 📊""",
        'excerpt': 'ESG represents $35 trillion in assets watching your LGBTQ+ policies. Why Queer Safety Intelligence metrics matter to your bottom line and competitive advantage.',
        'author': 'KIKI QI',
        'tags': ['esg', 'qsi', 'metrics', 'investment', 'corporate'],
        'category': 'ESG & Metrics',
        'citations': ['MSCI, "ESG and Financial Performance" (2024)', 'Credit Suisse, "Gender 3000" (2023)', 'BlackRock, "Sustainable Investing" (2024)'],
        'published': True,
        'publish_date': datetime.now(timezone.utc).isoformat(),
        'created_at': datetime.now(timezone.utc).isoformat(),
        'updated_at': datetime.now(timezone.utc).isoformat(),
        'views': 0,
        'sass_level': 10
    }
]

# Add posts to database
for post in sample_posts:
    blog_posts_db.append(post)

print(f"✅ Successfully seeded {len(sample_posts)} blog posts!")
print(f"Total posts in database: {len(blog_posts_db)}")
