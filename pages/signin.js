import React from 'react'
import { getProviders, signIn, getSession, csrfToken } from "next-auth/react";
const signin = ({ providers }) => {
    return (
        <div class="wrap_login">


            <div class="card">
                <div class="top-block1"></div>
                <div class="top-block2"> </div>
                <div class="title">
                    <h1>User Login</h1>
                </div>
                <div class="input-block">
                    {/* <div class="block"><i class="fas fa-user-alt"></i>
                        <input class="username" placeholder="Username" />
                    </div> */}
                    {/* <div class="block"><i class="fas fa-lock"></i>
                        <input class="password" placeholder="Password" />
                    </div> */}
                    {Object.values(providers).map((provider) => (
                        <div key={provider.name}>
                            <button onClick={() => signIn(provider.id)}>
                                Sign in with {provider.name}
                            </button>
                        </div>
                    ))}

                    {/* <button>LOGIN</button> */}
                </div>

            </div>



        </div>
    )
}

export default signin

export async function getServerSideProps(context) {
    const providers = await getProviders()
    return {
        props: {
            providers
        },
    };
}