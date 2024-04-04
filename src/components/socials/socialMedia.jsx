import { usePathname } from 'next/navigation'
import { Facebook, Instagram, Map, Phone, Snapchat, Spotify, TikTok, Tripadvisor, Website } from './Icons'


const SocialMedia = (props) => {

    const pathname = usePathname()
    const isMenuPage = pathname.split('/')[2] === 'menu' ? true : false

    const links = [...props?.socials].concat({ name: 'location', link: 'location', location: `${JSON.stringify(props?.location)}` })
    const allIcons = isMenuPage ? links : links.concat({ name: 'phone', link: props?.phone })

    return (
        <div className='text-center max-w-[96%] min-w-72 mx-auto mb-2'>
            <div
                className="flex flex-wrap gap-4 items-center justify-center"
            >
                {allIcons.length > 0 &&
                    allIcons.map((social, index) => {
                        if (isSocialMediaUrl(social?.link, social?.name)) {
                            return (
                                <div
                                    className="mx-[2px] cursor-pointer w-9 h-9" key={index} >
                                    <a
                                        title={social?.name}
                                        about={social?.name}
                                        aria-description={'icon for ' + social?.name}
                                        target={isValidPhoneNumber(social?.link) ? '_self' : '_blank'}
                                        href={social.name !== 'location' ? (isValidPhoneNumber(social?.link) ? `tel:${social?.link}` : social?.link) : "#"}
                                    >
                                        <IconSocial
                                            social={social?.name}
                                            location={social?.location}
                                            color={props.theme?.LP_SocialMediaIconColor}
                                        />
                                    </a>
                                </div>
                            );
                        } else {
                            return null;
                        }
                    })}
            </div>
        </div >
    );
};

export default SocialMedia;


function IconSocial({ social, location, color }) {
    switch (social) {
        case "facebook":
            return (<Facebook color={color} />);
        case "tiktok":
            return (<TikTok color={color} />);
        case "instagram":
            return (<Instagram color={color} />);
        case "snapchat":
            return (<Snapchat color={color} />);
        case "spotify":
            return (<Spotify color={color} />);
        case "tripadvisor":
            return (<Tripadvisor color={color} />);
        case "website":
            return (<Website color={color} />);
        case "phone":
            return (<Phone color={color} />);
        case "location":
            return <MapIcon location={location} color={color} />;
        default:
            return "";
    }
}

const MapIcon = (props) => {
    const { location, color } = props;

    const handleMapLinkClick = () => {
        try {
            const { longitude, latitude } = JSON.parse(location)
            const url = `https://www.google.com/maps/search/?api=1&query=${latitude},${longitude}`;
            window.open(url, '_blank');
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div style={{ all: 'unset' }} onClick={handleMapLinkClick}>
            <Map color={color} />
        </div>
    );
};

function isSocialMediaUrl(url, socialName) {
    const socialNameRegex = new RegExp(socialName, 'i');
    const httpHttpsRegex = /^(http|https):\/\//;
    const phoneRegex = /^[+]?\d{1,13}$/;

    if (phoneRegex.test(url)) return true

    if (httpHttpsRegex.test(url)) {
        const urlObject = new URL(url);
        const hostname = urlObject.hostname;

        if (socialNameRegex.test(hostname)) return true;
    }
    if (socialName === 'location') return true

    return false;
}

function isValidPhoneNumber(phone) {
    const phoneRegex = /^(\+964)?\d{10,}$/;
    return phoneRegex.test(phone);
}
