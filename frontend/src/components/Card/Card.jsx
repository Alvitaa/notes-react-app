import "./Card.css";

export default function Card(props) {
    return (
        <div className="card" onClick={() => props.function(props.note)}>
            <div className="card-top">
                <h3>{props.note.title}</h3>
            </div>
            <div className="card-body">
                <p className="text-content">{props.note.content}</p>
            </div>
        </div>
    );
}
