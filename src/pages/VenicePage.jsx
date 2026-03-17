function VenicePage() {
  return (
    <div className="venice-page" style={{ minHeight: '100vh', color: '#ffffff', background: '#242424', padding: '24px' }}>
      <header style={{ marginBottom: 24, paddingTop: 16 }}>
        <h1 style={{ color: '#ffffff', margin: 0 }}>Venise</h1>
      </header>

      <div style={{ display: 'grid', gridTemplateColumns: '60% 40%', gap: '18px', alignItems: 'start' }}>
        <section style={{ background: '#242424', border: '1px solid #242424', borderRadius: 10, padding: 20, minHeight: 400, justifySelf: 'start' }}>
          <h2>Article sur Venise</h2>
          <p>Venise, située dans le nord-est de l'Italie, est construite sur un groupe de 118 petites îles séparées par des canaux et reliées par des ponts.</p>
          <p>Pour l’instant, cette partie contient du texte statique. Tu pourras y insérer des contenus dynamiques (photos, textes, vidéos) rapidement.</p>
          <p>Exemple de structure d’article:</p>
          <ul>
            <li>Histoire de la ville</li>
            <li>Monuments principaux</li>
            <li>Itinéraire recommandé</li>
          </ul>
          <p>Retour au globe : <a href="/" style={{ color: '#5bbcff' }}>clique ici</a></p>
        </section>

        <aside style={{ background: '#242424', border: '1px dashed #c8c8c8', borderRadius: 10, minHeight: 400, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#333', justifySelf: 'end' }}>
          <div style={{ textAlign: 'center', padding: '24px' }}>
            <h2 style={{ color: '#ffffff' }}>3D Placeholder</h2>
            <p style={{ color: '#ffffff' }}>(Ici l’objet 3D viendra plus tard)</p>
            <div style={{ marginTop: 20, width: 180, height: 120, border: '1px solid #ccc', borderRadius: 6, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <span style={{ color: '#666' }}>3D View</span>
            </div>
          </div>
        </aside>
      </div>

      <footer style={{ textAlign: 'center', marginTop: 24 }}>
        <p style={{ margin: 0, color: '#ffffff' }}>Retour au globe : <a href="/" style={{ color: '#5bbcff' }}>clique ici</a></p>
      </footer>
    </div>
  )
}

export default VenicePage;
