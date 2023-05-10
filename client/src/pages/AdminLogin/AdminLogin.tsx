import { Button, Card, Container, Input, Spacer, Text, useInput } from '@nextui-org/react'
import { useCallback, useEffect, type FC } from 'react'
import { toast } from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'

import { Icon } from '@/components'
import { useAdminContext } from '@/context'
import { useLoginMutation, type ApiResponse } from '@/store/api'

import s from './AdminLogin.module.scss'

export const AdminLoginPage: FC = () => {
    const navigate = useNavigate()
    const [login] = useLoginMutation()
    const { admin, setAdmin } = useAdminContext()

    const { value: username, setValue: setUsername, bindings: bindUsername } = useInput('')
    const { value: password, setValue: setPassword, bindings: bindPassword } = useInput('')

    const clearForm = useCallback(() => {
        setUsername('')
        setPassword('')
    }, [setUsername, setPassword])

    const handleCancel = useCallback(() => {
        navigate('/')
    }, [navigate])

    const handleSubmit = useCallback(async () => {
        if (username.length === 0 || password.length === 0) {
            toast.error('Заповніть всі поля')
            return
        }

        const loginData = {
            username,
            password,
        }

        try {
            const { data } = await login(loginData).unwrap()
            clearForm()
            setAdmin({
                username: data.username,
                isAdmin: data.isAdmin,
                loginDate: new Date().getTime(),
            })
        } catch ({ data }: any) {
            toast.error((data as ApiResponse).message)
        }
    }, [username, password, login, clearForm, setAdmin])

    useEffect(() => {
        if (admin.isAdmin) {
            navigate('/adm')
        }
    }, [admin.isAdmin, navigate])

    return (
        <>
            {/* <Meta noindex>Вхід в адмін-панель</Meta> */}

            <div className={s.adminLogin}>
                <Card isHoverable className={s.card}>
                    <Card.Header className={s.header}>
                        <Spacer y={0.5} />
                        <Text size={28}>Вхід</Text>
                    </Card.Header>
                    <Card.Body className={s.body}>
                        <Container>
                            <Input
                                fullWidth
                                clearable
                                bordered
                                color="primary"
                                placeholder="Ім`я користувача"
                                contentLeft={<Icon type="fa-user" />}
                                spellCheck={false}
                                tabIndex={1}
                                aria-label="Ім`я користувача"
                                {...bindUsername}
                            />
                            <Spacer y={1} />
                            <Input.Password
                                fullWidth
                                clearable
                                bordered
                                color="primary"
                                placeholder="Пароль"
                                contentLeft={<Icon type="fa-password" />}
                                spellCheck={false}
                                tabIndex={2}
                                type="password"
                                aria-label="Пароль"
                                {...bindPassword}
                            />
                            <Spacer y={0.5} />
                        </Container>
                    </Card.Body>
                    <Card.Footer className={s.footer} css={{ pt: 0 }}>
                        <Container>
                            <div className={s.buttons}>
                                <Button
                                    auto
                                    onPress={handleSubmit}
                                    className={s.submit}
                                    tabIndex={4}
                                >
                                    Увійти
                                </Button>
                                <Button
                                    auto
                                    flat
                                    color="error"
                                    onPress={handleCancel}
                                    tabIndex={-1}
                                >
                                    Скасувати
                                </Button>
                            </div>
                            <Spacer y={1} />
                        </Container>
                    </Card.Footer>
                </Card>
            </div>
        </>
    )
}
