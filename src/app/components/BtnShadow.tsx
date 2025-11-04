export interface BtnShadowProps {
    bgColor: string;
    borderColor: string;
    img?: string;
    text: string;
    textColor: string;
    classname?: string;
    classnamea?: string;
    link?: string;
}

export default function BtnShadow({ bgColor, borderColor, img, text, textColor, link, classname = '', classnamea = '' }: BtnShadowProps) {
    return (
        <a  href={link}
            style={{ backgroundColor: bgColor, borderColor: borderColor, color: textColor }} 
            className={`group w-fit h-fit relative py-1 items-center justify-center overflow-hidden  border-1 px-6 flex transition-all ease-[cubic-bezier(.47,1.64,.41,.8)] duration-400 hover:scale-108 cursor-default ${classnamea}`}
        >
            <img src={img} className={`h-5 mb-1 inline-block mr-2 ${classname}`}  alt={text}/>
            {text}
            <div className="absolute inset-0 flex h-full w-full justify-center [transform:skew(-12deg)_translateX(-100%)] group-hover:duration-1000 group-hover:[transform:skew(-12deg)_translateX(100%)]">
                <div className="relative h-full w-8 bg-white/20">
                </div>
            </div>
        </a>
    );
    
}