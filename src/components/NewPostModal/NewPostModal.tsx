import { useEffect, useState } from 'react';
import './NewPostModal.scss';
import { useCreatePostMutation } from '../../api/postsApi';
import { useAppDispatch } from '../../hooks/hooks';
import { addPost } from '../../store/postsSlice';

type Props = {
    isOpen: boolean;
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function NewPostModal({ isOpen, setIsOpen }: Props) {
    const [isValid, setIsValid] = useState(false);
    const [formData, setFormData] = useState({
        title: '',
        body: '',
        userId: '',
    });

    const dispatch = useAppDispatch();

    function handleClickOutside(
        ev: React.MouseEvent<HTMLDivElement, MouseEvent>,
    ) {
        if (ev.target === ev.currentTarget) {
            setIsOpen(false);
        }
    }

    const [fetchCreatePost, { isLoading, isError }] = useCreatePostMutation();
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const response = await fetchCreatePost(formData);
            if ('data' in response) {
                dispatch(addPost(response.data));
                setIsOpen(false);
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
        <div
            onMouseUp={(e) => handleClickOutside(e)}
            className={isOpen ? 'modal modal_open' : 'modal'}
        >
            <form
                onSubmit={(e) => handleSubmit(e)}
                className="modal__container"
            >
                <label>
                    Enter a title for the new post:
                    <textarea
                        placeholder=""
                        value={formData.title}
                        id="title"
                        className="modal__new-post-title"
                        onChange={(e) => handleChangeForm(e)}
                    />
                </label>
                <label>
                    Enter the text of the new post:
                    <textarea
                        value={formData.body}
                        id="body"
                        className="modal__new-post-body"
                        onChange={(e) => handleChangeForm(e)}
                    />
                </label>
                <label>
                    Enter the user ID of the new post:
                    <input
                        value={formData.userId}
                        id="userId"
                        className="modal__new-post-userId"
                        onChange={(e) => handleChangeForm(e)}
                    />
                </label>
                <span>
                    {isError ? 'Oops..  Server error. Try again later!' : ''}
                </span>
                <button
                    type="submit"
                    className="modal__submit-btn"
                    disabled={isLoading || !isValid}
                >
                    Create
                </button>
                <button
                    type="button"
                    onClick={() => setIsOpen(false)}
                    className="modal__close-btn"
                ></button>
            </form>
        </div>
    );
}
