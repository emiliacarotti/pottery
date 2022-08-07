import { Elements } from "@stripe/react-stripe-js"
import { loadStripe } from "@stripe/stripe-js"
import React from "react"
import PaymentForm from "./PaymentForm"

const PUBLIC_KEY = "pk_test_51LTuYdD0tSzpg59IoDwvEVm1pAcustfExcinPqm7eAoC6wiLrwE3OAOi2AtGzBwian2RTuktruN85tJ7rLldMbBz00YGxRbt5L"

const stripeTestPromise = loadStripe(PUBLIC_KEY)

export default function StripeContainer() {
    return (
        <Elements stripe={stripeTestPromise}>
            <PaymentForm />
        </Elements>
    )
}