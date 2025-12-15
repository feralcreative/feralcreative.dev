# AI Agent Primer - Feral Creative Dev Toolkit

**Version:** 1.0  
**Last Updated:** 2025-10-29  
**Repository:** <https://github.com/feralcreative/feralcreative.dev.git>  
**Live Site:** <https://feralcreative.dev>

---

## 🔒 SECRETS REFERENCE GUIDE

**Note:** This project is a public-facing utility toolkit with no authentication or sensitive credentials. All resources are served via CDN and are publicly accessible.

### Files to Keep Private (per .gitignore)

**Location:** `.gitignore` (lines 1-19)

- `.env` files (line 19)
- JSON/CSV data files (lines 17-18)
- Design files: `.psd`, `.ai`, `.prproj`, `.aep` (lines 5-8)
- Video files: `.mp4`, `.mov`, `.mkv` (lines 9-11)
- Archive/asset directories: `_assets`, `_archive`, `_*` (lines 2-4)

### Server Configuration

**Location:** `.htaccess` (lines 1-4)

- Root redirect: `feralcreative.dev` → `feralcreative.co` (301 redirect)
- No authentication required

---

## 📋 META: ABOUT THIS DOCUMENT

**This primer was generated following instructions in:** `ai/AI_PRIMER_INSTRUCTIONS.md`

That file contains comprehensive guidelines for creating exhaustive AI agent documentation, including:

- Architecture documentation requirements
- Security policies for credential handling
- Code structure documentation standards
- Success criteria for AI agent onboarding

**Purpose:** Enable any AI agent to clone this repo and start developing within 5 minutes without clarifying questions.

---

## 🏗️ ARCHITECTURE & STRUCTURE

### Technology Stack

- **Frontend:** HTML5, CSS3 (SCSS), Vanilla JavaScript
- **CSS Preprocessor:** SCSS/Sass
- **Build Tools:** Sass compiler (manual compilation)
- **Version Control:** Git + GitHub
- **Hosting:** Static file hosting (CDN-ready)
- **Dependencies:**
  - Node.js (for JSON tools)
  - Python 3 + pandas (for CSV conversion)
  - jQuery (for popup management utility)

### Directory Structure

```
feralcreative.dev/
├── .git/                      # Git repository
├── .vscode/                   # VSCode settings
├── .htaccess                  # Apache redirect config
├── .gitignore                 # Git ignore rules
├── README.md                  # User-facing documentation
├── AI_AGENT_PRIMER.md         # This file - AI agent documentation
│
├── ai/                        # AI documentation
│   └── AI_PRIMER_INSTRUCTIONS.md  # Instructions for creating this primer
│
├── index.html                 # Landing page (minimal, redirects to .co)
├── style.scss                 # Landing page SCSS source
├── style.css                  # Landing page compiled CSS
├── style.min.css              # Landing page minified CSS
│
├── utils.scss                 # **PRIMARY PRODUCT** - CSS utilities source (592 lines)
├── utils.css                  # Compiled CSS utilities
├── utils.min.css              # **CDN ENDPOINT** - Minified utilities
├── utils/
│   └── index.html             # Utils documentation/demo page
│
├── feral-template/            # WordPress child theme template
│   ├── style.scss             # Theme SCSS (330 lines)
│   ├── style.css              # Compiled theme CSS
│   └── style.min.css          # Minified theme CSS
│
├── js/                        # JavaScript utilities
│   ├── summit-filter.js       # Content filtering (46 lines)
│   ├── summit-filter.min.js   # Minified
│   ├── keep-popup-open.js     # Popup management (32 lines)
│   ├── keep-popup-open.min.js # Minified
│   ├── balance-text.js        # Typography balancing library
│   ├── balance-text.min.js    # Minified
│   ├── scratch.js             # Development scratch file
│   └── scratch.min.js         # Minified
│
├── json/derulo/               # JSON processing CLI tools
│   ├── derulo-sample.js       # Random sampling (85 lines)
│   ├── derulo-to-csv.py       # JSON to CSV converter (78 lines)
│   └── geojson-checker.js     # GeoJSON validator (86 lines)
│
├── media/                     # FPO placeholder images
│   ├── fpo.png                # Standard FPO image
│   ├── fpo.jpg                # JPG variant
│   ├── fpo-png8.png           # Optimized PNG8
│   └── fpo@{1-4}x.jpg         # Retina variants
│
└── regex.txt                  # Regex snippets for development

```

### Entry Points

1. **CDN CSS Utilities:** `utils.min.css` (primary product)
2. **Documentation:** `utils/index.html` (usage examples)
3. **Landing Page:** `index.html` (redirects to main site)
4. **CLI Tools:** `json/derulo/*.{js,py}` (command-line utilities)

### Data Flow

```text
Development Flow:
SCSS Source (utils.scss) 
  → Sass Compiler 
  → CSS Output (utils.css) 
  → Minification 
  → CDN Endpoint (utils.min.css)
  → Client Websites

CLI Tools Flow:
JSON Input File 
  → derulo-sample.js (sampling)
  → derulo-to-csv.py (conversion)
  → CSV Output File

Content Filtering Flow:
HTML (filter buttons + posts) 
  → summit-filter.js (event listeners)
  → URL parameter updates
  → DOM manipulation (show/hide)
```

---

## 💻 CODE STRUCTURE

### Critical Files & Line Numbers

#### 1. `utils.scss` (592 lines) - PRIMARY PRODUCT

**Purpose:** Comprehensive CSS utility library for rapid web development

**Key Sections:**

- **Lines 1-38:** Header, version info, usage instructions, comment legend
- **Lines 39-59:** FPO color variables (magenta, purple, red, cyan, yellow, green, blue, brown, orange)
- **Lines 61-79:** Version mixin (fixed footer with version display)
- **Lines 81-252:** FPO utility classes (`.fpop`, `.fpor`, `.fpoc`, etc.)
  - Inset box-shadow for visual debugging
  - `.bg` modifier for background colors
  - `.out` modifier for border instead of shadow
  - `.nc` (need content) and `.li` (lorem ipsum) pseudo-content
- **Lines 253-302:** Content styling (`.mono`, `pre`, `.white`, FPO images)
- **Lines 303-387:** **Viewport widget** - responsive breakpoint indicator
  - Lines 305-307: Body padding adjustment
  - Lines 318-387: Media query breakpoints with color coding
- **Lines 389-451:** Flexbox utilities (`.flex`, `.flex-10` through `.flex-100`)
- **Lines 453-485:** Grid widget (Bootstrap column overlay for debugging)
- **Lines 486-512:** Div coloring widget (commented out)
- **Lines 514-560:** Dev note widget mixin (fixed footer notifications)
- **Lines 562-592:** Viewport size display styling

**Critical Functions:**

```scss
// FPO Color Variables (lines 39-48)
$fpo: magenta;
$fpop: purple;
$fpor: red;
$fpoc: cyan;
// ... etc

// FPO Class Pattern (lines 91-98)
.fpop {
  -webkit-box-shadow: inset 0px 0px 0px 2px $fpop;
  -moz-box-shadow: inset 0px 0px 0px 2px $fpop;
  box-shadow: inset 0px 0px 0px 2px $fpop;
  &.bg {
    background: $fpop-bg;
  }
}

// Viewport Widget Media Queries (lines 318-387)
@media (max-width: 575px) {
  .viewport-size {
    background-color: #f44336; // red - XS
    &:after { content: "XS (<576px)"; }
  }
}
```

**Usage Pattern:**

```html
<!-- Add to HTML for debugging -->
<div class="fpop">Purple outline box</div>
<div class="fpor bg">Red outline with background</div>

<!-- Viewport widget -->
<section class="viewport-widget top container-fluid">
  <div class="row">
    <div class="col-12 text-center">
      <p class="viewport-size">Viewport: </p>
    </div>
  </div>
</section>
```

#### 2. `js/summit-filter.js` (46 lines) - Content Filtering

**Purpose:** Filter posts/content with URL parameter support

**Key Functions:**

- **Lines 6-11:** `getUrlParameter(name)` - Extract URL query parameters
- **Lines 17-29:** `filterPosts(filter)` - Show/hide posts based on filter
- **Lines 35-44:** Click event handlers - Update display and URL

**Algorithm:**

1. Parse URL for `?filter=` parameter
2. Query all `.e-loop-item` elements
3. Show items matching filter class or "all"
4. Update URL with History API (no page reload)

**Usage:**

```html
<div id="filter-bar">
  <button data-filter="all">All</button>
  <button data-filter="news">News</button>
  <button data-filter="events">Events</button>
</div>
<div class="e-loop-item news">News post</div>
<div class="e-loop-item events">Event post</div>
```

#### 3. `js/keep-popup-open.js` (32 lines) - Popup Management

**Purpose:** Keep Elementor popups open during multi-step Gravity Forms

**Key Variables:**

- **Line 3:** `gravityFormId` - Form wrapper ID
- **Line 4:** `elementorPopupClass` - Popup selector

**Key Functions:**

- **Lines 7-17:** `gform_post_render` event handler - Prevent close on step change
- **Lines 20-30:** Form submit handler - Maintain popup state

**Configuration Required:**

```javascript
// Replace placeholders (lines 8, 10)
if (formId === YOUR_FORM_ID) {
  var isLastPage = currentPage === YOUR_LAST_PAGE_NUMBER;
}
```

#### 4. `json/derulo/derulo-sample.js` (85 lines) - JSON Sampling

**Purpose:** Extract random samples from large JSON files using reservoir sampling

**Key Functions:**

- **Lines 69-82:** `reservoirSample(arr, k)` - Reservoir sampling algorithm
- **Lines 23-61:** Main logic - Handle arrays, objects, nested structures

**Algorithm (Reservoir Sampling):**

```javascript
// Lines 69-82
function reservoirSample(arr, k) {
  const sample = [];
  for (let i = 0; i < arr.length; i++) {
    if (i < k) {
      sample.push(arr[i]);  // Fill reservoir
    } else {
      const j = Math.floor(Math.random() * (i + 1));
      if (j < k) {
        sample[j] = arr[i];  // Random replacement
      }
    }
  }
  return sample;
}
```

**Usage:**

```bash
node json/derulo/derulo-sample.js input.json 100 sample.json
# Extracts 100 random items from input.json → sample.json
```

#### 5. `json/derulo/derulo-to-csv.py` (78 lines) - JSON to CSV

**Purpose:** Convert nested JSON to flat CSV with recursive flattening

**Key Functions:**

- **Lines 13-35:** `flatten_json(y, prefix='')` - Recursive flattening
  - Handles nested dicts: `{a: {b: 1}}` → `a.b: 1`
  - Handles arrays: `{a: [1,2,3]}` → `a: "1; 2; 3"`
  - Handles nested arrays of dicts: `{a: [{b:1}]}` → `a[0].b: 1`

**Algorithm:**

```python
# Lines 13-35
def flatten_json(y, prefix=''):
    out = {}
    if isinstance(y, dict):
        for k, v in y.items():
            full_key = f"{prefix}{k}" if prefix == "" else f"{prefix}.{k}"
            if isinstance(v, dict):
                out.update(flatten_json(v, full_key))
            elif isinstance(v, list):
                # Flatten list items with index
                if all(isinstance(item, dict) for item in v):
                    for i, item in enumerate(v):
                        out.update(flatten_json(item, f"{full_key}[{i}]"))
                else:
                    out[full_key] = '; '.join(str(item) for item in v)
            else:
                out[full_key] = v
    return out
```

**Usage:**

```bash
python3 json/derulo/derulo-to-csv.py mydata
# Reads mydata.json → outputs mydata.csv
```

#### 6. `json/derulo/geojson-checker.js` (86 lines) - GeoJSON Validator

**Purpose:** Validate if JSON file is valid GeoJSON

**Key Functions:**

- **Lines 8-37:** `isGeoJSON(data)` - Recursive validation
  - Checks for valid `type` field (Feature, FeatureCollection, Point, etc.)
  - Validates structure (coordinates, geometry, features)

**Usage:**

```bash
node json/derulo/geojson-checker.js map.json
# Output: {"isGeoJSON": true} or {"isGeoJSON": false}
```

#### 7. `feral-template/style.scss` (330 lines) - WordPress Theme

**Purpose:** Clean WordPress child theme with comprehensive SCSS variables

**Key Sections:**

- **Lines 4-13:** Color palette variables
- **Lines 15-31:** Typography variables
- **Lines 37-47:** Spacing, borders, radius
- **Lines 49-66:** Button and menu variables
- **Lines 67-76:** Table styling variables
- **Lines 78-330:** Base styles, components, utility classes

**Usage:** Copy to WordPress `wp-content/themes/` as child theme

---

## 🚀 DEPLOYMENT

### Build Process

**Compile SCSS to CSS:**

```bash
# Watch mode (auto-compile on save)
sass --watch utils.scss:utils.css

# Single compilation
sass utils.scss:utils.css

# Minified production build
sass utils.scss:utils.min.css --style compressed

# Compile all files
sass --watch style.scss:style.css utils.scss:utils.css feral-template/style.scss:feral-template/style.css
```

### Deployment Workflow

**Current Setup:** Static file hosting with CDN

1. **Make changes** to `.scss` files
2. **Compile** to `.css` and `.min.css`
3. **Commit** to Git:

   ```bash
   git add .
   git commit -m "Description of changes"
   git push origin main
   ```

4. **Deploy** to hosting (files served at `feralcreative.dev`)

**No CI/CD pipeline** - Manual deployment

### CDN Endpoints

**Primary:**

- `https://feralcreative.dev/utils.min.css` (main product)
- `https://feralcreative.dev/utils.css` (unminified)

**Alternative:**

- `https://securesite.dev/utils.min.css`
- `https://securesite.dev/utils.css`

### Environment Variables

**None required** - This is a static file project with no backend

---

## 🔧 DEVELOPMENT WORKFLOW

### Local Setup (5-Minute Quickstart)

```bash
# 1. Clone repository
git clone https://github.com/feralcreative/feralcreative.dev.git
cd feralcreative.dev

# 2. Install Sass (if not installed)
# macOS
brew install sass/sass/sass

# npm
npm install -g sass

# 3. Start watching SCSS files
sass --watch utils.scss:utils.css

# 4. Open documentation in browser
open utils/index.html

# 5. Make changes to utils.scss and see live updates
```

### Common Development Tasks

**Add new FPO color:**

```scss
// 1. Add variable (around line 48)
$fpow: white;
$fpow-bg: rgba(white, 0.2);

// 2. Add class (around line 160)
.fpow {
  -webkit-box-shadow: inset 0px 0px 0px 2px $fpow;
  -moz-box-shadow: inset 0px 0px 0px 2px $fpow;
  box-shadow: inset 0px 0px 0px 2px $fpow;
  &.bg {
    background: $fpow-bg;
  }
}

// 3. Add to .out modifier list (line 174)
.fpow.out {
  -webkit-box-shadow: none;
  -moz-box-shadow: none;
  box-shadow: none;
  border: 1px solid;
  border-color: $fpow;
}
```

**Add new utility class:**

```scss
// Add to utils.scss (end of file)
.your-utility {
  property: value;
}
```

**Test JSON tools:**

```bash
# Create test JSON
echo '[{"name":"test","value":123}]' > test.json

# Test sampling
node json/derulo/derulo-sample.js test.json 1 sample.json

# Test CSV conversion
python3 json/derulo/derulo-to-csv.py test

# Test GeoJSON checker
node json/derulo/geojson-checker.js test.json
```

### Testing Approach

**Manual testing:**

1. Open `utils/index.html` in browser
2. Inspect visual appearance of utility classes
3. Test viewport widget by resizing browser
4. Test JavaScript utilities in WordPress/Elementor environment

**No automated tests** - Visual QA only

---

## 🏛️ ARCHITECTURAL DECISIONS (WHY?)

### Why SCSS instead of plain CSS?

- **Variables** for color consistency (FPO colors)
- **Nesting** for cleaner code organization
- **Mixins** for reusable patterns (version, devnote)
- **Easy maintenance** of large utility library

### Why separate minified files?

- **Performance** - Smaller file size for production
- **Debugging** - Readable source for development
- **CDN optimization** - Faster load times

### Why FPO classes use box-shadow instead of border?

- **Non-intrusive** - Doesn't affect layout/box model
- **Stackable** - Can combine with actual borders
- **Visual clarity** - Inset shadow clearly indicates debug mode

### Why reservoir sampling for JSON?

- **Memory efficient** - Single pass through data
- **Truly random** - Equal probability for all items
- **Scalable** - Works with large files (5.8 MB+)

### Why flatten JSON for CSV?

- **Spreadsheet compatibility** - Excel/Google Sheets
- **Data analysis** - Easier to query flat data
- **Preserves structure** - Nested keys become `parent.child`

### Why vanilla JavaScript for filters?

- **No dependencies** - Lightweight, fast loading
- **Simple use case** - DOM manipulation only
- **WordPress compatible** - Works with any theme

### Why jQuery for popup management?

- **Gravity Forms dependency** - Uses jQuery events
- **Elementor compatibility** - jQuery-based framework
- **Event handling** - Easier cross-browser support

---

## ⚠️ CRITICAL ISSUES

### Known Bugs

1. **`.hidden` class uses `visibility: none`** (line 88)
   - **Issue:** Should be `display: none` or `visibility: hidden`
   - **Impact:** Class doesn't actually hide elements
   - **Workaround:** Use inline `style="display: none"`
   - **Fix:** Change line 88 to `display: none !important;`

2. **`keep-popup-open.js` has placeholder variables** (lines 8, 10)
   - **Issue:** `YOUR_FORM_ID` and `YOUR_LAST_PAGE_NUMBER` not replaced
   - **Impact:** Script won't work without manual configuration
   - **Workaround:** Replace with actual form ID and page number
   - **Fix:** Add configuration instructions or make dynamic

3. **`.fpop.out` has redundant `1px solid`** (line 191)
   - **Issue:** `border-color: 1px solid $fpop;` should be just `$fpop`
   - **Impact:** Invalid CSS, border may not display correctly
   - **Workaround:** None needed, browser ignores invalid value
   - **Fix:** Remove `1px solid` from line 191

### Incomplete Features

1. **Grid widget** (lines 454-485)
   - **Status:** Implemented but not documented
   - **Missing:** Usage instructions in `utils/index.html`
   - **TODO:** Add demo section to documentation

2. **Div coloring widget** (lines 486-512)
   - **Status:** Commented out
   - **Reason:** Too aggressive for production use
   - **TODO:** Create opt-in version or separate file

3. **Dev note widget** (lines 514-560)
   - **Status:** Mixin defined but not included
   - **Missing:** `@include devnote;` statement
   - **TODO:** Add to main stylesheet or document usage

### Technical Debt

1. **No package.json** - Manual dependency management
2. **No build script** - Manual SCSS compilation
3. **No version control for compiled CSS** - `.css` files in Git
4. **Duplicate code** - FPO classes follow same pattern (could use mixin)
5. **No linting** - SCSS/JS code style not enforced

### Performance Bottlenecks

**None identified** - Static files, minimal JavaScript, optimized CSS

---

## 🐛 DEBUGGING

### Common Problems & Solutions

**Problem:** SCSS won't compile

```bash
# Solution: Check Sass installation
sass --version

# Reinstall if needed
npm install -g sass
```

**Problem:** Changes not showing in browser

```bash
# Solution: Hard refresh
# Chrome/Firefox: Cmd+Shift+R (Mac) or Ctrl+Shift+R (Windows)
# Safari: Cmd+Option+R

# Or clear cache
# Check compiled .css file has changes
cat utils.css | grep "your-change"
```

**Problem:** FPO classes not working

```html
<!-- Solution: Check CSS is loaded -->
<link rel="stylesheet" href="https://feralcreative.dev/utils.min.css">

<!-- Check element has class -->
<div class="fpop">Should have purple outline</div>

<!-- Check for conflicting styles -->
<div class="fpop" style="box-shadow: none;">Won't work - inline style overrides</div>
```

**Problem:** summit-filter.js not filtering

```javascript
// Solution: Check selectors match
// Buttons need #filter-bar parent
// Posts need .e-loop-item class

// Debug in console
console.log(document.querySelectorAll("#filter-bar button").length);
console.log(document.querySelectorAll(".e-loop-item").length);
```

**Problem:** JSON tools error

```bash
# derulo-sample.js: Check Node.js installed
node --version

# derulo-to-csv.py: Check Python and pandas
python3 --version
pip3 install pandas

# Check file exists
ls -la yourfile.json
```

### Log Locations

**No logs** - Static site with no server-side logging

**Browser console** for JavaScript errors:

- Chrome: View → Developer → JavaScript Console
- Firefox: Tools → Browser Tools → Web Console
- Safari: Develop → Show JavaScript Console

### Debugging Commands

```bash
# Check Git status
git status
git log --oneline -5

# Check file permissions
ls -la

# Validate JSON
cat file.json | python3 -m json.tool

# Check SCSS syntax
sass-convert --check utils.scss

# Find TODO comments
grep -r "TODO" .

# Check for broken links (if using local server)
wget --spider -r -nd -nv -l 2 http://localhost:8000
```

### Health Check Procedures

```bash
# 1. Verify all source files exist
ls -la utils.scss feral-template/style.scss js/*.js json/derulo/*.{js,py}

# 2. Compile SCSS
sass utils.scss:utils.css --style compressed

# 3. Check compiled file size
ls -lh utils.min.css
# Should be ~5-6 KB

# 4. Test JSON tools
echo '{"test": true}' > test.json
node json/derulo/geojson-checker.js test.json
rm test.json

# 5. Check Git remote
git remote -v
# Should show: https://github.com/feralcreative/feralcreative.dev.git
```

---

## 📈 NEXT STEPS

### Prioritized Improvements

**High Priority:**

1. Fix `.hidden` class bug (line 88 in utils.scss)
2. Fix `.fpop.out` border-color bug (line 191)
3. Add package.json with build scripts
4. Create automated build process (npm scripts or Makefile)
5. Add configuration system for keep-popup-open.js

**Medium Priority:**
6. Document grid widget usage
7. Create mixin for FPO classes (reduce duplication)
8. Add ESLint/Stylelint for code quality
9. Create changelog/version history
10. Add automated tests for JSON tools

**Low Priority:**
11. Create separate debug.css for aggressive debugging tools
12. Add more flexbox utilities
13. Create dark mode variants for FPO colors
14. Add print stylesheet utilities
15. Create npm package for JSON tools

### Feature Roadmap

**Q1 2026:**

- Automated build pipeline
- npm package publication
- Comprehensive test suite

**Q2 2026:**

- Additional utility classes (grid, spacing)
- Dark mode support
- Accessibility improvements

**Q3 2026:**

- WordPress plugin version
- React/Vue component library
- Interactive documentation site

### Refactoring Opportunities

1. **utils.scss:** Extract FPO classes to mixin

   ```scss
   @mixin fpo-class($name, $color, $bg-color) {
     .fpo#{$name} {
       box-shadow: inset 0px 0px 0px 2px $color;
       &.bg { background: $bg-color; }
     }
   }
   ```

2. **JSON tools:** Combine into single CLI with subcommands

   ```bash
   derulo sample input.json -n 100 -o sample.json
   derulo to-csv input.json -o output.csv
   derulo check-geojson input.json
   ```

3. **Build process:** Add npm scripts

   ```json
   {
     "scripts": {
       "build": "sass utils.scss:utils.min.css --style compressed",
       "watch": "sass --watch utils.scss:utils.css",
       "test": "node test/run-tests.js"
     }
   }
   ```

### Documentation Gaps

1. **Missing:** Contribution guidelines (CONTRIBUTING.md)
2. **Missing:** Code of conduct
3. **Missing:** License file (currently just copyright notice)
4. **Missing:** Changelog (CHANGELOG.md)
5. **Missing:** Examples directory with real-world usage
6. **Incomplete:** WordPress theme installation instructions
7. **Incomplete:** CDN setup for self-hosting

---

## 📚 QUICK REFERENCE

### File Locations Cheat Sheet

| What | Where |
|------|-------|
| Main CSS utilities | `utils.scss` (source), `utils.min.css` (production) |
| WordPress theme | `feral-template/style.scss` |
| Content filter | `js/summit-filter.js` |
| Popup manager | `js/keep-popup-open.js` |
| JSON sampler | `json/derulo/derulo-sample.js` |
| CSV converter | `json/derulo/derulo-to-csv.py` |
| GeoJSON validator | `json/derulo/geojson-checker.js` |
| Documentation | `utils/index.html`, `README.md` |
| This primer | `AI_AGENT_PRIMER.md` |
| Primer instructions | `ai/AI_PRIMER_INSTRUCTIONS.md` |

### Command Cheat Sheet

```bash
# Compile CSS
sass utils.scss:utils.min.css --style compressed

# Watch for changes
sass --watch utils.scss:utils.css

# Sample JSON
node json/derulo/derulo-sample.js INPUT.json COUNT OUTPUT.json

# Convert to CSV
python3 json/derulo/derulo-to-csv.py FILENAME

# Check GeoJSON
node json/derulo/geojson-checker.js FILE.json

# Git workflow
git add .
git commit -m "message"
git push origin main
```

### CDN Usage

```html
<!-- CSS Utilities -->
<link rel="stylesheet" href="https://feralcreative.dev/utils.min.css">

<!-- JavaScript Utilities -->
<script src="https://feralcreative.dev/js/summit-filter.min.js"></script>
<script src="https://feralcreative.dev/js/keep-popup-open.min.js"></script>
<script src="https://feralcreative.dev/js/balance-text.min.js"></script>
```

---

## 🎯 SUCCESS CRITERIA CHECKLIST

- ✅ **Architecture documented** with directory structure and data flow
- ✅ **No sensitive credentials** in this public repository
- ✅ **Code structure explained** with line numbers and examples
- ✅ **Development workflow** documented with 5-minute setup
- ✅ **Deployment process** explained with commands
- ✅ **Architectural decisions** justified with reasoning
- ✅ **Known issues** documented with workarounds
- ✅ **Debugging guide** provided with common problems
- ✅ **Next steps** prioritized with roadmap
- ✅ **Quick reference** provided for fast lookup
- ✅ **Meta-documentation** included (this primer's origin)

**Result:** Another AI agent can clone this repo, read this document, and start developing within 5 minutes. ✅

---

**Document Version:** 1.0
**Generated:** 2025-10-29
**Author:** AI Agent (following `ai/AI_PRIMER_INSTRUCTIONS.md`)
**Maintainer:** Ziad Ezzat, Feral Creative
