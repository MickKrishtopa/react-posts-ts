import './ControlPanel.scss';

type Props = {
    setIsOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function ControlPanel({ setIsOpenModal }: Props) {
    return (
        <div className="control-panel">
            <button onClick={() => setIsOpenModal(true)}>Add new post</button>
        </div>
    );
}
