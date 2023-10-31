import './Footer.scss';

type Props = {
    name: string;
    link: string;
};

export default function Footer({ name, link }: Props) {
    return (
        <footer className="footer">
            <h3 className="footer__title">© {name}</h3>
            <a href={link} target="blank" className="footer__link">
                Github
            </a>
        </footer>
    );
}
