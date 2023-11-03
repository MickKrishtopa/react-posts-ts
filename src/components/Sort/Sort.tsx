import { useState } from 'react';
import './Sort.scss';

import { useAppDispatch, useAppSelector } from '../../hooks/hooks';
import { toggleDirection, setCategory } from '../../store/filterSlice';

export default function Sort() {
    const [isActive, setIsActive] = useState(false);
    const dispatch = useAppDispatch();

    const sortDirection = useAppSelector((state) => state.sorts.direction);

    const sortButtons = ['Title', 'UserId', 'Favorite'];
    return (
        <div className="sort">
            <div
                className={`sort__wrapper ${
                    isActive ? 'sort__wrapper_active' : ''
                }`}
            >
                <button
                    className="sort__button"
                    type="button"
                    onClick={() => setIsActive(!isActive)}
                >
                    Сортировать
                </button>
                <button
                    className={
                        sortDirection
                            ? 'sort__button-arrow'
                            : 'sort__button-arrow sort__button-arrow_reverse '
                    }
                    type="button"
                    aria-label="sort"
                    onClick={() => dispatch(toggleDirection())}
                />
            </div>
            <ul className={`sort-list ${isActive ? 'sort-list_active' : ''}`}>
                {sortButtons.map((text) => (
                    <li
                        id={text}
                        className="sort-list__item"
                        key={text}
                        onClick={() => {
                            dispatch(setCategory(text.toLocaleLowerCase()));
                            setIsActive(false);
                        }}
                    >
                        {text}
                    </li>
                ))}
            </ul>
        </div>
    );
}
