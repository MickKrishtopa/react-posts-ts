import Header from './Header/Header';
import Footer from './Footer/Footer';

type Props = {
    children: React.ReactNode;
};

export default function MainLayout({ children }: Props) {
    return (
        <>
            <Header
                title="React-posts"
                link="https://github.com/MickKrishtopa/react-posts-ts"
            />
            <main>{children}</main>
            <Footer
                name="Mikhail Krishtopa"
                link="https://github.com/MickKrishtopa"
            />
        </>
    );
}
