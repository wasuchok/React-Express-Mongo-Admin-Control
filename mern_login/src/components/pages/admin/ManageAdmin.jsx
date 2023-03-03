import { useState, useEffect } from "react"
import { listUsers, changeEnabled, changeRole, removeUsers, resetPassword } from "../../function/users"
import { useSelector } from "react-redux"
import Switch from '@mui/material/Switch'
import NativeSelect from '@mui/material/NativeSelect'
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import moment from "moment/min/moment-with-locales"
import EditIcon from '@mui/icons-material/Edit';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

const ManageAdmin = () => {

    const { user } = useSelector((state) => ({ ...state }))

    const [data, setData] = useState([])

    const [open, setOpen] = useState(false)

    const [values, setValues] = useState({
        id: "",
        password : ""
    })

    const handleClickOpen = (id) => {
        setOpen(true)
        setValues({...values, id: id})
        
    }

    const handleClose = () => {
        setOpen(false)
    }


    const handleChangeRole = (e, id) => {
        // console.log(e.target.value)
        const value = {
            id: id,
            role: e.target.value
        }
        changeRole(user.token, value)
            .then((response) => {
                loadData(user.token)
                console.log(response.data)
            }).catch((err) => {
                console.log(err)
            })
        // console.log(value)
    }

    const remove_Users = (id) => {
        removeUsers(user.token, id)
    }



    const handleOnChange = (e, id) => {
        const value = {
            id: id,
            enabled: e
        }
        changeEnabled(user.token, value).then((response) => {
            loadData(user.token)
            console.log(response)
        }).catch((err) => {
            console.log(err)
        })

    }

    const handleChangePassword = (e) => {
        // console.log(e.target.value)
        setValues({...values, [e.target.name] : e.target.value})
    }

    const handleOk = () => {
        resetPassword(user.token, values.id, values)
        .then((response) => {
            loadData(user.token)
            setOpen(false)
            console.log(response)
        }).catch((err) => {
            console.log(err)
        })
    }


    useEffect(() => {

        loadData(user.token)

    }, [])

    const loadData = (authtoken) => {
        listUsers(authtoken).then((response) => {
            setData(response.data.data)
        }).catch((err) => {
            console.log(err.response.data)
        })
    }

    return (
        <>
            <div className="container">
                <table className="table">
                    <thead>
                        <tr>
                            <th scope="col">username</th>
                            <th scope="col">role</th>
                            <th scope="col">status</th>
                            <th scope="col">create</th>
                            <th scope="col">updated</th>
                            <th scope="col">tools</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((item, index) =>

                            <tr key={index}>
                                <th scope="row">{item.username}</th>
                                <td>
                                    <NativeSelect
                                        defaultValue={item.role}
                                        onChange={(event) => handleChangeRole(event, item._id)}

                                    >
                                        <option value={"user"}>user</option>
                                        <option value={"admin"}>admin</option>

                                    </NativeSelect>
                                </td>
                                <td><Switch
                                    checked={item.enabled}
                                    onChange={(event) => handleOnChange(event.target.checked, item._id)}

                                /></td>
                                <td>{moment(item.createdAt).locale('th').format('ll')}</td>
                                <td>
                                    {moment(item.updatedAt).locale('th').startOf(item.updatedAt).fromNow()}
                                </td>
                                <td>
                                    <IconButton sx={{ mr: 2 }} onClick={() => handleClickOpen(item._id)}>
                                        <EditIcon />
                                    </IconButton>


                                    <IconButton onClick={() => remove_Users(item._id)}>
                                        <DeleteIcon />
                                    </IconButton>
                                </td>
                            </tr>
                        )}


                    </tbody>
                </table>

                            {/* start modal */}

                            <Dialog open={open} onClose={handleClose}>
                                        <DialogTitle>เปลี่ยนรหัสผ่านใหม่</DialogTitle>
                                        <DialogContent>
                                            <TextField
                                                autoFocus
                                                margin="dense"
                                                name="password"
                                                label="รหัสผ่านใหม่"
                                                type="password"
                                                fullWidth
                                                variant="standard"
                                                onChange={handleChangePassword}
                                            />
                                        </DialogContent>
                                        <DialogActions>
                                            <Button onClick={handleClose}>ออก</Button>
                                            <Button onClick={handleOk}>ยืนยัน</Button>
                                        </DialogActions>
                                    </Dialog>


                            {/* end modal */}

            </div>
        </>
    )
}

export default ManageAdmin