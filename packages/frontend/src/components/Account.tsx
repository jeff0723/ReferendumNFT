import React, { useState } from 'react'
import { Button, Modal, Typography } from 'antd'
import styled from 'styled-components';

import MetaMaskIcon from '../images/metamask.png';
import WalletConnectIcon from '../images/walletConnectIcon.svg';
import { useWeb3React } from '@web3-react/core';

interface Props {

}
const { Text } = Typography
const styles = {
    button: {
        display: "flex",
        alignItems: "center",
        height: "42px",
        fontWeight: "500",
        fontFamily: "Roboto, sans-serif",
        fontSize: "14px",
        padding: "0 10px",
        borderRadius: "12px",
    },
    modal: {
        borderRadius: "12px",
    }
    ,
    iconWrapper: {
        alignItems: "center",
        justifyContent: "center",
    }
}
const Box = styled('div')`
    width: 100%;
    display: flex;
    justify-content: space-between;
    padding: 16px;
    border-radius: 16px;
    border: 1px solid #e7eaf3;
    :hover {
        cursor: pointer;
        border: 1px solid #40a9ff;
    }
`
const Account = (props: Props) => {
    const { activate, library } = useWeb3React()
    const [isModalOpen, setModalOpen] = useState(false);
    return (
        <div>
            <Button style={styles.button} onClick={() => { setModalOpen(true) }}>連接錢包</Button>
            <Modal
                title="連接錢包"
                style={styles.modal}
                visible={isModalOpen}
                footer={null}
                onCancel={() => { setModalOpen(false) }}
                bodyStyle={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '16px'
                }}>

                <Box>
                    <Text>安裝Metamask</Text>
                    <div style={styles.iconWrapper}>
                        <img src={MetaMaskIcon} alt="Icon" height="24px" width="24px" />
                    </div>
                </Box>
                <Box>
                    <Text>WalletConnect</Text>
                    <div style={styles.iconWrapper}>
                        <img src={WalletConnectIcon} alt="Icon" height="24px" width="24px" />
                    </div>
                </Box>
            </Modal>
        </div>
    )
}

export default Account
