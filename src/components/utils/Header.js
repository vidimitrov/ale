import * as React from 'react';
import Head from 'next/head';

export const Header = ({
  children,
  title,
}) => {
  return (
    <Head>
      <meta httpEquiv='X-UA-Compatible' content='IE=edge,chrome=1' />
      <title>{title}</title>
      <link href='/static/styles/reset.css' media='all' rel='stylesheet' />
      <meta name='viewport' content='initial-scale=1.0, width=device-width' />
      <link rel='manifest' href='/static/manifest.json' />
      <meta name='google-site-verification' content='HiyG9aTgRvcr-zl5c2aerEFiEFgDWQpvmvSD3xPn4dw' />

      <meta name='renderer' content='webkit' />
      <meta httpEquiv='Cache-Control' content='no-siteapp' />

      {/* Find a way to load this async */}
      <link href='https://fonts.googleapis.com/css?family=Lato:400,700'
        rel='stylesheet'
        type='text/css' />

      <link rel='apple-touch-icon'
        sizes='180x180'
        href='/static/images/icons/apple-touch-icon.png' />
      <link rel='icon'
        type='image/png'
        sizes='32x32'
        href='/static/images/icons/favicon-32x32.png' />
      <link rel='icon'
        type='image/png'
        sizes='16x16'
        href='/static/images/icons/favicon-16x16.png' />

      <link rel='mask-icon' href='/static/images/icons/safari-pinned-tab.svg' color='#5bbad5' />
      <link rel='shortcut icon' href='/static/images/icons/favicon.ico' />

      <meta name='theme-color' content='#ffffff' />
      <link rel='manifest' href='/static/manifest.json' />
      <meta name='mobile-web-app-capable' content='yes' />

      <meta name='apple-mobile-web-app-capable' content='yes' />
      <meta name='apple-mobile-web-app-status-bar-style' content='black' />
      <meta name='apple-mobile-web-app-title' content='<%- app.name %>' />
      <meta name='msapplication-config' content='/static/images/icons/browserconfig.xml' />

      {/*  Google+ Facebook */}
      <meta property='og:image' content='/static/images/seemba-logo.png' />
      <meta property='og:description' content='Search places around you with Seemba Aggregator' />
      <meta property='og:url' content='http://seem.ba' />
      <meta property='og:title' content='Seemba Aggregator' />
      {/*<meta property='fb:app_id' content='FB_APP_ID' /> */}

      {/* Youtube */}
      <meta {...{ itemProp: 'name' }} content='Seemba Aggregator' />
      <meta {...{ itemProp: 'description' }}
        content='Search places around you with Seemba Aggregator' />
      <meta {...{ itemProp: 'image' }} content='/static/images/seemba-logo.png' />

      {/* Twitter */}
      <meta name='twitter:card' content='summary' />
      <meta name='twitter:title' content='Seemba Aggregator' />
      <meta name='twitter:description'
        content='Search places around you with Seemba Aggregator' />
      <meta name='twitter:image' content='/static/images/seemba-logo.png' />
    </Head>
  )
};
