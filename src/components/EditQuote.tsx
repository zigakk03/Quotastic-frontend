import {useState} from "react";
import axios from "axios";

// @ts-ignore
function EditQuote({ show, onClose, onCancel, text, qId}) {

    if (!show) {
        return null;
    }

    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [quoteText, setQuoteText] = useState(text);
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [quoteEdtModalShow, setQuoteEdtModalShow] = useState(false);
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [quoteTextErr, setQuoteTextErr] = useState(false);
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [err, setErr] = useState(false);

    const handleSubmit = async () => {
        quoteText.trim()
        if (quoteText.length > 0){
            const data = {
                text: quoteText,
            }

            try {
                const res = await axios.patch(`http://localhost:8080/me/myquote/${qId}`, data, {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    withCredentials: true,
                });

                if (res.status === 200){
                    //onClose();
                    setQuoteEdtModalShow(true);
                }
            } catch (e) {
                console.log(e)
                setErr(true);
                setTimeout(() => {
                    setErr(false);
                }, 5000);
            }
        }
        else {
            setQuoteTextErr(true);
            setTimeout(() => {
                setQuoteTextErr(false);
            }, 5000);
        }
    }

    return (
        <>
            <div style={{backgroundColor: 'rgba(255,255,255,0.53)'}}
                 className="position-fixed modal modal-sheet d-flex p-4 z-3 justify-content-center" tabIndex={-1}
                 role="dialog" id="modalSheet">
                <div className="modal-dialog modal-dialog-centered" role="document" style={{width: 593}}>
                    <div className="modal-content rounded-4 shadow">
            {quoteEdtModalShow ?
                <>
                            <div className="modal-header border-bottom-0 pb-0 justify-content-center">
                                <h4 >Your <span style={{color: '#DE8667'}}>quote</span> was edited.</h4>
                            </div>
                            <div className="modal-footer pb-3 border-top-0" style={{justifyContent: "center"}}>
                                <button onClick={onClose} className="btn border-2 rounded-pill shadow-sm"
                                        style={{
                                            backgroundColor: '#DE8667',
                                            color: 'white',
                                            width: 137,
                                            padding: 'auto'
                                        }}>Close
                                </button>
                            </div>
                            {err && <p className="text-danger text-center">Something is wrong! Try again later.</p>}
                </>
                :
                <>
                            <div className="modal-header border-bottom-0 pb-0">
                                <h4 className="">Edit your <span style={{color: '#DE8667'}}>quote.</span></h4>
                            </div>
                            <div className="modal-body py-0">
                                <div className="mb-3">
                                    <textarea value={quoteText} onChange={(e) => setQuoteText(e.target.value)}
                                              className="form-control px-4 rounded-4 border-2" id="exampleInputText"
                                              style={{borderColor: '#EFB467', minHeight: 124}}/>
                                </div>
                                {quoteTextErr && <p className="text-danger text-center">Your quote can't be empty.</p>}
                            </div>
                            <div className="modal-footer pb-3 border-top-0" style={{justifyContent: "start"}}>
                                <button onClick={handleSubmit} className="btn border-2 rounded-pill shadow-sm"
                                        style={{
                                            backgroundColor: '#DE8667',
                                            color: 'white',
                                            width: 137,
                                            padding: 'auto'
                                        }}>Submit
                                </button>
                                <button onClick={onCancel} className="btn border-2 rounded-pill"
                                        style={{color: '322D38', width: 137}}>Cancel
                                </button>
                            </div>
                            {err && <p className="text-danger text-center">Something is wrong! Try again later.</p>}
                </>
            }
                    </div>
                </div>
            </div>
        </>
    )
}

export default EditQuote;