# Dev Border Mixin

A quick and easy SCSS mixin for adding colored borders to elements during development/debugging.

## Installation

Add this to your SCSS variables file (e.g., `_variables.scss`):

```scss
// Dev Borders
$dev-border-colors: (
  aq: aqua,
  k: black,
  b: blue,
  br: brown,
  co: coral,
  c: cyan,
  go: gold,
  gr: gray,
  g: green,
  i: ivory,
  k: khaki,
  lv: lavender,
  li: lime,
  m: magenta,
  ma: maroon,
  nv: navy,
  ol: olive,
  o: orange,
  pk: pink,
  pu: purple,
  r: red,
  s: silver,
  t: teal,
  tu: turquoise,
  v: violet,
  w: white,
  y: yellow,
);

$dev-border-styles: (
  "—": solid,
  "-": dashed,
  ".": dotted,
);

// Dev border mixin
// Usage: @include dev(); // default red, 1px solid
// Usage: @include dev(b); // blue, 1px solid
// Usage: @include dev(g, 2px); // green, 2px solid
// Usage: @include dev(pu, 3px, dashed); // purple, 3px dashed
// Usage: @include dev(pu, 3px, "-"); // purple, 3px dashed (shorthand)
// Usage: @include dev(b, 2px, "."); // blue, 2px dotted (shorthand)
// Usage: @include dev(#ff00ff); // custom hex color, 1px solid
// Usage: @include dev(#00ff00, 2px, dotted); // custom hex, 2px dotted
@mixin dev($color: r, $width: 1px, $style: "—") {
  // Check if color is a key in the map, otherwise use it as-is (for hex codes)
  $resolved-color: if(map-has-key($dev-border-colors, $color), map-get($dev-border-colors, $color), $color);

  // Check if style is a key in the map, otherwise use it as-is
  $resolved-style: if(map-has-key($dev-border-styles, $style), map-get($dev-border-styles, $style), $style);

  border: $width $resolved-style $resolved-color !important;
}
```

## Usage

Import your variables file in your component SCSS:

```scss
@use "path/to/variables" as *;
```

Then use the mixin:

```scss
// Default: red, 1px solid
.element {
  @include dev();
}

// Custom color: blue, 1px solid
.element {
  @include dev(b);
}

// Custom color and width: green, 2px solid
.element {
  @include dev(g, 2px);
}

// Custom color, width, and style: purple, 3px dashed
.element {
  @include dev(pu, 3px, dashed);
}

// Shorthand style: purple, 3px dashed
.element {
  @include dev(pu, 3px, "-");
}

// Shorthand style: blue, 2px dotted
.element {
  @include dev(b, 2px, ".");
}

// Custom hex color: 1px solid
.element {
  @include dev(#ff00ff);
}

// Custom hex color, width, and style: 2px dotted
.element {
  @include dev(#00ff00, 2px, dotted);
}

// Custom hex with shorthand style: 2px dashed
.element {
  @include dev(#ff6b35, 2px, "-");
}
```

## Available Colors

- `aq` - aqua
- `be` - beige
- `k` - black
- `b` - blue
- `br` - brown
- `co` - coral
- `c` - cyan
- `go` - gold
- `gr` - gray
- `g` - green
- `in` - indigo
- `iv` - ivory
- `kh` - khaki
- `la` - lavender
- `li` - lime
- `m` - magenta
- `ma` - maroon
- `na` - navy
- `ol` - olive
- `o` - orange
- `or` - orchid
- `pe` - peru
- `pk` - pink
- `pl` - plum
- `pu` - purple
- `r` - red (default)
- `sa` - salmon
- `si` - silver
- `ta` - tan
- `t` - teal
- `tu` - turquoise
- `vi` - violet
- `wh` - wheat
- `w` - white
- `y` - yellow
- Any hex code (e.g., `#ff00ff`, `#00ff00`)

## Available Styles

### Shorthand

- `"—"` - solid (default, em dash)
- `"-"` - dashed (hyphen)
- `"."` - dotted (period)

### Full Names

- `solid` (default)
- `dashed`
- `dotted`
- `double`
- `groove`
- `ridge`
- `inset`
- `outset`

## Examples

```scss
.header {
  @include dev(); // red, 1px solid (default)
}

.sidebar {
  @include dev(b); // blue, 1px solid
}

.content {
  @include dev(g, 2px); // green, 2px solid
}

.footer {
  @include dev(pu, 3px, dashed); // purple, 3px dashed (full name)
}

.footer-alt {
  @include dev(pu, 3px, "-"); // purple, 3px dashed (shorthand)
}

.nested-element {
  @include dev(o, 1px, "."); // orange, 1px dotted (shorthand)
}

.custom-element {
  @include dev(#ff6b35); // custom hex color, 1px solid
}

.another-custom {
  @include dev(#4ecdc4, 2px, "-"); // custom hex, 2px dashed (shorthand)
}

.many-colors {
  @include dev(t); // teal
  @include dev(ma); // maroon
  @include dev(go, 2px, "."); // gold, 2px dotted
  @include dev(la, 3px, "-"); // lavender, 3px dashed
}
```

## Tips

1. **Quick debugging**: Add borders to see element boundaries and layout issues
2. **Nested elements**: Use different colors for parent/child elements to visualize hierarchy
3. **Remove when done**: Simply delete or comment out the `@include dev()` lines when finished debugging
4. **!important flag**: The mixin uses `!important` to ensure borders show even if other styles exist

## Cleanup

When you're done debugging, search your project for `@include dev(` and remove all instances.

```bash
# Search for dev mixin usage
grep -r "@include dev(" src/
```
