import { EVENTS } from "../utils/const";

const navigate = (href: string) => { 
    window.history.pushState({}, '', href);
    const navEvent = new Event(EVENTS.pushState);
    window.dispatchEvent(navEvent);
}

export function Link ({ target, to, ...props} : { target?: string, to: string, props: JSX.Element }) {
    const handleClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
        const isMainEvent = event.button === 0
        const isModifiedEvent = event.metaKey || event.altKey || event.ctrlKey || event.shiftKey
        const isManageableEvent = target === undefined || target === '_self'
        
        if (isMainEvent && !isModifiedEvent && isManageableEvent) {
            event.preventDefault();
            navigate(to);
            window.scrollTo(0, 0);
        }
    }
    return (
        <a onClick={handleClick} href={to} target={target} {...props} />
    )
}