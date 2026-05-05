import { useEffect } from "react";

/**
 * SEO Head Component - Updates document head dynamically per page
 * This helps search engines understand each page's unique content
 */
function SEOHead({ title, description, path = "/" }) {
  useEffect(() => {
    // Update page title
    document.title = title;

    // Update or create meta description
    let metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute("content", description);
    }

    // Update canonical URL
    let canonical = document.querySelector('link[rel="canonical"]');
    if (canonical) {
      canonical.setAttribute("href", `https://lussixuss.vercel.app${path}`);
    }

    // Update Open Graph tags
    const ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle) ogTitle.setAttribute("content", title);

    const ogDesc = document.querySelector('meta[property="og:description"]');
    if (ogDesc) ogDesc.setAttribute("content", description);

    const ogUrl = document.querySelector('meta[property="og:url"]');
    if (ogUrl) ogUrl.setAttribute("content", `https://lussixuss.vercel.app${path}`);

    // Update Twitter tags
    const twTitle = document.querySelector('meta[name="twitter:title"]');
    if (twTitle) twTitle.setAttribute("content", title);

    const twDesc = document.querySelector('meta[name="twitter:description"]');
    if (twDesc) twDesc.setAttribute("content", description);
  }, [title, description, path]);

  return null;
}

export default SEOHead;
