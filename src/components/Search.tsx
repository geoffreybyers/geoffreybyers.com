import { useEffect, useState } from "preact/hooks";

type Hit = {
  url: string;
  meta: { title: string };
  excerpt: string;
};

declare global {
  interface Window {
    pagefind?: {
      search: (q: string) => Promise<{ results: Array<{ data: () => Promise<Hit> }> }>;
    };
  }
}

export default function Search() {
  const [query, setQuery] = useState("");
  const [hits, setHits] = useState<Hit[]>([]);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        // @ts-expect-error — Pagefind is emitted at /pagefind/pagefind.js at build time
        const pf = await import(/* @vite-ignore */ "/pagefind/pagefind.js");
        window.pagefind = pf;
        setReady(true);
      } catch {
        setReady(false);
      }
    })();
  }, []);

  useEffect(() => {
    if (!ready || query.trim().length < 2) {
      setHits([]);
      return;
    }
    let cancelled = false;
    (async () => {
      const pf = window.pagefind;
      if (!pf) return;
      const res = await pf.search(query);
      const data = await Promise.all(res.results.slice(0, 10).map((r) => r.data()));
      if (!cancelled) setHits(data);
    })();
    return () => {
      cancelled = true;
    };
  }, [query, ready]);

  return (
    <div>
      <input
        type="search"
        placeholder={ready ? "Search posts and work..." : "Loading search..."}
        value={query}
        onInput={(e) => setQuery((e.target as HTMLInputElement).value)}
        disabled={!ready}
        class="w-full border border-[var(--rule)] rounded-sm bg-[var(--surface)] px-4 py-3 text-[1.0625rem] text-[var(--fg)] placeholder:text-[var(--fg-subtle)] focus:border-[var(--accent)] focus:outline-none"
      />
      {query.trim().length >= 2 && hits.length === 0 && ready && (
        <p class="mt-6 text-[var(--fg-muted)]">No results.</p>
      )}
      {hits.length > 0 && (
        <ul class="mt-8 divide-y divide-[var(--rule)] border-t border-[var(--rule)]">
          {hits.map((hit) => (
            <li class="py-5">
              <a href={hit.url} class="group block">
                <h3 class="text-[1.0625rem] font-medium text-[var(--fg)] underline-grow">
                  {hit.meta.title}
                </h3>
                <p
                  class="mt-1 text-[0.875rem] text-[var(--fg-muted)]"
                  dangerouslySetInnerHTML={{ __html: hit.excerpt }}
                />
              </a>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
