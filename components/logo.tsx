import Image, { type ImageProps } from "next/image";

type SevonivaIconProps = Omit<ImageProps, "src" | "alt" | "width" | "height"> & {
  alt?: string;
  height?: number;
  width?: number;
};

export function SevonivaIcon(props: SevonivaIconProps) {
  const { alt = "sevoniva", height = 28, width = 28, ...rest } =
    props;

  return (
    <Image
      src="/sevoniva-mark.svg"
      alt={alt}
      width={width}
      height={height}
      {...rest}
    />
  );
}
