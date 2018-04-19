export const manage = [
    { label: "主页", icon: "home", to: "/dashboard" },
    {
        label: "订单管理",
        icon: "shopping-cart",
        to: "/manage/orders",
        children: [
            { label: "待处理订单", icon: "circle-o", to: "/manage/orders" },
            { label: "已完成订单", icon: "circle-o", to: "/manage/orders/done" },
            { label: "已取消订单", icon: "circle-o", to: "/manage/orders/cancelled" }
        ]
    },
    {
        label: "司机管理",
        icon: "user",
        to: "/manage/drivers"
    },
    {
        label: "车辆管理",
        icon: "car",
        to: "/manage/vehicles"
    },
    {
        label: "用户管理",
        icon: "users",
        to: "/manage/users",
        children: [
            { label: "新注册用户", icon: "circle-o", to: "/manage/users/registers" },
            { label: "用户", icon: "circle-o", to: "/manage/users" },
        ]
    }
];

export const driver = [
    { label: "主页", icon: "home", to: "/driver" },
    { label: "我的行程", icon: "car", to: "/driver/trips" }
];