import { Component, FunctionComponent } from "react";

export enum ViewType {
    TWO_D = '2d',
    THREE_D = '3d'
}

export interface ViewInfo {
    title: string; // 效果名称
    name: string; //效果名称
    type: ViewType; // 效果类型
    component: () => JSX.Element;
}