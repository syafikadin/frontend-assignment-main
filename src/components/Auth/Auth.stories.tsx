import React from 'react'
import {ComponentStory, ComponentMeta} from '@storybook/react'

import {Auth} from './Auth'

export default {
    title: 'Tools/Auth',
    component: Auth
} as ComponentMeta<typeof Auth>

const Template: ComponentStory<typeof Auth> = (args: any) => <Auth {...args} />

export const Default = Template.bind({})
