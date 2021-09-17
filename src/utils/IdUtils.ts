const extractFromUrl = (url: string): string | undefined | null => {
  const rx = /^https?:\/\/stackoverflow\.com\/a\/([0-9]*)/gm;
  const arr = rx.exec(url);
  return arr && arr[1];
};

// https://stackoverflow.com/a/64369832/1248177
const isNumeric = (val: string): boolean => !Number.isNaN(Number(val));

const extractId = (source: string): string | undefined | null => {
  if (Array.from(source).every(isNumeric)) {
    return source;
  }

  const id = extractFromUrl(source);
  if (id) {
    return id;
  }

  return null;
};

export default extractId;
