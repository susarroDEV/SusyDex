import { EVENTS } from '../utils/const'
import { useState, useEffect, Children, isValidElement, ReactElement} from 'react'
import { match } from 'path-to-regexp'
import { getCurrentPath } from '../utils/getCurrentPath.js'
import { RouteProps, Routes } from '../types/Routes.js'
import Page404 from '../pages/Page404.js'

export function Router ({ children, routes = [], defaultComponent: DefaultComponent = Page404} : RouteProps) {
    const [currentPath, setCurrentPath] = useState(getCurrentPath())

    useEffect(() => {
        const onLocationChange = () => {
            setCurrentPath(getCurrentPath())
        }

        window.addEventListener(EVENTS.pushState, onLocationChange)
        window.addEventListener(EVENTS.popState, onLocationChange)

        return () => {
            window.removeEventListener(EVENTS.pushState, onLocationChange)
            window.removeEventListener(EVENTS.popState, onLocationChange)
        }
    }, [])

    let routeParams = {}

    const routesFromChildren: Routes[] = Children.toArray(children)
        .filter(isValidElement)
        .map((child: ReactElement) => {
            const { props, type } = child;
            const isRoute = typeof type === 'function' && type.name === 'Route';
            return isRoute ? props : null;
        })
        .filter(Boolean) as Routes[];

    const routesToUse = routes.concat(routesFromChildren);
    const Page = routesToUse.find(({ path }) => {
        if (path === currentPath) return true
        const matcherUrl = match(path, { decode: decodeURIComponent })
        const matched = matcherUrl(currentPath)
        if (!matched) return false

        routeParams = matched.params
        return true
    })?.Component

    return Page
    ? <Page routeParams={routeParams} />
    : <DefaultComponent routeParams={routeParams} />
}