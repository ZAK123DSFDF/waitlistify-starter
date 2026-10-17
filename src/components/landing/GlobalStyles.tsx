// src/components/landing/GlobalStyles.tsx
export function GlobalStyles() {
	return (
		<style
			dangerouslySetInnerHTML={{
				__html: `
      * { margin: 0; padding: 0; box-sizing: border-box; }
      body { font-family: 'Inter', system-ui, sans-serif; }
      @keyframes pulse { 0%,100%{opacity:1;transform:scale(1)} 50%{opacity:.5;transform:scale(.8)} }
      a { cursor: pointer; }
      button { font-family: inherit; }
      .landing-page { width: 100%; min-width: 0; }
      .landing-page table { min-width: 620px; display: block; overflow-x: auto; }
      @media (max-width: 767px) {
        .landing-page nav .landing-nav-inner { height: auto; min-height: 60px; gap: .5rem; }
        .landing-page nav .landing-nav-inner > div:nth-child(2) { display: none !important; }
        .landing-page nav .landing-nav-inner > div:last-child { gap: .25rem !important; }
        .landing-page nav .landing-nav-inner > div:last-child a { padding-inline: .65rem !important; white-space: nowrap; }
        .landing-page .landing-hero-actions { flex-direction: column; align-items: stretch !important; }
        .landing-page .landing-hero-actions a { justify-content: center; width: 100%; }
        .landing-page .landing-cta-panel { padding: 2.5rem 1.25rem !important; }
        .landing-page .landing-footer-inner { flex-wrap: wrap; justify-content: center !important; gap: 1rem !important; }
        .landing-page section { padding-block: 3.25rem !important; }
      }
      @media (max-width: 420px) {
        .landing-page nav .landing-nav-inner > div:last-child > a:first-child { display: none; }
        .landing-page h1 { font-size: clamp(2.15rem, 12vw, 3rem) !important; }
      }
    `,
			}}
		/>
	)
}
