import { ReactNode } from "react";

export type RouteComponent = React.FC<{ routeParams: RouteParams }>;

export type Routes = {
    path: string;
    Component: RouteComponent;
};

export type RouteParams = {
    pokemonName: string;
};

export type RouteProps = {
    children: ReactNode;
    routes?: Routes[];
    defaultComponent?: React.ComponentType<{ routeParams: Record<string, string | number> }>;
}
