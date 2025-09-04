import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

interface SEOHeadProps {
  title?: string;
  description?: string;
  keywords?: string;
  ogImage?: string;
  canonical?: string;
}

const SEOHead = ({ 
  title = "Lion Calculator - Premium Calculator Tools", 
  description = "Experience the next generation of calculation tools. Precision meets elegance in our collection of premium calculators designed for the modern world.",
  keywords = "calculator, age calculator, BMI calculator, currency converter, days calculator, countdown timer, GPA calculator, calorie calculator, sleep calculator, pregnancy calculator",
  ogImage = "/og-image.png",
  canonical
}: SEOHeadProps) => {
  const location = useLocation();
  const currentUrl = `${window.location.origin}${location.pathname}`;
  const canonicalUrl = canonical || currentUrl;

  useEffect(() => {
    // Update document title
    document.title = title;

    // Update meta description
    let metaDescription = document.querySelector('meta[name="description"]');
    if (!metaDescription) {
      metaDescription = document.createElement('meta');
      metaDescription.setAttribute('name', 'description');
      document.head.appendChild(metaDescription);
    }
    metaDescription.setAttribute('content', description);

    // Update meta keywords
    let metaKeywords = document.querySelector('meta[name="keywords"]');
    if (!metaKeywords) {
      metaKeywords = document.createElement('meta');
      metaKeywords.setAttribute('name', 'keywords');
      document.head.appendChild(metaKeywords);
    }
    metaKeywords.setAttribute('content', keywords);

    // Update canonical link
    let canonicalLink = document.querySelector('link[rel="canonical"]');
    if (!canonicalLink) {
      canonicalLink = document.createElement('link');
      canonicalLink.setAttribute('rel', 'canonical');
      document.head.appendChild(canonicalLink);
    }
    canonicalLink.setAttribute('href', canonicalUrl);

    // Update Open Graph tags
    const ogTags = [
      { property: 'og:title', content: title },
      { property: 'og:description', content: description },
      { property: 'og:image', content: ogImage },
      { property: 'og:url', content: currentUrl },
      { property: 'og:type', content: 'website' },
      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'twitter:title', content: title },
      { name: 'twitter:description', content: description },
      { name: 'twitter:image', content: ogImage },
    ];

    ogTags.forEach(tag => {
      const property = tag.property || tag.name;
      const attribute = tag.property ? 'property' : 'name';
      
      let existingTag = document.querySelector(`meta[${attribute}="${property}"]`);
      if (!existingTag) {
        existingTag = document.createElement('meta');
        existingTag.setAttribute(attribute, property);
        document.head.appendChild(existingTag);
      }
      existingTag.setAttribute('content', tag.content);
    });

    // Update structured data
    let structuredData = document.querySelector('#structured-data');
    if (!structuredData) {
      structuredData = document.createElement('script');
      structuredData.setAttribute('type', 'application/ld+json');
      structuredData.setAttribute('id', 'structured-data');
      document.head.appendChild(structuredData);
    }

    const jsonLd = {
      "@context": "https://schema.org",
      "@type": "WebApplication",
      "name": "Lion Calculator",
      "description": description,
      "url": currentUrl,
      "applicationCategory": "UtilityApplication",
      "operatingSystem": "Web Browser",
      "offers": {
        "@type": "Offer",
        "price": "0",
        "priceCurrency": "USD"
      },
      "publisher": {
        "@type": "Organization",
        "name": "Lion Calculator"
      }
    };

    structuredData.textContent = JSON.stringify(jsonLd);
  }, [title, description, keywords, ogImage, canonicalUrl, location.pathname]);

  return null;
};

export default SEOHead;