import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import { Header } from './Header';

vi.mock('next/head', () => {
  return {
    __esModule: true,
    default: ({ children }: { children: React.ReactNode }) => {
      return <div data-testid="head">{children}</div>;
    },
  };
});

describe('Header', () => {
  it('renders with title', () => {
    const title = 'Test Title';
    const { container } = render(<Header title={title} />);

    // Check title element exists
    const titleElement = container.querySelector('title');
    expect(titleElement).toBeTruthy();
    expect(titleElement?.textContent).toBe(title);

    // Check required meta tags exist
    expect(container.querySelector('meta[httpEquiv="X-UA-Compatible"]')).toBeTruthy();
    expect(container.querySelector('meta[name="viewport"]')).toBeTruthy();
    expect(container.querySelector('meta[name="theme-color"]')).toBeTruthy();

    // Check required links exist
    expect(container.querySelector('link[rel="manifest"]')).toBeTruthy();
    expect(container.querySelector('link[href="/static/styles/reset.css"]')).toBeTruthy();
    expect(container.querySelector('link[href="/static/styles/login.css"]')).toBeTruthy();

    // Check font links
    expect(container.querySelector('link[href*="fonts.googleapis.com/css?family=Lato"]')).toBeTruthy();
    expect(container.querySelector('link[href*="fonts.googleapis.com/css?family=Roboto"]')).toBeTruthy();

    // Check favicon links
    expect(container.querySelector('link[rel="apple-touch-icon"]')).toBeTruthy();
    expect(container.querySelector('link[rel="icon"][sizes="32x32"]')).toBeTruthy();
    expect(container.querySelector('link[rel="icon"][sizes="16x16"]')).toBeTruthy();
    expect(container.querySelector('link[rel="shortcut icon"]')).toBeTruthy();

    // Check social meta tags
    expect(container.querySelector('meta[property="og:title"]')).toBeTruthy();
    expect(container.querySelector('meta[property="og:description"]')).toBeTruthy();
    expect(container.querySelector('meta[name="twitter:card"]')).toBeTruthy();
    expect(container.querySelector('meta[name="twitter:title"]')).toBeTruthy();
  });

  it('renders children content', () => {
    const { container } = render(
      <Header title="Test">
        <meta name="custom" content="test" />
      </Header>
    );

    expect(container.querySelector('meta[name="custom"]')).toBeTruthy();
  });
});
