import React, { useState } from "react";

import { TextField, Button } from '@material-ui/core'

import AssignmentIndIcon from '@material-ui/icons/AssignmentInd';
import VpnKeyIcon from '@material-ui/icons/VpnKey';

import { Link } from 'react-router-dom'
import logo from '../../assets/images/logo.png'


import { withRouter } from 'react-router-dom'
import { login, getProfile } from '../../API/apiFunctions'

import loading from '../../assets/images/loading.gif'


const NavBar = ({ history }) => {
    const init = {
        username: '',
        password: '',
        showLoading: false,
        inputError: false
    }
    const [state, setState] = useState(init)

    const loginHandler = e => {

        if (state.username.length === 0 || state.password.length < 8) {

            setState({ ...state, inputError: true })

            setTimeout(() => {
                setState(init)
            }, 2000)
            return
        }



        const user = {
            username: state.username,
            password: state.password
        }
        login(user).then((res) => {
            if (res && res.statusText && res.statusText === "OK") {
                getProfile().then((response) => {
                    if (response && response.data) {
                        localStorage.setItem("UserOficialName", response.data.name);
                        localStorage.setItem("UserRole", response.data.role);
                        setState(init)
                        history.push('/dashboard')

                    }
                })
            }
            else {

                setState(init)
            }

        })

    }




    return (
        <>
            <Link to='/register'>

                <img src={logo} height="60px" alt="" />

            </Link>
            <h3 style={{ flex: 1, marginLeft: '10px' }}> Sistema de Stock</h3>


            <AssignmentIndIcon />

            <TextField label="Usuario" variant="outlined" size='small'
                autoComplete="user" error={state.inputError}
                value={state.username} onChange={e => setState({ ...state, username: e.target.value })} style={{ marginRight: '10px' }} />


            <VpnKeyIcon />

            <TextField label="Password" variant="outlined" size='small' error={state.inputError}
                value={state.password} onChange={e => setState({ ...state, password: e.target.value })} />

            <Button variant="contained" color="primary" onClick={loginHandler} style={{ marginLeft: '20px' }}>  Acceso</Button>


            <img hidden id='loadingGif' className={' ml-2'} style={{ width: '10px' }} src={loading} alt="loading" />

        </>
    )
}

export default withRouter(NavBar)