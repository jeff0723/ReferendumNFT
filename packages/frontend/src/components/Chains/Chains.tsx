import React from 'react'
import { PolygonLogo } from "./Logos";
import { Menu, Dropdown, Button } from "antd";
import { DownOutlined } from "@ant-design/icons";

interface Props {

}
const styles = {
    item: {
        display: "flex",
        alignItems: "center",
        height: "42px",
        fontWeight: "500",
        fontFamily: "Roboto, sans-serif",
        fontSize: "14px",
        padding: "0 10px",
    },
    button: {
        borderRadius: "12px",
    },
};

const menuItems = [

    {
        key: "0x89",
        value: "Polygon",
        icon: <PolygonLogo />,
    },
    {
        key: "0x13881",
        value: "Mumbai",
        icon: <PolygonLogo />,
    }
];
const Chains = (props: Props) => {

    const menu = (
        <Menu>
            {menuItems.map((item) => (
                <Menu.Item key={item.key} icon={item.icon} style={styles.item}>
                    <span style={{ marginLeft: "5px" }}>{item.value}</span>
                </Menu.Item>
            ))}
        </Menu>
    );
    return (
        <div>
            <Dropdown overlay={menu} trigger={["click"]}>
                <Button
                    style={{ ...styles.button, ...styles.item }}>
                    <span style={{ marginLeft: "5px" }}>新增網路</span>
                    <DownOutlined />
                </Button>
            </Dropdown>
        </div>
    )
}

export default Chains
