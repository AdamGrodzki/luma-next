# 📸 Luma — Camera Encyclopedia

Nowoczesna aplikacja webowa do eksplorowania aparatów i marek fotograficznych, zbudowana w oparciu o **Next.js** i **Contentful**.

---

## ✨ Funkcje

* 🔎 Przeglądanie aparatów według:

  * marki
  * typu
  * sensora
* 🎯 Zaawansowane filtrowanie i sortowanie
* 🧠 Wyszukiwarka (full-text search)
* 🏷️ Strony detali:

  * aparatów
  * marek
* 🧩 Grupowanie aparatów według sensora
* ⚡ ISR (Incremental Static Regeneration)
* 🖼️ Integracja z Contentful (headless CMS)
* 🎨 Spójny dark UI

---

## 🧱 Stack technologiczny

* **Next.js (App Router)**
* **TypeScript**
* **Tailwind CSS**
* **Contentful**
* **ISR / SSG**

---

## 🚀 Getting Started

### 1. Klon repo

```bash
git clone https://github.com/your-username/luma.git
cd luma
```

### 2. Instalacja zależności

```bash
npm install
# lub
yarn
# lub
pnpm install
```

### 3. Konfiguracja środowiska

Utwórz plik:

```bash
.env.local
```

Dodaj:

```env
CONTENTFUL_SPACE_ID=your_space_id
CONTENTFUL_ACCESS_TOKEN=your_access_token
```

---

### 4. Uruchomienie

```bash
npm run dev
```

Aplikacja będzie dostępna pod:

```bash
http://localhost:3000
```

---

## 🗂️ Struktura projektu

```bash
src/
├── app/
│   ├── page.tsx              # Homepage
│   ├── kolekcja/             # Kolekcja + filtrowanie
│   ├── cameras/              # Lista + detale aparatów
│   ├── brands/               # Lista + detale marek
│   ├── loading.tsx
│   ├── error.tsx
│   └── not-found.tsx
│
├── components/
│   ├── collection/           # UI kolekcji
│   ├── home/                 # Sekcje homepage
│   └── ui/                   # Komponenty wielokrotnego użytku
│
├── lib/
│   └── contentful/           # API + mapowanie danych
│
└── types/
    └── contentful.ts
```

---

## 🔌 Contentful — model danych

### Brand

* name
* slug
* country
* foundedYear
* description
* logo

### Camera

* name
* slug
* brand (reference)
* cameraType
* sensorFormat
* mount
* releaseYear
* description
* heroImage
* gallery

---

## 🧠 Architektura

* Server Components do pobierania danych
* Client Components dla interakcji (filtry, drawers)
* Mapowanie danych CMS → UI
* ISR (`revalidate = 60`) dla wydajności

---

## 🎨 UI / UX

* Dark-first design
* Typografia serif dla nagłówków
* System kart (`InfoCard`, `CameraCard`)
* Responsywność (mobile drawers)
* Custom loading screens

---

## 📦 Deployment

Najprostszy sposób:

👉 Vercel

[https://vercel.com](https://vercel.com)

Lub lokalnie:

```bash
npm run build
npm start
```

---

## 📈 Możliwe rozszerzenia

* 🔍 Live search (debounce)
* 📊 Porównywarka aparatów
* ❤️ Ulubione (localStorage)
* 📑 Paginacja / infinite scroll
* 🧭 Breadcrumbs
* 🌐 i18n

---

## 👤 Autor

Projekt wykonany jako część portfolio frontendowego Adam Grodzki.

---

## 🌍 Demo (opcjonalnie)

[https://your-app.vercel.app](https://your-app.vercel.app)

---

## 🖼️ Preview (opcjonalnie)

Dodaj screenshoty do folderu `public/screens` i podlinkuj tutaj.
