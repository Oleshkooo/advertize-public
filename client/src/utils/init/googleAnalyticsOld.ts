import reactGA from 'react-ga'

import { GA_TRACKING_ID_OLD } from '@/config'

type GoogleAnalytics = () => void

export const googleAnalyticsOld: GoogleAnalytics = () => {
    reactGA.initialize(GA_TRACKING_ID_OLD)
    reactGA.pageview(window.location.pathname + window.location.search)
}
