import './PostList.scss';

import Post from '../Post/Post';

import { IPost } from '../../types';

type Props = {
    data: IPost[] | undefined;
};

export default function PostList({ data }: Props) {
    return (
        <div className="post-list">
            {data?.map((i) => <Post {...i} key={i.id} />)}
        </div>
    );
}
