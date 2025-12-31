'use client';

import Script from 'next/script';
import { Card } from '@/components/ui/card';

type VideoEmbedProps = {
  id: string;
  aspectRatio: string;
};

export function VideoEmbed({ id }: Omit<VideoEmbedProps, 'aspectRatio'>) {
  // Force a 16:9 aspect ratio for uniform height
  const paddingTop = (9 / 16) * 100;

  // The script URL doesn't actually need the aspect ratio to function correctly.
  // We can simplify by just passing the ID.
  const scriptSrc = `https://go.screenpal.com/consumption/player_appearance/${id}/1.777778`;
  const iframeSrc = `https://go.screenpal.com/player/${id}?ff=1&title=0`;

  return (
    <Card className="bg-card/50 overflow-hidden">
      <div
        className="sp-embed-player"
        data-id={id}
        style={{ position: 'relative', width: '100%', paddingTop: `${paddingTop}%`, height: 0 }}
      >
        <Script src={scriptSrc}></Script>
        <iframe
          style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', border: 0 }}
          scrolling="no"
          src={iframeSrc}
          allowFullScreen={true}
        ></iframe>
      </div>
    </Card>
  );
}
