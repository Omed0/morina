import Image from "next/image";
import Link from "next/link";


export default function Home() {

  return (
    <div
      className="relative flex justify-center items-center min-h-svh bg-[#222]"
    >
      <Link
        href={'https://morinairaq.com/'}
        className="no-underline max-w-fit"
      >
        <Image
          title="click and go to morina website"
          alt="Morina agency logo"
          src="/Morina.svg"
          className="block"
          priority={true}
          height="220"
          width="420"
        />
      </Link>
    </div>
  );
}
