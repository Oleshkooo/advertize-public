import { memo, type FC, type HTMLAttributes } from 'react'

export interface TemplateNameProps extends JSX.IntrinsicAttributes, HTMLAttributes<> {}

const TemplateName: FC<TemplateNameProps> = memo(({}) => {
    return <></>
})

TemplateName.displayName = 'TemplateName'
export default TemplateName
