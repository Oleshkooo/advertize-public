import { memo, useMemo, type FC, type HTMLAttributes } from 'react'

import { type IAdspace } from '@/models'

import { getSideChars } from '@/models/services'

import s from '../MarkerModal.module.scss'

import { Side } from './Side'

interface BodyProps extends JSX.IntrinsicAttributes, HTMLAttributes<HTMLDivElement> {
    data: IAdspace
}

export const Body: FC<BodyProps> = memo(({ data }) => {
    const chars = useMemo(() => getSideChars(data.type), [data.type])
    const flexCenterClassName = useMemo(
        () => (data.sides.length === 1 ? s.flexCenter : ''),
        [data.sides.length],
    )

    const Sides = useMemo(
        () =>
            data.sides.map((side, i) => (
                <Side
                    key={side._id}
                    type={data.type}
                    sideData={side}
                    char={chars[i]}
                    index={i}
                    maxIndex={data.sides.length}
                />
            )),
        [chars, data.sides, data.type],
    )

    return <div className={`${s.Body} ${flexCenterClassName}`}>{Sides}</div>
})

Body.displayName = 'MarkerModal-body'
