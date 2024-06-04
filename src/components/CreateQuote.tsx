// @ts-ignore
function CreateQuote({ show, onClose }) {

    if (!show) {
        return null;
    }

    return (
        <>
            <div style={{backgroundColor: 'rgba(255,255,255,0.53)'}} className="position-fixed modal modal-sheet d-flex p-4 z-3 justify-content-center" tabIndex={-1}
                 role="dialog" id="modalSheet">
                <div className="modal-dialog modal-dialog-centered" role="document">
                    <div className="modal-content rounded-4 shadow">
                        <div className="modal-header border-bottom-0">
                            <h1 className="modal-title fs-5">Modal title</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal"
                                    aria-label="Close"></button>
                        </div>
                        <div className="modal-body py-0">
                            <p>This is a modal sheet, a variation of the modal that docs itself to the bottom of the
                                viewport like the newer share sheets in iOS.</p>
                        </div>
                        <div className="modal-footer flex-column align-items-stretch w-100 gap-2 pb-3 border-top-0">
                            <button type="button" className="btn btn-lg btn-primary">Save changes</button>
                            <button onClick={onClose} type="button" className="btn btn-lg btn-secondary" data-bs-dismiss="modal">Close
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default CreateQuote;