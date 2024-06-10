import {useState} from "react";
import axios from "axios";

// @ts-ignore
function DeleteQuote({ show, onClose, qId}) {

    if (!show) {
        return null;
    }

    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [quoteDelModalShow, setQuoteDelModalShow] = useState(false);
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [err, setErr] = useState(false);

    const handleDelete = async () => {
            try {
                const res = await axios.delete(`http://localhost:8080/me/myquote/${qId}`, {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    withCredentials: true,
                });

                if (res.status === 200){
                    //onClose();
                    setQuoteDelModalShow(true);
                }
            } catch (e) {
                console.log(e)
                setErr(true);
                setTimeout(() => {
                    setErr(false);
                }, 5000);
            }
    }

    const handleClose = () => {
        onClose();
    }

    return (
        <>
            <div style={{backgroundColor: 'rgba(255,255,255,0.53)'}}
                 className="position-fixed modal modal-sheet d-flex p-4 z-3 justify-content-center" tabIndex={-1}
                 role="dialog" id="modalSheet">
                <div className="modal-dialog modal-dialog-centered" role="document" style={{width: 593}}>
                    <div className="modal-content rounded-4 shadow">
            {quoteDelModalShow ?
                <>
                            <div className="modal-header border-bottom-0 pb-0 justify-content-center">
                                <h4 >Your <span style={{color: '#DE8667'}}>quote</span> was edited.</h4>
                            </div>
                            <div className="modal-footer pb-3 border-top-0" style={{justifyContent: "center"}}>
                                <button onClick={handleClose} className="btn border-2 rounded-pill shadow-sm"
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
                                <h4 className="">Are you sure?</h4>
                            </div>
                            <div className="modal-body py-0">
                                <p>This quote will be deleted. There is no undo of this action.</p>
                            </div>
                            <div className="modal-footer pb-3 border-top-0" style={{justifyContent: "start"}}>
                                <button onClick={handleDelete} className="btn border-2 rounded-pill shadow-sm"
                                        style={{
                                            backgroundColor: '#DE8667',
                                            color: 'white',
                                            width: 137,
                                            padding: 'auto'
                                        }}>Delete
                                </button>
                                <button onClick={onClose} className="btn border-2 rounded-pill"
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

export default DeleteQuote;