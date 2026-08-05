import { ImageResponse } from "next/og";
import { PROJECTS } from "@/data/projects";

export const runtime = "edge";

export const alt = "Detail Proyek — Robi Hardinata";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

type Props = {
  params: Promise<{ slug: string }>;
};

export default async function Image({ params }: Props) {
  const { slug } = await params;
  const project = PROJECTS.find((p) => p.slug === slug);

  const title = project?.title || "Detail Proyek";
  const category = project?.category || "Portofolio Digital";
  const year = project?.year || "2026";
  const client = project?.client || "Klien";
  const tech = project?.tech || ["Next.js", "TypeScript"];

  // Ensure absolute image URL for Next OG Satori renderer
  const rawImage = project?.image || "/projects/ikapa.jpg";
  const imageUrl = rawImage.startsWith("http")
    ? rawImage
    : `https://robihardinata.my.id${rawImage.startsWith("/") ? rawImage : `/${rawImage}`}`;

  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          backgroundColor: "#f6d4b1",
          padding: "60px 70px",
          fontFamily: "sans-serif",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Ambient Warm Glow */}
        <div
          style={{
            position: "absolute",
            top: "-150px",
            right: "-150px",
            width: "550px",
            height: "550px",
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(200,86,40,0.22) 0%, rgba(246,212,177,0) 70%)",
          }}
        />

        {/* Ambient Dark Accent Glow */}
        <div
          style={{
            position: "absolute",
            bottom: "-150px",
            left: "-150px",
            width: "450px",
            height: "450px",
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(43,33,27,0.06) 0%, rgba(246,212,177,0) 70%)",
          }}
        />

        {/* Left Section: Meta, Title, Description, Tech Stack */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            height: "100%",
            width: "60%",
            zIndex: 10,
          }}
        >
          {/* Top Category Badge & Info */}
          <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
              <div
                style={{
                  padding: "6px 16px",
                  borderRadius: "100px",
                  backgroundColor: "rgba(200, 86, 40, 0.12)",
                  border: "1px solid rgba(200, 86, 40, 0.35)",
                  color: "#c85628",
                  fontSize: "13px",
                  fontFamily: "monospace",
                  fontWeight: 700,
                  letterSpacing: "2px",
                  textTransform: "uppercase",
                }}
              >
                {category}
              </div>

              <div
                style={{
                  fontSize: "13px",
                  fontFamily: "monospace",
                  color: "rgba(43, 33, 27, 0.65)",
                  letterSpacing: "1px",
                }}
              >
                {year} • {client}
              </div>
            </div>

            {/* Title */}
            <div
              style={{
                fontSize: title.length > 25 ? "46px" : "56px",
                fontWeight: 800,
                color: "#2b211b",
                letterSpacing: "-1px",
                lineHeight: 1.1,
                textTransform: "uppercase",
                marginTop: "12px",
              }}
            >
              {title}
            </div>

            {/* Description */}
            <div
              style={{
                fontSize: "17px",
                color: "rgba(43, 33, 27, 0.75)",
                lineHeight: 1.5,
                marginTop: "8px",
                display: "-webkit-box",
                WebkitLineClamp: 3,
                overflow: "hidden",
              }}
            >
              {project?.description}
            </div>
          </div>

          {/* Bottom Tech Pills & Brand */}
          <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "8px", flexWrap: "wrap" }}>
              {tech.slice(0, 4).map((t, idx) => (
                <div
                  key={idx}
                  style={{
                    padding: "5px 12px",
                    borderRadius: "100px",
                    backgroundColor: "rgba(246, 212, 177, 0.8)",
                    border: "1px solid rgba(43, 33, 27, 0.2)",
                    color: "#c85628",
                    fontSize: "12px",
                    fontFamily: "monospace",
                  }}
                >
                  {t}
                </div>
              ))}
            </div>

            <div
              style={{
                fontSize: "13px",
                fontFamily: "monospace",
                color: "rgba(43, 33, 27, 0.6)",
                display: "flex",
                alignItems: "center",
                gap: "8px",
              }}
            >
              <span style={{ color: "#c85628", fontWeight: 900 }}>GERALDINE FIRDAUS</span>
              <span>• BACK-END DEVELOPER</span>
            </div>
          </div>
        </div>

        {/* Right Section: Project Screenshot Image Card Frame */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: "36%",
            height: "100%",
            zIndex: 10,
          }}
        >
          <div
            style={{
              display: "flex",
              width: "100%",
              height: "360px",
              borderRadius: "24px",
              border: "1px solid rgba(200, 86, 40, 0.3)",
              backgroundColor: "rgba(235, 208, 181, 0.9)",
              overflow: "hidden",
              boxShadow: "0 20px 50px rgba(43,33,27,0.15)",
              position: "relative",
            }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={imageUrl}
              alt={title}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
              }}
            />
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
