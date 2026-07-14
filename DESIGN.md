# Design System Inspired by Longbridge Developers

## 1. Visual Theme & Atmosphere

The Longbridge Developers design system embodies a modern, tech-forward aesthetic built for financial developers and API integrators. It combines clean minimalism with vibrant accent colors that convey innovation and precision. The visual language prioritizes clarity and efficiency, with generous whitespace and a carefully curated color palette that distinguishes interactive elements from informational content. The system balances professional sophistication with approachable warmth, making complex financial data and developer tools feel accessible and well-organized.

**Key Characteristics**

- Minimalist, developer-centric aesthetic with emphasis on clarity
- Bright, energetic accent colors (turquoise and coral) against neutral foundations
- Generous whitespace and breathing room between content zones
- Crisp, high-contrast typography for scannability
- Smooth, subtle interactions without unnecessary ornamentation
- Cards and contained layouts as primary organizational pattern
- Data-forward design that emphasizes information hierarchy

## 2. Color Palette & Roles

### Primary

- **Brand Teal** (`#00ADA2`): Primary brand accent for headings, key features, and brand identity
- **Teal Vibrant** (`#00F0C4`): Highlight and call-to-action accents for interactive elements
- **Teal Secondary** (`#00B8B8`): Secondary brand accent for supporting UI elements

### Accent Colors

- **Coral Pink** (`#F7415F`): Secondary accent for emphasis and highlighting alternative CTAs
- **Coral Bright** (`#FF3A75`): Vibrant accent for interactive states and notifications
- **Warm Orange** (`#FF9728`): Warning state indicator for cautionary messaging

### Interactive

- **Error Red** (`#FF3A3A`): Error states, validation failures, and destructive actions
- **Success Teal** (`#00B8B8`): Confirmation and success state indicators

### Neutral Scale

- **Dark Navy** (`#0A0E19`): Darkest text and high-contrast backgrounds
- **Dark Charcoal** (`#3C3C43`): Primary text color for body content
- **Medium Gray** (`#82888D`): Secondary text for muted descriptions
- **Light Gray** (`#9D9FA3`): Tertiary text for captions and meta information

### Surface & Borders

- **Pure White** (`#FFFFFF`): Primary background for cards and content areas
- **Off White** (`#F5F6F6`): Secondary background for subtle differentiation
- **Pale Gray** (`#F3F5F6`): Tertiary background for stacked content
- **Very Light Gray** (`#FAFAFA`): Minimal background variation
- **Border Light** (`#EAEBEC`): Default border color for cards and dividers
- **Jet Black** (`#000000`): Maximum contrast for critical elements

## 3. Typography Rules

### Font Family

**Primary:** Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", "Helvetica Neue", sans-serif

**Secondary/Code:** JetBrains Mono, ui-monospace, Menlo, Monaco, "Courier New", monospace

### Hierarchy

| Role            | Font           | Size   | Weight | Line Height | Letter Spacing | Notes                             |
| --------------- | -------------- | ------ | ------ | ----------- | -------------- | --------------------------------- |
| Display / H1    | Inter          | 72px   | 600    | 75.6px      | 0px            | Hero headlines, page titles       |
| Heading / H2    | Inter          | 36px   | 600    | 39.6px      | 0px            | Section headings, major divisions |
| Subheading / H3 | Inter          | 19px   | 700    | 23.75px     | 0px            | Card titles, feature headlines    |
| Label / H5      | Inter          | 12px   | 600    | 24px        | 0px            | Section labels, badge text        |
| Body Regular    | Inter          | 16px   | 400    | 27.2px      | 0px            | Primary body text, descriptions   |
| Body Small      | Inter          | 13.5px | 400    | 24px        | 0px            | Secondary text, captions          |
| Link / CTA      | Inter          | 15px   | 700    | 24px        | 0px            | Primary links and call-to-actions |
| Button Text     | Inter          | 14px   | 500    | 20px        | 0px            | Button labels and inline actions  |
| Code Inline     | JetBrains Mono | 11px   | 400    | 11px        | 0px            | Inline code snippets              |
| Code Block      | JetBrains Mono | 12.5px | 400    | 19.375px    | 0px            | Code blocks and terminal output   |
| Code Large      | ui-monospace   | 16px   | 400    | 24px        | 0px            | Large code blocks, command lines  |

### Principles

- Use weight 600+ for all headings to establish clear information hierarchy
- Maintain consistent line-height ratios (1.05–1.7x font size) for readability
- Reserve weight 700 for emphasis within body text and link destinations
- Body text defaults to weight 400 for optimal legibility at 16px
- Code uses monospace fonts exclusively for terminal, CLI, and technical contexts
- All typography uses 0px letter spacing unless context requires additional clarity

## 4. Component Stylings

### Buttons

**Button / Primary**

- **Background:** `rgb(0, 0, 0)` (`#000000`)
- **Text Color:** `rgb(255, 255, 255)` (`#FFFFFF`)
- **Font Size:** `14px`
- **Font Weight:** `500`
- **Font Family:** Inter
- **Padding:** `12px 24px`
- **Border Radius:** `999px`
- **Border:** `none`
- **Height:** `44px`
- **Line Height:** `20px`
- **Box Shadow:** `rgba(15, 17, 21, 0.04) 0px 1px 2px 0px, rgba(15, 17, 21, 0.04) 0px 0px 0px 1px`
- **Hover State:** Background `rgb(40, 40, 40)`; Box Shadow `rgba(15, 17, 21, 0.08) 0px 2px 4px 0px`
- **Active State:** Background `rgb(20, 20, 20)`

**Button / Secondary**

- **Background:** `rgb(243, 245, 246)` (`#F3F5F6`)
- **Text Color:** `rgb(60, 60, 67)` (`#3C3C43`)
- **Font Size:** `14px`
- **Font Weight:** `500`
- **Font Family:** Inter
- **Padding:** `10px 20px`
- **Border Radius:** `8px`
- **Border:** `1px solid rgb(234, 235, 236)` (`#EAEBEC`)
- **Height:** `40px`
- **Line Height:** `20px`
- **Box Shadow:** none
- **Hover State:** Background `rgb(235, 237, 238)`; Border `1px solid rgb(220, 222, 224)`
- **Active State:** Background `rgb(225, 227, 228)`

**Button / Ghost**

- **Background:** `transparent`
- **Text Color:** `rgb(10, 14, 25)` (`#0A0E19`)
- **Font Size:** `14px`
- **Font Weight:** `500`
- **Font Family:** Inter
- **Padding:** `8px 16px`
- **Border Radius:** `8px`
- **Border:** `1px solid transparent`
- **Height:** `32px`
- **Line Height:** `20px`
- **Box Shadow:** none
- **Hover State:** Background `rgba(0, 0, 0, 0.04)`; Border `1px solid rgb(234, 235, 236)`
- **Active State:** Background `rgba(0, 0, 0, 0.08)`

**Button / Icon**

- **Background:** `transparent`
- **Text Color:** `rgb(108, 110, 117)` (`#6C6E75`)
- **Font Size:** `16px`
- **Font Weight:** `400`
- **Font Family:** Inter
- **Padding:** `8px`
- **Border Radius:** `8px`
- **Border:** `none`
- **Height:** `32px`
- **Width:** `32px`
- **Line Height:** `24px`
- **Box Shadow:** none
- **Hover State:** Background `rgba(0, 0, 0, 0.04)`; Text Color `rgb(60, 60, 67)`
- **Active State:** Background `rgba(0, 0, 0, 0.08)`

### Cards & Containers

**Card / Default**

- **Background:** `rgb(255, 255, 255)` (`#FFFFFF`)
- **Text Color:** `rgb(10, 14, 25)` (`#0A0E19`)
- **Font Size:** `16px`
- **Font Weight:** `400`
- **Font Family:** Inter
- **Padding:** `28px 24px`
- **Border Radius:** `16px`
- **Border:** `1px solid rgb(234, 235, 236)` (`#EAEBEC`)
- **Box Shadow:** none
- **Line Height:** `24px`
- **Hover State:** Border `1px solid rgb(220, 222, 224)`; Box Shadow `0px 2px 8px rgba(0, 0, 0, 0.04)`

**Card / Feature**

- **Background:** `rgb(255, 255, 255)` (`#FFFFFF`)
- **Text Color:** `rgb(10, 14, 25)` (`#0A0E19`)
- **Font Size:** `16px`
- **Font Weight:** `400`
- **Font Family:** Inter
- **Padding:** `24px`
- **Border Radius:** `16px`
- **Border:** `1px solid rgb(234, 235, 236)` (`#EAEBEC`)
- **Box Shadow:** none
- **Line Height:** `24px`

**Card / Badge Label**

- **Background:** `transparent`
- **Text Color:** `rgb(0, 184, 184)` (`#00B8B8`)
- **Font Size:** `11.5px`
- **Font Weight:** `700`
- **Font Family:** Inter
- **Padding:** `0px`
- **Border Radius:** `0px`
- **Border:** none
- **Line Height:** `12px`
- **Margin Bottom:** `14px`
- **Use Case:** Category labels above card titles (e.g., "AI SKILL", "CLI")

### Inputs & Forms

**Input / Text Default**

- **Background:** `rgb(255, 255, 255)` (`#FFFFFF`)
- **Text Color:** `rgb(60, 60, 67)` (`#3C3C43`)
- **Font Size:** `14px`
- **Font Weight:** `400`
- **Font Family:** Inter
- **Padding:** `10px 12px`
- **Border Radius:** `8px`
- **Border:** `1px solid rgb(234, 235, 236)` (`#EAEBEC`)
- **Height:** `36px`
- **Line Height:** `20px`
- **Box Shadow:** none
- **Placeholder Color:** `rgb(130, 136, 141)` (`#82888D`)
- **Focus State:** Border `1px solid rgb(0, 173, 162)` (`#00ADA2`); Box Shadow `0px 0px 0px 3px rgba(0, 173, 162, 0.1)`

**Input / Search**

- **Background:** `rgb(245, 246, 246)` (`#F5F6F6`)
- **Text Color:** `rgb(60, 60, 67)` (`#3C3C43`)
- **Font Size:** `14px`
- **Font Weight:** `400`
- **Font Family:** Inter
- **Padding:** `10px 12px`
- **Border Radius:** `8px`
- **Border:** `1px solid transparent`
- **Height:** `36px`
- **Line Height:** `20px`
- **Placeholder Color:** `rgb(130, 136, 141)` (`#82888D`)
- **Focus State:** Border `1px solid rgb(0, 173, 162)` (`#00ADA2`)

### Navigation

**Navigation / Header**

- **Background:** `color(srgb 1 1 1 / 0.8)` (semi-transparent white with backdrop blur)
- **Text Color:** `rgb(10, 14, 25)` (`#0A0E19`)
- **Font Size:** `16px`
- **Font Weight:** `400`
- **Font Family:** Inter
- **Padding:** `0px 24px`
- **Border Radius:** `0px`
- **Height:** `60px`
- **Line Height:** `24px`
- **Border Bottom:** `1px solid rgb(234, 235, 236)` (`#EAEBEC`)
- **Box Shadow:** none
- **Backdrop Filter:** `blur(10px)`

**Navigation / Link**

- **Text Color:** `rgb(10, 14, 25)` (`#0A0E19`)
- **Font Size:** `15px`
- **Font Weight:** `700`
- **Font Family:** Inter
- **Padding:** `0px 16px`
- **Height:** `24px`
- **Line Height:** `24px`
- **Hover State:** Text Color `rgb(0, 173, 162)` (`#00ADA2`)
- **Active State:** Text Color `rgb(0, 173, 162)` (`#00ADA2`); Border Bottom `2px solid rgb(0, 173, 162)`

**Navigation / Dropdown Trigger**

- **Background:** `transparent`
- **Text Color:** `rgb(10, 14, 25)` (`#0A0E19`)
- **Font Size:** `15px`
- **Font Weight:** `500`
- **Font Family:** Inter
- **Padding:** `8px 12px`
- **Border Radius:** `6px`
- **Border:** none
- **Height:** `32px`
- **Line Height:** `24px`
- **Hover State:** Background `rgba(0, 0, 0, 0.04)`

### Badges & Tags

**Badge / Inline**

- **Background:** `rgb(245, 246, 246)` (`#F5F6F6`)
- **Text Color:** `rgb(82, 88, 93)` (`#525C5D`)
- **Font Size:** `12px`
- **Font Weight:** `600`
- **Font Family:** Inter
- **Padding:** `4px 8px`
- **Border Radius:** `4px`
- **Border:** `1px solid rgb(234, 235, 236)` (`#EAEBEC`)
- **Line Height:** `16px`

**Badge / Status**

- **Background:** `rgba(0, 173, 162, 0.1)` (teal with opacity)
- **Text Color:** `rgb(0, 173, 162)` (`#00ADA2`)
- **Font Size:** `11px`
- **Font Weight:** `600`
- **Font Family:** Inter
- **Padding:** `4px 8px`
- **Border Radius:** `4px`
- **Border:** none
- **Line Height:** `16px`

## 5. Layout Principles

### Spacing System

Base unit: `4px`

**Scale with contexts:**

- `4px`: Micro spacing within components (icon padding, tight gaps)
- `8px`: Small gaps between inline elements
- `12px`: Button label padding, form input padding
- `16px`: Default component padding, standard gap between elements
- `20px`: Card padding, section padding
- `24px`: Card padding (default), container padding
- `28px`: Large card padding, section separation
- `32px`: Medium section gap, grid gutters
- `36px`: Large margin between sections
- `40px`: Extra-large margin for major section breaks
- `48px`: Spacing between major content zones
- `56px`: Maximum spacing for visual separation between distinct sections

### Grid & Container

- **Max Width:** `1200px` (for main content containers)
- **Container Padding:** `24px` on desktop, `16px` on tablet, `12px` on mobile
- **Grid Columns:** 12-column grid system
- **Gutter:** `32px` (desktop), `24px` (tablet), `16px` (mobile)
- **Feature Cards:** 3 columns on desktop (responsive to 2 on tablet, 1 on mobile)
- **Section Patterns:** Hero full-width, features in grid, footer full-width

### Whitespace Philosophy

The design system embraces substantial whitespace to reduce cognitive load and emphasize content hierarchy. Large margins (48px+) separate major content sections, creating visual breathing room. Card-based layouts are separated by 32px gaps, allowing each element to occupy distinct visual territory. Within cards, 24–28px padding creates internal whitespace that prevents content crowding. Typography relies on line-height multiples (1.5–1.7x) rather than aggressive line-spacing, keeping text dense yet readable. The overall approach prioritizes clarity through space, not through visual noise.

### Border Radius Scale

- `4px`: Small badges, micro UI elements
- `5px`: Variant radius for select components
- `8px`: Buttons (secondary, ghost, icon), input fields, navigation dropdowns
- `16px`: Cards, containers, feature sections
- `20px`: Large button variants (when used)
- `999px`: Fully rounded buttons (primary CTA, pill-shaped elements)

## 6. Depth & Elevation

| Level             | Treatment                                                                    | Use                                           |
| ----------------- | ---------------------------------------------------------------------------- | --------------------------------------------- |
| **Flat (L0)**     | No shadow, `1px solid rgb(234, 235, 236)` border                             | Default cards, containers, neutral surfaces   |
| **Raised (L1)**   | `0px 1px 2px rgba(15, 17, 21, 0.04), 0px 0px 0px 1px rgba(15, 17, 21, 0.04)` | Button hover, subtle elevation                |
| **Elevated (L2)** | `0px 2px 8px rgba(0, 0, 0, 0.04), 0px 0px 0px 1px rgba(15, 17, 21, 0.04)`    | Card hover, dropdown menus, floating elements |
| **High (L3)**     | `0px 4px 16px rgba(0, 0, 0, 0.08), 0px 0px 0px 1px rgba(15, 17, 21, 0.08)`   | Modals, tooltips, top-level overlays          |
| **Modal (L4)**    | `0px 8px 32px rgba(0, 0, 0, 0.12)`                                           | Full-screen modals, critical overlays         |

**Shadow Philosophy:** The design system uses subtle, restrained shadows that enhance hierarchy without dominating the interface. All shadows employ low-opacity black (`rgba(15, 17, 21, 0.04–0.12)`) to maintain visual softness. Shadows increase with elevation level, creating a clear sense of layering. Most UI elements remain flat (L0) to preserve minimalist aesthetics; shadows are reserved for interactive states and floating containers that need clear separation from the background.

## 7. Do's and Don'ts

### Do

- **Use teal (`#00ADA2`) as primary accent** for all primary CTAs, brand highlights, and interactive states
- **Maintain 24–28px padding in cards** to ensure content breathes and remains scannable
- **Use weight 600+ for all headings** to establish clear visual hierarchy
- **Pair primary buttons with pill-shaped radius (`999px`)** to emphasize primary actions
- **Apply subtle shadows (L1–L2) only on hover and elevated states** to reduce cognitive load
- **Use Inter font exclusively for UI text** for consistency and clarity
- **Reserve coral pink (`#F7415F`) for secondary CTAs** to provide visual distinction
- **Stack feature cards in 3-column grid** on desktop for balanced information layout
- **Use badge labels (`#00B8B8` color) above card titles** to categorize and organize content
- **Implement 40–48px vertical spacing** between major content sections for clear delineation
- **Use monospace fonts (JetBrains Mono or ui-monospace) exclusively for code** to signal technical content
- **Apply border color `#EAEBEC` to all card and input borders** for visual consistency

### Don't

- **Don't use shadows on default card state** — reserve shadows for hover and elevated states only
- **Don't apply border radius > 16px to cards** — maintain professional appearance with controlled roundness
- **Don't use opacity < 0.8 for text** — ensure all body text meets WCAG contrast ratios
- **Don't mix serif and sans-serif fonts** in the same content area
- **Don't place interactive elements without 8px minimum padding** — ensure touch targets remain accessible
- **Don't use `#FF3A3A` (error red) for non-critical messaging** — reserve for validation failures and destructive actions
- **Don't exceed 1200px container width** on desktop — maintain readability and visual balance
- **Don't reduce font size below 12px** for body text (code is exception)
- **Don't use full-opacity black (`#000000`) for body text** — use `#3C3C43` for softer, more accessible contrast
- **Don't apply more than 1px borders** to UI elements — maintain crisp, minimal aesthetics
- **Don't use more than 2 accent colors** in a single interface section
- **Don't create custom button shapes** — stick to 8px, 16px, or 999px border radius values

## 8. Responsive Behavior

### Breakpoints

| Name        | Width         | Key Changes                                                                                                        |
| ----------- | ------------- | ------------------------------------------------------------------------------------------------------------------ |
| **Mobile**  | 320px–639px   | Single-column grid, 12px container padding, 16px gap between elements, font sizes reduced 10–12%, full-width cards |
| **Tablet**  | 640px–1023px  | 2-column card grid, 16px container padding, 24px gap, 80% of desktop font sizes                                    |
| **Desktop** | 1024px–1439px | 3-column card grid, 24px container padding, 32px gap, full typography scale                                        |
| **Wide**    | 1440px+       | Max 1200px container width centered, 48px side padding, full spacing scale                                         |

### Touch Targets

- **Minimum Height/Width:** `44px` for interactive elements (buttons, links, icon buttons)
- **Minimum Padding:** `8px` on each side of button text
- **Link Tap Area:** `36px` minimum height for text links
- **Icon Button Size:** `32px` × `32px` minimum with `8px` internal padding
- **Spacing Between Targets:** `8px` minimum to prevent accidental activation

### Collapsing Strategy

- **Navigation:** Desktop horizontal menu → tablet dropdown menu → mobile hamburger menu at 640px
- **Feature Cards:** 3 columns (desktop) → 2 columns (tablet) → 1 column (mobile)
- **Padding:** 24px (desktop) → 16px (tablet) → 12px (mobile)
- **Typography:** Full scale (desktop) → 90% scale (tablet) → 85% scale (mobile)
- **Spacing Between Sections:** 48px (desktop) → 36px (tablet) → 24px (mobile)
- **Container Width:** 100% width on mobile, constrained to 1200px on desktop
- **Hero Section:** Full-width image + text stack on mobile, side-by-side on desktop
- **Grid Gaps:** 32px (desktop) → 24px (tablet) → 16px (mobile)
- **Modals:** Full-screen on mobile, centered with 16px margin on tablet/desktop

## 9. Agent Prompt Guide

### Quick Color Reference (Light Mode)

- **Primary CTA:** Brand Teal (`#00ADA2`)
- **Primary Button Background:** Jet Black (`#000000`)
- **Secondary Button Background:** Pale Gray (`#F3F5F6`)
- **Card Background:** Pure White (`#FFFFFF`)
- **Card Border:** Border Light (`#ECEDEE`)
- **Body Text:** Dark Charcoal (`#3C3C43`)
- **Heading Text:** Dark Navy (`#0A0E19`)
- **Secondary Text:** Medium Gray (`#67676C`)
- **Tertiary Text:** Light Gray (`#929295`)
- **Error State:** Error Red (`#FF3A3A`)
- **Warning State:** Warm Orange (`#FF9728`)
- **Success State:** Success Teal (`#00B8B8`)
- **Accent Highlight:** Teal Vibrant (`#00F0C4`)
- **Navigation Background:** Semi-transparent White (`rgba(255, 255, 255, 0.8)`)
- **Link Hover / Brand:** Brand Teal (`#00ADA2`)

### Quick Color Reference (Dark Mode)

- **Page Background:** Dark Navy (`#0A0E19`)
- **Surface / Elevated Background:** Dark Navy Deep (`#13182A`)
- **Higher Elevation:** Dark Elevated (`#202127`)
- **Alt Background:** Dark Alt (`#161A26`)
- **Primary Button Background:** White (`#FFFFFF`) with Black text (`#000000`)
- **Secondary Button Background:** `rgba(80, 80, 80, 0.5)` with light text (`#D1D5DB`)
- **Card Background:** Dark Navy Deep (`#13182A`)
- **Card Border:** Dark Border (`#3C3F44`)
- **Body Text:** Warm Off-White (`#DFDFD6`)
- **Secondary Text:** Muted Gray (`#98989F`)
- **Tertiary Text:** Dim Gray (`#6A6A71`)
- **Brand / Accent:** Bright Teal (`#00F0C4`)
- **Secondary Brand:** Teal Mid (`#32EADC`)
- **Divider:** `rgba(255, 255, 255, 0.06)`
- **Navigation Background:** `rgba(10, 14, 25, 0.8)` with `saturate(1.8) blur(20px)`

### Iteration Guide

1. **All typography uses Inter font family** except code blocks, which use JetBrains Mono or ui-monospace exclusively. Maintain exact px sizes from the hierarchy table.

2. **Primary buttons must have 999px border radius** (fully rounded), black background / white text in light mode, white background / black text in dark mode. Padding `12px 24px`, height `44px`.

3. **Cards must have `1px solid #ECEDEE` border** (light) or `1px solid #3C3F44` (dark), `16px` border radius, `24–28px` padding. Background `#FFFFFF` light / `#13182A` dark. Apply L2 shadow only on hover.

4. **Navigation bar is semi-transparent** with backdrop blur. Light: `rgba(255,255,255,0.8)` + `saturate(1.8) blur(20px)`. Dark: `rgba(10,14,25,0.8)` + same blur. Border-bottom: `1px solid` divider color.

5. **Feature cards in 3-column grid** (desktop, responsive to 2 columns tablet, 1 column mobile) with 32px gap. Each card contains a category label (`#00B8B8` light / `#00F0C4` dark, weight 700, 11.5px) above the title.

6. **Spacing scale:** Use multiples of 4px (4, 8, 12, 16, 20, 24, 28, 32, 36, 40, 48, 56). Standard section gap is 48px; card padding is 24px; button padding is 12px horizontal.

7. **Input fields have `36px` height**, `10px 12px` padding, `8px` border radius, `1px solid #EAEBEC` border. Focus state adds `3px` teal outline (`rgba(0, 173, 162, 0.1)`).

8. **Shadows are subtle and restrained:** Use `rgba(15, 17, 21, 0.04)` for L1 (button hover), `rgba(0, 0, 0, 0.04)` for L2 (card hover), `rgba(0, 0, 0, 0.08)` for L3 (modals). Never apply shadows to flat (default) states.

9. **Headings are always weight 600+:** H1 at 72px, H2 at 36px, H3 at 19px. Body text defaults to 16px weight 400. Links are 15px weight 700.

10. **Error/warning/success states:** Use `#FF3A3A` (error), `#FF9728` (warning), `#00B8B8` (success). Apply as text color with light background tint (10% opacity).

11. **Border radius hierarchy:** 4px for badges, 8px for buttons/inputs, 16px for cards, 999px for primary buttons only.

12. **Accessibility priority:** All text must meet WCAG AA contrast (4.5:1). Use `#3C3C43` not black for body text in light mode; use `#DFDFD6` not pure white in dark mode. Minimum font size is 12px except for captions.

---

## 10. Dark Mode Design System

The site supports full light/dark switching via a manual toggle (`.lb-dark` class on `<html>`). Dark mode is **not** a simple color inversion — it uses a distinct color system designed for low-light readability and the financial data context.

### Dark Mode Surfaces

Dark mode uses a layered surface system to communicate elevation without shadows:

| Layer              | Token               | Value       | Use Case                                 |
| ------------------ | ------------------- | ----------- | ---------------------------------------- |
| **Page Base**      | `--lb-d-bg-1`       | `#0A0E19`   | Page background, sidebar, nav backdrop   |
| **Elevated**       | `--vp-c-bg-soft`    | `#13182A`   | Cards, dropdowns, code blocks            |
| **Higher Elev.**   | `--vp-c-bg-elv`     | `#202127`   | Modals, popovers, floating panels        |
| **Alt Surface**    | `--vp-c-bg-alt`     | `#161A26`   | Table rows, alternate section backgrounds |
| **AI Section BG**  | `--lb-ai-brand-bg`  | `#09252A`   | AI/Skill feature section background      |
| **AI Card BG**     | `--lb-ai-card-bg`   | `#203A3F`   | Cards within AI feature sections         |

### Dark Mode Text

| Role          | Token              | Value      | Use Case                     |
| ------------- | ------------------ | ---------- | ---------------------------- |
| **Primary**   | `--vp-c-text-1`    | `#DFDFD6`  | Body text, headings          |
| **Secondary** | `--vp-c-text-2`    | `#98989F`  | Captions, metadata           |
| **Tertiary**  | `--vp-c-text-3`    | `#6A6A71`  | Placeholders, disabled text  |

Note: Primary text is warm off-white (`#DFDFD6`), **not pure white**. Pure white is reserved for button labels and maximum-contrast elements only.

### Dark Mode Brand Colors

The brand teal becomes brighter in dark mode to maintain contrast against dark backgrounds:

| Role                 | Light Mode  | Dark Mode   |
| -------------------- | ----------- | ----------- |
| **Brand Primary**    | `#00B8B8`   | `#00F0C4`   |
| **Brand Secondary**  | `#1AC7C7`   | `#32EADC`   |
| **Brand Tertiary**   | `#33CDCD`   | `#2ED4C7`   |

### Dark Mode Borders & Dividers

- **Border:** `#3C3F44` — used for card borders, input borders, table dividers
- **Divider:** `rgba(255, 255, 255, 0.06)` — subtle separator lines between sections
- **Focus ring:** `rgba(0, 240, 196, 0.15)` — teal with lower opacity for dark backgrounds

### Dark Mode Buttons

Primary button **inverts** in dark mode — white background with black text:

**Button / Primary (Dark)**
- **Background:** `#FFFFFF`
- **Text Color:** `#000000`
- **Border Radius:** `999px`
- **Padding:** `12px 24px`
- **Height:** `44px`
- **Hover:** Background `#E8E8E8`

**Button / Secondary (Dark)**
- **Background:** `rgba(80, 80, 80, 0.5)`
- **Text Color:** `#D1D5DB`
- **Border Radius:** `8px`
- **Border:** `1px solid rgba(255, 255, 255, 0.12)`
- **Hover:** Background `rgba(80, 80, 80, 0.7)`

**Button / Ghost (Dark)**
- **Background:** `transparent`
- **Text Color:** `#DFDFD6`
- **Border:** `1px solid transparent`
- **Hover:** Background `rgba(255, 255, 255, 0.06)`; Border `1px solid #3C3F44`

### Dark Mode Cards

**Card / Default (Dark)**
- **Background:** `#13182A`
- **Border:** `1px solid #3C3F44`
- **Border Radius:** `16px`
- **Padding:** `24–28px`
- **Text:** `#DFDFD6`
- **Hover:** Border `1px solid #4F5260`; subtle glow `0px 2px 8px rgba(0, 240, 196, 0.06)`

### Dark Mode Navigation

**Navigation / Header (Dark)**
- **Background:** `rgba(10, 14, 25, 0.8)`
- **Backdrop Filter:** `saturate(1.8) blur(20px)`
- **Border Bottom:** `1px solid rgba(255, 255, 255, 0.06)`
- **Text Color:** `#DFDFD6`
- **Active Link:** `#00F0C4`

### Dark Mode Docs Sidebar

- **Background:** `#0A0E19` (same as page, no surface lift)
- **Active Item Background:** `rgba(0, 240, 196, 0.08)`
- **Active Item Text:** `#00F0C4`
- **Inactive Item Text:** `#98989F`
- **Section Heading:** `#6A6A71` (uppercase, weight 600, 11px)

### AI / Skill Feature Section (Dark Treatment)

The AI and Skill product sections use a special deep teal surface to create visual distinction:

- **Section Background:** `#09252A` (deep dark teal)
- **Card Background within Section:** `#203A3F`
- **Accent / Link Color in Section:** `#00F0C4`
- **Text on dark teal:** `#DFDFD6` (primary) / `#98989F` (secondary)
- This treatment appears on the homepage AI Skill showcase and the `/skill` hero

---

## 11. Hero Section Patterns

### Homepage Hero (Light Mode)

The hero uses a **FlickeringGrid** canvas background with layered gradients:

- **Canvas dot color:** `color(srgb 0.039 0.055 0.098 / 0.28)` — subtle dark navy dots on white
- **Vignette layer:** `radial-gradient(55% 50%, rgba(255,255,255,0.3) 0%, transparent 60%)` — center brightening
- **Horizon fade:** `linear-gradient(to top, rgba(255,255,255,0.92) 0%, transparent 100%)` — fades to white at bottom
- **Overall effect:** Light animated dot grid fading into clean white content area

### Homepage Hero (Dark Mode)

- **Page Background:** `#0A0E19` — solid dark navy, no gradient
- **Canvas dot color:** lighter dots against dark background (same grid pattern, inverted contrast)
- **Teal accent headline:** the second line of the H1 uses `#00F0C4` (bright brand teal)

### Skill / Sub-page Hero

- Same gradient/grid pattern as homepage hero
- Title splits into **white** (first part) + **brand teal** (key phrase) in dark mode
- `AI · SKILL` breadcrumb label above: teal dot + teal/muted text, 11px, weight 700

### Pricing Hero

- Same hero pattern with center-aligned layout
- Title: bold black/white + teal colored emphasis phrase
- No stat counters; leads directly into pricing cards below

---

## 12. Financial Data Colors

Financial data display (quotes, P&L, price changes) uses a dedicated semantic color set distinct from the general UI palette:

### Market Data Semantic Colors

| State         | Token              | Light Value | Dark Value  | Use Case                          |
| ------------- | ------------------ | ----------- | ----------- | --------------------------------- |
| **Up / Gain** | `--up-color`       | `#00ADA2`   | `#00ADA2`   | Positive price change, portfolio gain |
| **Down / Loss** | `--down-color`   | `#FF3A75`   | `#FF3A75`   | Negative price change, loss       |
| **Neutral**   | `--vp-c-text-2`    | `#67676C`   | `#98989F`   | Unchanged price, flat indicators  |
| **Warning**   | `--brand-color-3`  | `#FF9728`   | `#FF9728`   | Alert thresholds, cautionary data |

### Usage Rules for Financial Data

- **Up color (`#00ADA2`)** is used for positive percentage changes, green candles, portfolio gains. Use as text color; never as background.
- **Down color (`#FF3A75`)** is a coral-pink (not red) to distinguish from error states (`#FF3A3A`). Use for negative changes, red candles, losses.
- **Never use `#FF3A3A` (Error Red) for market losses** — it signals a system error, not a price direction.
- Up/down colors are **identical in both light and dark modes** for consistency with financial convention.
- For table cells, pair the color text with a very light tinted background: `rgba(0, 173, 162, 0.08)` (up) / `rgba(255, 58, 117, 0.08)` (down).

---

## 13. Design Token Reference

The design system uses CSS custom properties with an `--lb-` prefix for project-specific tokens, layered on top of VitePress's `--vp-` token system.

### Core Brand Tokens

```css
/* Light mode */
--lb-brand: #00B8B8;          /* primary brand teal */
--lb-brand-dark: #00ADA2;     /* darker brand teal for hover/active */
--lb-bg-1: #FFFFFF;           /* primary background */
--lb-bg-2: #F3F5F6;           /* secondary background */
--lb-bg-btn-secondary: #F3F5F6;
--lb-bg-chip: #F3F5F6;

/* Dark mode (applied under .lb-dark) */
--lb-d-bg-1: #0A0E19;         /* primary dark background */
--lb-d-bg-2: #232630;         /* secondary dark background */
--lb-ai-brand-bg: #09252A;    /* AI section dark teal background */
--lb-ai-card-bg: #203A3F;     /* AI card dark teal */
--lb-btn-primary-bg: #FFFFFF; /* dark mode: primary button is white */
--lb-btn-primary-color: #000000;
--lb-btn-secondary-bg: rgba(80, 80, 80, 0.5);
--lb-btn-secondary-color: #D1D5DB;
```

### Brand Color Scale

A full teal scale for gradient and tinted backgrounds:

```css
--brand-5:   #0f2f2a   /* darkest, near-black teal */
--brand-10:  #123a34
--brand-20:  #165049
--brand-30:  #1a665e
--brand-40:  #1e7c73
--brand-50:  #229288
--brand-60:  #26a89d
--brand-70:  #2abeb2
--brand-80:  #2ed4c7
--brand-90:  #32eadc
--brand-100: #00f0c4   /* brightest, used as dark-mode brand-1 */
```

### VitePress Semantic Tokens (Light / Dark)

| Token               | Light         | Dark        | Role                    |
| ------------------- | ------------- | ----------- | ----------------------- |
| `--vp-c-bg`         | `#FFFFFF`     | `#0A0E19`   | Page background         |
| `--vp-c-bg-soft`    | `#F6F6F7`     | `#13182A`   | Soft/card surface       |
| `--vp-c-bg-elv`     | `#FFFFFF`     | `#202127`   | Elevated surface        |
| `--vp-c-bg-alt`     | `#F6F6F7`     | `#161A26`   | Alt background          |
| `--vp-c-text-1`     | `#3C3C43`     | `#DFDFD6`   | Primary text            |
| `--vp-c-text-2`     | `#67676C`     | `#98989F`   | Secondary text          |
| `--vp-c-text-3`     | `#929295`     | `#6A6A71`   | Tertiary text           |
| `--vp-c-border`     | `#C2C2C4`     | `#3C3F44`   | Borders                 |
| `--vp-c-divider`    | `rgba(0,0,0,.06)` | `rgba(255,255,255,.06)` | Dividers |
| `--vp-c-brand-1`    | `#00B8B8`     | `#00F0C4`   | Primary brand color     |
| `--vp-c-brand-2`    | `#1AC7C7`     | `#32EADC`   | Secondary brand         |
| `--vp-c-brand-3`    | `#33CDCD`     | `#2ED4C7`   | Tertiary brand          |
| `--vp-sidebar-bg-color` | `#FFFFFF` | `#0A0E19`   | Docs sidebar background |
