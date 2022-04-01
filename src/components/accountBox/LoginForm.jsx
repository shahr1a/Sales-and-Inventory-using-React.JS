import React, { useContext, useEffect, useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import AuthAction from "../../redux/actions/AuthAction"
import { Redirect } from "react-router"
import { createAPIEndpoint, setAuthToken } from "../../api"
import {
  BoxContainer,
  FormContainer,
  Input,
  Select,
  SubmitButton,
  MutedLink,
  BoldLink,
  MutedP,
  Form,
} from "./Common"
import { Marginer } from "../marginer"
import { AccountContext } from "./accountContext"
import Notification from "../notification/Notification"
import Alert from "@mui/material/Alert"
import IconButton from "@mui/material/IconButton"
import Collapse from "@mui/material/Collapse"
import Button from "@mui/material/Button"
import CloseIcon from "@mui/icons-material/Close"

const LoginForm = (props) => {
  const [openUsernameError, setOpenUsernameError] = useState(false)
  const [openPasswordError, setOpenPasswordError] = useState(false)
  const [openSubmissionError, setOpenSubmissionError] = useState(false)
  const [severityUsernameError, setSeverityUsernameError] = useState("success")

  const [severityPasswordError, setSeverityPasswordError] = useState("success")
  const { switchToSignup } = useContext(AccountContext)
  const [notify, setNotify] = useState({ isOpen: false })

  const [userName, setUserName] = useState("")
  const [password, setPassword] = useState("")
  const [usertype, setUserType] = useState("staff")

  const [usernameError, setUsernameError] = useState("")
  const [passwordError, setPasswordError] = useState("")

  const [submissionError, setSubmissionError] = useState("")

  var usernameRegex = /^[a-zA-Z0-9]+$/

  const handleInputChangeUsername = (e) => {
    console.log(e.target.name)

    setUserName(e.target.name === "userName" ? e.target.value : "")

    if (userName == "") {
      setUsernameError("This field cannot be empty")
      setSeverityUsernameError("error")
    } else if (!userName.match(usernameRegex)) {
      setUsernameError("Username can contain only letter and number")
      setSeverityUsernameError("error")
    } else {
      setUsernameError("")
      setSeverityUsernameError("success")
    }
  }

  const handleInputChangePassword = (e) => {
    console.log(e.target.name)
    setPassword(e.target.name === "password" ? e.target.value : "")

    if (password == "") {
      setPasswordError("Please give password!")
      setSeverityPasswordError("error")
    } else {
      setPasswordError("")
      setSeverityPasswordError("success")
    }
  }

  const dispatch = useDispatch()
  const authReducer = useSelector((state) => state.AuthReducer)

  const validateForm = () => {
    let boolUsername = false
    let boolPassword = false
    if (userName !== "") {
      if (!userName.match(usernameRegex)) {
        boolUsername = true
        setUsernameError("Username can contain only letter and number")
        setSeverityUsernameError("error")
      } else {
        boolUsername = false
        setUsernameError("")
        setSeverityUsernameError("success")
      }
    } else {
      boolUsername = true
      setUsernameError("Username required!")
      setSeverityUsernameError("error")
    }

    if (password !== "") {
      boolPassword = false
      setPasswordError("")
      setSeverityPasswordError("success")
    } else {
      boolPassword = true
      setPasswordError("Password required!")
      setSeverityPasswordError("error")
    }

    if (!boolUsername && !boolPassword) return true
    return false
  }

  useEffect(() => {
    if (usernameError !== "") {
      setOpenUsernameError(true)
    }

    if (passwordError !== "") {
      setOpenPasswordError(true)
    }
  })

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (validateForm()) {
      try {
        const { data } = await createAPIEndpoint("User/login").create({
          userName,
          password,
          usertype: usertype.toLowerCase(),
          firstName: "",
          lastName: "",
          contactNo: "",
        })
        const { usertype: uType, user } = data
        setAuthToken(data.token)
        localStorage.setItem("token", data.token)
        localStorage.setItem(
          "uid",
          uType === "staff" ? user.userId : user.dealerId
        )
        localStorage.setItem("uType", uType)
        dispatch(AuthAction.login({ ...user, usertype: uType }))
      } catch (error) {
        if (error.response.status === 400)
          setSubmissionError("Login Failed! Please check credentitals...")
        setOpenSubmissionError(true)
      }
    }
  }
  if (authReducer.isAuthenticated) return <Redirect to="/" />

  return (
    <>
      <BoxContainer>
        <FormContainer>
          <Form>
            <Select
              value={usertype}
              onChange={(e) => setUserType(e.target.value)}
              name="usertype"
            >
              <option disabled value="none">
                -- Select User Type --
              </option>
              <option value="staff">Staff</option>
              <option value="dealer">Dealer</option>
            </Select>
            <Input
              type="text"
              name="userName"
              required
              value={userName}
              onChange={handleInputChangeUsername}
              placeholder="Username"
            />
            <Collapse in={openUsernameError}>
              <Alert
                action={
                  <IconButton
                    aria-label="close"
                    color="inherit"
                    size="small"
                    onClick={() => {
                      setOpenUsernameError(false)
                    }}
                  >
                    <CloseIcon fontSize="inherit" />
                  </IconButton>
                }
                sx={{ mb: 2 }}
                severity={severityUsernameError}
              >
                {usernameError}
              </Alert>
            </Collapse>
            {/* <Input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Password"
                        /> */}
            <Input
              type="password"
              name="password"
              value={password}
              onChange={handleInputChangePassword}
              placeholder="Password"
            />
            <Collapse in={openPasswordError}>
              <Alert
                action={
                  <IconButton
                    aria-label="close"
                    color="inherit"
                    size="small"
                    onClick={() => {
                      setOpenPasswordError(false)
                    }}
                  >
                    <CloseIcon fontSize="inherit" />
                  </IconButton>
                }
                sx={{ mb: 2 }}
                severity={severityPasswordError}
              >
                {passwordError}
              </Alert>
            </Collapse>
          </Form>
        </FormContainer>
        <MutedLink href="#">Forget your password?</MutedLink>
        <Marginer direction="vertical" margin="1.6em" />
        <Collapse in={openSubmissionError}>
          <Alert
            action={
              <IconButton
                aria-label="close"
                color="inherit"
                size="small"
                onClick={() => {
                  setOpenSubmissionError(false)
                }}
              >
                <CloseIcon fontSize="inherit" />
              </IconButton>
            }
            sx={{ mb: 2 }}
            severity="error"
          >
            {submissionError}
          </Alert>
        </Collapse>
        <Marginer direction="vertical" margin="1.6em" />
        <SubmitButton type="submit" onClick={handleSubmit}>
          Signin
        </SubmitButton>
        <Marginer direction="vertical" margin="1em" />
        <MutedP href="#">
          Don't have an account?
          <BoldLink href="#" onClick={switchToSignup}>
            Signup
          </BoldLink>
        </MutedP>
      </BoxContainer>
      <Notification {...{ notify, setNotify }} />
    </>
  )
}

export default LoginForm
