import './CommentItem.scss';

import { IComment } from '../../types';

export default function CommentItem({ name, email, body }: IComment) {
    return (
        <li className="comment-item">
            <div>
                <h3>{name}</h3>
                <span>{email}</span>
            </div>

            <p>{body}</p>
        </li>
    );
}
