export default function Page() {
  return (
    <main style={{
      height: "100vh",
      background: "black",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      color: "#c8a24a",
      flexDirection: "column",
      fontFamily: "serif"
    }}>
      <h1>HOUSE OF GOLD</h1>
      <p style={{ opacity: 0.7 }}>A house devoted to sound, image and enduring ideas.</p>

      <button style={{
        marginTop: "40px",
        padding: "12px 24px",
        border: "1px solid #c8a24a",
        background: "transparent",
        color: "#c8a24a",
        cursor: "pointer"
      }}>
        Enter
      </button>
    </main>
  );
}