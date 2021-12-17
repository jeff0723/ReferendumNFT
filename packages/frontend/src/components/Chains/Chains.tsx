import React, { useEffect, useState } from 'react'
import { PolygonLogo } from "./Logos";
import { Menu, Dropdown, Button } from "antd";
import { DownOutlined } from "@ant-design/icons";
import { switchNetwork } from "../../hooks/useChain";
import { useActiveWeb3React } from '../../hooks/web3'
import { useMediaQuery } from 'react-responsive';
import { BigNumber } from "ethers";

interface Props {

}
interface Chain {
    id: number;
    key: string;
    value: string;
    icon: JSX.Element;

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
        border: 'none'
    },
};

const menuItems = [

    {
        id: 137,
        key: "0x89",
        value: "Polygon",
        icon: <PolygonLogo />,
    },
    {
        id: 80001,
        key: "0x13881",
        value: "Mumbai",
        icon: <PolygonLogo />,
    },
];
const Chains = (props: Props) => {
    const { chainId, library } = useActiveWeb3React()
    const [selected, setSelected] = useState<Chain>();
    const isTablet = useMediaQuery({
        query: '(min-width: 992px)'
    })
    const handleMenuClick = (e: any) => {
        const chainId = BigNumber.from(e.key).toNumber();
        if (library) switchNetwork(library, chainId);
    };
    useEffect(() => {
        const getChainId = () => {
            if (!chainId) return null;
            const newSelected = menuItems.find((item) => item.id === chainId);
            setSelected(newSelected);
        }
        getChainId();
    }, [chainId]);

    const menu = (
        <Menu onClick={handleMenuClick}>
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
                    key={selected?.id}
                    icon={selected?.icon}
                    style={{ ...styles.button, ...styles.item, border: (isTablet ? "none" : "") }}
                >
                    <span style={{ marginLeft: "5px" }}>{selected ? selected?.value : "切換網路"}</span>
                    <DownOutlined />
                </Button>
            </Dropdown>
        </div>
    )
}

export default Chains
