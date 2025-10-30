export interface BtnShadowProps {
    bgColor: string;
    borderColor: string;
    img?: string;
    text: string;
    textColor: string;
    className?: string;
    link?: string;
}

export default function BtnShadow({ bgColor, borderColor, img, text, textColor, link, className = '' }: BtnShadowProps) {
    return (
        <a  href={link}
            style={{ backgroundColor: bgColor, borderColor: borderColor, color: textColor }} 
            className="group w-fit cursor-pointer h-fit relative py-1 items-center justify-center overflow-hidden rounded-lg border-1 px-6 flex transition-all ease-[cubic-bezier(.47,1.64,.41,.8)] duration-400 hover:scale-108 cursor-default"
        >
            <img src={img} className={`h-5 my-auto inline-block mr-2 ${className}`}  alt={text}/>
            {text}
            <div className="absolute inset-0 flex h-full w-full justify-center [transform:skew(-12deg)_translateX(-100%)] group-hover:duration-1000 group-hover:[transform:skew(-12deg)_translateX(100%)]">
                <div className="relative h-full w-8 bg-white/20 cursor-pointer ">
                </div>
            </div>
        </a>
    );
    
}