import './App.scss';
import { useEffect, useState } from 'react';
import MainLayout from '../../layouts/main';
import PostList from '../PostList/PostList';
import Pagination from '../Pagination/Pagination';
import NewPostModal from '../NewPostModal/NewPostModal';
import ConfirmModal from '../ConfirmModal/ConfirmModal';
import ControlPanel from '../ControlPanel/ControlPanel';

import { useGetPostsQuery } from '../../api/postsApi';
import { useAppDispatch, useAppSelector } from '../../hooks/hooks';
import { setPosts, setFavorite, setSortPost } from '../../store/postsSlice';
import { IPost } from '../../types';

function App() {
    const [page, setPage] = useState(1);
    const [itemPerPage, setItemPerPage] = useState<string>('10');
    const { data, isLoading, isError } = useGetPostsQuery(null);
    const [postsToShow, setPostsToShow] = useState<Array<IPost>>([]);

    const dispatch = useAppDispatch();
    const allPosts = useAppSelector((state) => state.posts.posts);
    const sortedPost = useAppSelector((state) => state.posts.sortedPosts);

    const sorts = useAppSelector((state) => state.sorts);

    useEffect(() => {
        dispatch(setSortPost(sorts));
    }, [sorts, allPosts]);

    useEffect(() => {
        const postsToShow: Array<IPost> = sortedPost.slice(
            (page - 1) * Number(itemPerPage),
            page * Number(itemPerPage),
        );

        setPostsToShow(postsToShow);
    }, [page, itemPerPage, sortedPost]);

    useEffect(() => {
        if (data) {
            dispatch(setPosts(data));
        }
    }, [isLoading]);

    useEffect(() => {
        const localStorageInfoLikes = localStorage.getItem('favorite');
        const localStorageInfoItemPerPage = localStorage.getItem('itemPerPage');
        const localStorageInfoPage = localStorage.getItem('page');

        if (typeof localStorageInfoLikes === 'string') {
            const favorite: Array<number> = JSON.parse(localStorageInfoLikes);
            dispatch(setFavorite(favorite));
        }

        if (typeof localStorageInfoItemPerPage === 'string') {
            // console.log(localStorageInfoItemPerPage);
            setItemPerPage(localStorageInfoItemPerPage);
        }

        if (typeof localStorageInfoPage === 'string') {
            // console.log(localStorageInfoItemPerPage);
            const page: number = JSON.parse(localStorageInfoPage);
            setPage(page);
        }
    }, []);

    return (
        <>
            <MainLayout>
                <Pagination
                    data={sortedPost}
                    page={page}
                    setPage={setPage}
                    setItemPerPage={setItemPerPage}
                    itemPerPage={itemPerPage}
                />
                <ControlPanel />
                {isLoading ? (
                    <h2 className="preloader">Loading...</h2>
                ) : isError ? (
                    <h2> Oops... Error!</h2>
                ) : (
                    <PostList data={postsToShow} />
                )}
            </MainLayout>
            <NewPostModal />
            <ConfirmModal />
        </>
    );
}

export default App;
