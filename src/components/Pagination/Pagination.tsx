import './Pagination.scss';
import { IPost } from '../../types';

type Props = {
    data: Array<IPost>;
    page: number;
    itemPerPage: string;
    setPage: React.Dispatch<React.SetStateAction<number>>;
    setItemPerPage: React.Dispatch<React.SetStateAction<string>>;
};

export default function Pagination({
    data,
    page,
    itemPerPage,
    setPage,
    setItemPerPage,
}: Props) {
    const selectOptionsArr: Array<string> = ['10', '20', '50', '100', 'All'];
    const maxPage = Math.ceil(data.length / Number(itemPerPage));

    const handleChangePageClick = (type: string) => {
        console.log(data.length);

        const maxPage = Math.ceil(data.length / Number(itemPerPage));
        console.log(maxPage);

        if (type === 'inc') {
            if (page < maxPage) {
                setPage(page + 1);
                localStorage.setItem('page', JSON.stringify(page + 1));
                return;
            }
            return;
        }

        if (type === 'dec') {
            if (page > 1) {
                setPage(page - 1);
                localStorage.setItem('page', JSON.stringify(page - 1));
                return;
            }
            return;
        }
    };

    return (
        <div className="pagination">
            <label>
                Posts per page:{' '}
                <select
                    name="itemPerPage"
                    id="itemPerPage"
                    value={itemPerPage}
                    onChange={(e) => {
                        setItemPerPage(e.target.value);
                        setPage(1);
                        localStorage.setItem('itemPerPage', e.target.value);
                    }}
                >
                    {selectOptionsArr.map((option) => (
                        <option value={option} key={option}>
                            {option}
                        </option>
                    ))}
                </select>
            </label>
            <div className="pagination__btn-area">
                <button
                    disabled={page === 1}
                    onClick={() => handleChangePageClick('dec')}
                >
                    Prev
                </button>
                <span>{page}</span>
                <button
                    disabled={page === maxPage}
                    onClick={() => handleChangePageClick('inc')}
                >
                    Next
                </button>
            </div>
        </div>
    );
}
