import Link from "next/link";
import Container from "@/components/ui/Container";
import InfoCard from "@/components/ui/InfoCard";
import Badge from "@/components/ui/Badge";
import { 
  BarChart3, 
  BookOpen, 
  Images, 
  TrendingUp, 
  Star, 
  Filter,
  Check 
} from "lucide-react";

export const metadata = {
  title: "About us - Luma",
  description: "Learn more about the Luma project - an encyclopedia of cameras.",
};

const features = [
  {
    title: "Detailed Specifications",
    description: "Complete technical data of cameras with precise parameters and characteristics.",
    icon: BarChart3
  },
  {
    title: "Brand Histories",
    description: "Discover the fascinating histories of camera manufacturers.",
    icon: BookOpen
  },
  {
    title: "Product Galleries",
    description: "High-quality images and visualizations of cameras from various perspectives.",
    icon: Images
  },
  {
    title: "Market Value",
    description: "Current information on camera prices and market value.",
    icon: TrendingUp
  },
  {
    title: "Popularity Rankings",
    description: "See the most popular models and most searched cameras.",
    icon: Star
  },
  {
    title: "Filtering and Sorting",
    description: "Advanced filtering options by brands, sensors, and parameters.",
    icon: Filter
  }
];

const stats = [
  { value: "500+", label: "Cameras" },
  { value: "30+", label: "Brands" },
  { value: "1000+", label: "Photos" }
];

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-[var(--bg-dark)] text-[var(--text-primary)]">
      {/* Hero Section */}
      <section className="relative overflow-hidden border-b border-[var(--border-light)]">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(201,159,106,0.12),transparent_40%)]" />
        <Container className="relative py-12 sm:py-16 md:py-24 lg:py-32">
          <div className="max-w-4xl">
            <Badge>Information</Badge>
            
            <h1 className="mt-4 sm:mt-6 font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl leading-[1.1] text-[var(--text-primary)]">
              Passion for photography meets technology
            </h1>

            <p className="mt-4 sm:mt-6 max-w-2xl text-sm sm:text-base md:text-lg leading-6 sm:leading-7 md:leading-8 text-[var(--text-muted)]">
              Luma is a comprehensive encyclopedia of cameras, 
              created with enthusiasts and professionals in mind. 
              We have gathered information about brands, models, 
              and the history of cameras in one place.
            </p>

            {/* Stats */}
            <div className="mt-8 sm:mt-12 flex flex-wrap gap-6 sm:gap-12">
              {stats.map((stat) => (
                <div key={stat.label}>
                  <div className="text-2xl sm:text-3xl md:text-4xl font-semibold text-[var(--accent-primary)]">
                    {stat.value}
                  </div>
                  <div className="mt-1 text-xs sm:text-sm uppercase tracking-[0.14em] text-[var(--text-muted)]">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* Features Section */}
      <section className="py-12 sm:py-16 md:py-20 border-b border-[var(--border-light)]">
        <Container>
          <div className="max-w-3xl">
            <p className="text-xs uppercase tracking-[0.28em] text-[var(--accent-primary)]">
              What We Offer
            </p>
            <h2 className="mt-3 font-serif text-2xl sm:text-3xl md:text-4xl leading-tight text-[var(--text-primary)]">
              Everything You Need in One Place
            </h2>
          </div>

          <div className="mt-8 sm:mt-12 grid gap-4 sm:gap-5 md:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((feature) => {
              const Icon = feature.icon;
              return (
                <InfoCard key={feature.title}>
                  <div className="mb-3 sm:mb-4">
                    <Icon className="w-8 h-8 sm:w-10 sm:h-10 text-[var(--accent-primary)]" strokeWidth={1.5} />
                  </div>
                  <h3 className="text-base sm:text-lg font-semibold text-[var(--text-primary)] mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed">
                    {feature.description}
                  </p>
                </InfoCard>
              );
            })}
          </div>
        </Container>
      </section>

      {/* Mission Section */}
      <section className="py-12 sm:py-16 md:py-20 border-b border-[var(--border-light)]">
        <Container>
          <div className="grid gap-8 md:gap-12 lg:gap-16 md:grid-cols-2 items-center">
            <div>
              <p className="text-xs uppercase tracking-[0.28em] text-[var(--accent-primary)]">
                Our Mission
              </p>
              <h2 className="mt-3 font-serif text-2xl sm:text-3xl md:text-4xl leading-tight text-[var(--text-primary)]">
                Documenting the History of Photography
              </h2>
              <p className="mt-4 sm:mt-6 text-sm sm:text-base leading-6 sm:leading-7 text-[var(--text-secondary)]">
                Our goal is to create the most comprehensive knowledge base 
                about cameras. We believe that every camera has its own history 
                and deserves to be documented.
              </p>
              <p className="mt-4 text-sm sm:text-base leading-6 sm:leading-7 text-[var(--text-secondary)]">
                The Luma project is built on modern technologies: Next.js, React, and Contentful CMS, 
                ensuring speed, security, and ease of updates.
              </p>
            </div>
            
            <InfoCard>
              <div className="p-4 sm:p-6">
                <h3 className="text-lg sm:text-xl font-semibold text-[var(--text-primary)] mb-4">
                  Why Luma?
                </h3>
                <ul className="space-y-3 sm:space-y-4">
                  <li className="flex gap-3">
                    <Check className="w-5 h-5 text-[var(--accent-primary)] flex-shrink-0" strokeWidth={2.5} />
                    <span className="text-xs sm:text-sm text-[var(--text-secondary)]">
                      Regularly updated database
                    </span>
                  </li>
                  <li className="flex gap-3">
                    <Check className="w-5 h-5 text-[var(--accent-primary)] flex-shrink-0" strokeWidth={2.5} />
                    <span className="text-xs sm:text-sm text-[var(--text-secondary)]">
                      Verified information and specifications
                    </span>
                  </li>
                  <li className="flex gap-3">
                    <Check className="w-5 h-5 text-[var(--accent-primary)] flex-shrink-0" strokeWidth={2.5} />
                    <span className="text-xs sm:text-sm text-[var(--text-secondary)]">
                      Intuitive interface and fast navigation
                    </span>
                  </li>
                  <li className="flex gap-3">
                    <Check className="w-5 h-5 text-[var(--accent-primary)] flex-shrink-0" strokeWidth={2.5} />
                    <span className="text-xs sm:text-sm text-[var(--text-secondary)]">
                      Responsive design optimized for mobile devices
                    </span>
                  </li>
                  <li className="flex gap-3">
                    <Check className="w-5 h-5 text-[var(--accent-primary)] flex-shrink-0" strokeWidth={2.5} />
                    <span className="text-xs sm:text-sm text-[var(--text-secondary)]">
                      Advanced filters and search
                    </span>
                  </li>
                </ul>
              </div>
            </InfoCard>
          </div>
        </Container>
      </section>

      {/* CTA Section */}
      <section className="py-12 sm:py-16 md:py-20">
        <Container>
          <div className="max-w-3xl mx-auto text-center">
            <p className="text-xs uppercase tracking-[0.28em] text-[var(--accent-primary)]">
              Explore
            </p>
            <h2 className="mt-3 font-serif text-2xl sm:text-3xl md:text-4xl leading-tight text-[var(--text-primary)]">
              Discover the world of cameras
            </h2>
            <p className="mt-4 sm:mt-6 text-sm sm:text-base text-[var(--text-muted)]">
              Browse the collection, compare models, and learn about the brands that have defined photography.
            </p>
            
            <div className="mt-6 sm:mt-10 flex flex-col sm:flex-row justify-center flex-wrap gap-3 sm:gap-4">
              <Link
                href="/collection"
                className="rounded-full border border-[var(--accent-primary)] px-6 py-3 text-xs sm:text-sm uppercase tracking-[0.14em] text-[var(--text-primary)] transition hover:bg-[var(--border-default)]"
              >
                Browse Collection
              </Link>

              <Link
                href="/brands"
                className="rounded-full border border-[var(--border-default)] px-6 py-3 text-xs sm:text-sm uppercase tracking-[0.14em] text-[var(--text-secondary)] transition hover:border-[var(--accent-primary)]"
              >
                Browse Brands
              </Link>
            </div>
          </div>
        </Container>
      </section>
    </main>
  );
}
