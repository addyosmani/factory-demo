export function SetupNotice() {
  return (
    <section className="setup page-shell">
      <p className="eyebrow">One minute of setup</p>
      <h1>Add your TMDB API key</h1>
      <p>Reel Good keeps the key on the server. Copy the example file, add your own key, and restart the development server.</p>
      <pre><code>cp .env.example .env.local{`\n`}# edit TMDB_API_KEY in .env.local{`\n`}npm run dev</code></pre>
      <p className="setup-note">Need a key? Apply from the API section of your TMDB account settings. The local file is ignored by Git.</p>
    </section>
  );
}
