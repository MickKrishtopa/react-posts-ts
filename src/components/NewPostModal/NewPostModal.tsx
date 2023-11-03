import { useEffect, useState } from 'react';
import './NewPostModal.scss';
import { useCreatePostMutation } from '../../api/postsApi';
import { useAppDispatch, useAppSelector } from '../../hooks/hooks';
import { addPost } from '../../store/postsSlice';
import { closeAllModals } from '../../store/modalsSlice';
import Modal from '../Modal/Modal';

export default function NewPostModal() {
    const [isValid, setIsValid] = useState(false);
    const [formData, setFormData] = useState({
        title: '',
        body: '',
        userId: '',
    });

    const dispatch = useAppDispatch();
    const isOpen = useAppSelector((state) => state.modals.isOpenNewPostModal);

    const [fetchCreatePost, { isLoading, isError }] = useCreatePostMutation();
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const response = await fetchCreatePost(formData);
            if ('data' in response) {
                dispatch(addPost(response.data));
                dispatch(closeAllModals());
                setFormData({
                    title: '',
                    body: '',
                    userId: '',
                });
            }
            console.log(response);
        } catch (error) {
            console.log(error);
        }
    };
    const handleChangeForm = (
        e:
            | React.ChangeEvent<HTMLTextAreaElement>
            | React.ChangeEvent<HTMLInputElement>,
    ) => {
        const { id, value } = e.target;

        setFormData({ ...formData, [id]: value.trim() });
    };

    useEffect(() => {
        if (!Object.values(formData).some((i) => i === '')) {
            setIsValid(true);
            return;
        }
        setIsValid(false);
    }, [formData]);

    return (
        <Modal isOpen={isOpen}>
            <form
                onSubmit={(e) => handleSubmit(e)}
                className="new-post-modal__form"
            >
                <label>
                    Enter a title for the new post:
                    <textarea
                        placeholder=""
                        value={formData.title}
                        id="title"
                        className="new-post-modal__new-post-title"
                        onChange={(e) => handleChangeForm(e)}
                    />
                </label>
                <label>
                    Enter the text of the new post:
                    <textarea
                        value={formData.body}
                        id="body"
                        className="new-post-modal__new-post-body"
                        onChange={(e) => handleChangeForm(e)}
                    />
                </label>
                <label>
                    Enter the user ID of the new post:
                    <input
                        value={formData.userId}
                        id="userId"
                        className="new-post-modal__new-post-userId"
                        onChange={(e) => handleChangeForm(e)}
                    />
                </label>
                <span>
                    {isError ? 'Oops..  Server error. Try again later!' : ''}
                </span>
                <button
                    type="submit"
                    className="new-post-modal__submit-btn"
                    disabled={isLoading || !isValid}
                >
                    Create
                </button>
            </form>
        </Modal>
    );
}
