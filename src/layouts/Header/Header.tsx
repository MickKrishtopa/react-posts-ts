import './Header.scss';

type Props = {
    title: string;
    link: string;
};

export default function Header({ title, link }: Props) {
    return (
        <header className="header">
            <h1 className="header__title">{title}</h1>
            <a href={link} target="blank" className="header__link">
                Repo
            </a>
        </header>
    );
}
