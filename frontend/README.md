# Frontend

Next.js + Tailwind + shadcn/ui. Renders the site only; the chat sends each question to the backend in `../backend`.

```bash
npm install
cp .env.example .env.local   # NEXT_PUBLIC_API_URL, defaults to http://localhost:8000
npm run dev
```

Text for the static sections lives in `content/site.ts`. The chat UI is `components/chat/Chat.tsx`.
