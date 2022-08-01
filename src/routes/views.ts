import { FireWork2D } from "../views";
import { ViewInfo, ViewType } from "./types";


const Views: Array<ViewInfo> = [{
    title: '2D烟花',
    name: 'firework',
    type: ViewType.TWO_D,
    component: FireWork2D

}]

export { Views };