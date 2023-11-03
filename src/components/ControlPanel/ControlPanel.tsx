import './ControlPanel.scss';
import { useAppDispatch } from '../../hooks/hooks';
import { openNewPostModal } from '../../store/modalsSlice';

import Sort from '../Sort/Sort';

export default function ControlPanel() {
    const dispatch = useAppDispatch();
    return (
        <div className="control-panel">
            <button
                className="control-panel__add-post-btn"
                onClick={() => dispatch(openNewPostModal())}
            >
                Add new post
            </button>
            <Sort />
        </div>
    );
}
