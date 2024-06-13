/* eslint-disable react-hooks/rules-of-hooks */
import {ChangeEvent, useEffect, useRef, useState} from "react";
import axios from "axios";
import Cookies from "js-cookie";
import Axios from "axios";

// @ts-ignore
function ProfileSettings({ show, onClose, onCancel }) {

    if (!show) {
        return null;
    }

    const [email, setEmail] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');

    const [simpleErr, setSimpleErr] = useState(false);
    const [err, setErr] = useState(false);

    const [confirmModal, setConfirmModal] = useState(false);
    const [defaultModal, setDefaultModal] = useState(true);
    const [imgModal, setImgModal] = useState(false);

    const [file, setFile] = useState<File | null>(null)
    const [preview, setPreview] = useState<string | null>(null)
    const fileInputRef = useRef<HTMLInputElement | null>(null);

    const [currentPass, setCurrentPass] = useState('');
    const [pass, setPass] = useState('');
    const [confirmPass, setConfirmPass] = useState('')

    const [passwordsMatch, setPasswordsMatch] = useState(true);
    const [passwordRequirementsMet, setPasswordRequirementsMet] = useState(true);
    const [requirementsFail, setReqirementsFail] = useState(false);

    const handleUpdBasic = async () => {
        email.trim();
        firstName.trim();
        lastName.trim();
        if (email.length > 0 && firstName.length > 0 && lastName.length > 0){
            const data = {
                first_name: firstName,
                last_name: lastName,
                email: email
            }

            try {
                const res = await axios.patch('http://localhost:8080/me/update', data, {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    withCredentials: true,
                });

                if (res.status === 200){
                    const user = {
                        id: res.data.id,
                        first_name: res.data.first_name,
                        last_name: res.data.last_name,
                        email: res.data.email,
                        avatar: res.data.avatar,
                    }

                    Cookies.set('user_info', JSON.stringify(user))
                    setConfirmModal(true);
                }
            } catch (e) {
                setErr(true);
                setTimeout(() => {
                    setErr(false);
                }, 5000);
            }
        }
        else {
            setSimpleErr(true);
            setTimeout(() => {
                setSimpleErr(false);
            }, 5000);
        }
    }

    useEffect(() => {
        const user_cookie = Cookies.get('user_info');

        if (user_cookie) {

            setFirstName(JSON.parse(user_cookie).first_name);
            setLastName(JSON.parse(user_cookie).last_name);
            setEmail(JSON.parse(user_cookie).email);


            const avatar = JSON.parse(user_cookie).avatar

            if (avatar !== null) {
                const img = new Image();
                img.src = `http://localhost:8080/files/${avatar}`;

                img.onload = () => {
                    setPreview(`http://localhost:8080/files/${avatar}`);
                };
            }
        } else {
            setErr(true);
        }
    }, []);

    const handleFileChange = ({ target }: ChangeEvent<HTMLInputElement>) => {
        if (target.files) {
            const file = target.files[0]
            setFile(file)
        }
    }
    const handleImgButtonClick = () => {
        if (fileInputRef.current) {
            fileInputRef.current.click();
        }
    }

    useEffect(() => {
        if (file) {
            const reader = new FileReader()
            reader.onloadend = () => {
                setPreview(reader.result as string)
            }
            reader.readAsDataURL(file)
        } else {
            setPreview(null)
        }
    }, [file])

    const handleUpdImg = async () => {
        if (file !== null) {
            try {
            const formData = new FormData();
            formData.append('avatar', file, file.name);
            const res = await Axios.post(
                'http://localhost:8080/me/upload',
                formData,
                {withCredentials: true}
            );
            if (res.status === 201){
                const user = {
                    id: res.data.id,
                    first_name: res.data.first_name,
                    last_name: res.data.last_name,
                    email: res.data.email,
                    avatar: res.data.avatar,
                }

                Cookies.set('user_info', JSON.stringify(user))
                setConfirmModal(true);
            }
            }
            catch {
                setErr(true)
            }
        } else {
            setSimpleErr(true);
            setTimeout(() => {
                setSimpleErr(false);
            }, 5000);
        }
    }



    const handlePasswordChange = (e: any) => {
        const value = e.target.value;
        setPass(value)
        if (value !== '' || value !== null) {
            setPasswordsMatch(value === confirmPass);
            if (currentPass === value){
                setSimpleErr(true);
            } else {
                setSimpleErr(false);
            }
            setPasswordRequirementsMet(/^(?=.*\d)(?=.*[A-Za-z])[A-Za-z\d\s~@#$%^&*+=`|{}:;"'<>?!,./[\]-]{9,}$/.test(value));
        }
    }
    const handleConfirmPasswordChange = (e: any) => {
        const value = e.target.value;
        setConfirmPass(value)
        setPasswordsMatch(value === pass);
    }

    const handleUpdPass = async () => {
        if (passwordsMatch && passwordRequirementsMet) {
            try {
                const data = {
                    password: currentPass,
                    confirm_password: confirmPass,
                    new_password: pass
                }

                const res = await axios.patch('http://localhost:8080/me/update-password', data, {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    withCredentials: true,
                });

                if (res.status === 200){
                    setConfirmModal(true);
                }
            } catch {
                setErr(true);
                setTimeout(() => {
                    setErr(false);
                }, 5000);
            }
        } else {
            setReqirementsFail(true);
            setTimeout(() => {
                setReqirementsFail(false);
            }, 5000);
        }
    }

    return (
        <>
            <div style={{backgroundColor: 'rgba(255,255,255,0.53)'}} className="position-fixed modal modal-sheet d-flex p-4 z-3 justify-content-center" tabIndex={-1}
                 role="dialog" id="modalSheet">
                <div className="modal-dialog modal-dialog-centered" role="document" style={{width: 593}}>
                    <div className="modal-content rounded-4 shadow">
                        <div className="modal-header border-bottom-0 pb-0">
                            <h4 className="">Profile <span style={{color: '#DE8667'}}>settings.</span></h4>
                        </div>
                        {confirmModal ?
                            <>
                                <div className="modal-body py-0">
                                    <p>Your settings are saved.</p>
                                </div>
                                <div className="modal-footer pb-3 border-top-0" style={{justifyContent: "start"}}>
                                    <button onClick={onClose} className="btn border-2 rounded-pill shadow-sm"
                                            style={{
                                                backgroundColor: '#DE8667',
                                                color: 'white',
                                                width: 137,
                                                padding: 'auto'
                                            }}>Close
                                    </button>
                                </div>
                            </>
                            :
                            <>
                                {defaultModal ?
                                    <>
                                <div className="modal-body py-0">
                                    <p>Change your profile settings</p>
                                    <div className="mb-3">
                                        <label htmlFor="exampleInputEmail" className="form-label small">Mail</label>
                                        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)}
                                               placeholder='example@net.com'
                                               className="form-control px-4 rounded-pill border-2"
                                               id="exampleInputEmail1" aria-describedby="emailHelp"
                                               style={{borderColor: '#EFB467'}}/>
                                    </div>
                                    <div className='d-flex'>
                                <div className="container-fluid mb-3" style={{paddingLeft: '0'}}>
                                    <label htmlFor="exampleInputFirstName" className="form-label small">First
                                        Name</label>
                                    <input type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)}
                                           placeholder='John' className="form-control px-4 rounded-pill border-2"
                                           id="exampleInputEmail1" aria-describedby="emailHelp"
                                           style={{borderColor: '#EFB467'}}/>
                                </div>
                                <div className="container-fluid mb-3" style={{paddingRight: '0'}}>
                                    <label htmlFor="exampleInputLastName" className="form-label small">Last Name</label>
                                    <input type="text" value={lastName} onChange={(e) => setLastName(e.target.value)}
                                           placeholder='Scott' className="form-control px-4 rounded-pill border-2"
                                           id="exampleInputEmail1" aria-describedby="emailHelp"
                                           style={{borderColor: '#EFB467'}}/>
                                </div>
                            </div>
                            {simpleErr &&
                                <p className="text-danger text-center">It looks like some required fields are empty.
                                    Please fill out all fields and try again..</p>}
                            <div className='d-flex'>
                                <div className="container-fluid mb-3" style={{paddingLeft: '0'}}>
                                    <button onClick={() => {setDefaultModal(false); setImgModal(false);}} className="container-fluid btn border-2 rounded-pill shadow-sm"
                                            style={{
                                                backgroundColor: '#EFB467',
                                                color: 'white',
                                                padding: 'auto'
                                            }}>Change password
                                    </button>
                                </div>
                                <div className="container-fluid mb-3" style={{paddingRight: '0'}}>
                                    <button onClick={() => {setDefaultModal(false); setImgModal(true);}} className="container-fluid btn border-2 rounded-pill shadow-sm"
                                            style={{
                                                backgroundColor: '#DE8667',
                                                color: 'white',
                                                padding: 'auto'
                                            }}>Change profile picture
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div className="modal-footer pb-3 border-top-0" style={{justifyContent: "start"}}>
                            <button onClick={handleUpdBasic} className="btn border-2 rounded-pill shadow-sm"
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
                            </>
                                :
                                <>
                                    {imgModal ?
                                        <>
                                            <div className="modal-body py-0">
                                                <p>Change your profile photo</p>
                                                <div className="d-flex justify-content-center">
                                                    <img src={preview === null ? require('../assets/No_profile_picture.png') : preview}
                                                         alt="Avatar" className='rounded-circle'
                                                         style={{width: 64, height: 64}}/>
                                                    <input
                                                        onChange={handleFileChange}
                                                        id="avatar"
                                                        name="avatar"
                                                        type="file"
                                                        ref={fileInputRef}
                                                        aria-label="Avatar"
                                                        aria-describedby="avatar"
                                                        className="d-none"
                                                    />
                                                </div>
                                                <div className="d-flex justify-content-center my-4">
                                                    <button onClick={handleImgButtonClick}
                                                            className="btn border-2 rounded-pill shadow-sm"
                                                            style={{
                                                                backgroundColor: '#DE8667',
                                                                color: 'white',
                                                                width: 200,
                                                                padding: 'auto'
                                                            }}>Upload new image
                                                    </button>
                                                </div>
                                                {simpleErr &&
                                                    <p className="text-danger text-center">You didn't change the image.</p>}
                                            </div>
                                            <div className="modal-footer pb-3 border-top-0"
                                                 style={{justifyContent: "start"}}>
                                                <button onClick={handleUpdImg}
                                                        className="btn border-2 rounded-pill shadow-sm"
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
                                        </>
                                        :
                                        <>
                                            <div className="modal-body py-0">
                                                <p>Change your password</p>
                                                <div className="mb-3">
                                                    <label htmlFor="exampleInputCurrentPassword"
                                                           className="form-label small">Current password</label>
                                                    <input type="password" value={currentPass} onChange={(e) => setCurrentPass(e.target.value)}
                                                           placeholder='···········'
                                                           className="form-control px-4 rounded-pill border-2"
                                                           id="exampleInputPassword1" style={{borderColor: '#EFB467'}}/>
                                                </div>
                                                <div className="mb-3">
                                                    <label htmlFor="exampleInputPassword"
                                                           className="form-label small">New password</label>
                                                    <input type="password" value={pass} onChange={handlePasswordChange}
                                                           placeholder='···········'
                                                           className="form-control px-4 rounded-pill border-2"
                                                           id="exampleInputPassword1" style={{borderColor: '#EFB467'}}/>
                                                    {!passwordRequirementsMet &&
                                                        <p className='text-danger text-center'>Password must have at
                                                            least one number, one letter, and it has to be longer than 8
                                                            characters.</p>}
                                                </div>

                                                <div className="mb-3">
                                                    <label htmlFor="exampleInputConfirmPassword"
                                                           className="form-label small">Confirm new password</label>
                                                    <input type="password" value={confirmPass}
                                                           onChange={handleConfirmPasswordChange}
                                                           placeholder='···········'
                                                           className="form-control px-4 rounded-pill border-2"
                                                           id="exampleInputPassword1" style={{borderColor: '#EFB467'}}/>
                                                    {!passwordsMatch &&
                                                        <p className='text-danger text-center'>Passwords don't
                                                            match!</p>}
                                                </div>
                                                {requirementsFail && <p className="text-danger text-center">Passwords don't meet the requirements.</p>}
                                                {simpleErr && <p className="text-danger text-center">New password can't be the same as old password.</p>}
                                            </div>
                                            <div className="modal-footer pb-3 border-top-0"
                                                 style={{justifyContent: "start"}}>
                                                <button onClick={handleUpdPass}
                                                        className="btn border-2 rounded-pill shadow-sm"
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
                                        </>}
                                </>
                                }
                            </>
                        }
                        {err && <p className="text-danger text-center">Something is wrong! Try again later.</p>}
                    </div>
                </div>
            </div>
        </>
    )
}

export default ProfileSettings;