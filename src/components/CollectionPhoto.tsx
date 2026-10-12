import Image from "next/image";

/**
 * Wide photo band for the collection scene. Pizza names are real text positioned over the
 * image (percentages of the image box), so they stay translatable and aligned when it scales.
 */
export function CollectionPhoto({ src, alt, labels }: { src: string; alt: string; labels: [string, string] }) {
  return (
    <div className="collection-band">
      <div className="collection-inner">
        <Image src={src} alt={alt} fill sizes="100vw" className="object-cover" />
        <span className="collection-label" style={{ left: "18%" }}>{labels[0]}</span>
        <span className="collection-label" style={{ left: "76%" }}>{labels[1]}</span>
      </div>
    </div>
  );
}
