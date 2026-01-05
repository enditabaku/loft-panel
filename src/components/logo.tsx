import Image from "next/image";
export function Logo() {
  return (
    <div className="relative h-10 max-w-[10.847rem]">
      <Image
        src={"/images/light_logo.png"}
        width={50}
        height={50}
        className="dark:hidden"
        alt="NextAdmin logo"
        role="presentation"
        quality={100}
      />
      <Image
        src={"/images/logo.png"}
        width={50}
        height={50}
        className="hidden dark:block"
        alt="NextAdmin logo"
        role="presentation"
        quality={100}
      />
    </div>
  );
}