import { useEffect } from 'react';

/**
 * Sets document <title> and updates/creates <meta> tags for SEO.
 * @param {{ title: string, description?: string, image?: string, url?: string }} options
 */
const useSEO = ({ title, description, image, url }) => {
  useEffect(() => {
    const siteName = 'Garvita Infrastructure';
    const fullTitle = title ? `${title} | ${siteName}` : siteName;
    document.title = fullTitle;

    const setMeta = (selector, attribute, value) => {
      if (!value) return;
      let el = document.querySelector(selector);
      if (!el) {
        el = document.createElement('meta');
        const [attrKey, attrVal] = selector.replace('meta[', '').replace(/\]/g, '').split('=');
        el.setAttribute(attrKey, attrVal.replace(/"/g, ''));
        document.head.appendChild(el);
      }
      el.setAttribute(attribute, value);
    };

    setMeta('meta[name="description"]', 'content', description);
    setMeta('meta[property="og:title"]', 'content', fullTitle);
    setMeta('meta[property="og:description"]', 'content', description);
    setMeta('meta[property="og:image"]', 'content', image || '/Logo.png');
    setMeta('meta[property="og:url"]', 'content', url || window.location.href);
    setMeta('meta[name="twitter:title"]', 'content', fullTitle);
    setMeta('meta[name="twitter:description"]', 'content', description);
    setMeta('meta[name="twitter:image"]', 'content', image || '/Logo.png');
  }, [title, description, image, url]);
};

export default useSEO;
