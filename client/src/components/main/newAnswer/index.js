import "./index.css";
import {useState} from "react";
import Form from "../baseComponents/form";
import Textarea from "../baseComponents/textarea";
import {escapeHTML, validateHyperlink} from "../../../tool";
import {addAnswer} from "../../../services/answerService";
import {useAuthContext} from "../../../hooks/useAuthContext";

const NewAnswer = ({qid, handleAnswer}) => {
    const [text, setText] = useState("");
    const [textErr, setTextErr] = useState("");
    const {user} = useAuthContext()
    const postAnswer = async () => {
        let isValid = true;

        if (!text) {
            setTextErr("Answer text cannot be empty");
            isValid = false;
        }

        // Hyperlink validation
        if (!validateHyperlink(text)) {
            setTextErr("Invalid hyperlink format.");
            isValid = false;
        }

        if (!isValid) {
            return;
        }

        const answer = {
            text: escapeHTML(text),
            ans_by: user.userName,
            ans_date_time: new Date(),
        };

        const res = await NewAnswer.addAnswer(qid, answer);
        if (res && res._id) {
            handleAnswer(qid);
        }
    };
    return (
        <Form>
            <Textarea
                title={"Answer Text"}
                id={"answerTextInput"}
                val={text}
                setState={setText}
                err={textErr}
            />
            <div className="btn_indicator_container">
                <button
                    className="form_postBtn"
                    onClick={() => {
                        postAnswer();
                    }}
                >
                    Post Answer
                </button>
                <div className="mandatory_indicator">
                    * indicates mandatory fields
                </div>
            </div>
        </Form>
    );
};

NewAnswer.addAnswer=addAnswer
export default NewAnswer;
