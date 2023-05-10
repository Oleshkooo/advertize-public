import {
    Button,
    Card,
    Container,
    Input,
    Link,
    Spacer,
    Text,
    Textarea,
    useInput,
} from '@nextui-org/react'
import { useCallback, type FC } from 'react'
import { toast } from 'react-hot-toast'
import { useLocation, useNavigate } from 'react-router-dom'

import { clearHistoryState, validatePhone } from '@/utils'

import { Footer, Icon } from '@/components'

import { useOrderMutation, type ApiResponse } from '@/store/api'

import s from './OrderPage.module.scss'

export const OrderPage: FC = () => {
    const location = useLocation()
    const navigate = useNavigate()
    const [sendOrder] = useOrderMutation()

    const { value: nameValue, setValue: setName, bindings: bindName } = useInput('')
    const { value: phoneValue, setValue: setPhone, bindings: bindPhone } = useInput('')
    const {
        value: orderValue,
        setValue: setOrder,
        bindings: bindOrder,
    } = useInput(
        location?.state?.data === undefined
            ? ''
            : `Добрий день! Хочу замовити рекламу на ${
                  location?.state?.data?.type === 'arka' ? 'арці' : 'білборді'
              } (${location?.state?.data?.id as string}). Очікую на ваш дзвінок!`,
    )

    const clearForm = useCallback(() => {
        setName('')
        setPhone('')
        setOrder('')
    }, [setName, setPhone, setOrder])

    const handleCancel = useCallback(() => {
        navigate('/')
    }, [navigate])

    const handleSubmit = useCallback(async () => {
        if (nameValue.length === 0 || phoneValue.length === 0 || orderValue.length === 0) {
            toast.error('Заповніть всі поля')
            return
        }

        if (nameValue.length > 100) {
            toast.error('Ваше ім`я завелике')
            return
        }

        if (!validatePhone(phoneValue)) {
            toast.error('Введіть правильний номер телефону')
            return
        }

        if (orderValue.length > 1000) {
            toast.error('Ваше замовлення завелике')
            return
        }

        const orderData = {
            name: nameValue,
            phone: phoneValue,
            order: orderValue,
        }
        const tId = toast.loading('Відправляємо...')

        try {
            const { message } = await sendOrder(orderData).unwrap()
            clearForm()
            toast.success(message)
        } catch ({ data }: any) {
            toast.error((data as ApiResponse).message)
        } finally {
            toast.dismiss(tId)
        }
    }, [nameValue, phoneValue, orderValue, sendOrder, clearForm])

    clearHistoryState()

    return (
        <>
            {/* <Meta noindex>Замовити рекламу</Meta> */}

            <div className={s.orderPage}>
                <div className={s.blobs}>
                    <div className={s.blob1} />
                    <div className={s.blob2} />
                </div>
                <div className={s.blur}>
                    <Card isHoverable className={s.card}>
                        <Card.Header className={s.header}>
                            <Spacer y={0.5} />
                            <Text size={28}>Замовити рекламу</Text>
                        </Card.Header>
                        <Card.Body className={s.body}>
                            <Container>
                                <Input
                                    fullWidth
                                    clearable
                                    bordered
                                    color="primary"
                                    placeholder="Імʼя"
                                    contentLeft={<Icon type="fa-user" />}
                                    spellCheck={false}
                                    tabIndex={1}
                                    aria-label="Імʼя"
                                    {...bindName}
                                />
                                <Spacer y={1} />
                                <Input
                                    fullWidth
                                    clearable
                                    bordered
                                    color="primary"
                                    placeholder="Номер телефону"
                                    contentLeft={<Icon type="fa-phone" />}
                                    spellCheck={false}
                                    tabIndex={2}
                                    aria-label="Номер телефону"
                                    {...bindPhone}
                                />
                                <Spacer y={1} />
                                <Textarea
                                    fullWidth
                                    bordered
                                    color="primary"
                                    placeholder="Замовлення"
                                    spellCheck={false}
                                    tabIndex={3}
                                    aria-label="Замовлення"
                                    {...bindOrder}
                                />
                            </Container>
                        </Card.Body>
                        <Card.Footer className={s.footer} css={{ pt: 0 }}>
                            <Container>
                                <Text size={12}>
                                    Натискаючи кнопку Замовити, ви погоджуєтесь з{' '}
                                    <Link
                                        href="/terms-of-use"
                                        target="_blank"
                                        rel="noreferrer"
                                        className={s.link}
                                        tabIndex={-1}
                                    >
                                        правилами використання
                                    </Link>{' '}
                                    та{' '}
                                    <Link
                                        href="/privacy-policy"
                                        target="_blank"
                                        rel="noreferrer"
                                        className={s.link}
                                        tabIndex={-1}
                                    >
                                        політикою конфіденційності
                                    </Link>{' '}
                                    сайту.
                                </Text>
                                <Spacer y={1} />
                                <div className={s.buttons}>
                                    <Button
                                        auto
                                        onPress={handleSubmit}
                                        className={s.submit}
                                        tabIndex={4}
                                    >
                                        Замовити
                                    </Button>
                                    <Button
                                        auto
                                        flat
                                        color="error"
                                        onPress={handleCancel}
                                        tabIndex={5}
                                    >
                                        Скасувати
                                    </Button>
                                </div>
                                <Spacer y={1} />
                            </Container>
                        </Card.Footer>
                    </Card>
                </div>
            </div>
            <Footer />
        </>
    )
}
