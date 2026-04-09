import { useState, useRef } from "react";
import axios from "axios";

export default function App() {
  const [file, setFile]       = useState(null);
  const [isVideo, setIsVideo] = useState(false);
  const [result, setResult]   = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError]     = useState(null);
  const inputRef              = useRef();

  const handleFile = (selected) => {
    if (!selected) return;
    setFile(selected);
    setIsVideo(selected.type.startsWith("video"));
    setResult(null);
    setError(null);
  };

  const handleDetect = async () => {
    if (!file) return;
    setLoading(true);
    setError(null);
    setResult(null);

    const formData = new FormData();
    formData.append("file", file);

    const endpoint = isVideo
      ? "http://127.0.0.1:8000/predict-video"
      : "http://127.0.0.1:8000/predict-image";

    try {
      const res = await axios.post(endpoint, formData, { responseType: "blob" });
      setResult(URL.createObjectURL(res.data));
    } catch (err) {
      setError(err.response?.data?.detail ?? "Server error — is the backend running?");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.root}>

      {/* ── Header ── */}
      <div style={styles.header}>
        <h1 style={styles.h1}>Recon</h1>
        <p style={styles.subtitle}>Valorant object detector — enemies, teammates & spikes</p>
      </div>

      {/* ── Upload zone ── */}
      <div
        style={styles.uploadZone}
        onClick={() => inputRef.current.click()}
        onDragOver={(e) => e.preventDefault()}
        onDrop={(e) => { e.preventDefault(); handleFile(e.dataTransfer.files[0]); }}
      >
        <input
          ref={inputRef}
          type="file"
          accept="image/*,video/*"
          style={{ display: "none" }}
          onChange={(e) => handleFile(e.target.files[0])}
        />
        <UploadIcon />
        {file ? (
          <div style={styles.filePill}>
            <span style={{ ...styles.dot, background: isVideo ? "#D4537E" : "#378ADD" }} />
            {file.name}
          </div>
        ) : (
          <>
            <p style={styles.uploadLabel}>Drop file here or click to browse</p>
            <p style={styles.uploadSub}>Images (PNG, JPG) or video (MP4, AVI)</p>
          </>
        )}
      </div>

      {/* ── Image / Video toggle ── */}
      {file && (
        <div style={styles.typeRow}>
          <button
            style={{ ...styles.typeChip, ...(isVideo ? {} : styles.chipActiveImg) }}
            onClick={() => setIsVideo(false)}
          >Image</button>
          <button
            style={{ ...styles.typeChip, ...(isVideo ? styles.chipActiveVid : {}) }}
            onClick={() => setIsVideo(true)}
          >Video</button>
        </div>
      )}

      {/* ── Detect button ── */}
      <button
        style={{ ...styles.detectBtn, opacity: (!file || loading) ? 0.4 : 1 }}
        disabled={!file || loading}
        onClick={handleDetect}
      >
        {loading ? "Running detection…" : "Run detection"}
      </button>

      {/* ── Error ── */}
      {error && <p style={styles.error}>{error}</p>}

      {/* ── Result ── */}
      {result && (
        <div style={styles.resultBox}>
          <div style={styles.resultHeader}>
            <strong style={styles.resultTitle}>Detection result</strong>
            <span style={{ ...styles.badge, ...(isVideo ? styles.badgeVid : styles.badgeImg) }}>
              {isVideo ? "Video" : "Image"}
            </span>
          </div>

          {isVideo ? (
            <video controls style={styles.media}>
              <source src={result} type="video/mp4" />
            </video>
          ) : (
            <img src={result} alt="Detection result" style={styles.media} />
          )}

          <div style={styles.downloadRow}>
            <a
              href={result}
              download={isVideo ? "recon_result.mp4" : "recon_result.jpg"}
              style={styles.dlBtn}
            >
              ↓ Download
            </a>
          </div>
        </div>
      )}
    </div>
  );
}

function UploadIcon() {
  return (
    <svg width="36" height="36" viewBox="0 0 36 36" fill="none" style={{ margin: "0 auto 12px", display: "block", opacity: 0.4 }}>
      <rect x="4" y="22" width="28" height="10" rx="3" fill="currentColor" opacity="0.3" />
      <path d="M18 4v18M11 11l7-7 7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

const styles = {
  root: {
    maxWidth: 680,
    margin: "0 auto",
    padding: "2.5rem 1.5rem",
    fontFamily: "system-ui, sans-serif",
  },
  header: { marginBottom: "2rem" },
  h1: { fontSize: 26, fontWeight: 600, margin: 0, letterSpacing: "-0.4px" },
  subtitle: { fontSize: 14, color: "#888", marginTop: 4 },

  uploadZone: {
    border: "1.5px dashed #ddd",
    borderRadius: 12,
    background: "#fafafa",
    padding: "2.5rem 1.5rem",
    textAlign: "center",
    cursor: "pointer",
  },
  uploadLabel: { fontSize: 15, fontWeight: 500, margin: "0 0 4px" },
  uploadSub:   { fontSize: 13, color: "#999", margin: 0 },
  filePill: {
    display: "inline-flex", alignItems: "center", gap: 8,
    background: "#fff", border: "1px solid #eee", borderRadius: 8,
    padding: "6px 12px", marginTop: 8, fontSize: 13,
  },
  dot: { width: 7, height: 7, borderRadius: "50%", flexShrink: 0 },

  typeRow: { display: "flex", gap: 8, marginTop: "1.25rem" },
  typeChip: {
    flex: 1, padding: "8px 0", fontSize: 13, fontWeight: 500,
    borderRadius: 8, border: "1px solid #ddd", background: "#fff",
    color: "#999", cursor: "pointer", textAlign: "center",
  },
  chipActiveImg: { borderColor: "#378ADD", color: "#185FA5", background: "#E6F1FB" },
  chipActiveVid: { borderColor: "#D4537E", color: "#993556", background: "#FBEAF0" },

  detectBtn: {
    width: "100%", marginTop: "1rem", padding: "11px 0",
    fontSize: 15, fontWeight: 600, borderRadius: 8,
    border: "none", background: "#111", color: "#fff",
    cursor: "pointer", transition: "opacity 0.15s",
  },

  error: { fontSize: 13, color: "#c0392b", marginTop: "0.75rem" },

  resultBox: {
    marginTop: "1.5rem", borderRadius: 12,
    border: "1px solid #eee", overflow: "hidden", background: "#fafafa",
  },
  resultHeader: {
    display: "flex", justifyContent: "space-between", alignItems: "center",
    padding: "10px 14px", borderBottom: "1px solid #eee",
  },
  resultTitle: { fontSize: 14, fontWeight: 600 },
  badge: { fontSize: 11, fontWeight: 600, padding: "3px 8px", borderRadius: 6 },
  badgeImg: { background: "#E6F1FB", color: "#185FA5" },
  badgeVid: { background: "#FBEAF0", color: "#993556" },
  media: { width: "100%", display: "block" },
  downloadRow: { padding: "10px 14px", display: "flex", justifyContent: "flex-end" },
  dlBtn: {
    fontSize: 13, fontWeight: 500,
    padding: "6px 14px", borderRadius: 8,
    border: "1px solid #ddd", background: "#fff",
    color: "#111", textDecoration: "none",
  },
};