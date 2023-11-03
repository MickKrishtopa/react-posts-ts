import './Modal.scss';
import { useAppDispatch } from '../../hooks/hooks';
import { closeAllModals } from '../../store/modalsSlice';

type Props = {
    children: React.ReactNode;
    isOpen: boolean;
};

export default function Modal({ children, isOpen }: Props) {
    const dispatch = useAppDispatch();
    function handleClickOutside(
        ev: React.MouseEvent<HTMLDivElement, MouseEvent>,
    ) {
        if (ev.target === ev.currentTarget) {
            dispatch(closeAllModals());
        }
    }

    return (
        <div
            onMouseUp={(e) => handleClickOutside(e)}
            className={isOpen ? 'modal modal_open' : 'modal'}
        >
            <div className="modal__container">
                {children}
                <button
                    type="button"
                    onClick={() => dispatch(closeAllModals())}
                    className="modal__close-btn"
                ></button>
            </div>
        </div>
    );
}
