import React from "react";
import { ViewInfo, ViewType } from "./types";


const Views: Array<ViewInfo> = [{
    title: '2D烟花',
    name: 'firework',
    type: ViewType.TWO_D,
    component: React.lazy(() => import('../views/2d/firework'))

}]

export { Views };