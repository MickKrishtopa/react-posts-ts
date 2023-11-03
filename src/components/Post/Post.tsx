import './Post.scss';
import commentIcon from './images/comment.svg';
import commentOpenIcon from './images/commentActive.svg';
import trashIcon from './images/trash.svg';
import editIcon from './images/edit.svg';
import favoritIcon from './images/favorites.svg';
import favoritActiveIcon from './images/favorites_active.svg';
import cancelIcon from './images/cancel.svg';
import confirmIcon from './images/confirm.svg';

import { IPost } from '../../types';
import { useGetUserByIdQuery } from '../../api/userApi';
import { useEditPostMutation, useRemovePostMutation } from '../../api/postsApi';
import { useEffect, useState } from 'react';
import CommentList from '../CommentList/CommentList';

import { useAppDispatch, useAppSelector } from '../../hooks/hooks';
import { editPost, toggleToFavorite } from '../../store/postsSlice';
import { openNewConfirmModal } from '../../store/modalsSlice';
import { setConfirmId } from '../../store/postsSlice';

export default function Post({ id, userId, title, body }: IPost) {
    const [isCommentOpen, setIsCommentOpen] = useState(false);
    const [isEditMode, setIsEditMode] = useState(false);
    const { data, isLoading, isError } = useGetUserByIdQuery(userId);
    const [isLiked, setIsLiked] = useState(false);

    const [formValue, setFormValue] = useState<IPost>({
        title,
        body,
        userId,
        id,
    });

    const dispatch = useAppDispatch();
    const favorites = useAppSelector((state) => state.posts.favorite);

    const [editPostFetch] = useEditPostMutation();

    const handleEditSubmit = async (
        e: React.MouseEvent<HTMLImageElement, MouseEvent>,
    ) => {
        e.preventDefault();
        try {
            const response = await editPostFetch(formValue);

            if ('data' in response) {
                dispatch(editPost(response.data));
            }

            setIsEditMode(false);
        } catch (error) {
            console.log(error);
        }
    };

    const handleRemoveClick = async (id: number) => {
        dispatch(openNewConfirmModal());
        dispatch(setConfirmId(id));
    };

    const inputHandler = (
        e:
            | React.ChangeEvent<HTMLInputElement>
            | React.ChangeEvent<HTMLTextAreaElement>,
    ): void => {
        setFormValue({ ...formValue, [e.target.id]: e.target.value });
    };

    useEffect(() => {
        setIsLiked(favorites.includes(id));
    }, [favorites]);

    return (
        <div className="post">
            {isEditMode ? (
                <form className="post__form">
                    <input
                        id="title"
                        className="post__title"
                        value={formValue.title}
                        onChange={(e) => inputHandler(e)}
                    />

                    <textarea
                        id="body"
                        className="post__body"
                        value={formValue.body}
                        onChange={(e) => inputHandler(e)}
                    />
                    <label>
                        User ID:{' '}
                        <input
                            id="userId"
                            className="post__user"
                            value={formValue.userId}
                            onChange={(e) => inputHandler(e)}
                        />
                    </label>
                </form>
            ) : (
                <>
                    <h2 className="post__title">{title}</h2>
                    <p className="post__body">{body}</p>
                    <h3 className="post__user">
                        {isLoading
                            ? 'Loading'
                            : isError
                            ? 'unknown user'
                            : data?.name}
                    </h3>
                </>
            )}
            <div className="post__button-area">
                <img
                    src={isCommentOpen ? commentOpenIcon : commentIcon}
                    alt="comment"
                    onClick={() => setIsCommentOpen(!isCommentOpen)}
                />
                <img
                    onClick={() => handleRemoveClick(id)}
                    src={trashIcon}
                    alt="remove"
                />
                {isEditMode ? (
                    <>
                        <img
                            src={cancelIcon}
                            alt="cancel edit"
                            onClick={() => setIsEditMode(false)}
                        />
                        <img
                            onClick={(e) => handleEditSubmit(e)}
                            src={confirmIcon}
                            alt="confirm edit"
                        />
                    </>
                ) : (
                    <img
                        src={editIcon}
                        alt="edit"
                        onClick={() => setIsEditMode(true)}
                    />
                )}
                <img
                    src={isLiked ? favoritActiveIcon : favoritIcon}
                    alt="add to favorite"
                    onClick={() => dispatch(toggleToFavorite(id))}
                />
            </div>
            {isCommentOpen && <CommentList id={id} />}
        </div>
    );
}
