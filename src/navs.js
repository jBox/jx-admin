export const manage = [
    { label: "HOME", icon: "home", to: "/" },
    {
        label: "HOME",
        icon: "home",
        to: "/manage/users",
        children: [
            { label: "users", icon: "home", to: "/manage/users" },
            { label: "register", icon: "home", to: "/manage/users/register" },
        ]
    },
    {
        label: "HOME",
        icon: "home",
        to: "/manage/users",
        children: [
            { label: "users", icon: "home", to: "/manage/users" },
            { label: "register", icon: "home", to: "/manage/users/register" },
        ]
    }
];

export const driver = [

];