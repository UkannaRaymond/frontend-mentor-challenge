# Frontend Mentor - Browser extensions manager UI solution

This is a solution to the [Browser extensions manager UI challenge on Frontend Mentor](https://www.frontendmentor.io/challenges/browser-extension-manager-ui-yNZnOfsMAp). Frontend Mentor challenges help you improve your coding skills by building realistic projects.

## Table of contents

- [Overview](#overview)
  - [The challenge](#the-challenge)
  - [Screenshot](#screenshot)
  - [Links](#links)
- [My process](#my-process)
  - [Built with](#built-with)
  - [What I learned](#what-i-learned)
  - [Continued development](#continued-development)
  - [AI Collaboration](#ai-collaboration)
- [Author](#author)

## Overview

### The challenge

Users should be able to:

- Toggle extensions between active and inactive states
- Filter active and inactive extensions
- Remove extensions from the list
- Select their color theme
- View the optimal layout for the interface depending on their device's screen size
- See hover and focus states for all interactive elements on the page

The extensions are loaded from the provided REST API, and the UI handles loading, error and empty states.

### Screenshot

![](./screenshot.jpg)

### Links

- Solution URL: [GitHub repository](https://github.com/UkannaRaymond/frontend-mentor-challenge)
- Live Site URL: [Live demo](https://frontend-mentor-challenge-lilac.vercel.app)

## My process

### Built with

- Semantic HTML5 markup
- CSS custom properties
- [Next.js](https://nextjs.org/) - React framework
- [HeroUI](https://www.heroui.com/) - UI component library
- [Tailwind CSS](https://tailwindcss.com/) - Styling
- [Zustand](https://zustand-demo.pmnd.rs/) - Filter state
- [TanStack Query](https://tanstack.com/query) - Server state and data fetching

### What I learned

- **Optimistic updates with rollback.** Toggling and removing an extension updates the UI immediately through TanStack Query's `onMutate`. If the request fails, the cached lists are restored from a snapshot, and after every mutation the lists are re-synced with the server.
- **Sending `multipart/form-data`.** The API's `PATCH` endpoint expects form data, so the request helper only sets a JSON `Content-Type` header when the body is not a `FormData` object. This lets the browser add the correct multipart boundary itself.
- **Handling bad image URLs from the API.** Most `avatarUrl` values point to `example.com` files that don't exist. The avatar component falls back to a colored tile with the extension's initial when an image fails to load.
- **Theming with CSS variables.** Light and dark colors are defined as custom properties on `:root` and `.dark`, then exposed to Tailwind, so components don't need separate dark-mode color classes.

```ts
// Only set a JSON Content-Type when the body is not FormData
const isFormData = init.body instanceof FormData;

const res = await fetch(`${BASE_URL}${path}`, {
  ...init,
  headers:
    init.body && !isFormData
      ? { "Content-Type": "application/json", ...init.headers }
      : init.headers,
});
```

### Continued development

- Add automated tests for the filter and the toggle and remove flows.
- Improve the first-load experience when the hosted API is waking up from sleep.
- Learn more about HeroUI's theming so fewer style overrides are needed.

### AI Collaboration

I used Claude as a reviewer and debugging assistant.

- **How I used it:** to compare my implementation against the design files and style guide, to check my API integration against the Swagger response, and to help debug the avatar fallback and the hover and focus styles.
- **What worked well:** it was useful for spotting differences from the design and edge cases in the API handling, such as the empty-body `DELETE` response and broken image URLs.
- **What I had to check myself:** its suggestions about HeroUI's internal class names and attributes couldn't be taken as given, so I verified them in the browser's inspector before keeping them.

## Author

- GitHub - [@UkannaRaymond](https://github.com/UkannaRaymond)
- Frontend Mentor - [@UkannaRaymond](https://www.frontendmentor.io/profile/UkannaRaymond)
