import { Body, Container, Html, Tailwind } from "@react-email/components";

import * as React from "react";


interface Props {
    content: string;
}

const baseUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "";

const timeTrakTemplate = ({ firstName }: { firstName: string }) => {
    return(
        <Html>
            <Tailwind>
                <Body className="bg-emerald-200">
                    <Container className="my-16">
                    <div className="font-sans leading-relaxed text-gray-800 ">
                        <div className="max-w-lg mx-auto py-10 px-24 bg-gray-100 rounded-lg border border-gray-200 shadow-md">
                        <h1 className="text-2xl text-green-600 font-bold text-center">
                            Welcome to Our Platform!
                        </h1>
                        <p className="text-lg mt-4">
                            Hi <span className="font-semibold">{firstName}</span>,
                        </p>
                        <p className="text-base mt-2">
                            We’re thrilled to have you here! Get ready to dive into our services and explore everything we have to offer.
                        </p>
                        <p className="text-base mt-2">
                            If you have any questions, feel free to reach out to our support team at any time. We're here to help you succeed!
                        </p>
                        <p className="text-base mt-6">
                            Cheers, <br />
                            The Team at{" "}
                            <span className="font-bold">
                            time
                            <span className="text-green-600">Trak</span>
                            </span>
                        </p>
                        <footer className="text-sm text-gray-600 mt-6 text-center">
                            <p>© {new Date().getFullYear()} timeTrak. All rights reserved.</p>
                            <p>
                            <a
                                href="https://timetrak.fyi"
                                className="text-green-600 hover:underline"
                            >
                                Visit Our Website
                            </a>
                            </p>
                        </footer>
                        </div>
                    </div>
                    </Container>
                    

                </Body>
            </Tailwind>

        </Html>
    )

}


export default timeTrakTemplate