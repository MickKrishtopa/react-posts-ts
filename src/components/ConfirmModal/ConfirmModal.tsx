import './ConfirmModal.scss';
import Modal from '../Modal/Modal';
import { useAppSelector, useAppDispatch } from '../../hooks/hooks';
import { useRemovePostMutation } from '../../api/postsApi';
import { removePost } from '../../store/postsSlice';
import { closeAllModals } from '../../store/modalsSlice';

export default function ConfirmModal() {
    const dispatch = useAppDispatch();
    const isOpen = useAppSelector(
        (state) => state.modals.isOpenNewConfirmModal,
    );

    const confirmId = useAppSelector((state) => state.posts.confirmId);
    const [removePostFetch, { isLoading }] = useRemovePostMutation();

    const handleConfirmClick = async (id: number | null) => {
        if (typeof id === 'number') {
            try {
                await removePostFetch(id);
                dispatch(removePost(id));
                dispatch(closeAllModals());
            } catch (error) {
                console.log(error);
            }
        }
    };
    return (
        <Modal isOpen={isOpen}>
            <div className="confirm">
                <button
                    type="button"
                    className="confirm-modal__btn"
                    onClick={() => dispatch(closeAllModals())}
                >
                    Cancel
                </button>{' '}
                <button
                    type="button"
                    className="confirm-modal__btn"
                    onClick={() => handleConfirmClick(confirmId)}
                >
                    Confirm
                </button>
            </div>
        </Modal>
    );
}
