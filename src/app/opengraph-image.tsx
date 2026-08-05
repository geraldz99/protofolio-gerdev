import { ImageResponse } from "next/og";

export const runtime = "edge";

export const alt = "Geraldine Firdaus — Back-End Developer & Full-Stack Engineer";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          justifyContent: "space-between",
          backgroundColor: "#f6d4b1",
          padding: "80px",
          fontFamily: "sans-serif",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Ambient Warm Glow in Top-Right Corner */}
        <div
          style={{
            position: "absolute",
            top: "-150px",
            right: "-150px",
            width: "500px",
            height: "500px",
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(200,86,40,0.25) 0%, rgba(246,212,177,0) 70%)",
          }}
        />

        {/* Top Bar: Logo & Tag */}
        <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
          {/* Logo Container */}
          <div
            style={{
              width: "60px",
              height: "60px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              borderRadius: "16px",
              backgroundColor: "rgba(200, 86, 40, 0.12)",
              border: "1px solid rgba(200, 86, 40, 0.3)",
            }}
          >
            <div
              style={{
                fontSize: "28px",
                fontWeight: "900",
                color: "#c85628",
              }}
            >
              GF
            </div>
          </div>

          <div
            style={{
              fontSize: "16px",
              fontFamily: "monospace",
              color: "#c85628",
              letterSpacing: "4px",
              textTransform: "uppercase",
              fontWeight: 600,
            }}
          >
            01 // PORTOFOLIO RESMI
          </div>
        </div>

        {/* Middle Main Content */}
        <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          <div
            style={{
              fontSize: "64px",
              fontWeight: 800,
              color: "#2b211b",
              letterSpacing: "-2px",
              lineHeight: 1.1,
            }}
          >
            Geraldine Firdaus
          </div>

          <div
            style={{
              fontSize: "32px",
              fontWeight: 600,
              color: "#c85628",
              letterSpacing: "-0.5px",
            }}
          >
            Back-End & Full-Stack Developer
          </div>

          <div
            style={{
              fontSize: "18px",
              color: "rgba(43, 33, 27, 0.8)",
              maxWidth: "850px",
              lineHeight: 1.5,
              marginTop: "8px",
            }}
          >
            Pengalaman mengembangkan aplikasi web dan mobile menggunakan PHP, Node.js (Express), Android (Kotlin), Golang (Fiber), dan database PostgreSQL & MySQL.
          </div>
        </div>

        {/* Bottom Bar: Domain Badge & Location */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            width: "100%",
            paddingTop: "30px",
            borderTop: "1px solid rgba(43, 33, 27, 0.15)",
          }}
        >
          <div
            style={{
              fontSize: "18px",
              fontFamily: "monospace",
              color: "#c85628",
              fontWeight: 700,
            }}
          >
            https://github.com/geraldz99
          </div>

          <div
            style={{
              fontSize: "16px",
              fontFamily: "monospace",
              color: "rgba(43, 33, 27, 0.6)",
            }}
          >
            INDONESIA
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
