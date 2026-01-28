# Blog Vue.js Application

A modern, responsive blog application built with Vue.js 3, TypeScript, and Tailwind CSS. This SPA (Single Page Application) fetches blog posts from an external API and displays them with a beautiful dark-themed UI.

---

## 🎯 Project Overview

This is a full-featured blog application that demonstrates:

- Vue 3 Composition API with TypeScript
- Vue Router for client-side navigation
- Tailwind CSS v4 for styling
- API data fetching and handling
- Responsive design with modern UI patterns
- Production deployment on Vercel

### Features

✨ **Core Features:**

- Browse all blog posts from the API
- Click on any post to view full details
- Modern dark theme with gradient backgrounds
- Fully responsive design (mobile, tablet, desktop)
- Loading states and error handling
- Client-side routing with smooth navigation

---

## 🛠️ Tech Stack

| Technology   | Version | Purpose                          |
| ------------ | ------- | -------------------------------- |
| Vue.js       | 3.5.x   | Progressive JavaScript framework |
| TypeScript   | ~5.9.3  | Type-safe JavaScript             |
| Vite         | 7.3.1   | Build tool & dev server          |
| Tailwind CSS | 4.1.18  | Utility-first CSS framework      |
| Vue Router   | Latest  | Client-side routing              |
| Bun          | Latest  | Package manager & runtime        |

---

## 📁 Project Structure

```
blog_vue/
├── src/
│   ├── views/
│   │   ├── home.vue           # Post listing page
│   │   └── blogs.vue          # Individual post detail page
│   ├── assets/
│   │   └── main.css           # Tailwind CSS entry point
│   ├── App.vue                # Root component with router view
│   ├── main.ts                # Application entry point
│   └── router.ts              # Vue Router configuration
├── public/                     # Static assets
├── index.html                 # HTML template
├── vercel.json                # Vercel deployment config
├── vite.config.ts             # Vite configuration
├── tailwind.config.js         # Tailwind CSS configuration
├── postcss.config.js          # PostCSS configuration
├── tsconfig.json              # TypeScript configuration
└── package.json               # Project dependencies
```

---

## 🚀 Getting Started

### Prerequisites

- Node.js 20.19.0+ or Bun 1.x
- Git

### Installation

1. **Clone the repository**

   ```bash
   git clone <your-repo-url>
   cd blog_vue
   ```

2. **Install dependencies**

   ```bash
   bun install
   # or
   npm install
   ```

3. **Start the development server**

   ```bash
   bun run dev
   # or
   npm run dev
   ```

4. **Open in browser**
   ```
   http://localhost:5173
   ```

### Build for Production

```bash
bun run build
# or
npm run build
```

The optimized build will be in the `dist/` directory.

---

## 📊 API Data Structure

The application fetches blog posts from: `https://api.oluwasetemi.dev/posts`

### API Response Format

```json
{
  "data": [
    {
      "id": "1",
      "title": "Post Title",
      "content": "Full post content...",
      "author": "Author Name",
      "userId": "123",
      "category": "Technology"
    },
    ...more posts
  ]
}
```

### Key Points About API Data

⚠️ **Important Discovery During Development:**

- **ID is returned as a STRING** (`"id": "1"`) not a number
- **Response structure**: The API returns an object with a `data` property containing an **array of post objects**
- This required adjusting TypeScript interfaces and how we handle the API response

---

## 🔧 Key Technologies & Configuration

### Vue Router Setup

Routes configured in `src/router.ts`:

```
/                    → Home page (list all posts)
/blogs/:id          → Individual post detail page
/:pathMatch(.*)*    → Catch-all for 404 handling
```

### Tailwind CSS v4

Updated to use new gradient syntax:

- `bg-linear-to-br` (instead of `bg-gradient-to-br`)
- `bg-linear-to-r` (instead of `bg-gradient-to-r`)

### TypeScript Interfaces

```typescript
interface Post {
  id: string; // ID is a string from API
  title: string;
  content: string;
  author?: string;
  userId?: string;
  category?: string;
}
```

---

## 🐛 Challenges & Solutions

### Challenge 1: Tailwind Styling Not Working

**Problem:**

- Tailwind CSS classes were not applying styles
- @tailwind directives showed as errors

**Root Cause:**

- CSS file path was incorrect (`./assets/main.css` instead of `./src/assets/main.css`)
- Tailwind config was incomplete (missing theme and plugins)

**Solution:**

```
✅ Created proper directory: src/assets/main.css
✅ Updated import path in main.ts
✅ Added complete tailwind.config.js with theme and plugins
```

---

### Challenge 2: Type Mismatch - "title does not exist on type"

**Problem:**

- Error: `Property 'title' does not exist on type 'Post[]'`
- TypeScript was correct - posts is an array, not a single object

**Root Cause:**

- Attempted to access `posts.title` when `posts` is `Post[]` (array)
- Need to access first element: `posts[0]`

**Solution:**

```vue
<!-- ❌ Wrong -->
<h1>{{ posts.title }}</h1>

<!-- ✅ Correct -->
<h1>{{ posts[0]?.title }}</h1>
```

Used optional chaining (`?.`) for safe access to first post.

---

### Challenge 3: Router Link Not Working

**Problem:**

- Clicking "Read More" didn't navigate to post detail page
- RouterLink was commented out

**Root Cause:**

- Link path mismatch: linked to `/posts/:id` but router expected `/blogs/:id`
- Missing route parameter in link

**Solution:**

```vue
<!-- ✅ Correct RouterLink -->
<RouterLink :to="`/blogs/${post.id}`">Read More →</RouterLink>
```

---

### Challenge 4: API Data Not Fetching Correctly

**Problem:**

- Individual blog post not displaying on detail page
- API URL had string literal instead of template literal

**Root Cause:**

- Used regular quotes: `"https://api.oluwasetemi.dev/posts/${route.params.id}"`
- Should use backticks: `` `https://api.oluwasetemi.dev/posts/${route.params.id}` ``
- Missing `useRoute()` import to access route parameters

**Solution:**

```typescript
// ✅ Import useRoute
import { useRoute } from "vue-router";
const route = useRoute();

// ✅ Use backticks for template string
const response = await fetch(
  `https://api.oluwasetemi.dev/posts/${route.params.id}`,
);
```

---

### Challenge 5: 404 Error on Vercel Deployment

**Problem:**

- Application works locally but shows 404 on Vercel
- Blog post routes (`/blogs/1`, `/blogs/2`) returned page not found

**Root Cause:**

- Vercel tried to find actual files for dynamic routes
- SPAs need special configuration to serve `index.html` for all routes
- Allows Vue Router to handle client-side routing

**Solution:**
Created `vercel.json` with rewrites configuration:

```json
{
  "buildCommand": "bun run build",
  "devCommand": "bun run dev",
  "installCommand": "bun install",
  "framework": "vite",
  "rewrites": [
    {
      "source": "/(.*)",
      "destination": "/"
    }
  ]
}
```

This tells Vercel to always serve `index.html`, letting Vue Router handle routing.

---

### Challenge 6: Tailwind v4 Breaking Changes

**Problem:**

- Gradient classes showing linting errors
- `bg-gradient-to-br` was deprecated

**Root Cause:**

- Tailwind CSS v4 changed gradient syntax
- Old syntax: `bg-gradient-to-*`
- New syntax: `bg-linear-to-*`

**Solution:**
Updated all gradient classes throughout components:

```
bg-gradient-to-br  → bg-linear-to-br
bg-gradient-to-r   → bg-linear-to-r
```

---

### Challenge 7: TypeScript Error with Error Handling

**Problem:**

- `'err' is of type 'unknown'` error when catching exceptions

**Root Cause:**

- TypeScript doesn't know the type of caught errors
- Need to check if error is instanceof Error

**Solution:**

```typescript
// ✅ Safe error handling
try {
  // ...
} catch (err) {
  error.value = err instanceof Error ? err.message : "An error occurred";
}
```

---

### Challenge 8: Error Type Declaration

**Problem:**

- `Type 'string' is not assignable to type 'null'`
- Error ref was initialized as `null` only

**Root Cause:**

- TypeScript ref was too restrictive: `ref(null)` infers type `null`
- Can't assign string value later

**Solution:**
Explicitly declare the type:

```typescript
// ❌ Wrong
const error = ref(null);

// ✅ Correct
const error = ref<string | null>(null);
```

---

## 🎨 Design Highlights

- **Dark Theme**: Slate-900 to slate-800 gradient backgrounds
- **Card Design**: Posts displayed as interactive cards with hover effects
- **Modern Colors**: Blue and cyan accent colors for CTAs
- **Responsive Grid**: 1 column (mobile) → 2 columns (tablet) → 3 columns (desktop)
- **Loading States**: Dedicated loading screens with proper UX
- **Error Handling**: Clear error messages with navigation options

---

## 📈 Learning Outcomes

Through building this project, I learned:

1. **Vue 3 & TypeScript**
   - Composition API with `<script setup>`
   - Type-safe component development
   - Interface definitions for data structures

2. **Vue Router**
   - Dynamic route parameters (`:id`)
   - RouterLink for navigation
   - useRoute() for accessing route parameters
   - Catch-all routes for error handling

3. **API Integration**
   - Fetching data with proper error handling
   - Understanding API response structures
   - Handling string IDs from APIs
   - Working with nested data structures

4. **Tailwind CSS v4**
   - New gradient syntax
   - Responsive design patterns
   - Utility-first CSS approach
   - Modern dark mode design

5. **Deployment & DevOps**
   - SPA routing considerations
   - Vercel configuration
   - Build optimization
   - Environment-specific setups

6. **Frontend Development**
   - Component composition
   - State management with refs
   - Lifecycle hooks (onMounted)
   - Conditional rendering with v-if, v-else

---

## 🌐 Deployment

This project is deployed on **Vercel** and configured with the `vercel.json` file to properly handle SPA routing.

### Deployment Steps:

1. Push code to GitHub
2. Connect repository to Vercel
3. Vercel automatically builds and deploys
4. Uses `vercel.json` configuration for proper routing

---

## 📝 Available Scripts

```bash
# Development server
bun run dev

# Build for production
bun run build

# Preview production build locally
bun run preview

# Type checking
bun run type-check

# Build and type check
bun run build:only
```

---

## 🤝 Contributing

This is a personal learning project. Feel free to fork and modify as needed.

---

## 📚 Resources Used

- [Vue.js 3 Documentation](https://vuejs.org/)
- [Vue Router Documentation](https://router.vuejs.org/)
- [Tailwind CSS Documentation](https://tailwindcss.com/)
- [TypeScript Documentation](https://www.typescriptlang.org/)
- [Vite Documentation](https://vitejs.dev/)
- [Vercel Documentation](https://vercel.com/docs)

---

## 🎓 Key Takeaways

✅ **Always understand your API response structure first** - Knowing that IDs are strings and responses are nested in a `data` object prevented many issues down the line.

✅ **Type safety is your friend** - TypeScript caught many issues early (type mismatches, missing imports).

✅ **Test locally before deploying** - The 404 issue on Vercel was easily prevented by understanding SPA routing needs.

✅ **Keep dependencies updated** - Tailwind CSS v4 changes required updating gradient syntax, showing importance of checking framework documentation.

✅ **Component structure matters** - Separating concerns (home.vue for listing, blogs.vue for details) makes code maintainable.

---

**Happy coding!** 🚀
