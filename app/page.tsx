import Header from "./components/Header";

export default function Home() {
  return (
    <div className="min-h-screen bg-white" style={{
      fontFamily: 'var(--font-montserrat), sans-serif',
      fontWeight: 300,
      color: '#333'
    }}>
      {/* Header (Client Component) */}
      <Header />

      {/* Hero Section */}
      <section className="min-h-screen flex items-center justify-center px-6 md:px-12">
        <div className="max-w-3xl">
          <p className="text-5xl md:text-6xl lg:text-7xl mb-6 leading-tight"
             style={{
               fontFamily: 'var(--font-playfair), serif',
               fontWeight: 300,
               color: '#333'
             }}>
            I chase dreams.
          </p>

          <div className="space-y-6 text-base md:text-lg" style={{ color: '#666', lineHeight: 1.7 }}>
            <p>
              I build 24/7/365
            </p>

            <p>
              Was the kid taking calls in the bathrooms during high school
            </p>

            <p>
              Now studying & building @ the University of Pennsylvania
            </p>

            <p>
              At 16, my project was acquired by the United Nations
            </p>

            <p>
              At 17, I recieved international acclaim building <a href="https://17.jasonxu.me" target="_blank" rel="noopener noreferrer" className="inline-link">17.JasonXu.me</a>
             </p>

            <p>
               At 19, I was #2 founding eng at <a href="https://icon.com" target="_blank" rel="noopener noreferrer" className="inline-link">Icon.com</a> ($10M+ ARR)
            </p>


            <p>
              I'm 20 now and looking for my next challenge
            </p>
          </div>

          <h2>
          <a href="mailto:him@jasonxu.me"
            rel="noopener noreferrer"
             className="text-2xl md:text-3xl lg:text-3xl mt-6 leading-tight inline-block"
             style={{
               fontFamily: 'var(--font-playfair), serif',
               fontWeight: 300,
               color: '#333',
               textDecoration: 'none',
               transformOrigin: 'left center'
             }}>
            him@jasonxu.me
          </a>
          </h2>
        </div>
      </section>
    </div>
  );
}
