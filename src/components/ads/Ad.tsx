import React, { FunctionComponent, useEffect } from "react";
import { ADSENSE_CLIENT, ADSENSE_SLOT } from "../../lib/google/constants";

export type AdFormat = "auto" | "fluid";

export interface AdProps {
  className?: string;
  format?: AdFormat,
  layoutKey: string,
}

const Ad: FunctionComponent<AdProps> = ({
  className = "adsbygoogle",
  format = "auto",
  layoutKey,
}) => {
  useEffect(() => {
    if (typeof window !== "undefined") {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      ((window as any).adsbygoogle = (window as any).adsbygoogle || []).push({});
    }
  }, []);

  return (
    <ins
      className={className}
      css={{
        display: "block",
        backgroundColor: "var(--skeleton-base)",
      }}
      data-ad-format={format}
      data-ad-layout-key={layoutKey}
      data-ad-client={ADSENSE_CLIENT}
      data-ad-slot={ADSENSE_SLOT}
    />
  );
};

export default Ad;
