# Design Tokens — Variables & Placeholders

## Variables (`_variables.scss`)

Always use tokens — never hardcode raw values:

```scss
// Colors
$black-primary:   #000000
$gray-primary:    #979797
$cream-secondary: #F9F4EA   // card backgrounds
$gold-secondary:  #E19D1A   // stars, active underline
$white:           #FFFFFF
$bg-light:        #FAFAFA   // section backgrounds

// Layout
$nav-height:         64px   // desktop
$nav-height-mobile:  46px
$max-width:          1440px

// Breakpoints
$break-normal: 768px
$break-wide:   1200px
```

## Placeholders (`_placeholders.scss`)

Use `@extend` for shared UI patterns — never duplicate:

```scss
%btn-primary      // black bg, white text, uppercase
%btn-secondary    // outline button, black border
%input-underline  // underline-only input, weight 300, font-family inherit
%overlay-panel    // fixed positioned panel, white bg, z-index 150
```

Usage: `@extend %btn-primary;` inside the element's selector.
