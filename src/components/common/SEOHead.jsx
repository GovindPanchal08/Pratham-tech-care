import { Helmet } from 'react-helmet-async';
import { SITE_CONFIG } from '../../constants/siteConfig';

export default function SEOHead({ title, description, keywords, ogImage, canonical }) {
  const fullTitle = title || `${SITE_CONFIG.name} — Enterprise IT Solutions`;
  const fullDesc = description || SITE_CONFIG.description;
  const image = ogImage || `${SITE_CONFIG.url}/og/default.jpg`;
  const url = canonical || SITE_CONFIG.url;

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={fullDesc} />
      {keywords && <meta name="keywords" content={keywords} />}
      <link rel="canonical" href={url} />

      {/* Open Graph */}
      <meta property="og:type" content="website" />
      <meta property="og:url" content={url} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={fullDesc} />
      <meta property="og:image" content={image} />
      <meta property="og:site_name" content={SITE_CONFIG.name} />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={fullDesc} />
      <meta name="twitter:image" content={image} />

      {/* Structured Data */}
      <script type="application/ld+json">
        {JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'Organization',
          name: SITE_CONFIG.name,
          url: SITE_CONFIG.url,
          telephone: SITE_CONFIG.phone,
          email: SITE_CONFIG.email,
          address: {
            '@type': 'PostalAddress',
            streetAddress: SITE_CONFIG.address.line1,
            addressLocality: SITE_CONFIG.address.city,
            addressRegion: SITE_CONFIG.address.state,
            postalCode: SITE_CONFIG.address.pin,
            addressCountry: 'IN',
          },
        })}
      </script>
    </Helmet>
  );
}
