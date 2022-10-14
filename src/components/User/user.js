import React, { useReducer } from 'react';

const InitialState = {
    name: "",
    email: "",
    phone: "",
    address: "",
    createuser: false,
    user: [],
    fuser: [],
    userdetails: false,
    errors: {}
}

const reducer = (state, action) => {
    switch (action.type) {
        case "HANDLEINPUT":
            return {
                ...state,
                [action.field]: action.payload
            }
        case "ADDUSERS":
            return {
                ...state,
                user: [...state.user, { name: state.name, email: state.email, phone: state.phone, address: state.address }],
                createuser: !state.createuser,
                name: '',
                email: '',
                phone: '',
                address: '',
            }
        case "REMOVEUSERS":
            return {
                ...state,
                user: state.user.filter((user) => user.name != action.payload)

            }
        case "CREATEUSER":
            return {
                ...state,
                createuser: !state.createuser
            }
        case "GETUSER":
            return {
                ...state,
                fuser: state.user.filter((user) => user.name == action.payload),
                userdetails: true
            }
        case "HIDEDETAIL":
            return {
                ...state,
                userdetails: false,
                fuser: []
            }
        case "SETERRORS":
             
            return {
                ...state,
                errors: action.payload,
            }
        default:
            return state;
    }
};



const UserComponent = () => {

    const [state, dispatch] = useReducer(reducer, InitialState);

    const handleChange = (e) => {
        dispatch({
            type: "HANDLEINPUT",
            field: e.target.name,
            payload: e.target.value
        })
    }

    const validateInput = () => {
        let errors = {};
        let formIsValid = true;


        if (!state.name) {
            formIsValid = false;
            errors["name"] = "Name Cannot be empty";
        }

        if (!state.email) {
            formIsValid = false;
            errors["email"] = "Email Cannot be empty";
        }else if (typeof state.email !== "undefined") {
            if (!state.email.match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)) {
                formIsValid = false;
                errors["email"] = "Enter a Valid Email Address";
            }else if( state.user.some((user) => user.email == state.email)){
                formIsValid = false;
                errors["email"] = "Email already exists !";
             }
        }
        

        if (!state.phone) {
            formIsValid = false;
            errors["phone"] = "Phone Cannot be empty";
        }else if (typeof state.phone !== "undefined") {
            if (!state.phone.match(/^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/)) {
                formIsValid = false;
                errors["phone"] = "Enter a Valid Phone Number";
            }
        }
        
        if (!state.address) {
            formIsValid = false;
            errors["address"] = "Address Cannot be empty";
        }

         
        dispatch({type:"SETERRORS" , payload:errors})
        return formIsValid;
    }

    const addUser = (e) => {
        e.preventDefault()
        if (validateInput()) {
            dispatch({ type: "ADDUSERS" })
        } 

    }




    return (
        <div className="containerfluid users">
            <div className="">
                <div className="row" style={{ "margin": "0px" }}>
                    <div className="col-lg-4 al_form">
                        <form >
                            <h3>Add User</h3>

                            <div class="form-group">
                                <label for="name">Name</label>
                                <input type="text" class="form-control" id="name" name="name" value={state.name} placeholder="Name" onChange={e => handleChange(e)} />
                                <p className='error'>{state.errors.name}</p>
                            </div>


                            <div class="form-group">
                                <label for="email">Email </label>
                                <input type="email" class="form-control" id="email" name="email" value={state.email} aria-describedby="emailHelp" placeholder="Email" onChange={e => handleChange(e)} />
                                <p className='error'>{state.errors.email}</p>
                            </div>


                            <div class="form-group">
                                <label for="phone">Phone</label>
                                <input type="text" class="form-control" id="phone" name="phone" value={state.phone} placeholder="Phone" onChange={e => handleChange(e)} />
                                <p className='error'>{state.errors.phone}</p>
                            </div>


                            <div class="form-group">
                                <label for="address">Address</label>
                                <input type="text" class="form-control" id="address" name="address" value={state.address} placeholder="Address" onChange={e => handleChange(e)} />
                                <p className='error'>{state.errors.address}</p>
                            </div>
                            <div style={{ 'textAlign': 'center' }}>
                                <button type="submit" class="btn btn-primary" onClick={(e) => addUser(e)}>Submit</button>
                            </div>

                        </form>



                    </div>
                    <div className='col-lg-8'>
                        <div className='panel'>
                            <div className='row'>
                                {
                                    state.user ? <>
                                        {
                                            state.user.map((value, index) =>
                                                <div key={index} className='col-lg-4'>

                                                    <div class="card" >
                                                        <div class="card-up" style={{ "background-color": "#9d789b" }}></div>
                                                        <div class="avatar mx-auto bg-white">
                                                            <img src="https://mdbcdn.b-cdn.net/img/Photos/Avatars/img%20(1).webp"
                                                                class="rounded-circle img-fluid" />
                                                        </div>
                                                        <div class="card-body">
                                                            {/* <img src="https://mdbcdn.b-cdn.net/img/new/avatars/8.webp" class="rounded-circle mb-3" style={{"width": "150px"}} alt="Avatar" /> */}
                                                            <h5 class="card-title">{value.name}</h5>
                                                            <p class="card-text">{value.email}</p>
                                                            <a href="#" class="details" onClick={e => dispatch({ type: "GETUSER", "payload": value.name })} >Show Details</a>
                                                        </div>
                                                        <a href="#" className='set_delete' onClick={e => dispatch({ type: "REMOVEUSERS", "payload": value.name })}><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#fff" class="bi bi-trash" viewBox="0 0 16 16">
                                                            <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z" />
                                                            <path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z" />
                                                        </svg></a>
                                                    </div>
                                                </div>)
                                        }
                                    </> : null
                                }

                            </div>
                        </div>
                    </div>
                    {
                        state.userdetails ?
                            <div className='user_details'>
                                <button type="button" class="close" aria-label="Close" onClick={e => dispatch({ type: "HIDEDETAIL" })}>
                                    <span aria-hidden="true">&times;</span>
                                </button>
                                <div>
                                    <div class="avatar mx-auto bg-white">
                                        <img src="https://mdbcdn.b-cdn.net/img/Photos/Avatars/img%20(1).webp"
                                            class="rounded-circle img-fluid" />
                                    </div>
                                    <div className='u_details'>
                                        <div>

                                            {
                                                state.fuser.map((user) => <>
                                                    <p>Name : {user.name}</p>
                                                    <p>Email :  {user.email}</p>
                                                    <p>Phone :  {user.phone}</p>
                                                    <p>Address :  {user.address}</p>
                                                </>)
                                            }
                                        </div>
                                    </div>

                                </div>
                            </div> : null}
                </div>
            </div>
        </div>
    )
}


export default UserComponent