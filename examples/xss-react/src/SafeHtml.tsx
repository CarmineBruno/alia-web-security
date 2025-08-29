import React from 'react';
import DOMPurify from 'dompurify';

// This function will render HTML safely using DOMPurify
function SafeHtml({ element, html }: { element: string; html: string }) {
  return React.createElement(element, {
    dangerouslySetInnerHTML: { __html: DOMPurify.sanitize(html) },
  });
}

export default SafeHtml;
