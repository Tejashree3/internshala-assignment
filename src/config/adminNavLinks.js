// src/config/adminNavLinks.js
import { IoCubeOutline, IoLibraryOutline } from "react-icons/io5";

export const adminNavLinks = [
    {
        label: "Product",
        icon: IoCubeOutline,
        children: [
            {
                label: "Product List",
                path: "/products/list",
            },
            {
                label: "Add Product",
                path: "/products/add",
            }
        ]
    },
    {
        label: "Ingredients",
        icon: IoLibraryOutline,
        children: [
            {
                label: "Ingredients List",
                path: "/ingredients",
            },
            {
                label: "Add Ingredients",
                path: "/ingredients/add",
            }
        ]
    }
];
