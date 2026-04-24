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
  title: "O Nas - Luma",
  description: "Dowiedz się więcej o projekcie Luma - encyklopedii aparatów fotograficznych.",
};

const features = [
  {
    title: "Szczegółowe specyfikacje",
    description: "Kompletne dane techniczne aparatów z dokładnymi parametrami i charakterystykami.",
    icon: BarChart3
  },
  {
    title: "Historie marek",
    description: "Poznaj fascynujące historie producentów aparatów fotograficznych.",
    icon: BookOpen
  },
  {
    title: "Galerie produktów",
    description: "Wysokiej jakości zdjęcia i wizualizacje aparatów z różnych perspektyw.",
    icon: Images
  },
  {
    title: "Wartość rynkowa",
    description: "Aktualne informacje o cenach i wartości aparatów na rynku wtórnym.",
    icon: TrendingUp
  },
  {
    title: "Rankingi popularności",
    description: "Zobacz najpopularniejsze modele i najczęściej wyszukiwane aparaty.",
    icon: Star
  },
  {
    title: "Filtrowanie i sortowanie",
    description: "Zaawansowane opcje filtrowania według marek, sensorów i parametrów.",
    icon: Filter
  }
];

const stats = [
  { value: "500+", label: "Aparatów" },
  { value: "30+", label: "Marek" },
  { value: "1000+", label: "Zdjęć" }
];

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-[var(--bg-dark)] text-[var(--text-primary)]">
      {/* Hero Section */}
      <section className="relative overflow-hidden border-b border-[var(--border-light)]">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(201,159,106,0.12),transparent_40%)]" />
        <Container className="relative py-12 sm:py-16 md:py-24 lg:py-32">
          <div className="max-w-4xl">
            <Badge>Informacje</Badge>
            
            <h1 className="mt-4 sm:mt-6 font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl leading-[1.1] text-[var(--text-primary)]">
              Pasja do fotografii spotyka się z technologią
            </h1>

            <p className="mt-4 sm:mt-6 max-w-2xl text-sm sm:text-base md:text-lg leading-6 sm:leading-7 md:leading-8 text-[var(--text-muted)]">
              Luma to kompleksowa encyklopedia aparatów fotograficznych, 
              stworzona z myślą o entuzjastach i profesjonalistach. 
              Zebraliśmy w jednym miejscu informacje o markach, modelach 
              i historii aparatów fotograficznych.
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
              Co oferujemy
            </p>
            <h2 className="mt-3 font-serif text-2xl sm:text-3xl md:text-4xl leading-tight text-[var(--text-primary)]">
              Wszystko, czego potrzebujesz w jednym miejscu
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
                Nasza misja
              </p>
              <h2 className="mt-3 font-serif text-2xl sm:text-3xl md:text-4xl leading-tight text-[var(--text-primary)]">
                Dokumentujemy historię fotografii
              </h2>
              <p className="mt-4 sm:mt-6 text-sm sm:text-base leading-6 sm:leading-7 text-[var(--text-secondary)]">
                Naszym celem jest stworzenie najpełniejszej bazy wiedzy 
                o aparatach fotograficznych. Wierzymy, że każdy aparat 
                ma swoją historię i zasługuje na udokumentowanie.
              </p>
              <p className="mt-4 text-sm sm:text-base leading-6 sm:leading-7 text-[var(--text-secondary)]">
                Projekt Luma jest zbudowany w oparciu o nowoczesne 
                technologie: Next.js, React i Contentful CMS, 
                co gwarantuje szybkość, bezpieczeństwo i łatwość aktualizacji.
              </p>
            </div>
            
            <InfoCard>
              <div className="p-4 sm:p-6">
                <h3 className="text-lg sm:text-xl font-semibold text-[var(--text-primary)] mb-4">
                  Dlaczego Luma?
                </h3>
                <ul className="space-y-3 sm:space-y-4">
                  <li className="flex gap-3">
                    <Check className="w-5 h-5 text-[var(--accent-primary)] flex-shrink-0" strokeWidth={2.5} />
                    <span className="text-xs sm:text-sm text-[var(--text-secondary)]">
                      Regularnie aktualizowana baza danych
                    </span>
                  </li>
                  <li className="flex gap-3">
                    <Check className="w-5 h-5 text-[var(--accent-primary)] flex-shrink-0" strokeWidth={2.5} />
                    <span className="text-xs sm:text-sm text-[var(--text-secondary)]">
                      Weryfikowane informacje i specyfikacje
                    </span>
                  </li>
                  <li className="flex gap-3">
                    <Check className="w-5 h-5 text-[var(--accent-primary)] flex-shrink-0" strokeWidth={2.5} />
                    <span className="text-xs sm:text-sm text-[var(--text-secondary)]">
                      Intuicyjny interfejs i szybka nawigacja
                    </span>
                  </li>
                  <li className="flex gap-3">
                    <Check className="w-5 h-5 text-[var(--accent-primary)] flex-shrink-0" strokeWidth={2.5} />
                    <span className="text-xs sm:text-sm text-[var(--text-secondary)]">
                      Responsywny design dostosowany do urządzeń mobilnych
                    </span>
                  </li>
                  <li className="flex gap-3">
                    <Check className="w-5 h-5 text-[var(--accent-primary)] flex-shrink-0" strokeWidth={2.5} />
                    <span className="text-xs sm:text-sm text-[var(--text-secondary)]">
                      Zaawansowane filtry i wyszukiwanie
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
              Zacznij eksplorować
            </p>
            <h2 className="mt-3 font-serif text-2xl sm:text-3xl md:text-4xl leading-tight text-[var(--text-primary)]">
              Odkryj świat aparatów fotograficznych
            </h2>
            <p className="mt-4 sm:mt-6 text-sm sm:text-base text-[var(--text-muted)]">
              Przeglądaj kolekcję, porównuj modele i poznaj historie marek, 
              które zdefiniowały fotografię.
            </p>
            
            <div className="mt-6 sm:mt-10 flex flex-col sm:flex-row justify-center flex-wrap gap-3 sm:gap-4">
              <Link
                href="/kolekcja"
                className="rounded-full border border-[var(--accent-primary)] px-6 py-3 text-xs sm:text-sm uppercase tracking-[0.14em] text-[var(--text-primary)] transition hover:bg-[var(--border-default)]"
              >
                Przeglądaj kolekcję
              </Link>

              <Link
                href="/brands"
                className="rounded-full border border-[var(--border-default)] px-6 py-3 text-xs sm:text-sm uppercase tracking-[0.14em] text-[var(--text-secondary)] transition hover:border-[var(--accent-primary)]"
              >
                Zobacz marki
              </Link>
            </div>
          </div>
        </Container>
      </section>
    </main>
  );
}
