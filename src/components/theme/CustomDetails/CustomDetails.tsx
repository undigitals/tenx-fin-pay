import clsx from 'clsx';
import React, { useLayoutEffect, useRef, useState } from 'react';
import { SCustomDetails } from './CustomDetails.style';

export type ICustomDetailsProps = {
  summary: string;
  summaryIconURL?: string;
  children: React.ReactNode;
};

/**
 * Semantic React implementation of an animated "accordion".
 *
 * *Implementation notes*:
 *
 * - This component uses semantic `<details>` and `<summary>` markup; while `<details>`
 * element has the `open` attribute that controls whether the content is shown or hidden, this attribute
 * is not a robust styling hook since it doesn't work with CSS transitions. This is why we need to keep this attribute
 * set at all times, even when the content is hidden (and also prevent clicks on `<summary>` from changing this attribute's value),
 * and manually toggle `open` class and use that as a styling hook instead.
 * - Since animating height transitions from 0 to `auto` is still off-limits even with modern CSS, we have to work around that
 * by computing the actual height of the content and transitioning from 0 to that value. Because of this, the extra `<div>` wrapper
 * is required around the content; without it, the height would always be computed as 0.
 */
export const CustomDetails = ({ summary, summaryIconURL, children }: ICustomDetailsProps) => {
  const [open, setOpen] = useState(false);
  const contentRef = useRef<HTMLDivElement | null>(null);
  const [contentHeight, setContentHeight] = useState(0);

  useLayoutEffect(() => {
    if (contentRef.current) {
      if (!open) {
        setContentHeight(0);
      } else {
        setContentHeight(contentRef.current.clientHeight);
      }
    }
  }, [open, children]);

  const handleSummaryClick = (event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault();
    setOpen((prev) => !prev);
  };

  return (
    <SCustomDetails
      open
      className={clsx(open && 'open', summaryIconURL && 'with-icon')}
      style={
        {
          '--summaryIconURL': summaryIconURL && `url(${summaryIconURL})`,
          '--detailsContentHeight': `${contentHeight}px`,
        } as React.CSSProperties
      }
    >
      <summary onClick={handleSummaryClick}>
        <span>{summary}</span>
      </summary>
      <div>
        <div className="content" ref={contentRef}>
          {children}
        </div>
      </div>
    </SCustomDetails>
  );
};
