import { ErrorMessage, Field, Form, Formik } from "formik";
import s from "./PurchaseWindow.module.scss"
import { IoCloseSharp } from "react-icons/io5";
import * as Yup from "yup";
import { useState } from "react";

const PurchaseValidSchema = Yup.object().shape({
    cardNumber: Yup.string().max(19).min(19).required("Card Number is undefined"),
    cvv: Yup.string().max(3).min(3).required(),
    expiration: Yup.date().required(),
    firstName: Yup.string().required(),
    lastName: Yup.string().required(),
    country: Yup.string().required(),
    postCode: Yup.string().required()
})

function PurchaseWindow({setIsPay}: {setIsPay: (value: boolean)=> void}) {
const [cardNumber, setCardNumber] = useState("")

const purchaseInit = {
    cardNumber: "",
    cvv: "",
    expiration: "",
    firstName: "",
    lastName: "",
    country: "",
    postCode: ""
}

const handleCardNumber = (e: React.ChangeEvent<HTMLInputElement>) => {
  const value = e.target.value.replace(/\D/g, '')
  const formatted = value.match(/.{1,4}/g)?.join(' ') || '' 
  setCardNumber(formatted)
}

const comp = () => {
    console.log("d")
}

  return (
    <div className={s.purchaseWindow} onClick={() => setIsPay(false)}>
        <div className={s.purchaseSec} onClick={e => e.stopPropagation()}>
            <IoCloseSharp className={s.closeBtn} onClick={() => setIsPay(false)} />
            <Formik validationSchema={PurchaseValidSchema} initialValues={purchaseInit} onSubmit={comp}>
                <Form className={s.purchaseBlock}>
                    <div>
                        <label>
                            <div>
                                <h3>Card Number*</h3>
                                <Field
                                type="text"
                                value={cardNumber}
                                onChange={handleCardNumber}
                                placeholder="0000 0000 0000 0000"
                                className={s.field}
                                name="cardNumber"
                                />
                            </div>
                            <ErrorMessage name="cardNumber" component="span" className={s.errorMsg} />
                        </label>
                        <div>
                            <label>
                                <div>
                                    <h3>Expiration Date*</h3>
                                    <Field
                                    type="text"
                                    name="expiration"
                                    placeholder="19/27"
                                    maxLength={19}
                                    className={s.expDate}
                                    />
                                </div>
                                {/* <ErrorMessage name="expiration" component="span" className={s.errorMsg} /> */}
                            </label>
                            <label>
                                <div>
                                    <h3>CVV*</h3>
                                    <Field
                                    type="text"
                                    name="cvv"
                                    placeholder="***"
                                    className={s.cvv}
                                    maxLength={3}
                                    />
                                </div>
                                <ErrorMessage name="cvv" component="span" className={s.errorMsg} />
                            </label>
                        </div>
                    </div>
                    <div>
                        <label>
                            <div>
                                <h3>First Name*</h3>
                                <Field 
                                type="text"
                                name="firstName"
                                className={s.field}
                                />
                            </div>
                            <ErrorMessage name="firstName" component="span" className={s.errorMsg} />
                        </label>
                        <label>
                            <div>
                                <h3>Last Name*</h3>
                                <Field 
                                type="text"
                                name="lastName"
                                className={s.field}
                                />
                            </div>
                            <ErrorMessage name="lastName" component="span" className={s.errorMsg} />
                        </label>
                    </div>
                    <div>
                        <label>
                            <div>
                                <h3>Country*</h3>
                                <Field 
                                type="text"
                                name="country"
                                className={s.field}
                                />
                            </div>
                            <ErrorMessage name="country" component="span" className={s.errorMsg} />
                        </label>
                        <label>
                            <div>
                                <h3>Post Code*</h3>
                                <Field 
                                type="text"
                                name="postCode"
                                className={s.field}
                                />
                            </div>
                            <ErrorMessage name="postCode" component="span" className={s.errorMsg} />
                        </label>
                    </div>
                    <button className={s.submit} type="submit">
                        Purchase
                    </button>
                </Form>
            </Formik>
        </div>
    </div>
  )
}

export default PurchaseWindow