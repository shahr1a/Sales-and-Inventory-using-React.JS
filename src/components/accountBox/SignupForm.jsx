import React, { useContext, useState } from "react"
import {
    BoxContainer,
    FormContainer,
    Input,
    BoldLink,
    MutedP,
    SubmitButton,
} from "./Common"
import { Marginer } from "../marginer"
import { AccountContext } from "./accountContext"
import { createAPIEndpoint, ENDPOINTS } from "../../api"
import Notification from "../notification/Notification"

function SignupForm(props) {
    const { switchToSignin } = useContext(AccountContext)
    const [formdata, setFormdata] = useState({
        dealerName: "",
        dealerLocation: "",
        dealerUsername: "",
        dealerPassword: "",
        isVerified: true,
        dealerDiscount: 0,
        dealerTypeId: 1
    })
    const [notify, setNotify] = useState({ isOpen: false })

    const handleSubmit = async e => {
        e.preventDefault();
        if (formdata.dealerName !== "" && formdata.dealerUsername !== "" && formdata.dealerPassword !== "")
            try {
                const { data } = await createAPIEndpoint(ENDPOINTS.DEALERPOST).create(formdata)
                setNotify({
                    isOpen: true,
                    message: `Account with username: ${data.dealerUsername} created`,
                })
                setFormdata({
                    dealerName: "",
                    dealerLocation: "",
                    dealerUsername: "",
                    dealerPassword: "",
                    isVerified: true,
                    dealerDiscount: 0,
                    dealerTypeId: 1
                })
            } catch (error) {
                if (error.response.status === 400)
                    setNotify({
                        isOpen: true,
                        message: "Username already exists",
                    })
            }
    }

    return (<>
        <BoxContainer>
            <FormContainer>
                <Input onChange={e => setFormdata({ ...formdata, [e.target.name]: e.target.value })} value={formdata.dealerName} name="dealerName" type="text" placeholder="Dealer Name" />
                <Input onChange={e => setFormdata({ ...formdata, [e.target.name]: e.target.value })} value={formdata.dealerLocation} name="dealerLocation" type="text" placeholder="Dealer Location" />
                <Input onChange={e => setFormdata({ ...formdata, [e.target.name]: e.target.value })} value={formdata.dealerUsername} name="dealerUsername" type="text" placeholder="Username" />
                <Input onChange={e => setFormdata({ ...formdata, [e.target.name]: e.target.value })} value={formdata.dealerPassword} name="dealerPassword" type="password" placeholder="Password" />
            </FormContainer>
            <Marginer direction="vertical" margin={10} />
            <SubmitButton onClick={handleSubmit} type="submit">Signup</SubmitButton>
            <Marginer direction="vertical" margin="1em" />
            <MutedP href="#">
                Already have an Account?{" "}
                <BoldLink href="#" onClick={switchToSignin}>
                    Signin
                </BoldLink>
            </MutedP>
        </BoxContainer>
        <Notification {...{ notify, setNotify }} />
    </>
    )
}

export default SignupForm
