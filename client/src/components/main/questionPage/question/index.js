import {getMetaData} from "../../../../tool";
import "./index.css";
import {useAuthContext} from "../../../../hooks/useAuthContext";
import Author from "../../Author";

const Question = ({q, clickTag, handleAnswer, handleUserProfile}) => {
    const {user} = useAuthContext()
    return (
        <div
            className="question right_padding">
            <div className="postStats">
                <div>{q.answers.length || 0} answers</div>
                <div>{q.views} views</div>
            </div>
            <div className="question_mid" onClick={() => {
                if (user) {
                    handleAnswer(q._id);
                }
            }}>
                <div className="postTitle">{q.title}</div>
                <div className="question_tags">
                    {q.tags.map((tag, idx) => {
                        return (
                            <button
                                key={idx}
                                className="question_tag_button"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    clickTag(tag.name);
                                }}
                            >
                                {tag.name}
                            </button>
                        );
                    })}
                </div>
            </div>
            <div className="lastActivity">
                <Author username={q.asked_by} handleUserProfile={handleUserProfile}/>
                <div>&nbsp;</div>
                <div className="question_meta">
                    asked {getMetaData(new Date(q.ask_date_time))}
                </div>
            </div>
        </div>
    );
};

export default Question;
