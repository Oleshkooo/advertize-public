import { AnimatePresence } from 'framer-motion'
import { Toaster } from 'react-hot-toast'
import { Route, Routes, useLocation } from 'react-router-dom'

import { ModalElement, PageAnimation } from '@/components'
import { RequireAdmin } from '@/hoc'
import {
    AdminLoginPage,
    AdminPage,
    MainPage,
    NotFoundPage,
    OrderPage,
    PrivacyPolicyPage,
    TermsOfUsePage,
} from '@/pages'
import Providers from '@/Providers'

const App = () => {
    const location = useLocation()

    return (
        <Providers>
            <Toaster containerClassName="toaster" position="top-center" reverseOrder={false} />
            <AnimatePresence mode="wait" initial={false}>
                <Routes location={location} key={location.pathname}>
                    <Route
                        path="/"
                        element={
                            <PageAnimation>
                                <MainPage />
                            </PageAnimation>
                        }
                    />
                    <Route
                        path="/order"
                        element={
                            <PageAnimation>
                                <OrderPage />
                            </PageAnimation>
                        }
                    />
                    <Route
                        path="/terms-of-use"
                        element={
                            <PageAnimation>
                                <TermsOfUsePage />
                            </PageAnimation>
                        }
                    />
                    <Route
                        path="/privacy-policy"
                        element={
                            <PageAnimation>
                                <PrivacyPolicyPage />
                            </PageAnimation>
                        }
                    />
                    <Route
                        path="/adm"
                        element={
                            <PageAnimation>
                                <RequireAdmin>
                                    <AdminPage />
                                </RequireAdmin>
                            </PageAnimation>
                        }
                    />
                    <Route
                        path="adm-login"
                        element={
                            <PageAnimation>
                                <AdminLoginPage />
                            </PageAnimation>
                        }
                    />
                    <Route
                        path="*"
                        element={
                            <PageAnimation>
                                <NotFoundPage />
                            </PageAnimation>
                        }
                    />
                </Routes>
            </AnimatePresence>
            <ModalElement />
        </Providers>
    )
}

export default App
