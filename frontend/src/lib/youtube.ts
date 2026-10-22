const ID = /(?:v=|youtu\.be\/|shorts\/|embed\/)([A-Za-z0-9_-]{11})/;

export function youtubeId(url: string): string | null {
  const m = ID.exec(url || '');
  return m ? m[1] : null;
}
