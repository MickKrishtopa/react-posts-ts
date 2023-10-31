import './CommentList.scss';

import CommentItem from '../CommentItem/CommentItem';
import { useGetCommentsByIdQuery } from '../../api/postsApi';

type Props = { id: number };

export default function CommentList({ id }: Props) {
    const { data, isLoading, isError } = useGetCommentsByIdQuery(id);
    return (
        <div>
            {isLoading ? (
                <h2>Loading...</h2>
            ) : isError ? (
                <h2>{`Oops... Fetch error!`}</h2>
            ) : (
                <ol>
                    {data?.map((comment) => (
                        <CommentItem key={comment.id} {...comment} />
                    ))}
                </ol>
            )}
        </div>
    );
}
