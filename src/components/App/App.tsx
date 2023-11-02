import './App.scss';
import { useEffect, useState } from 'react';
import MainLayout from '../../layouts/main';
import PostList from '../PostList/PostList';
import Pagination from '../Pagination/Pagination';
import NewPostModal from '../NewPostModal/NewPostModal';
import ControlPanel from '../ControlPanel/ControlPanel';

import { useGetPostsQuery } from '../../api/postsApi';
import { useAppDispatch, useAppSelector } from '../../hooks/hooks';
import { setPosts, setFavorite } from '../../store/postsSlice';
import { IPost } from '../../types';

function App() {
    const [page, setPage] = useState(1);
    const [itemPerPage, setItemPerPage] = useState<string>('10');
    const { data, isLoading, isError } = useGetPostsQuery(null);
    const [postsToShow, setPostsToShow] = useState<Array<IPost>>([]);
    const [isOpenModal, setIsOpenModal] = useState(false);

    const dispatch = useAppDispatch();
    const allPosts = useAppSelector((state) => state.posts.posts);

    useEffect(() => {
        const postsToShow: Array<IPost> = allPosts.slice(
            (page - 1) * Number(itemPerPage),
            page * Number(itemPerPage),
        );

        // console.log(postsToShow);
        setPostsToShow(postsToShow);
    }, [page, itemPerPage, allPosts]);

    useEffect(() => {
        !!data && dispatch(setPosts(data));
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
                    data={allPosts}
                    page={page}
                    setPage={setPage}
                    setItemPerPage={setItemPerPage}
                    itemPerPage={itemPerPage}
                />
                <ControlPanel setIsOpenModal={setIsOpenModal} />
                {isLoading ? (
                    <h2 className="preloader">Loading...</h2>
                ) : isError ? (
                    <h2> Oops... Error!</h2>
                ) : (
                    <PostList data={postsToShow} />
                )}
            </MainLayout>
            <NewPostModal isOpen={isOpenModal} setIsOpen={setIsOpenModal} />
        </>
    );
}

export default App;
