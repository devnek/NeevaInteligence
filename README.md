# NeevaIntelligence — Strategic Market Research Portal

A modern Django-based market research portal delivering high-stakes competitive intelligence, strategic analysis, and dynamic report publishing directly from Markdown files.

## Features

- **Dynamic Report Publishing:** Automatically parses and renders Markdown reports from the `reports/` directory with SEO-friendly slugs and clean typography.
- **Unified HTML5 Navigation:** Semantic navigation architecture with active link indicators, smooth scrolling, and complete multi-page connectedness.
- **Breadcrumb Hierarchy:** Structured breadcrumbs across all inner pages (Leadership, Intelligence Archive, Report Detail).
- **Mobile Responsive Navigation:** Accessible hamburger navigation drawer with keyboard support (`Escape`) and automatic scroll locking.
- **Dark/Light Theme Engine:** Persistent color scheme switching with CSS custom properties (`localStorage` + `prefers-color-scheme`).
- **Lead Generation / Consultation:** Built-in contact form allowing prospective clients to initiate strategic consultations.
- **Clean Architecture & Modern CSS:** Zero inline styles, pure CSS styling with CSS variables, modern grid, flexbox, and fluid typography (`clamp`).

## Tech Stack

- **Backend:** Python 3, Django 6.x
- **Markdown Rendering:** `markdown`
- **Asset Management:** WhiteNoise (production-grade static serving)
- **Database:** SQLite (default)
- **Frontend:** Semantic HTML5, Vanilla JavaScript, CSS3 Custom Properties

## Prerequisites

- Python 3.10+
- `pip` / `virtualenv`

## Installation & Setup

1. **Clone the repository:**
   ```bash
   git clone https://github.com/devnek/NeevaInteligence.git
   cd NeevaInteligence
   ```

2. **Create and activate a virtual environment:**
   ```bash
   python3 -m venv .venv
   source .venv/bin/activate  # On Windows: .venv\Scripts\activate
   ```

3. **Install dependencies:**
   ```bash
   pip install -r requirements.txt
   ```

4. **Apply database migrations:**
   ```bash
   python manage.py migrate
   ```

5. **Collect static assets:**
   ```bash
   python manage.py collectstatic --noinput
   ```

6. **Start the development server:**
   ```bash
   python manage.py runserver
   ```

Access the portal at `http://127.0.0.1:8000/`.

## Key Routes

- **Home (`/`):** Strategic hero, service overview, featured intelligence previews, and consultation form.
- **Intelligence Archive (`/intelligence/`):** Full catalog of published market reports.
- **Report Detail (`/intelligence/<slug>/`):** Rendered deep-dive analysis with back navigation and consultation CTAs.
- **Leadership (`/leadership/`):** Executive bio, analytical credentials, and research philosophy.
- **Admin Panel (`/admin/`):** Administrative portal for message submissions.

## Publishing Reports

To add a new report, create a `.md` file inside the `reports/` folder:

```markdown
# Report Title Here

A concise executive summary paragraph that will automatically appear in intelligence previews and card listings.

## Key Market Findings
- Point 1
- Point 2
```

The filename (e.g. `emerging_ev_market_india.md`) automatically defines the report's URL slug (`/intelligence/emerging_ev_market_india/`).

## Project Layout

```text
research_portal/
├── core/                   # Main Django app
│   ├── static/core/        # Stylesheets (CSS), Scripts (JS), and Images
│   ├── templates/core/     # Reusable HTML5 templates (base.html, index, etc.)
│   ├── models.py           # ContactMessage data model
│   ├── views.py            # Route controllers & markdown parser
│   └── urls.py             # App route declarations
├── portal_config/          # Project settings & WSGI/ASGI configuration
├── reports/                # Markdown report repository
├── manage.py               # Django CLI management script
├── requirements.txt        # Python dependency manifest
└── .gitignore              # Git ignore rules
```
