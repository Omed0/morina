import Image from "next/image";

const Footer = () => {
    return (
        <a
            dir="ltr"
            target="_blank"
            title="Morina Logo"
            about="Morina Logo in footer"
            href={"http://www.morinairaq.com"}
            className="no-underline text-center mb-2"
        >
            <div className="flex text-[#533a89]">
                {/*<span>Powered By </span>*/}
                <Image
                    priority={true}
                    loading="eager"
                    width={400}
                    height={280}
                    className="w-28 h-7"
                    sizes="(max-width: 600px) 100vw, 400px"
                    src="/Morina.svg"
                    alt="Morina Logo"
                    aria-description="Morina Logo in footer of the page"
                />
            </div>
        </a>
    );
};

export default Footer;
