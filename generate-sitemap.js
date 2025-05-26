// Generate a sitemap.xml file for a website hosted on GitHub Pages

const fs = require("fs");
const path = require("path");

// Your list of URLs
const pages = [
  { loc: "/", priority: "1.0" },
  { loc: "/Rhythm-Maker.html", priority: "0.9" },
  { loc: "/Jack-Selleck-Portfolio-My-Skills.html", priority: "0.8" },
  { loc: "/Jack-Selleck-Portfolio-Krungus.html", priority: "0.8" },
  { loc: "/Inertia.html", priority: "0.8"  },
  { loc: "/About-Me.html", priority: "0.8"  }
];

const baseUrl = "https://www.jackselleck.com";
const today = new Date().toISOString().split("T")[0];

let sitemap = `<?xml version="1.0" encoding="UTF-8"?>\n`;
sitemap += `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n`;

pages.forEach(page => {
  sitemap += `  <url>\n`;
  sitemap += `    <loc>${baseUrl}${page.loc}</loc>\n`;
  sitemap += `    <lastmod>${today}</lastmod>\n`;
  if (page.priority) {
    sitemap += `    <priority>${page.priority}</priority>\n`;
  }
  sitemap += `  </url>\n`;
});

sitemap += `</urlset>\n`;

// Save to root or docs folder depending on GitHub Pages setup
fs.writeFileSync("sitemap.xml", sitemap);
console.log("✅ sitemap.xml generated");