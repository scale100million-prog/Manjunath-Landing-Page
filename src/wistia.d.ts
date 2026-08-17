import * as React from 'react';

declare module 'react' {
  namespace JSX {
    interface IntrinsicElements {
      'wistia-player': React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement>,
        HTMLElement
      > & { 'media-id'?: string; aspect?: string };
    }
  }
}

declare global {
  interface Window {
    _wq?: any[];
    fbq?: (...args: any[]) => void;
    _fbq?: any;
  }

  namespace React {
    namespace JSX {
      interface IntrinsicElements {
        'wistia-player': React.DetailedHTMLProps<
          React.HTMLAttributes<HTMLElement>,
          HTMLElement
        > & { 'media-id'?: string; aspect?: string };
      }
    }
  }
}

export {};
